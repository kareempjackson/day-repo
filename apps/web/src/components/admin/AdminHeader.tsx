import Link from 'next/link';

export function AdminHeader() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <span className="font-bold text-lg text-zinc-100">Coffee Admin</span>
        </div>
        
        <nav className="flex items-center gap-2">
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-zinc-100 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/menu"
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            Menu Management
          </Link>
        </nav>
      </div>
    </header>
  );
}
