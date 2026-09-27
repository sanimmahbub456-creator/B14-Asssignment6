"use client";

import Image from "next/image";
import Link from "next/link";

import { Clock3, Flame, Star } from "./icons";

import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
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

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Could not load workouts.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <main className="bg-[#090909]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="border-b border-[#292929] bg-[#090909]">
        <div className="container">
          <div
            className="
              grid
              items-center
              gap-8
              py-8
              sm:py-10
              md:grid-cols-[42%_58%]
              md:gap-4
              lg:gap-2
              lg:py-12
            "
          >
            {/* HERO TEXT */}
            <div className="order-1">
              <p
                className="
                  acid
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.3em]
                  sm:text-sm
                "
              >
                WORKOUT LIBRARY
              </p>

              <h1
                className="
                  display
                  mt-5
                  text-xl
                  font-black
                  uppercase
                  leading-[1]
                  sm:text-2xl
                  md:text-2xl
                  lg:text-3xl
                  xl:text-3xl
                "
              >
                TRAIN WITH INTENT. LOG
                <br />
                EVERY SET.
              </h1>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-sm
                  leading-6
                  text-[#999]
                  sm:text-base
                  sm:leading-7
                "
              >
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                it into today's plan, and watch the week's work add up.
              </p>

              <Link
                href="#library"
                className="
                  btn
                  btn-primary
                  mt-8
                  rounded-lg
                  px-6
                  py-4
                  text-xs
                "
              >
                BROWSE WORKOUTS
              </Link>
            </div>

            {/* COMPLETE HERO IMAGE */}
            <div className="order-2 flex items-center justify-center">
              <Image
                src="/banner.png"
                alt="FitLog workout"
                width={1000}
                height={600}
                priority
                sizes="(max-width: 767px) 100vw, 58vw"
                className="
                  block
                  h-auto
                  w-85 %
                  object-contain
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WORKOUT LIBRARY
      ========================================================= */}
      <section id="library" className="container py-10 md:py-14">
        {/* LIBRARY HEADER — NO HORIZONTAL LINE */}
        <div className="pb-2">
          <h2
            className="
              display
              text-2xl
              font-black
              uppercase
              leading-none
              sm:text-3xl
            "
          >
            THE LIBRARY
          </h2>

          <p className="mt-3 text-sm text-[#777]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="loading-spinner mx-auto" />

              <p
                className="
                  mt-5
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-[#666]
                "
              >
                Loading workouts
              </p>
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div
            className="
              mt-8
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              px-6
              py-12
              text-center
            "
          >
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* WORKOUT CARDS */}
        {!loading && !error && (
          <div
            className="
              mt-8
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {workouts.map((workout) => (
              <article
                key={workout.id}
                className="
                  workout-card
                  overflow-hidden
                  rounded-2xl
                "
              >
                {/* CARD IMAGE */}
                <Link
                  href={`/workout/${workout.id}`}
                  className="block"
                >
                  <div
                    className="
                      relative
                      aspect-[16/10]
                      overflow-hidden
                      bg-[#151515]
                    "
                  >
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-300
                        hover:scale-105
                      "
                    />
                  </div>
                </Link>

                {/* CARD CONTENT */}
                <div className="p-5">
                  {/* MUSCLE TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups
                      .slice(0, 2)
                      .map((group) => (
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

                  {/* WORKOUT NAME */}
                  <Link href={`/workout/${workout.id}`}>
                    <h3
                      className="
                        mt-4
                        text-xl
                        font-black
                        uppercase
                        leading-tight
                        text-white
                        transition
                        hover:text-[var(--acid)]
                      "
                    >
                      {workout.name}
                    </h3>
                  </Link>

                  {/* EQUIPMENT */}
                  <p className="mt-2 text-xs text-[#777]">
                    {workout.equipment}
                  </p>

                  {/* STATS */}
                  <div className="mt-5 flex flex-wrap gap-5">
                    {/* DURATION */}
                    <div className="flex items-center gap-2 text-xs text-[#999]">
                      <Clock3
                        size={15}
                        className="text-blue-400"
                      />
                      <span>{workout.duration} min</span>
                    </div>

                    {/* CALORIES */}
                    <div className="flex items-center gap-2 text-xs text-[#999]">
                      <Flame
                        size={15}
                        className="text-orange-400"
                      />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-2 text-xs text-[#999]">
                      <Star
                        size={15}
                        className="text-yellow-400"
                      />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}