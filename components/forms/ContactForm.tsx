"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const categories = [
  { id: "Audit", label: "Audit" },
  { id: "Conception agent", label: "Conception d'Agent IA" },
  { id: "Formation", label: "Formation" },
  { id: "Workshop", label: "Workshop" },
  { id: "Autre", label: "Autre" },
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      if (typeof result.error === "string") {
        setError(result.error);
      } else if (result.error) {
        setFormErrors(result.error as any);
      }
    }
  }

  if (success) {
    return (
      <Card className="p-8 border-success/20 bg-success/5 flex flex-col items-center justify-center text-center">
        <div className="p-3 rounded-full bg-success/20 text-success mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif text-text-primary mb-2">Message envoyé !</h3>
        <p className="text-text-secondary text-sm">
          Merci pour votre intérêt. Un expert Hoptisens reviendra vers vous très rapidement.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 border-border/40 bg-surface">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-text-primary">Prénom</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              required 
              className="w-full h-11 px-4 rounded-xl bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-colors"
            />
            {formErrors.firstName && <p className="text-xs text-error mt-0.5">{formErrors.firstName[0]}</p>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-sm font-medium text-text-primary">NOM</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              required 
              className="w-full h-11 px-4 rounded-xl bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-colors"
            />
            {formErrors.lastName && <p className="text-xs text-error mt-0.5">{formErrors.lastName[0]}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="company" className="text-sm font-medium text-text-primary">Nom entreprise</label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            required 
            className="w-full h-11 px-4 rounded-xl bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-colors"
          />
          {formErrors.company && <p className="text-xs text-error mt-0.5">{formErrors.company[0]}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-text-primary">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full h-11 px-4 rounded-xl bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-colors"
          />
          {formErrors.email && <p className="text-xs text-error mt-0.5">{formErrors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-text-primary">Intéressé par :</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer p-2 rounded-lg border border-transparent hover:border-border hover:bg-bg/50">
                <input 
                  type="checkbox" 
                  name="categorie" 
                  value={cat.id} 
                  className="rounded border-border text-accent focus:ring-accent cursor-pointer w-4 h-4 bg-transparent"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
          {formErrors.categorie && <p className="text-xs text-error mt-0.5">{formErrors.categorie[0]}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-medium text-text-primary">Votre Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            required 
            className="w-full p-4 rounded-xl bg-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-colors resize-none"
          ></textarea>
          {formErrors.message && <p className="text-xs text-error mt-0.5">{formErrors.message[0]}</p>}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 flex items-center gap-2 text-error text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-accent hover:bg-accent/90 text-white font-medium cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>
      </form>
    </Card>
  );
}
