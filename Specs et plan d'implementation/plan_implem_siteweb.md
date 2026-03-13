# Plan d'implémentation — hoptisens.com

**Date** : Mars 2026  
**Basé sur** : `ARCHITECTURE.md` + `SPECS_FONCTIONNELLES.md`  
**Durée estimée** : 14 jours ouvrés  

---

## Vue d'ensemble des phases

| # | Phase | Durée | Dépendances |
|---|---|---|---|
| 1 | Setup & Fondations | Jour 1 | Aucune |
| 2 | Design System & Composants UI | Jours 2-3 | Phase 1 |
| 3 | Pages statiques (structure + contenu) | Jours 4-7 | Phase 2 |
| 4 | Motion Design & Animations | Jours 8-9 | Phase 3 |
| 5 | Agent IA Conversationnel | Jours 10-11 | Phase 3 |
| 6 | Internationalisation (FR / EN) | Jour 12 | Phases 3-4-5 |
| 7 | SEO & Performances | Jour 13 | Phase 6 |
| 8 | Tests & Go Live | Jour 14 | Toutes |

> **Note** : Les phases 4 et 5 peuvent être menées **en parallèle** car elles n'ont pas de dépendance l'une envers l'autre.

---

## Phase 1 — Setup & Fondations (Jour 1)

### 1.1 Initialisation du projet

**Commande de création :**

```bash
npx create-next-app@latest hoptisens.com \
  --typescript --tailwind --app --src-dir=false
```

> **Point critique** : L'option `--src-dir=false` est obligatoire. Tous les dossiers (`app/`, `components/`, `hooks/`, `lib/`, `messages/`) doivent être à la racine du projet, pas dans un dossier `src/`.

**Installation des dépendances :**

```bash
npm install framer-motion@11 next-intl@3 ai geist \
  lucide-react resend@3 clsx@2 tailwind-merge@2
```

### 1.2 Structure de dossiers

Créer l'arborescence complète dès le départ :

```
hoptisens.com/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── template.tsx
│   │   ├── page.tsx
│   │   ├── a-propos/page.tsx
│   │   ├── offres/
│   │   │   ├── page.tsx
│   │   │   ├── sprint/page.tsx
│   │   │   └── leads/page.tsx
│   │   └── contact/page.tsx
│   ├── api/chat/route.ts
│   └── globals.css
├── components/
│   ├── layout/        → Navbar.tsx, Footer.tsx
│   ├── sections/      → Hero.tsx, SchemaAnime.tsx, Offres.tsx, Chiffres.tsx, Sprint.tsx, Temoignages.tsx
│   ├── agent/         → ChatAgent.tsx
│   └── ui/            → Button.tsx, Card.tsx, Badge.tsx, Tag.tsx, Section.tsx, Container.tsx, FadeInUp.tsx
├── hooks/             → useScrollTransform.ts
├── lib/               → i18n.ts, ai.ts, utils.ts
├── messages/          → fr.json, en.json
├── public/
├── tailwind.config.ts
├── middleware.ts
└── .env
```

### 1.3 Configuration Tailwind

Injecter le thème Hoptisens complet dans `tailwind.config.ts` :

```ts
// Palette de couleurs à configurer
colors: {
  bg: '#FAFAF9',
  surface: { DEFAULT: '#F2F1EF', hover: '#ECEAE6' },
  border: '#E4E2DE',
  accent: { DEFAULT: '#2A5BFF', hover: '#1A47E8', soft: '#EEF2FF', border: '#C7D3FF' },
  'text-primary': '#1A1916',
  'text-secondary': '#4B4A45',
  'text-muted': '#78766F',
  success: '#16A34A',
  warning: '#D97706',
},
fontFamily: {
  sans: ['var(--font-geist-sans)'],
  body: ['var(--font-inter)'],
  mono: ['var(--font-geist-mono)'],
},
```

Shadows, border-radius, et spacing personnalisés selon le design system (cf. Section 4 des specs).

### 1.4 Configuration Fonts

Dans `app/[locale]/layout.tsx` :

```tsx
import { GeistSans, GeistMono } from 'geist/font'
import { Inter } from 'next/font/google'
```

- **Geist Sans** : Titres (H1, H2, H3)
- **Inter** : Corps de texte
- **Geist Mono** : Chiffres clés, données

### 1.5 Variables d'environnement

