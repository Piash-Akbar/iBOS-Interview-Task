import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1e293b] text-white py-4 px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Powered by</span>
          <Image
            src="/logo-white.svg"
            alt="Akij Resource"
            width={120}
            height={32}
            className="w-[120px] h-auto"
          />
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-300">Helpline</span>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-gray-300" />
            <span>+88 011020202505</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-gray-300" />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
