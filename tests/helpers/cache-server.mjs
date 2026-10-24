// Test-only server: uses a copied production build and a disposable database.
// The application's normal start command remains `next start`.
import { createServer } from 'node:http';
import next from 'next';
import config from '../../next.config.mjs';

if (!process.env.PERF_TEST_BUILD || !process.env.TURSO_DATABASE_URL?.startsWith('file:')) {
  throw new Error('Cache integration tests require an isolated build and local database.');
}
const port = Number(process.env.PERF_TEST_PORT);
const app = next({ dev: false, hostname: 'localhost', port, conf: { ...config, distDir: process.env.PERF_TEST_BUILD } });
await app.prepare();
createServer(app.getRequestHandler()).listen(port, '127.0.0.1', () => process.stdout.write('CACHE_TEST_READY\n'));
