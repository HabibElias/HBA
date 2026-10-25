import { ChurchMark } from "@/components/brand/church-mark";

export function AdminStandaloneLoading() {
  return <div className="admin-standalone admin-loading-standalone"><AdminPageLoading /></div>;
}

export function AdminPageLoading() {
  return (
    <div className="admin-loading" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page...</span>
      <div className="admin-loading-heading" aria-hidden="true">
        <span className="admin-skeleton admin-loading-title" />
        <span className="admin-skeleton admin-loading-description" />
      </div>
      <div className="admin-loading-toolbar" aria-hidden="true">
        <span className="admin-skeleton" /><span className="admin-skeleton" />
      </div>
      <div className="admin-loading-rows" aria-hidden="true">
        {[0, 1, 2, 3].map((row) => (
          <div className="admin-loading-row" key={row}>
            <span className="admin-skeleton" /><span className="admin-skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminWorkspaceLoading() {
  return (
    <div className="admin-layout">
      <div className="admin-mobile-bar" aria-hidden="true">
        <span className="admin-wordmark"><ChurchMark size={40} /> Summit <span>workspace</span></span>
      </div>
      <aside className="admin-sidebar" aria-hidden="true">
        <div className="admin-brand">
          <ChurchMark size={56} />
          <span>Hiwot Birhan<small>Summit workspace</small></span>
        </div>
        <div className="admin-loading-nav">
          {[0, 1, 2, 3, 4, 5, 6].map((item) => <span key={item} className="admin-skeleton" />)}
        </div>
      </aside>
      <main className="admin-main"><AdminPageLoading /></main>
    </div>
  );
}
