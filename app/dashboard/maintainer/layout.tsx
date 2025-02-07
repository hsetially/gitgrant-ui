'use client'

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MaintainerProvider } from '@/contexts/MaintainerContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MaintainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MaintainerProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </MaintainerProvider>
    </QueryClientProvider>
  );
}