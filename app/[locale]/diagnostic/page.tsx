import { DiagnosticWizard } from "@/components/diagnostic/DiagnosticWizard";

export const metadata = {
  title: "Auto-Diagnostic IA — Hoptisens",
  description:
    "Découvrez en 2 minutes les projets IA les plus impactants pour votre entreprise.",
};

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-bg">
      <DiagnosticWizard />
    </main>
  );
}
