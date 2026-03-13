import { Hero } from "@/components/sections/Hero";
import { SchemaAnime } from "@/components/sections/SchemaAnime";
import { Chiffres } from "@/components/sections/Chiffres";
import { Offres } from "@/components/sections/Offres";
import { Sprint } from "@/components/sections/Sprint";
import { Temoignages } from "@/components/sections/Temoignages";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <SchemaAnime />
      <Chiffres />
      <Offres />
      <Sprint />
      <Temoignages />
    </main>
  );
}
