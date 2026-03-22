"use client";

import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Link } from "@/lib/routing";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { FadeInUp } from "../ui/FadeInUp";
import { motion, Variants } from "framer-motion";

export function Hero() {
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
  };

  return (
    <Section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background decoration - Mesh gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[var(--color-bg)]">
        <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.15, 0.25, 0.15],
             rotate: [0, 90, 0]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-accent)] blur-[120px]" 
        />
        <motion.div 
           animate={{ 
             scale: [1, 1.5, 1],
             opacity: [0.1, 0.2, 0.1],
             x: [0, 50, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[var(--color-text-secondary)] blur-[120px]" 
        />
      </div>
      
      <Container className="text-center relative z-10">
        <FadeInUp>
          <Badge variant="accent" className="mb-6">L'IA opérationnelle pour les PME </Badge>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--color-text-primary)] tracking-tight mb-8 max-w-4xl mx-auto flex flex-wrap justify-center gap-x-[0.25em]"
          >
            <motion.span variants={wordVariants} className="inline-block">Multipliez</motion.span>
            <motion.span variants={wordVariants} className="inline-block">vos</motion.span>
            <motion.span variants={wordVariants} className="inline-block">Prospects</motion.span>
            <motion.span variants={wordVariants} className="inline-block underline decoration-accent text-accent text-3xl md:text-5xl lg:text-6xl">qualifiés,</motion.span>
            
            <div className="w-full h-0" /> {/* Force Line Break */}

            <motion.span variants={wordVariants} className="inline-block">Divisez</motion.span>
            <motion.span variants={wordVariants} className="inline-block">vos</motion.span>
            <motion.span variants={wordVariants} className="inline-block">Coûts</motion.span>
            <motion.span variants={wordVariants} className="inline-block line-through text-accent text-3xl md:text-5xl lg:text-6xl">gaspillés.</motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10"
          >
            Hoptisens conçoit et déploie des systèmes IA sur-mesure : automatisation, agents intelligents, CRM connecté. Vos marges sont protégées, votre temps est libéré.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">⚡ Mon Flash-Diag en 3min
              </Button>
            </Link>
            <a href="https://calendly.com/hoptisens/hoptisens-call" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">📞 Réserver un appel</Button>
            </a>
          </div>
          <a
            href="#calculateur"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            Calculer mon gain de temps
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </a>
        </FadeInUp>
      </Container>
    </Section>
  );
}
