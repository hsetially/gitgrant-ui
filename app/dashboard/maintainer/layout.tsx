import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function MaintainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}