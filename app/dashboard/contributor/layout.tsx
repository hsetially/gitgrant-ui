'use client'

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ContributorProvider } from '@/contexts/ContributorContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContributorProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </ContributorProvider>
    </QueryClientProvider>
  );
}