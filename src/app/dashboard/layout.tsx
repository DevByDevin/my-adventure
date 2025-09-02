import { ReactNode } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-gray-50'>
        <main className='p-6 lg:p-8'>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
