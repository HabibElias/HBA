import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, symlink } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { spawn } from 'node:child_process';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { hashPassword } from 'better-auth/crypto';
import * as schema from '../lib/db/schema';
import { defaultRoles } from '../lib/cms/permissions';
import { parseContent } from '../lib/cms/collections';
import { upcomingEvents } from '../lib/data/upcoming-events';

async function main() {
  await mkdir('test-results', { recursive: true });
  const temporary = await mkdtemp(resolve('test-results/cache-integration-'));
  const buildDir = join(temporary, 'build');
  const originalBuild = resolve('.next');
  await cp(originalBuild, buildDir, { recursive: true, filter: source => !['dev', 'cache', 'node_modules'].includes(relative(originalBuild, source).split(/[\\/]/)[0]) });
  // A directory junction works without Windows' file-symlink privilege. Only
  // immutable dependencies are shared; generated pages and caches are copied.
  await symlink(join(originalBuild, 'node_modules'), join(buildDir, 'node_modules'), 'junction');
  const databaseUrl = `file:${join(temporary, 'fixture.db').replaceAll('\\', '/')}`;
  const client = createClient({ url: databaseUrl });
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: './drizzle' });
  const now = new Date(), staffId = crypto.randomUUID(), password = crypto.randomUUID() + 'Test!';
  await db.insert(schema.roles).values({ ...defaultRoles[0], builtIn: true });
  await db.insert(schema.user).values({ id: staffId, name: 'Cache test owner', email: 'cache-test@example.test', roleId: 'owner', emailVerified: true, createdAt: now, updatedAt: now });
  await db.insert(schema.account).values({ id: crypto.randomUUID(), accountId: staffId, userId: staffId, providerId: 'credential', password: await hashPassword(password), createdAt: now, updatedAt: now });
  const settings = parseContent('settings', { title: 'Cache test church', titleAm: 'ሰሚት', address: 'Summit', addressAm: 'ሰሚት', phone: '+251911234567', email: 'church@example.test', telegram: 'https://t.me/Summit', home_hero_section_4: 'CACHE ORIGINAL HEADING', about_story_hero_1: 'CACHE ORIGINAL ABOUT' }, true);
  await db.insert(schema.content).values({ id: 'church-settings', kind: 'settings', title: 'Cache test church', draft: settings, published: settings, publishedVersion: 1, updatedAt: now });
  const port = 3217, origin = `http://localhost:${port}`;
  let logs = '';
  const server = spawn(process.execPath, ['tests/helpers/cache-server.mjs'], {
    windowsHide: true,
    env: { ...process.env, NODE_ENV: 'production', PERF_TEST_BUILD: relative(process.cwd(), buildDir), PERF_TEST_PORT: String(port), TURSO_DATABASE_URL: databaseUrl, TURSO_AUTH_TOKEN: '', BETTER_AUTH_SECRET: crypto.randomUUID() + crypto.randomUUID(), BETTER_AUTH_URL: origin },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', data => { logs += data.toString(); });
  server.stderr.on('data', data => { logs += data.toString(); });
  try {
    await new Promise<void>((accept, reject) => {
      const timeout = setTimeout(() => { clearInterval(timer); reject(new Error('Test server did not start.')); }, 30000);
      const timer = setInterval(() => { if (logs.includes('CACHE_TEST_READY')) { clearInterval(timer); clearTimeout(timeout); accept(); } }, 100);
      server.once('exit', () => { clearInterval(timer); clearTimeout(timeout); reject(new Error('Test server exited before startup.')); });
    });
    const login = await fetch(`${origin}/api/auth/sign-in/email`, { method: 'POST', headers: { 'content-type': 'application/json', origin }, body: JSON.stringify({ email: 'cache-test@example.test', password }) });
    assert.equal(login.status, 200, 'Fixture owner can sign in');
    const cookies = login.headers.getSetCookie().map(cookie => cookie.split(';')[0]).join('; ');
    const manifest = JSON.parse(await readFile(join(buildDir, 'server/server-reference-manifest.json'), 'utf8'));
    async function action(name: string, args: unknown[], authenticated = true) {
      const id = Object.entries(manifest.node).find(([, entry]) => (entry as { exportedName: string }).exportedName === name)?.[0];
      assert(id, `Action ${name} exists in the production build`);
      const response = await fetch(`${origin}/admin/pages/home`, { method: 'POST', headers: { 'Next-Action': id, 'Content-Type': 'text/plain;charset=UTF-8', origin, ...(authenticated ? { cookie: cookies } : {}) }, body: JSON.stringify(args) });
      const text = await response.text();
      const line = text.split('\n').find(value => /^\w+:\{"ok":/.test(value));
      assert(line, `Action returned a result (HTTP ${response.status})`);
      return JSON.parse(line.slice(line.indexOf(':') + 1)) as { ok: boolean; message: string; id?: string };
    }
    async function html(path: string) {
      const response = await fetch(origin + path);
      assert.equal(response.status, 200);
      return response.text();
    }
    const save = (version: number, data: Record<string, unknown>, intent: 'draft' | 'publish', authenticated = true) => action('saveContentAction', [{ id: 'church-settings', kind: 'settings', version, position: 0, data, intent }], authenticated);
    // Expire copied build-time snapshots through the real authenticated action.
    assert.equal((await save(1, settings, 'publish')).ok, true);
    assert((await html('/')).includes('CACHE ORIGINAL HEADING'));
    assert((await html('/about')).includes('CACHE ORIGINAL ABOUT'));
    await html('/'); await html('/about'); // warm both route caches
    const edited = { ...settings, home_hero_section_4: 'CACHE PUBLISHED HEADING', about_story_hero_1: 'CACHE PUBLISHED ABOUT' };
    assert.equal((await save(2, edited, 'publish', false)).ok, false, 'Anonymous publication is rejected');
    assert.equal((await save(2, edited, 'draft')).ok, true);
    assert(!(await html('/')).includes('CACHE PUBLISHED HEADING'), 'Draft stays out of the warmed Home cache');
    assert(!(await html('/about')).includes('CACHE PUBLISHED ABOUT'), 'Draft stays out of the warmed About cache');
    assert.equal((await save(3, edited, 'publish')).ok, true);
    assert((await html('/')).includes('CACHE PUBLISHED HEADING'), 'First request after publish sees fresh Home content');
    assert((await html('/about')).includes('CACHE PUBLISHED ABOUT'), 'First request after publish sees fresh About content');
    const event = { ...upcomingEvents[0], title: 'CACHE EVENT VISIBILITY', startDate: '20990101T080000Z', endDate: '20990101T100000Z', registerLink: '' };
    const created = await action('saveContentAction', [{ kind: 'events', version: 0, position: 0, data: event, intent: 'publish' }]);
    assert.equal(created.ok, true, created.message);
    assert((await html('/programs')).includes('CACHE EVENT VISIBILITY'));
    assert.equal((await fetch(`${origin}/api/events/${created.id}/calendar`)).status, 200);
    const removed = await action('contentStateAction', [created.id, 1, 'unpublish']);
    assert.equal(removed.ok, true, removed.message);
    assert(!(await html('/programs')).includes('CACHE EVENT VISIBILITY'), 'Unpublished event is removed from warmed pages');
    assert.equal((await fetch(`${origin}/api/events/${created.id}/calendar`)).status, 404, 'Unpublished event is removed from the calendar endpoint');
    console.log('PASS: authenticated publication refreshes warmed Home/About caches immediately; drafts stay private; unpublishing refreshes Programs and calendar; anonymous mutations are rejected.');
  } catch (error) {
    console.error(logs.slice(-6000));
    throw error;
  } finally {
    server.kill(); client.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
