import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#090909] px-5">
      <div className="w-full max-w-2xl text-center">

        <p className="acid text-xs font-black tracking-[0.3em]">
          ERROR 404
        </p>

        <h1 className="display mt-5 text-7xl font-black uppercase leading-none sm:text-8xl md:text-9xl">
          LOST REP
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#777] sm:text-base">
          This workout or page could not be found.
          Head back to the library and keep training.
        </p>

        <Link
          href="/"
          className="btn btn-primary mt-8 rounded-lg px-6 py-4 text-xs"
        >
          Back to workouts
        </Link>

      </div>
    </main>
  );
}