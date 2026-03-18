"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DiagnosticIntro } from "./DiagnosticIntro";
import { DiagnosticLoading } from "./DiagnosticLoading";
import { DiagnosticResults } from "./DiagnosticResults";
import { ProgressBar } from "./ProgressBar";
import { StepProfile } from "./steps/StepProfile";
import { StepCompany } from "./steps/StepCompany";
import { StepTools } from "./steps/StepTools";
import { StepPainPoints } from "./steps/StepPainPoints";
import { StepMaturity } from "./steps/StepMaturity";
import type { DiagnosticInput, DiagnosticResult, WizardStep } from "@/lib/diagnostic/types";

export function DiagnosticWizard() {
  const [step, setStep] = useState<WizardStep>(0);
  const [data, setData] = useState<Partial<DiagnosticInput>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = useCallback((partial: Partial<DiagnosticInput>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const canGoNext = (): boolean => {
    switch (step) {
      case 1: return !!data.role && !!data.sector;
      case 2: return !!data.companySize && !!data.department;
      case 3: return (data.tools?.length ?? 0) >= 1;
      case 4: return (data.painPoints?.length ?? 0) >= 1 && !!data.priorityPainPoint;
      case 5: return !!data.maturity && !!data.timeHorizon;
      default: return true;
    }
  };

  const goNext = () => {
    if (step === 5) {
      submitDiagnostic();
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5) as WizardStep);
  };

  const goBack = () => {
    setStep((prev) => Math.max(prev - 1, 0) as WizardStep);
  };

  const submitDiagnostic = async () => {
    setIsLoading(true);
    setError(null);
    setStep(0); // Will show loading screen

    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur lors du diagnostic");
      }

      const diagnosticResult: DiagnosticResult = await res.json();
      setResult(diagnosticResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setStep(5); // Go back to last step
    } finally {
      setIsLoading(false);
    }
  };

  const restart = () => {
    setStep(0);
    setData({});
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  // Loading state
  if (isLoading) {
    return <DiagnosticLoading />;
  }

  // Results state
  if (result) {
    return (
      <DiagnosticResults
        result={result}
        input={data as DiagnosticInput}
        onRestart={restart}
      />
    );
  }

  // Intro state
  if (step === 0) {
    return <DiagnosticIntro onStart={() => setStep(1)} />;
  }

  // Wizard steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepProfile data={data} onChange={updateData} />;
      case 2:
        return <StepCompany data={data} onChange={updateData} />;
      case 3:
        return <StepTools data={data} onChange={updateData} />;
      case 4:
        return <StepPainPoints data={data} onChange={updateData} />;
      case 5:
        return <StepMaturity data={data} onChange={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 md:py-12 px-4">
      <ProgressBar currentStep={step} />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/20 text-warning text-sm">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={goBack}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>

        <Button
          onClick={goNext}
          disabled={!canGoNext()}
          className="gap-2"
        >
          {step === 5 ? "Voir mes résultats" : "Suivant"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
