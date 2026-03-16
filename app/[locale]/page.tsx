import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Chiffres } from "@/components/sections/Chiffres";
import { Offres } from "@/components/sections/Offres";
import { Calculateur } from "@/components/sections/Calculateur";
import { Sprint } from "@/components/sections/Sprint";
import { Temoignages } from "@/components/sections/Temoignages";

const SchemaAnime = dynamic(
  () => import("@/components/sections/SchemaAnime").then((mod) => ({ default: mod.SchemaAnime })),
  { loading: () => <div className="h-96 animate-pulse bg-[var(--color-surface)] rounded-2xl mx-6" /> }
);

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Suspense fallback={<div className="h-96 animate-pulse bg-[var(--color-surface)] rounded-2xl mx-6" />}>
        <SchemaAnime />
      </Suspense>
      <Chiffres />
      <Offres />
      <Calculateur />
      <Sprint />
      <Temoignages />
    </main>
  );
}