Créer `.env.local` avec les clés nécessaires :

```env
GEMINI_API_KEY=
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_URL=https://hoptisens.com
```

### 1.6 Déploiement initial

- Connexion du repo Git à **Vercel**
- Configuration du CI/CD automatique
- Déploiement vide pour valider le pipeline
- Connexion du domaine `hoptisens.com` (DNS A/CNAME → Vercel)
- Configuration des variables d'environnement sur Vercel (Production + Preview)

### Critère de validation Phase 1

✅ Le projet se build sans erreur (`npm run build`)  
✅ Le déploiement Vercel fonctionne (page blanche accessible)  
✅ Les fonts Geist / Inter / Geist Mono sont chargées correctement  
✅ La palette de couleurs Tailwind est fonctionnelle  

---

## Phase 2 — Design System & Composants UI (Jours 2-3)

### 2.1 Composants UI de base

#### `components/ui/Button.tsx`

3 variants à implémenter :

| Variant | Style | Hover |
|---|---|---|
| `primary` | `bg-accent text-white` | `bg-accent-hover` |
| `secondary` | `bg-surface border-border text-primary` | `bg-surface-hover` |
| `ghost` | `bg-transparent border-border text-primary` | `bg-surface` |

Micro-animation click : `scale: 0.97` → `1` en `150ms`.

#### `components/ui/Card.tsx`

- Base : `bg-surface border border-border rounded-xl p-6`
- Hover : `translateY(-4px)`, `shadow-md`, `border-color → accent-border`, `200ms ease`
- Click : `scale: 0.98` en `100ms`

#### `components/ui/Badge.tsx` / `Tag.tsx`

- Default : `bg-surface border-border text-muted`, `11px uppercase`, `letter-spacing 0.08em`
- Accent : `bg-accent-soft border-accent-border text-accent`

#### `components/ui/Section.tsx`

Wrapper avec padding standardisé :
- Desktop : `padding-y: 96px`
- Mobile : `padding-y: 64px`

#### `components/ui/Container.tsx`

- `max-width: 1200px`, padding horizontal `24px` (mobile) / `48px` (desktop)
- Grille 12 colonnes, gutter `24px`

#### `components/ui/FadeInUp.tsx`

Wrapper réutilisable pour le scroll reveal :

```tsx
// Framer Motion whileInView
// y: 20 → 0, opacity: 0 → 1, durée 500ms, easeOut
// once: true, margin: "-10%"
```

### 2.2 Composants Layout

#### `components/layout/Navbar.tsx`

**Structure statique d'abord** (les animations scroll seront ajoutées en Phase 4) :

```
[ Logo Hoptisens ]   [ Offres · À propos · Contact ]   [ FR|EN · Prendre RDV → ]
```

- Version desktop avec liens horizontaux
- Version mobile avec hamburger → menu plein écran
- Slot pour le switcher de langue (fonctionnalité i18n en Phase 6)

#### `components/layout/Footer.tsx`

4 colonnes :
```
[ Logo + Tagline ]   [ Offres ]   [ Liens ]   [ Contact ]
```

- Copyright, mentions légales, RGPD
- Icône LinkedIn
- Fond `--surface`, bordure top `--border`

### 2.3 Utilitaires

#### `lib/utils.ts`

```tsx
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Critère de validation Phase 2

✅ Tous les composants UI rendent correctement en isolation  
✅ Les 3 variants de Button fonctionnent  
✅ Le hover des Card est fluide et performant  
✅ La Navbar est responsive (desktop + mobile hamburger)  
✅ Le Footer est responsive sur toutes les tailles d'écran  

---

## Phase 3 — Pages statiques (Jours 4-7)

> **Ordre de développement** : Accueil → Offres → Sprint → Leads → À propos → Contact  
> **Objectif** : Toutes les pages avec leur contenu textuel et structure HTML/CSS, **sans animations**.

### 3.1 Page Accueil `/` (Jour 4)

**Sections à monter :**

1. **Hero** (`components/sections/Hero.tsx`)
   - Pré-titre badge : `AGENCE IA & AUTOMATISATION`
   - Titre H1 : `Simplifiez pour Amplifier.`
   - Sous-titre descriptif
   - 2 CTAs : Primaire → `/offres/sprint`, Secondaire → `/offres`
   - Background : Mesh gradient CSS statique (animation ajoutée en Phase 4)

2. **Schéma animé** (`components/sections/SchemaAnime.tsx`)
   - Structure HTML/SVG du schéma en `position: sticky` dans un conteneur `300vh`
   - Les 3 nœuds Phase 1, le nœud central Hoptisens, les 3 nœuds Phase 3
   - Tous les paths SVG (flèches, connexions) tracés statiquement
   - **Les animations scroll-driven seront ajoutées en Phase 4**

3. **Chiffres clés** (`components/sections/Chiffres.tsx`)
   - Grille 4 colonnes (2 mobile) : `-80%`, `+3×`, `10 jours`, `100%`
   - Valeurs affichées statiquement (counter animé en Phase 4)

4. **Offres** (`components/sections/Offres.tsx`)
   - Grille 2×2 (1 col mobile) avec les 4 catégories
   - Chaque carte avec Tag, titre, description, lien → `/offres#categorie-x`

