import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin - Coffee Shop',
  description: 'Coffee shop admin panel',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center gap-2 text-amber-500 font-bold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Coffee Shop</span>
              </a>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 text-sm">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/admin/menu"
                className="text-sm text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                Menu
              </a>
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}