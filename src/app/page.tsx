import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f7]">
      <div className="flex flex-col items-center gap-8 rounded-xl bg-white p-12 shadow-sm">
        <Image
          src="/logo.png"
          alt="Akij Resource"
          width={180}
          height={60}
          className="h-auto"
          priority
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Online Assessment Platform
        </h1>
        <p className="max-w-sm text-center text-gray-500">
          Welcome to the Akij Resource assessment platform. Please select your
          login type to continue.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/employer/login"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Employer Login
          </Link>
          <Link
            href="/candidate/login"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Candidate Login
          </Link>
        </div>
      </div>
    </div>
  );
}