5. **Sprint** (`components/sections/Sprint.tsx`)
   - Bloc pleine largeur, fond `--accent-soft`, bordure `--accent-border`
   - Badge `OFFRE D'ENTRÉE`, titre, accroche, prix 490€ HT, CTA

6. **Témoignages** (`components/sections/Temoignages.tsx`) — *optionnel*
   - Carrousel horizontal, 3 citations, placeholder contenu

### 3.2 Page Offres `/offres` (Jour 5)

- Hero de page (titre + description)
- 4 sections d'offres, une par catégorie, avec ancre `#categorie-x`
- Liste détaillée de chaque service par catégorie
- CTA bas de page : bloc Sprint mis en avant

### 3.3 Landing Sprint `/offres/sprint` (Jour 5)

- Hero avec badge prix `490€ HT` + titre + promesse
- Section livrables (3 items avec descriptions)
- Timeline visuelle 3 étapes (J1-J2, J3-J8, J9-J10)
- Bloc tarif centré + mention avoir déductible
- CTA vers `/contact` avec contexte Sprint

### 3.4 Landing Lead Gen `/offres/leads` (Jour 6)

- Hero : "Alimentez votre pipeline, automatiquement."
- 3 cartes offres spécialisées :
  - Le Prospecteur Augmenté (Outbound)
  - Le Filtre IA (Inbound)
  - Le Système Contenu-Contact (Hybride)
- CTA vers `/contact`

### 3.5 Page À propos `/a-propos` (Jour 6)

- Hero : "Notre raison d'être" + vision 2030
- 3 blocs Vision / Mission / Stratégie (grille avec icônes)
- Timeline 3 étapes : Diagnostic → Construction → Transfert
- CTA bas de page → `/contact`

### 3.6 Page Contact `/contact` (Jour 7)

- Titre : "Parlons de votre transformation."
- Sous-titre explicatif du process agent IA
- Placeholder pour l'interface chat (implémentation Phase 5)
- Coordonnées discrètes en fallback (email direct)

### 3.7 Transitions de pages

Dans `app/[locale]/template.tsx` :
- Wrapper `<AnimatePresence mode="wait">` + `motion.div`
- Sortie : `opacity: 1→0`, `y: 0→-10`, `200ms`
- Entrée : `opacity: 0→1`, `y: 10→0`, `300ms`

### Critère de validation Phase 3

✅ Toutes les pages accessibles et naviguables  
✅ Le contenu textuel est complet sur chaque page  
✅ Le responsive fonctionne : 375px, 768px, 1280px, 1440px  
✅ Les liens entre pages sont corrects  
✅ La structure SVG du schéma animé est en place  

---

## Phase 4 — Motion Design & Animations (Jours 8-9)

### Ordre d'implémentation

#### 4.1 Navbar scroll compact (Jour 8)

- Directive `"use client"` sur `Navbar.tsx`
- `useScroll()` + `useTransform()` de Framer Motion
- Interpolations :
  - `padding-y` : 20px → 10px
  - `background` : transparent → `rgba(250,250,249,0.92)`
  - `backdrop-filter` : none → `blur(12px)`
  - `box-shadow` : none → `0 1px 0 #E4E2DE`
  - `logo height` : 32px → 24px
- Seuil de déclenchement : `80px`
- Transition : `300ms easeInOut`

#### 4.2 Hero animations (Jour 8)

