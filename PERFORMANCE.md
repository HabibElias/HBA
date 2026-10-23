# Public-page performance

The public website uses Next.js 16 Cache Components (`use cache`, `cacheLife`, and `cacheTag`). It prerenders Home, About, Programs, and Visit. Public database reads are cached by collection, and independent collection reads run concurrently. Authentication, staff data, drafts, and media management remain request-time operations outside shared caches.

## Freshness

| Cached content | Background refresh after | Hard expiry |
| --- | --- | --- |
| Published collection data | 1 hour | 1 day |
| Home, Programs, individual events | 1 minute | 5 minutes |
| About, Visit, shared navigation/footer data | 1 hour | 1 day |

Publishing or unpublishing calls `updateTag('public-content')` and invalidates the public route layout. The next server request waits for fresh content rather than intentionally serving an old published snapshot. Draft saves and staff changes refresh the admin workspace without invalidating public data. Already-open browser tabs are not pushed updates; their client router can reuse content for 60 seconds. Event lists reevaluate the clock on refresh so finished events age out even without a new publication. Time-based refresh uses stale-while-revalidate, so automatic event removal is not an exact-to-the-second scheduler.

Direct database edits/import scripts bypass the publishing actions. Allow the refresh period or redeploy after such an import. Use the CMS for immediate publication. Self-hosted deployments with multiple server replicas need coordinated cache storage/tag invalidation; do not assume independent in-memory processes share a cache. Verify publication on the production hosting platform after deployment.

## Browser work

- Shared navigation receives contact information and schedules without photo arrays. Page providers send only that route's collections and editable settings.
- Home shows at most four upcoming events and six recent sermons. The Programs archive retains its complete content and filters.
- About defaults and editable lists are resolved on the server. Its browser code no longer imports the CMS field definitions or reconstructs all lists on every component render.
- Hero and schedule carousels initially mount only the visible photograph. Neighboring photographs are prepared after hydration; at most three backgrounds are mounted at once.
- Photo lightboxes load on demand. Leadership portraits and schedule thumbnails use responsive Next.js image optimization.

## Measurements

Measured locally on 23 October 2026 with production `next start`, the configured database, and five warm HTTP samples per route. These are median response times, not Lighthouse scores, Core Web Vitals, or guarantees for mobile networks. The Home after-sample included background revalidation; About and Visit were cache hits.

| Route | Before first-byte time | After first-byte time | Initial JS before | Initial JS after |
| --- | ---: | ---: | ---: | ---: |
| Home | 241.9 ms | 34.7 ms | 748,722 bytes | 713,012 bytes |
| About | 233.9 ms | 4.4 ms | 712,924 bytes | 689,570 bytes |
| Programs | 213.7 ms | 4.4 ms | 883,524 bytes | 870,582 bytes |
| Visit | 199.9 ms | 2.8 ms | 899,688 bytes | 886,748 bytes |

JavaScript counts total the script assets in the initial HTML, before transport compression. Moving About defaults to the server slightly increases its HTML while reducing JavaScript and repeated client processing; this is not a claim that every individual payload shrank. Browser visual and Core Web Vitals testing was unavailable in this session.

## Repeatable checks

```sh
npm run build
npm run start -- --port 3100
# In a second terminal:
npm run benchmark:public -- http://localhost:3100 test-results/performance.json
npm run test:public
npm run test:cms
npm run test:cache
```

The cache integration test requires a production build. It copies the build under ignored `test-results/`, creates a disposable SQLite database and test owner, and runs a test-only server on port 3217. It does not modify the configured church database or production build. It checks actual authenticated publishing against warmed Home/About pages, draft privacy, unauthorized mutation rejection, and event unpublishing in Programs and calendar downloads. Generated test artifacts remain under `test-results/` for inspection.

Implementation follows the installed Next.js 16.3 documentation and the official [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents), [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache), and [updateTag](https://nextjs.org/docs/app/api-reference/functions/updateTag) references.
