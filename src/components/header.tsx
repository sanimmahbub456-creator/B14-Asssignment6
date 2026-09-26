"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bookmark,
  ClipboardList,
} from "./icons";

import { useStore } from "./store";

export default function Header() {
  const pathname = usePathname();
  const { plan, saved } = useStore();

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-[#222] bg-[#090909]/95 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-3 py-2">

        {/* Logo + FITLOG */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="FitLog Home"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />

          <span className="text-lg font-black uppercase tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              workoutActive
                ? "bg-white text-black"
                : "text-[#999] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              planActive
                ? "bg-white text-black"
                : "text-[#999] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[var(--acid)] px-3 py-2 text-xs font-black uppercase text-black transition hover:brightness-110"
          >
            <ClipboardList size={14} />

            <span className="hidden sm:inline">
              Plan
            </span>

            <span>{plan.length}</span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 rounded-full border border-[#444] px-3 py-2 text-xs font-black uppercase text-white transition hover:border-[#777]"
          >
            <Bookmark size={14} />

            <span className="hidden sm:inline">
              Saved
            </span>

            <span>{saved.length}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="container flex gap-2 pb-3 md:hidden">
        <Link
          href="/"
          className={`flex-1 rounded-lg border py-2 text-center text-xs font-black uppercase ${
            workoutActive
              ? "border-white bg-white text-black"
              : "border-[#292929] text-[#aaa]"
          }`}
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          className={`flex-1 rounded-lg border py-2 text-center text-xs font-black uppercase ${
            planActive
              ? "border-white bg-white text-black"
              : "border-[#292929] text-[#aaa]"
          }`}
        >
          My Plan
        </Link>
      </div>
    </header>
  );
}