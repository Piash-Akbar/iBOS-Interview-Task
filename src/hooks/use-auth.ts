"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function useAuth(requiredRole?: string) {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.replace("/");
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      router.replace("/");
    }
  }, [isAuthenticated, token, user, requiredRole, router]);

  return { user, isAuthenticated, token };
}
