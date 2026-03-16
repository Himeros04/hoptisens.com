# Rapport d'Optimisation — Hoptisens.com

**Date** : 16 mars 2026
**Stack** : Next.js 16 · React 19 · TypeScript 5 · Tailwind v4 · Framer Motion 12 · Vercel AI SDK

---

## 🔴 Bugs Critiques

### 1. `backdropFilter` ne réagit pas au scroll — `components/layout/Navbar.tsx:77`

**Bug confirmé.** La `backdropFilter` est définie via `.get()` sur une `MotionValue`, ce qui retourne la valeur au moment du rendu mais **ne se met jamais à jour** lors du scroll. L'effet de flou derrière la navbar est cassé.

```tsx
// ❌ Actuel — valeur figée, ne réagit plus au scroll
backdropFilter: `blur(${backdropBlur.get()}px)`

// ✅ Correction — utiliser useMotionTemplate
import { useMotionTemplate } from "framer-motion";
const backdropFilterValue = useMotionTemplate`blur(${backdropBlur}px)`;
// puis : backdropFilter: backdropFilterValue
```

---

### 2. `handleClearSession` fait un rechargement complet de la page — `components/agent/ChatAgent.tsx:81`

`window.location.reload()` est une UX brutale. Si l'utilisateur est sur une page avec un formulaire rempli, il perd tout. Il faut réinitialiser le state React proprement.

```tsx
// ❌ Actuel
window.location.reload();

// ✅ Correction — réinitialiser via l'API du chat sans rechargement
chat.messages = [];
// ou forcer un re-render via un state local dédié
```

---

### 3. Transcription incomplète pour messages complexes — `app/api/chat/route.ts:44`

Le `m.content` ne gère pas les messages avec `parts[]` (format Vercel AI SDK v4). Les messages de l'IA peuvent renvoyer `undefined` dans la transcription, entraînant des données corrompues dans Airtable.

```ts
// ❌ Actuel — m.content peut être undefined ou un tableau
.map((m: any) => `${m.role === 'user' ? 'Client' : 'Lucio'}: ${m.content}`)

// ✅ Correction — extraire le texte des parts
.map((m: any) => {
  const text = m.parts?.find((p: any) => p.type === 'text')?.text ?? m.content ?? '';
  return `${m.role === 'user' ? 'Client' : 'Lucio'}: ${text}`;
})
```

---

## 🟠 Problèmes TypeScript (Qualité & Maintenabilité)

### 4. 8 contournements de typage dans le code — Fichiers multiples

Ces workarounds masquent des bugs potentiels et désactivent la protection du compilateur :

| Fichier | Ligne | Problème |
|---|---|---|
| `components/ui/FadeInUp.tsx:19` | `ease: "easeOut" as any` | Cast inutile, `"easeOut"` est un `EasingDefinition` valide |
| `components/agent/ChatAgent.tsx:15` | `message: any` | Le SDK expose `UIMessage` depuis `ai` |
| `components/agent/ChatAgent.tsx:156` | `messages.map((message: any)` | Même correction |
| `components/sections/Offres.tsx:66` | `href: offre.href as any` | Typer le tableau `offres` avec un type union |
| `components/sections/Offres.tsx:70` | `@ts-ignore` sur `LinkComponent` | Refactorer avec un composant wrapper typé |
| `components/layout/Navbar.tsx:108` | `locale={switchLocale as any}` | Typer `switchLocale` avec les locales disponibles |
| `lib/airtable.ts:26` | `fields: any` | Définir un type `AirtableFields` |
| `app/api/chat/route.ts:44` | `m: any` dans le `.map()` | Typer avec `UIMessage` |

**Correction pour `Offres.tsx`** — le `@ts-ignore` découle d'un problème de design. La solution propre :

```tsx
// Remplacer le pattern LinkComponent dynamique par deux branches explicites
{isExternal ? (
  <a href={offre.href} target="_blank" rel="noopener noreferrer" className="block group h-full">
    <CardContent offre={offre} />
  </a>
) : (
  <Link href={offre.href as RouteHref} className="block group h-full">
    <CardContent offre={offre} />
  </Link>
)}
```

---

## 🟡 Performance & Fluidité

### 5. 4 polices Google Fonts chargées simultanément — `app/[locale]/layout.tsx:11-29`

Geist, Geist_Mono, Inter et Playfair_Display génèrent **4 requêtes réseau distinctes** au chargement. Geist et Inter ont des usages qui se chevauchent.

**Recommandation :**
- Garder **Playfair Display** (headings, distinctive)
- Garder **Geist Sans** (UI)
- Supprimer **Inter** (redondant avec Geist pour le body)
- Garder **Geist Mono** uniquement si du code est affiché

> Gain estimé : **~20-35% de réduction du temps de blocage des polices**

---

### 6. Animations SVG infinies sans gestion de visibilité — `components/visuals/OfferSchemas.tsx`

Les `motion.path` avec `repeat: Infinity` tournent en permanence, même quand les schemas sont hors viewport ou dans un onglet non actif. Cela consomme du GPU inutilement.

```tsx
// ✅ Utiliser whileInView pour suspendre les animations hors viewport
<motion.path
  animate={{ strokeDashoffset: [0, -20] }}
  transition={defaultTransition}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
/>
// Ou wrapper chaque schema avec useInView() pour stopper les animations
```

---

### 7. Re-renders à chaque frame de scroll dans la Navbar — `components/layout/Navbar.tsx:77`

