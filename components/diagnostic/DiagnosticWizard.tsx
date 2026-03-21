"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
import { ROLE_LABELS, SECTOR_LABELS, PAIN_POINT_LABELS } from "@/lib/diagnostic/catalog";

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function DiagnosticWizard() {
  const [step, setStep] = useState<WizardStep>(0);
  const [data, setData] = useState<Partial<DiagnosticInput>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempId, setTempId] = useState<string | null>(null);
  const startTimeRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  const updateData = useCallback((partial: Partial<DiagnosticInput>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const saveToAirtable = useCallback(async (currentStep: WizardStep, isFinal: boolean = false) => {
    if (!tempId || currentStep < 1) return;

    const payload: Record<string, unknown> = {
      tempId,
      currentStep: Number(currentStep),
    };

    if (currentStep >= 1) {
      if (data.role) payload.role = ROLE_LABELS[data.role] || data.role;
      if (data.roleOther) payload.roleOther = data.roleOther;
      if (data.sector) payload.sector = SECTOR_LABELS[data.sector] || data.sector;
      if (data.sectorOther) payload.sectorOther = data.sectorOther;
    }

    if (currentStep >= 2) {
      if (data.companySize) payload.companySize = data.companySize;
      if (data.department) payload.department = data.department;
    }

    if (currentStep >= 3) {
      if (data.tools && data.tools.length > 0) payload.tools = data.tools;
      if (data.toolsOther) payload.toolsOther = data.toolsOther;
    }

    if (currentStep >= 4) {
      if (data.painPoints && data.painPoints.length > 0) {
        payload.painPoints = data.painPoints.map(pp => PAIN_POINT_LABELS[pp]?.label || pp);
      }
      if (data.priorityPainPoint) {
        payload.priorityPainPoint = PAIN_POINT_LABELS[data.priorityPainPoint]?.label || data.priorityPainPoint;
      }
      if (data.painPointDescription) payload.painPointDescription = data.painPointDescription;
    }

    if (currentStep >= 5) {
      if (data.maturity) payload.maturity = data.maturity;
      if (data.timeHorizon) payload.timeHorizon = data.timeHorizon;
    }

    if (isFinal) {
      const endTime = new Date().toISOString();
      payload.status = 'Terminé';
      payload.endTime = endTime;
      
      if (startTimeRef.current) {
        const start = new Date(startTimeRef.current).getTime();
        const end = new Date(endTime).getTime();
        payload.durationSeconds = Math.round((end - start) / 1000);
      }
    }

    try {
      await fetch('/api/diagnostics', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Failed to save to Airtable:', err);
    }
  }, [tempId, data]);

  useEffect(() => {
    if (step >= 1 && step <= 5 && tempId && isInitializedRef.current) {
      saveToAirtable(step, step === 5);
    }
  }, [step, tempId, saveToAirtable]);

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

  const goNext = async () => {
    if (step === 0) {
      const newTempId = generateUUID();
      const startTime = new Date().toISOString();
      setTempId(newTempId);
      startTimeRef.current = startTime;

      const initialData: Record<string, unknown> = {
        tempId: newTempId,
        currentStep: 1,
        startTime,
        status: 'En cours',
      };

      if (data.role) initialData.role = ROLE_LABELS[data.role as string] || data.role;
      if (data.roleOther) initialData.roleOther = data.roleOther;
      if (data.sector) initialData.sector = SECTOR_LABELS[data.sector as string] || data.sector;
      if (data.sectorOther) initialData.sectorOther = data.sectorOther;

      try {
        await fetch('/api/diagnostics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(initialData),
        });
      } catch (err) {
        console.warn('Failed to create diagnostic in Airtable:', err);
      }

      isInitializedRef.current = true;
    }

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
    setStep(0);

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

      if (tempId) {
        await saveToAirtable(5, true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setStep(5);
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
    setTempId(null);
    startTimeRef.current = null;
    isInitializedRef.current = false;
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
