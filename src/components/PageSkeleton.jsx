export function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-hidden="true">
      <div className="skeleton-layout">
        <section className="skeleton-profile">
          <span className="skeleton-block skeleton-avatar" />
          <div>
            <span className="skeleton-block skeleton-title" />
            <span className="skeleton-block skeleton-line" />
            <span className="skeleton-block skeleton-line skeleton-line-short" />
          </div>
        </section>
        <section className="skeleton-cards">
          <span className="skeleton-block" />
          <span className="skeleton-block" />
          <span className="skeleton-block" />
        </section>
      </div>
    </div>
  )
}
