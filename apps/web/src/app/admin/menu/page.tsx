import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Menu Management | Coffee Shop Admin',
  description: 'Manage coffee shop menu items',
};

export default function MenuManagementPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Menu Management</h1>
            <p className="text-zinc-400 text-sm mt-1">Add, edit, and organize your menu items</p>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">Menu Management Coming Soon</h2>
          <p className="text-zinc-500 max-w-md mx-auto">
            This feature is under development. You'll be able to manage your coffee shop menu items here.
          </p>
        </div>
      </div>
    </main>
  );
}
