"use client";

import { usePathname } from "next/navigation";
import { AuthGuard } from "@/components/shared/auth-guard";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/exams")) return "Online Test";
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  return "Dashboard";
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <AuthGuard requiredRole="employer">
      <div className="flex min-h-screen flex-col">
        <Navbar title={title} />
        <main className="flex flex-1 flex-col bg-[#f5f5f7]">{children}</main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
