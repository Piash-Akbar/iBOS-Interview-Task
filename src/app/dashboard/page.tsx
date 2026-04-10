"use client";

import { useAuthStore } from "@/stores/auth-store";
import { EmployerDashboard } from "@/components/employer/employer-dashboard";
import { CandidateDashboard } from "@/components/candidate/candidate-dashboard";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  if (user?.role === "employer") {
    return <EmployerDashboard />;
  }

  return <CandidateDashboard />;
}
