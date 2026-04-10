import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <div className="flex h-16 items-center bg-white px-6">
          <Image
            src="/logo.svg"
            alt="Akij Resource"
            width={140}
            height={40}
            className="w-[140px] h-auto"
            priority
          />
          <div className="flex-1 text-center">
            <span className="text-lg font-bold text-gray-800">
              Akij Resource
            </span>
          </div>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign Up
          </Link>
        </div>
        <div className="h-[3px] bg-gradient-to-r from-violet-600 to-indigo-600" />
      </header>

      <main className="flex flex-1 items-center justify-center bg-[#f5f5f7] px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
