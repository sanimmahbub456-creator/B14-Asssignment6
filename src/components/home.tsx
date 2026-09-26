"use client"; 
 
import Image from "next/image"; 
import Link from "next/link"; 
 
import { 
  ArrowRight, 
  Clock3, 
  Flame, 
  Star, 
} from "./icons"; 
 
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
      {/* ================= HERO ================= */} 
 
      <section className="border-b border-[#292929]"> 
        <div className="container grid gap-8 py-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20"> 
          <div> 
            <p className="acid text-xs font-black uppercase tracking-[0.3em]"> 
              WORKOUT LIBRARY 
            </p> 
 
            <h1 className="display mt-3 text-2xl font-black uppercase leading-[0.9] sm:text-3xl lg:text-4xl"> 
              TRAIN WITH INTENT. LOG 
              <br /> 
              EVERY SET. 
            </h1> 
 
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#888] sm:text-base"> 
              A focused workout library built for people who train with 
              purpose. Find the right lift, learn the movement, and build 
              today's plan. 
            </p> 
 
            <Link 
              href="#library" 
              className="btn btn-primary mt-8 rounded-lg px-6 py-4 text-xs" 
            > 
              BROWSE WORKOUTS 
              <ArrowRight size={16} /> 
            </Link> 
          </div> 
 
          <div className="relative flex min-h-[160px] items-center justify-center overflow-hidden bg-[#151515] sm:min-h-[240px] lg:min-h-[360px]"> 
            <Image 
              src="/banner.png" 
              alt="FitLog workout" 
              width={900} 
              height={600} 
              className="h-auto max-h-[160px] w-auto max-w-[90%] object-contain sm:max-h-[200px] lg:max-h-[240px]" 
              priority 
            /> 
          </div> 
        </div> 
      </section> 
 
      {/* ================= LIBRARY ================= */} 
 
      <section 
        id="library" 
        className="container py-10 md:py-14" 
      > 
        <div className="border-b border-[#292929] pb-6"> 
          <div> 
            <h2 className="display text-2xl font-black uppercase leading-none sm:text-3xl lg:text-3xl"> 
              THE LIBRARY 
            </h2> 
 
            <p className="mt-3 text-sm text-[#777]"> 
              Twelve lifts covering every major muscle group. 
            </p> 
          </div> 
        </div> 
 
        {/* ================= LOADING ================= */} 
 
        {loading && ( 
          <div className="flex min-h-[300px] items-center justify-center"> 
            <div className="text-center"> 
              <div className="loading-spinner mx-auto" /> 
 
              <p className="mt-5 text-xs font-black uppercase tracking-[0.25em] text-[#666]"> 
                Loading workouts 
              </p> 
            </div> 
          </div> 
        )} 
 
        {/* ================= ERROR ================= */} 
 
        {!loading && error && ( 
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center"> 
            <p className="text-sm text-red-300"> 
              {error} 
            </p> 
          </div> 
        )} 
 
        {/* ================= WORKOUT GRID ================= */} 
 
        {!loading && !error && ( 
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"> 
            {workouts.map((workout) => ( 
              <Link 
                key={workout.id} 
                href={`/workout/${workout.id}`} 
                className="workout-card overflow-hidden rounded-2xl" 
              > 
                {/* IMAGE */} 
 
                <div className="relative aspect-[16/10] overflow-hidden bg-[#151515]"> 
                  <img 
                    src={workout.image} 
                    alt={workout.name} 
                    className="h-full w-full object-cover transition duration-300 hover:scale-105" 
                  /> 
                </div> 
 
                {/* CONTENT */} 
 
                <div className="p-5"> 
                  {/* TAGS */} 
 
                  <div className="flex flex-wrap gap-2"> 
                    {workout.muscleGroups 
                      .slice(0, 2) 
                      .map((group) => ( 
                        <span 
                          key={group} 
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase ${getTagClass( 
                            group 
                          )}`} 
                        > 
                          {group} 
                        </span> 
                      ))} 
                  </div> 
 
                  {/* TITLE */} 
 
                  <h3 className="mt-4 text-xl font-black uppercase leading-tight text-white"> 
                    {workout.name} 
                  </h3> 
 
                  {/* EQUIPMENT */} 
 
                  <p className="mt-2 text-xs text-[#777]"> 
                    {workout.equipment} 
                  </p> 
 
                  {/* STATS */} 
 
                  <div className="mt-5 flex flex-wrap gap-5 border-t border-[#292929] pt-4"> 
                    <div className="flex items-center gap-2 text-xs text-[#999]"> 
                      <Clock3 
                        size={15} 
                        className="text-blue-400" 
                      /> 
                      <span> 
                        {workout.duration} min 
                      </span> 
                    </div> 
 
                    <div className="flex items-center gap-2 text-xs text-[#999]"> 
                      <Flame 
                        size={15} 
                        className="text-orange-400" 
                      /> 
                      <span> 
                        {workout.caloriesBurned} kcal 
                      </span> 
                    </div> 
 
                    <div className="flex items-center gap-2 text-xs text-[#999]"> 
                      <Star 
                        size={15} 
                        className="text-yellow-400" 
                      /> 
                      <span> 
                        {workout.rating} 
                      </span> 
                    </div> 
                  </div> 
 
                  {/* VIEW DETAILS */} 
 
                  <div className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white"> 
                    View Details 
                    <ArrowRight size={14} /> 
                  </div> 
                </div> 
              </Link> 
            ))} 
          </div> 
        )} 
      </section> 
    </main> 
  ); 
}