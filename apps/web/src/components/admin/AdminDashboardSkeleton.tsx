export function AdminDashboardSkeleton() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-8 bg-zinc-800 rounded w-32" />
          <div className="h-10 bg-zinc-800 rounded w-40" />
        </div>
      </div>
      
      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 bg-zinc-800 rounded w-48" />
            <div className="h-4 bg-zinc-800 rounded w-64" />
          </div>
          <div className="h-10 bg-zinc-800 rounded w-40" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-xl p-6">
              <div className="h-4 bg-zinc-800 rounded w-24 mb-4" />
              <div className="h-8 bg-zinc-800 rounded w-32" />
            </div>
          ))}
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-zinc-900 rounded-xl p-6 h-80" />
          <div className="bg-zinc-900 rounded-xl p-6 h-80" />
        </div>
      </div>
    </div>
  );
}
