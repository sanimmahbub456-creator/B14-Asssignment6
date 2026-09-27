import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* SPACE FOR FIXED FOOTER */}
      <div className="h-[82px]" />

      {/* FIXED FOOTER */}
      <footer
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-40
          border-t
          border-[#292929]
          bg-[#070707]
          shadow-[0_-8px_30px_rgba(0,0,0,0.35)]
        "
      >
        <div
          className="
            container
            flex
            min-h-[82px]
            flex-col
            items-center
            justify-center
            gap-3
            py-4
            sm:flex-row
            sm:justify-between
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="FitLog Home"
          >
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />

            <span className="text-base font-black uppercase tracking-tight text-white">
              FITLOG
            </span>
          </Link>

          {/* COPYRIGHT */}
          <p className="text-center text-[11px] text-[#666] sm:text-right">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </footer>
    </>
  );
}