- **Stagger titre** : Chaque mot en cascade, `y: 20→0`, `opacity: 0→1`, `staggerChildren: 0.08`, `500ms/mot`
- **Badge pré-titre** : `fadeIn + slideDown`, `400ms`
- **Sous-titre** : `fadeIn`, delay `600ms`, `400ms`
- **CTAs** : `fadeIn + slideUp`, delay `800ms`, `400ms`
- **Mesh gradient** : CSS `@keyframes` pour dérive lente des 3 cercles de couleur (`8s infinite`)

#### 4.3 Scroll reveal global (Jour 8)

- Activation du composant `FadeInUp` sur toutes les sections
- Pattern : `whileInView`, `once: true`, `margin: "-10%"`
- Stagger enfants : `0.1s` entre chaque

#### 4.4 Cartes hover & Boutons (Jour 8)

- Cartes : `translateY(-4px)`, `shadow-md`, border-color, `200ms`
- Boutons Primary hover : `bg → accent-hover`, `150ms`
- Boutons Ghost hover : `bg → surface`, `150ms`
- Click : `scale: 0.97`, `100ms`

#### 4.5 Chiffres counter animé (Jour 8)

- Counter de 0 → valeur cible
- Durée : `1500ms`, easing `easeOut`
- Déclenché par `whileInView`, `once: true`

#### 4.6 Schéma SVG scroll-driven (Jour 9) ⚠️ **Composant le plus complexe**

- Hook custom `useScrollTransform.ts` pour centraliser la logique Framer Motion

**Phase 1 (0%-30%)** :
- `fadeIn + scaleIn` (0.8→1.0) en stagger `0.2s` sur les 3 nœuds gris
- `pathLength: 0→1` sur les flèches en tirets

**Phase 2 (30%-60%)** :
- Nœud HOPTISENS : `scale: 0→1`, `opacity: 0→1` piloté par `useTransform(scrollYProgress, [0.30, 0.45], [0, 1])`
- Connexions : `pathLength: 0→1` séquentiel piloté par `useTransform(scrollYProgress, [0.35, 0.60], [0, 1])`
- Couleur nœuds : interpolation gris `#D1D5DB` → bleu `#2A5BFF` via `useTransform(scrollYProgress, [0.5, 0.7], ...)`

**Phase 3 (60%-100%)** :
- Tirets → flèches pleines
- 3 nouveaux nœuds : `opacity: 0→1`, `y: 20→0` via `useTransform(scrollYProgress, [0.65, 0.85], ...)`
- Points animés `flowDot` via `@keyframes` + `offset-distance`
- Badge counter `−80% temps opérationnel`

> **Points d'attention critiques** :
> - Tous les `path` animés par `pathLength` ne doivent avoir **aucun fill**, uniquement un `stroke`
> - Utiliser `motion.path` de Framer Motion, pas `<path>` natif
> - `will-change: transform` uniquement sur les éléments animés
> - Tester la performance à 60fps

#### 4.7 Transitions de pages (Jour 9)

- Activer `AnimatePresence mode="wait"` dans `template.tsx`
- Exit : `opacity: 1→0`, `y: 0→-10`, `200ms`
- Enter : `opacity: 0→1`, `y: 10→0`, `300ms`

#### 4.8 Menu mobile animations (Jour 9)

- Hamburger → menu plein écran
- Liens animés en stagger (slide-in depuis la droite)

#### 4.9 Accessibilité des animations (Jour 9)

- Implémenter `(prefers-reduced-motion: reduce)` avec Tailwind et Framer Motion
- Désactiver les animations lourdes (schéma SVG, cascades de texte, transitions de page)

### Critère de validation Phase 4

✅ Toutes les animations respectent le catalogue (Section 9 des specs)  
✅ Performance 60fps sur Chrome DevTools  
✅ Le schéma SVG scroll-driven se déroule correctement en 3 phases  
✅ `prefers-reduced-motion` fonctionne et coupe les animations  
✅ Menu mobile avec animations stagger  

---

## Phase 5 — Agent IA Conversationnel (Jours 10-11)

### 5.1 Route Handler API (Jour 10)

**Fichier** : `app/api/chat/route.ts`

- Intégration **Vercel AI SDK** + Google Gemini API
- System prompt de qualification injecté côté serveur
- Le system prompt doit guider la conversation vers :
  1. Secteur d'activité + taille entreprise
  2. Principale douleur opérationnelle
  3. Maturité IA existante
  4. Horizon de temps
  5. Coordonnées (prénom + email)
