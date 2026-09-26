"use client";

import Link from "next/link";
import { useStore } from "./store";

import { Bookmark, Check } from "./icons";

import { Workout } from "@/lib/types";

export default function Detail({ w }: { w: Workout }) {
  const { addPlan, addSaved, plan, saved } = useStore();

  const inPlan = plan.some((item) => item.id === w.id);
  const isSaved = saved.some((item) => item.id === w.id);
  const planFull = plan.length >= 5;

  function handleAddPlan() {
    addPlan(w);
  }

  function handleSave() {
    addSaved(w);
  }

  return (
    <main className="container py-10 md:py-14">
      {/* ================= BACK ================= */}

      <Link
        href="/"
        className="inline-flex text-xs font-black uppercase tracking-[0.2em] text-[#777] transition hover:text-white"
      >
        ← Back to library
      </Link>

      <div className="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ================= IMAGE ================= */}

        <div className="overflow-hidden rounded-3xl border border-[#292929] bg-[#111] lg:sticky lg:top-24 lg:h-[calc(100vh-130px)]">
          <img
            src={w.image}
            alt={w.name}
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>

        {/* ================= DETAILS ================= */}

        <div className="py-2">
          {/* MUSCLE TAGS */}

          <div className="flex flex-wrap gap-2">
            {w.muscleGroups.map((group) => (
              <span
                key={group}
                className="tag rounded-full px-3 py-1 text-[10px] font-black uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          {/* TITLE */}

          <h1 className="mt-5 text-3xl font-bold uppercase leading-tight sm:text-4xl">
            {w.name}
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#999]">
            {w.description}
          </p>

          {/* ================= SPECIFICATIONS ================= */}

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#292929] bg-[#101010]">
            <Spec
              label="Equipment"
              value={w.equipment}
            />

            <Spec
              label="Difficulty"
              value={w.difficulty}
            />

            <Spec
              label="Sets"
              value={String(w.sets)}
            />

            <Spec
              label="Reps"
              value={w.reps}
            />

            <Spec
              label="Duration"
              value={`${w.duration} min`}
            />

            <Spec
              label="Calories"
              value={`${w.caloriesBurned} kcal`}
            />

            <Spec
              label="Rating"
              value={w.rating.toString()}
            />
          </div>

          {/* ================= INSTRUCTIONS ================= */}

          <div className="mt-10">
            <h2 className="display text-3xl font-black uppercase">
              Instructions
            </h2>

            <ol className="mt-5 space-y-3">
              {w.instructions.map(
                (instruction, index) => (
                  <li
                    key={`${w.id}-${index}`}
                    className="flex gap-4 rounded-xl border border-[#252525] bg-[#101010] p-4"
                  >
                    <span className="acid min-w-[28px] font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm leading-6 text-[#bbb]">
                      {instruction}
                    </span>
                  </li>
                )
              )}
            </ol>
          </div>

          {/* ================= ACTION BUTTONS ================= */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={planFull && !inPlan}
              onClick={handleAddPlan}
              className="btn btn-primary rounded-lg px-5 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={17} />
              Add to today's plan
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="btn btn-dark rounded-lg px-5 py-4 text-sm"
            >
              <Bookmark size={17} />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= SPECIFICATION ================= */

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#252525] px-5 py-4 last:border-b-0">
      <p className="text-xs font-black uppercase tracking-widest text-[#666]">
        {label}
      </p>

      <p className="text-right text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
}