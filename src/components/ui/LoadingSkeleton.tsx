/**
 * Loading skeleton components for async data
 * Improves perceived performance and UX
 */

export function CardSkeleton() {
  return (
    <div className="bg-panel border border-border p-6 animate-pulse">
      <div className="h-4 bg-border rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-border rounded w-1/2"></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full animate-pulse">
      <div className="flex gap-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-border rounded flex-1"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 mb-3">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-12 bg-border rounded flex-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-64 bg-panel border border-border p-6 animate-pulse">
      <div className="h-4 bg-border rounded w-1/3 mb-8"></div>
      <div className="flex items-end justify-between h-40 gap-2">
        {[40, 80, 60, 90, 70, 50].map((height, i) => (
          <div
            key={i}
            className="bg-border rounded-t w-full"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function LeadDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-border rounded w-1/3"></div>
      <div className="h-4 bg-border rounded w-1/4 mb-8"></div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-3 bg-border rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-border rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse p-8">
      <div className="h-12 bg-border rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-border rounded w-1/2 mb-12"></div>

      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-border rounded"></div>
        ))}
      </div>
    </div>
  );
}