- Logique de recommandation dynamique intégrée au prompt :

| Profil détecté | Recommandation |
|---|---|
| Première exploration + processus manuel | Sprint "Processus Performants" (490€) |
| Besoin de leads / prospection | Le Prospecteur Augmenté |
| Site web + besoin de qualification | Le Filtre IA |
| Besoin global + budget confirmé | Système Contenu-Contact (Hybride) |
| Équipe sans compétences IA | Hopti-Learn |

### 5.2 Intégration Resend (Jour 10)

- À la fin de la conversation : envoi d'un email structuré via **Resend**
- Contenu de l'email : résumé de la conversation (secteur, taille, douleur, maturité, horizon, recommandation, prénom, email du lead)
- Destinataire : `CONTACT_EMAIL` défini dans `.env`

### 5.3 Rate Limiting (Jour 10)

- Via Vercel Edge
- Max **10 messages par session**
- Afficher un message de fallback si la limite est atteinte

### 5.4 Composant Chat UI (Jour 11)

**Fichier** : `components/agent/ChatAgent.tsx`

- Directive `"use client"`
- Hook `useChat` du Vercel AI SDK pour le streaming
- Largeur max `640px`, centré
- Design :
  - Fond blanc
  - Bulle agent : fond `--surface`, alignée à gauche, avatar "H" cercle `--accent`
  - Bulle utilisateur : fond `--accent-soft`, alignée à droite
  - Coins arrondis sur les bulles

### 5.5 Animations du chat (Jour 11)

- Apparition fenêtre : `scaleY: 0.95→1`, `opacity: 0→1`, `300ms`
- Apparition bulle : `y: 8→0`, `opacity: 0→1`, `200ms`
- Indicateur de frappe : 3 dots en `pulse` alterné, infini
- Hover bouton envoi : `scale: 0.95→1`, `150ms`
- Scroll automatique vers le dernier message

### Critère de validation Phase 5

✅ L'agent répond en streaming avec Gemini API  
✅ La conversation de qualification suit le flux prévu (4 questions + coordonnées)  
✅ La recommandation dynamique est pertinente  
✅ L'email Resend est envoyé et reçu correctement  
✅ Le rate limiting bloque après 10 messages  
✅ Le system prompt n'est **pas exposé** côté client  

---

## Phase 6 — Internationalisation FR / EN (Jour 12)

### 6.1 Configuration next-intl

- Configuration dans `lib/i18n.ts`
- `middleware.ts` pour le routing par locale
- Locale par défaut : `fr`
- Détection : header `Accept-Language` au premier accès, puis cookie

### 6.2 Fichiers de traduction

Créer `messages/fr.json` et `messages/en.json` avec :

- Tous les textes de l'interface (titres, descriptions, CTAs, labels)
- Métadonnées SEO par page (title, description, og:title)
- Messages de l'agent IA

### 6.3 Routing bilingue

| FR | EN |
|---|---|
| `/` | `/en` |
| `/a-propos` | `/en/about` |
| `/offres` | `/en/services` |
| `/offres/sprint` | `/en/services/sprint` |
| `/offres/leads` | `/en/services/leads` |
| `/contact` | `/en/contact` |

### 6.4 Adaptation des composants

- Convertir tous les textes en dur vers `useTranslations()`
- System prompt agent IA adapté par locale (FR/EN)
- Switcher FR|EN dans la navbar (conserve le path courant)

### 6.5 Balises hreflang

Dans le layout, injecter les balises `<link rel="alternate" hreflang="..." />` pour chaque page.

### Critère de validation Phase 6

✅ Toutes les pages accessibles en `/` (FR) et `/en` (EN)  
✅ Le switcher FR|EN fonctionne et conserve le path  
✅ L'agent IA répond dans la langue sélectionnée  
✅ Les métadonnées SEO sont traduites  
✅ Aucun texte en dur restant dans les composants  

---

## Phase 7 — SEO & Performances (Jour 13)

### 7.1 Métadonnées Next.js

Pour chaque page, configurer `metadata` :
- `title` (avec template `%s | Hoptisens`)
- `description`
- `openGraph` (title, description, image, url)
- `twitter` (card, title, description)

### 7.2 Fichiers techniques SEO

