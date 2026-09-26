import { notFound } from "next/navigation";

import Detail from "@/components/detail";
import { getWorkout } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#090909]">
      <Detail w={workout} />
    </main>
  );
}