En plus d'être un bug (voir point #1), l'approche `.get()` force React à re-rendre le composant Navbar à chaque frame de scroll. Utiliser `useMotionTemplate` délègue la mise à jour directement au moteur Framer Motion dans le DOM, **éliminant complètement ces re-renders**.

---

### 8. Absence de `Suspense` boundaries pour les sections lourdes — `app/[locale]/page.tsx`

La page d'accueil charge 6 sections en séquence sans code splitting. Les composants `SchemaAnime` et `OfferSchemas` (SVG + animations complexes) pourraient être chargés en `lazy()` avec un fallback skeleton.

```tsx
import { lazy, Suspense } from "react";
const SchemaAnime = lazy(() => import("@/components/sections/SchemaAnime"));

// Dans la page :
<Suspense fallback={<div className="h-96 animate-pulse bg-surface rounded-2xl" />}>
  <SchemaAnime />
</Suspense>
```

---

## 🔵 Sécurité

### 9. Initialisation Airtable avec valeur de fallback `'missing'` — `lib/airtable.ts:3-4`

Si les variables d'environnement ne sont pas définies, le client Airtable est instancié avec `'missing'` comme clé API. Cela ne lève pas d'erreur immédiatement, ce qui rend le debugging difficile en production.

```ts
// ❌ Actuel
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY || 'missing' })

// ✅ Correction — fail fast au démarrage
if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error('Missing required Airtable env vars');
}
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
```

---

### 10. Aucun rate limiting sur `/api/chat` — `app/api/chat/route.ts`

L'endpoint est public et sans restriction. Un bot peut épuiser le quota Gemini API en quelques minutes et générer des coûts élevés. Sur Vercel, utiliser Vercel KV avec un compteur par IP ou ajouter un middleware de rate limiting.

---

### 11. Données de conversation stockées en clair dans `localStorage` — `components/agent/ChatAgent.tsx:57`

Les transcriptions complètes (incluant emails, noms, infos entreprise) sont persistées sans expiration ni chiffrement. Si le navigateur est partagé, ces données sont exposées.

```ts
// ✅ Stocker uniquement les 10 derniers messages, avec TTL
const STORAGE_TTL = 24 * 60 * 60 * 1000; // 24h
const payload = {
  messages: messages.slice(-10),
  expires: Date.now() + STORAGE_TTL
};
localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
```

---

## ⚪ Accessibilité & UX

### 12. Menu mobile sans focus trap ni attributs `aria` — `components/layout/Navbar.tsx:131-178`

Le menu mobile s'ouvre sur `z-[60]` mais :
- Pas de `role="dialog"` ni `aria-modal="true"`
- Pas de focus trap (la navigation au clavier sort du menu)
- Le bouton toggle hamburger manque d'`aria-expanded`

```tsx
// Sur le bouton toggle
<button
  aria-label="Ouvrir le menu"
  aria-expanded={isMobileMenuOpen}
  aria-controls="mobile-menu"
  ...
>

// Sur le menu
<motion.div id="mobile-menu" role="dialog" aria-modal="true" ...>
```

---

### 13. SVG décoratifs sans `aria-hidden` — `components/visuals/OfferSchemas.tsx`

Les SVGs contiennent du texte fragmenté lisible par les screen readers de manière incohérente. Ils devraient soit être masqués (`aria-hidden="true"`), soit avoir un `<title>` et `<desc>` structurés.

```tsx
// ✅ Option simple
<svg viewBox="0 0 500 300" aria-hidden="true" focusable="false" ...>
```

---

## Récapitulatif des Priorités

| # | Priorité | Type | Fichier | Impact |
|---|---|---|---|---|
| 1 | 🔴 Critique | Bug UI | `Navbar.tsx:77` | backdropFilter cassé au scroll |
| 2 | 🔴 Critique | Bug UX | `ChatAgent.tsx:81` | Rechargement brutal de la page |
| 3 | 🔴 Critique | Bug Data | `route.ts:44` | Données corrompues dans Airtable |
| 4 | 🟠 Élevé | TypeScript | Multiples | 8 contournements de type à corriger |
| 5 | 🟡 Moyen | Performance | `layout.tsx` | 2 polices redondantes à supprimer |
| 6 | 🟡 Moyen | Performance | `OfferSchemas.tsx` | Animations infinies hors viewport |
| 7 | 🟡 Moyen | Performance | `Navbar.tsx` | Re-renders inutiles au scroll |
| 8 | 🟡 Moyen | Performance | `page.tsx` | Lazy loading des sections lourdes |
| 9 | 🔵 Sécurité | Config | `airtable.ts` | Fallback `'missing'` silencieux |
| 10 | 🔵 Sécurité | API | `route.ts` | Absence de rate limiting |
| 11 | 🔵 Sécurité | Data | `ChatAgent.tsx` | localStorage sans TTL |
| 12 | ⚪ Faible | A11y | `Navbar.tsx` | Menu sans focus trap ni aria |
| 13 | ⚪ Faible | A11y | `OfferSchemas.tsx` | SVG sans `aria-hidden` |

---

> **Recommandation de priorisation** : commencer par corriger les bugs #1, #2, #3 (impact immédiat sur l'expérience utilisateur et l'intégrité des données), puis nettoyer les 8 casts TypeScript en une seule passe pour garantir une build propre. Adresser ensuite la performance des polices. Le reste peut être planifié sur un sprint dédié accessibilité/sécurité.