- `app/sitemap.ts` — Sitemap dynamique avec toutes les URL FR + EN
- `app/robots.ts` — Configuration du fichier `robots.txt`
- JSON-LD `Organization` + `WebSite` dans le layout principal

### 7.3 Audit de performances

- **Lighthouse** : Score cible > 90 sur toutes les pages
- **Core Web Vitals** :
  - LCP < 2.5s
  - CLS < 0.1
  - INP < 200ms

### 7.4 Optimisations

- Tree-shaking des imports Framer Motion
- Vérification du bundle size
- Lazy loading des composants lourds (`SchemaAnime`, `ChatAgent`)
- Vérification `prefers-reduced-motion` complète
- Images SVG exclusivement → performance optimale

### 7.5 Analytics

- **Vercel Analytics** intégré (sans cookie tiers)
- Optionnel : Plausible Analytics (RGPD-friendly)

### Critère de validation Phase 7

✅ Lighthouse > 90 sur toutes les pages  
✅ CWV conformes aux cibles (LCP, CLS, INP)  
✅ `sitemap.xml` accessible et complet  
✅ `robots.txt` correctement configuré  
✅ Balises `og:` présentes sur chaque page  
✅ JSON-LD validé  

---

## Phase 8 — Tests & Go Live (Jour 14)

### 8.1 Tests responsive

Tester sur 4 breakpoints :
- **375px** (Mobile)
- **768px** (Tablette)
- **1280px** (Laptop)
- **1440px** (Desktop)

### 8.2 Tests cross-browser

| Navigateur | Points d'attention |
|---|---|
| Chrome | Référence, doit être parfait |
| Firefox | Vérifier backdrop-filter, animations SVG |
| Safari | Vérifier les animations CSS, position sticky |
| Edge | Vérifier le rendu global |

### 8.3 Tests fonctionnels

- [ ] Agent IA testé en FR et EN
- [ ] Emails Resend reçus correctement (vérifier format et contenu)
- [ ] Rate limiting actif (10 messages max)
- [ ] Switcher de langue fonctionnel sur toutes les pages
- [ ] Tous les liens internes corrects
- [ ] Tous les CTAs pointent vers les bonnes destinations
- [ ] Formulaire Sprint pré-rempli via contexte si accès depuis `/offres/sprint`

### 8.4 Checklist de mise en ligne

- [ ] Variables d'environnement de **production** configurées sur Vercel
- [ ] Domaine `hoptisens.com` pointé vers Vercel (DNS configuré)
- [ ] SSL actif (automatique Vercel)
- [ ] Sitemap accessible sur `hoptisens.com/sitemap.xml`
- [ ] Analytics Vercel activé
- [ ] `prefers-reduced-motion` vérifié
- [ ] Lighthouse score > 90 sur toutes les pages
- [ ] Console navigateur sans erreurs
- [ ] Test sur connexion lente (throttle 3G)

### 8.5 Go Live

1. Merge branche `develop` → `main`
2. Vérifier le déploiement automatique Vercel
3. Vérifier l'accès sur `hoptisens.com`
4. Test final post-déploiement

### Critère de validation Phase 8

✅ Zéro bug bloquant  
✅ UX fluide sur mobile et desktop  
✅ Agent IA fonctionnel en production  
✅ Emails reçus  
✅ Site accessible sur `hoptisens.com`  

---

## Risques identifiés et mitigations

| Risque | Impact | Mitigation |
|---|---|---|
| Complexité du SchemaAnime SVG | La plus grosse pièce technique — peut dépasser le temps prévu | Préparer la structure SVG statique dès Phase 3, itérer en Phase 4 |
| Performance des animations Framer Motion | Impact CWV si trop de composants client | Ne mettre `"use client"` que quand nécessaire, lazy load les gros composants |
| Coût API Gemini non maîtrisé | Facture élevée si abus | Rate limiting strict (10 msg/session), pas de stockage de conversation |
| Compatibilité Safari | `backdrop-filter`, `position: sticky`, CSS Grid | Tests spécifiques Safari dès Phase 3 |
| Fichiers de traduction volumineux | Risque d'oublis et d'incohérences FR/EN | Utiliser un script de validation pour vérifier la complétude des clés |

---

_Document généré le 13 Mars 2026 — Basé sur ARCHITECTURE.md et SPECS_FONCTIONNELLES.md_
