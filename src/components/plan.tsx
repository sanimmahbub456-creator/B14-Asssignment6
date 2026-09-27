"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "./icons";

import { useStore } from "./store";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function Plan() {
  const { plan, saved, removePlan, removeSaved, markDone } = useStore();

  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const activeWorkouts = tab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    const workouts = [...activeWorkouts];

    if (sortBy === "duration") {
      return workouts.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      return workouts.sort(
        (a, b) => b.caloriesBurned - a.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      return workouts.sort((a, b) => b.rating - a.rating);
    }

    return workouts;
  }, [activeWorkouts, sortBy]);

  /* Metrics follow the currently selected tab */
  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = activeWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#090909] py-10 md:py-14">
      <div className="container">
        {/* PAGE HEADER */}
        <div className="border-b border-[#292929] pb-8">
          <h1 className="display text-2xl font-black uppercase leading-none sm:text-3xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#777]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* METRICS */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <Metric
            label="Exercises"
            value={activeWorkouts.length}
          />

          <Metric
            label="Minutes"
            value={totalMinutes}
          />

          <Metric
            label="Calories"
            value={totalCalories}
          />
        </div>

        {/* TABS */}
        <div className="mt-10 flex gap-2 border-b border-[#292929]">
          <button
            type="button"
            onClick={() => setTab("plan")}
            className={`border-b-2 px-4 py-3 text-xs font-black uppercase tracking-wider ${
              tab === "plan"
                ? "border-[var(--acid)] text-white"
                : "border-transparent text-[#666] hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            type="button"
            onClick={() => setTab("saved")}
            className={`border-b-2 px-4 py-3 text-xs font-black uppercase tracking-wider ${
              tab === "saved"
                ? "border-[var(--acid)] text-white"
                : "border-transparent text-[#666] hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* SORT */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#777]">
            {tab === "plan" ? "Today's Plan" : "Saved Workouts"}
          </p>

          <div className="relative flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#777]">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-lg border border-[#444] bg-[#111] px-4 py-3 pr-10 text-xs font-black uppercase tracking-wider text-white outline-none transition hover:border-[#777] focus:border-[var(--acid)]"
                aria-label="Sort workouts"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#777]"
              />
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {activeWorkouts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#292929] bg-[#111] px-6 py-20 text-center">
            <h2 className="display text-2xl font-black uppercase leading-none text-white sm:text-3xl">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#777]">
              Browse the library and add a lift to get today's plan moving.
            </p>

            <Link
              href="/"
              className="btn btn-primary mt-7 rounded-lg px-5 py-3 text-xs"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* WORKOUT LIST */}
        {sortedWorkouts.length > 0 && (
          <div className="mt-8 space-y-4">
            {sortedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="card overflow-hidden rounded-2xl"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* IMAGE */}
                  <div className="h-48 w-full shrink-0 sm:h-auto sm:w-56">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* TITLE + ACTIONS */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      {/* WORKOUT INFO */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          {workout.muscleGroups
                            .slice(0, 3)
                            .map((group) => (
                              <span
                                key={group}
                                className="tag rounded-full px-2.5 py-1 text-[9px] font-black uppercase"
                              >
                                {group}
                              </span>
                            ))}
                        </div>

                        <h2 className="mt-3 text-xl font-black uppercase leading-tight">
                          {workout.name}
                        </h2>

                        <p className="mt-1 text-xs text-[#777]">
                          {workout.equipment}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex w-full items-center gap-2 sm:w-auto">
                        {/* VIEW DETAILS */}
                        <Link
                          href={`/workout/${workout.id}`}
                          className="btn btn-dark flex-1 rounded-lg px-3 py-3 text-[10px] sm:flex-none sm:px-4 sm:text-xs"
                        >
                          View Details
                        </Link>

                        {/* MARK AS DONE — PLAN ONLY */}
                        {tab === "plan" && (
                          <button
                            type="button"
                            onClick={() => markDone(workout.id)}
                            className="btn btn-primary flex-1 rounded-lg px-3 py-3 text-[10px] sm:flex-none sm:px-4 sm:text-xs"
                          >
                            <Check size={15} />
                            <span>Mark as Done</span>
                          </button>
                        )}

                        {/* REMOVE */}
                        <button
                          type="button"
                          onClick={() =>
                            tab === "plan"
                              ? removePlan(workout.id)
                              : removeSaved(workout.id)
                          }
                          className="shrink-0 rounded-lg border border-[#292929] p-3 text-[#777] transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                          aria-label={`Remove ${workout.name}`}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>

                    {/* STATS */}
                    <div className="mt-5 flex flex-wrap gap-5 pt-4">
                      <div className="flex items-center gap-2 text-xs text-[#999]">
                        <Clock3 size={15} />
                        <span>{workout.duration} min</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#999]">
                        <Flame size={15} />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#999]">
                        <Star size={15} />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/* METRIC */
function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="card rounded-xl p-4 sm:p-5">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#666]">
        {label}
      </p>

      <p className="display mt-2 text-3xl font-black sm:text-4xl">
        {value}
      </p>
    </div>
  );
}