import { Suspense } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminDashboardSkeleton } from '@/components/admin/AdminDashboardSkeleton';

export const metadata = {
  title: 'Admin Dashboard | Coffee Shop',
  description: 'Coffee shop administration dashboard',
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </main>
  );
}
