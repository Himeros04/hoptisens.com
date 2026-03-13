# Architecture Technique — Hoptisens.com

Ce document décrit l'architecture technique, la stack et les détails d'implémentation pour la création du site web de Hoptisens.

## 1. Stack Technologique Globale
- **Framework Core** : Next.js 14 (App Router)
- **Langage** : TypeScript (pour le typage strict, la maintenabilité et l'autocomplétion)
- **Styling** : Tailwind CSS
- **Animations & Interactions** : Framer Motion v11
- **Internationalisation (i18n)** : next-intl (support natif multi-langues, FR/EN)
- **Intelligence Artificielle** : Vercel AI SDK (pour le module de l'agent conversationnel de contact)
- **Modèle LLM** : Google Gemini API (coût maîtrisé, suffisant pour la qualification)
- **Emails Transactionnels** : Resend
- **Typographie** : Geist Sans (titrailles), Inter (corps de texte), Geist Mono (chiffres clés, données) via `next/font`
- **Icônes** : Lucide React
- **Hébergement & Déploiement** : Vercel (CI/CD natif et optimal pour Next.js)

## 2. Implémentation des Composants Clés

### 2.1 Navigation (Navbar) dynamique
- **Comportement** : Rétractation et adaptation au scroll, type "twine.com".
- **Technique** :
  - Composant Client (`"use client"`).
  - Hook `useScroll` de Framer Motion pour obtenir `scrollY`.
  - Interpolation via `useTransform` :
    - Interpolation du padding Y (`paddingTop`/`Bottom`) : de `20px` à `10px`.
    - Interpolation du fond : de transparent à `rgba(250, 250, 249, 0.92)` (couleur `--bg` avec opacité).
    - Interpolation du `backdrop-filter` : de `none` à `blur(12px)`.
    - Interpolation du `box-shadow` : de `none` à `0 1px 0 #E4E2DE`.
    - Interpolation de la taille du logo de `32px` à `24px`.
  - Seuil de déclenchement : `80px` de scroll.
  - Encapsulation du header dans une balise `<motion.nav>` avec un paramètre `transition={{ duration: 0.3, ease: "easeInOut" }}`.
- **Menu mobile** :
  - Hamburger → menu plein écran avec fond `--bg`
  - Liens animés en stagger (slide-in depuis la droite)
  - CTA "Prendre RDV" en bas du menu
- **Switcher de langue** :
  - Toggle FR | EN en haut à droite de la navbar
  - Conserve le path courant en changeant le locale

### 2.2 Section Hero
- **Visuel** : Arrière-plan "Mesh Gradient" codé en CSS pur (via 3 cercles de couleur `#2A5BFF20`, `#7C3AED15`, `#F59E0B10` qui dérivent lentement via `@keyframes`) pour un rendu moderne sans surcharger le DOM. Pas d'image, pas de photo.
- **Animation du titre** : Animation en cascade. Utilisation des `variants` de Framer Motion sur un parent (`staggerChildren: 0.08`) pour animer l'apparition de chaque mot depuis le bas vers sa position finale (`y: 20 → 0`, `opacity: 0 → 1`), durée `500ms` par mot.
- **CTAs** :
  - Principal : `Démarrer votre diagnostic →` (→ `/offres/sprint`)
  - Secondaire : `Voir nos offres` (→ `/offres`, ghost button)

### 2.3 Schéma Animé Scroll-Driven (Transformation Hoptisens)
- **Comportement attendu** : Récit en plusieurs séquences synchronisé à l'avancement du scroll. Inspiré de "makingsoftware.com".
- **Structure de page** : Le conteneur parent prend une hauteur de `300vh`. Le schéma réel à l'intérieur est en `position: sticky; top: 10%; height: 100vh;` pour bloquer la vue pendant le scroll.
- **Animation Technique (Framer Motion + SVG Inline)** :
  - Enregistrement de la progression de la section parent via `useScroll({ target: sectionRef })` qui nous donne un `scrollYProgress` (allant de 0 à 1).
  - **Phase 1 (Scroll 0% – 30%) — "Entreprise Avant"** :
    - 3 nœuds rectangulaires gris (`#D1D5DB`) : `Prospection manuelle`, `Saisie de données`, `Reporting Excel`.
    - Flèches tracées en tirets (`stroke-dasharray: 6 4`, couleur `#9CA3AF`).
    - Animation d'entrée : `fadeIn` + `scaleIn` (0.8 → 1.0) en stagger `0.2s`.
    - Flèches dessinées via `pathLength: 0 → 1` après les nœuds.
  - **Phase 2 (Scroll 30% – 60%) — "L'intervention Hoptisens"** :
    - Apparition (`scale: 0 → 1`, `opacity: 0 → 1`) du nœud central "HOPTISENS" via `useTransform(scrollYProgress, [0.30, 0.45], [0, 1])`.
    - Tracé séquentiel des connexions sortant du nœud vers les 3 nœuds existants : `pathLength: 0 → 1`, piloté par `useTransform(scrollYProgress, [0.35, 0.60], [0, 1])`.
    - Transition de couleur sur les nœuds existants (gris `#D1D5DB` → bleu accent `#2A5BFF`) via `useTransform(scrollYProgress, [0.5, 0.7], ...)`.
  - **Phase 3 (Scroll 60% – 100%) — "Entreprise Augmentée"** :
    - Disparition des pointillés (les liens deviennent des flèches pleines et animées).
    - Apparition animée (`opacity: 0 → 1`, `y: 20 → 0`) des 3 nouveaux nœuds : `Agent IA`, `CRM Automatisé`, `Dashboard Pilotage`, via `useTransform(scrollYProgress, [0.65, 0.85], ...)`.
    - Points animés voyageant le long des connexions (flux de données) via `@keyframes flowDot` sur `offset-distance`.
    - Badge Counter : `−80% temps opérationnel` avec counter animé.

### 2.4 Chiffres Clés
- Grille 4 colonnes (2 sur mobile).
- Counter animé de `0` vers la valeur cible, durée `1500ms`, easing `easeOut`.
- Déclenché via `whileInView`, une seule fois (`once: true`).

### 2.5 Offres (Pricing/Solutions)
- Composants cartes avec élévation (hover : `translateY(-4px)`, `shadow-md`, `border-color → --accent-border`, `200ms`).
- Grille 2×2, puis 1 colonne sur mobile.
- Chaque carte pointe vers `/offres#categorie-x`.

### 2.6 Contact — Agent IA Conversationnel
- Composant de chat intégré dans la page `/contact` (pas de popup).
- Basé sur le Vercel AI SDK connecté au Route Handler `/api/chat/route.ts`.
- Hook `useChat` côté client pour le streaming des réponses.
- System prompt de qualification injecté côté serveur, adapté par locale (FR/EN).
- Envoi d'email via **Resend** à la fin de la conversation (résumé structuré).
- Rate limiting via Vercel Edge (max 10 messages / session).
- Design : fond blanc, bulles avec coins arrondis. Agent à gauche (fond `--surface`), utilisateur à droite (fond `--accent-soft`).

### 2.7 Transitions de page (Page Transitions)
- Wrapper principal géré avec `<AnimatePresence mode="wait">` dans `template.tsx` (modèle spécifique d'App Router pour gérer le démontage/remontage avec animations) combiné à un composant de page racine défini en `motion.div`.
- Sortie : `opacity: 1→0`, `y: 0→-10`, `200ms`.
- Entrée : `opacity: 0→1`, `y: 10→0`, `300ms`.

## 3. Topologie du projet (App Router Next.js 14)

```text
hoptisens.com/
├── app/
│   ├── [locale]/                  # Racine next-intl (i18n dynamique)
│   │   ├── layout.tsx             # Layout Principal + Config Font + Navbar + Footer
│   │   ├── template.tsx           # Conteneur des transitions de pages via Framer
│   │   ├── page.tsx               # Accueil / Landing Page
│   │   ├── a-propos/
│   │   │   └── page.tsx           # Page À propos
│   │   ├── offres/
│   │   │   ├── page.tsx           # Vue d'ensemble des offres
│   │   │   ├── sprint/
│   │   │   │   └── page.tsx       # Landing Sprint "Processus Performants"
│   │   │   └── leads/
│   │   │       └── page.tsx       # Landing Lead Gen
│   │   └── contact/
│   │       └── page.tsx           # Contact + Agent IA
│   └── api/
│       └── chat/
│           └── route.ts           # Endpoint Agent IA (Vercel AI SDK + Gemini API) + Envoi email Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # (Client Component) avec useScroll
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx               # Titres en Stagger et fond Mesh
│   │   ├── SchemaAnime.tsx        # Conteneur Sticky + Logique SVG animée
│   │   ├── Offres.tsx             # Cartes 2×2 des 4 catégories
│   │   ├── Chiffres.tsx           # Compteurs animés
│   │   ├── Sprint.tsx             # Bloc mise en avant Sprint
│   │   └── Temoignages.tsx        # Carrousel témoignages (optionnel)
│   ├── agent/
│   │   └── ChatAgent.tsx          # Composant UI useChat (Agent IA)
│   └── ui/                        # Composants communs
│       ├── Button.tsx             # 3 variants : primary, secondary, ghost
│       ├── Card.tsx               # Avec hover animation
│       ├── Badge.tsx
│       ├── Tag.tsx
│       ├── Section.tsx            # Wrapper avec padding standard
│       ├── Container.tsx          # Max-width + padding horizontal
│       └── FadeInUp.tsx           # Wrapper animation scroll reveal
├── hooks/
│   └── useScrollTransform.ts      # Helper customs pour encadrer Framer Motion
├── lib/
│   ├── i18n.ts                    # Config du Dictionnaire Next-Intl
│   ├── ai.ts                      # Config Vercel AI SDK
│   └── utils.ts                   # Fonctions de fusion tailwind (twMerge/clsx)
├── messages/                      # Fichiers fr.json, en.json
├── public/                        # Assets et images non-traitées
├── tailwind.config.ts             # Thème personnalisé (palette Hoptisens complète)
├── middleware.ts                   # Middleware pour router les langues next-intl
└── .env                           # Clés API (voir section Variables d'environnement)
```

## 4. Variables d'environnement

```env
GEMINI_API_KEY=       # Clé API Google Gemini (agent IA)
RESEND_API_KEY=       # Clé API Resend (emails transactionnels)
CONTACT_EMAIL=        # Email de réception des leads
NEXT_PUBLIC_URL=      # https://hoptisens.com
```

## 5. Points d'attention critiques

1. **Performance Client vs Serveur** : Les composants comme la `Navbar`, `SchemaAnime` ou `ChatAgent` doivent absolument être encadrés par la directive `"use client"`. Néanmoins, la structure des pages et le texte (SEO) doivent rester en Server Components le plus possible.
2. **Accessibilité et animations** : Mettre en place la règle `(prefers-reduced-motion: reduce)` avec Tailwind et Framer pour couper les animations lourdes du Schéma SVG, des cascades de texte et des transitions de page pour les utilisateurs qui en ont besoin.
3. **Complexité du SVG** : L'animation `strokeDasharray` sur les `path` demande une configuration soignée : tous les chemins (flèches) à animer via `pathLength` ne doivent pas avoir de fill interne mais exclusivement un `stroke`. Utiliser `motion.path` de Framer Motion au lieu des balises SVG classiques.
4. **Structure sans `src/`** : Le projet est initialisé avec `--src-dir=false`. Tous les dossiers (`app/`, `components/`, `hooks/`, `lib/`, `messages/`) sont à la racine du projet.
5. **Performance des animations** : Uniquement `transform` et `opacity` pour les animations (pas de `height`, `width`, `top`). Utiliser `will-change: transform` uniquement sur les éléments animés. Viser `60fps` constant.
