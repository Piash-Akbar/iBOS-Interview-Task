"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole: string;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== requiredRole) {
      const loginPath =
        requiredRole === "employer"
          ? "/employer/login"
          : "/candidate/login";
      router.replace(loginPath);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
