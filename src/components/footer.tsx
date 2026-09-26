import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#292929] bg-[#070707]">
      <div className="container flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">

        {/* Logo + FITLOG */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />

          <span className="text-lg font-black uppercase tracking-tight text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#666] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}