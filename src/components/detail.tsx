"use client";

import Link from "next/link";

import { useStore } from "./store";
import { Bookmark, Check } from "./icons";

import { Workout } from "@/lib/types";

function getTagClass(group: string) {
  const value = group.toLowerCase();

  if (value.includes("chest")) {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }

  if (value.includes("back")) {
    return "border-blue-500/30 bg-blue-500/10 text-blue-300";
  }

  if (value.includes("leg")) {
    return "border-green-500/30 bg-green-500/10 text-green-300";
  }

  if (value.includes("arm")) {
    return "border-purple-500/30 bg-purple-500/10 text-purple-300";
  }

  if (value.includes("shoulder")) {
    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }

  if (value.includes("core")) {
    return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
  }

  if (value.includes("abs")) {
    return "border-orange-500/30 bg-orange-500/10 text-orange-300";
  }

  return "border-[#3a3a3a] bg-[#161616] text-[#cfcfcf]";
}

export default function Detail({ w }: { w: Workout }) {
  const { addPlan, addSaved, plan, saved } = useStore();

  const inPlan = plan.some((item) => item.id === w.id);
  const isSaved = saved.some((item) => item.id === w.id);
  const planFull = plan.length >= 5;

  return (
    <main className="container py-7 sm:py-9 md:py-12">
      {/* BACK */}
      <Link
        href="/"
        className="
          inline-flex
          text-xs
          font-black
          uppercase
          tracking-[0.2em]
          text-[#777]
          transition
          hover:text-white
        "
      >
        ← Back to library
      </Link>

      {/* MAIN CONTENT */}
      <div
        className="
          mt-5
          grid
          items-start
          gap-6
          lg:grid-cols-[0.92fr_1.08fr]
          lg:gap-8
        "
      >
        {/* =====================================================
            IMAGE
        ===================================================== */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#292929]
            bg-[#111]
            lg:sticky
            lg:top-24
          "
        >
          <div className="aspect-[4/5]">
            <img
              src={w.image}
              alt={w.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* =====================================================
            DETAILS
        ===================================================== */}
        <div className="min-w-0">
          {/* TITLE */}
          <h1
            className="
              text-2xl
              font-bold
              uppercase
              leading-tight
              sm:text-3xl
              lg:text-4xl
            "
          >
            {w.name}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-[#999]
            "
          >
            {w.description}
          </p>

          {/* MUSCLE TAGS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {w.muscleGroups.map((group) => (
              <span
                key={group}
                className={`
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[9px]
                  font-black
                  uppercase
                  ${getTagClass(group)}
                `}
              >
                {group}
              </span>
            ))}
          </div>

          {/* =================================================
              WORKOUT INFORMATION
              SIMPLE / SINGLE COLUMN
          ================================================= */}
          <div className="mt-5">
            <Spec label="Equipment" value={w.equipment} />
            <Spec label="Difficulty" value={w.difficulty} />
            <Spec label="Sets" value={String(w.sets)} />
            <Spec label="Reps" value={w.reps} />
            <Spec label="Duration" value={`${w.duration} min`} />
            <Spec
              label="Calories"
              value={`${w.caloriesBurned} kcal`}
            />
            <Spec label="Rating" value={w.rating.toString()} />
          </div>

          {/* =================================================
              INSTRUCTIONS
          ================================================= */}
          <div className="mt-6">
            <h2
              className="
                text-xl
                font-black
                uppercase
                tracking-tight
                text-[#999]
                sm:text-2xl
              "
            >
              Instructions
            </h2>

            <ol className="mt-3 space-y-2">
              {w.instructions.map((instruction, index) => (
                <li
                  key={`${w.id}-${index}`}
                  className="
                    flex
                    items-start
                    gap-3
                    text-xs
                    leading-5
                    text-[#999]
                  "
                >
                  <span
                    className="
                      w-6
                      shrink-0
                      pt-0.5
                      text-[10px]
                      font-black
                      text-[#999]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}
          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-2.5
              sm:grid-cols-2
            "
          >
            {/* ADD TO PLAN */}
            <button
              type="button"
              disabled={planFull && !inPlan}
              onClick={() => addPlan(w)}
              className="
                btn
                btn-primary
                min-h-11
                w-full
                rounded-lg
                px-3
                py-2.5
                text-[11px]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Check
                size={15}
                className="shrink-0"
              />

              <span className="text-center">
                {inPlan
                  ? "Already in today's plan"
                  : "Add to today's plan"}
              </span>
            </button>

            {/* SAVE */}
            <button
              type="button"
              onClick={() => addSaved(w)}
              className="
                btn
                btn-dark
                min-h-11
                w-full
                rounded-lg
                px-3
                py-2.5
                text-[11px]
              "
            >
              <Bookmark
                size={15}
                className="shrink-0"
              />

              <span className="text-center">
                {isSaved ? "Saved" : "Save for later"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   SIMPLE SPECIFICATION ROW
============================================================= */

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-6 py-1.5 text-sm">
      <span
        className="
          w-24
          shrink-0
          text-[10px]
          font-black
          uppercase
          tracking-wider
          text-[#777]
        "
      >
        {label}
      </span>

      <span className="text-sm font-medium text-[#999]">
        {value}
      </span>
    </div>
  );
}