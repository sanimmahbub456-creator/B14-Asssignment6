export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#090909]">
      <div className="text-center">
        <div className="loading-spinner mx-auto" />

        <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-[#666]">
          Loading FitLog
        </p>
      </div>
    </main>
  );
}