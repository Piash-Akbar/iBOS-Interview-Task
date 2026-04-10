"use client";

import { AuthGuard } from "@/components/shared/auth-guard";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="candidate">
      <div className="flex min-h-screen flex-col">
        <Navbar title="Akij Resource" />
        <main className="flex flex-1 flex-col bg-[#f5f5f7]">{children}</main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
