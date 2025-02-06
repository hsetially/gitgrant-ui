import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}