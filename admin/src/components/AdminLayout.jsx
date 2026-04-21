import { SidebarProvider, SidebarTrigger } from './ui/sidebar';

import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { ErrorAlert } from './ui/alert';
import { DashboardSkeleton } from './ui/skeleton';

export function AdminLayout() {
  const { isLoading, error } = useAuth();
  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorAlert message={error.message || 'Server error'} />;
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-6 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
