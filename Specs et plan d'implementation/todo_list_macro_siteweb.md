# Todo List Macro — Développement hoptisens.com

**Date** : Mars 2026  
**Durée totale estimée** : 14 jours ouvrés  

> **Légende** : 🔴 Critique &nbsp;|&nbsp; 🟠 Important &nbsp;|&nbsp; 🟡 Normal &nbsp;|&nbsp; 🟢 Optionnel  

---

## Phase 1 — Setup & Fondations (Jour 1)

- [ ] 🔴 Initialiser le projet Next.js 14 (`--typescript --tailwind --app --src-dir=false`)
- [ ] 🔴 Installer toutes les dépendances (framer-motion, next-intl, ai, geist, lucide-react, resend, clsx, tailwind-merge)
- [ ] 🔴 Créer l'arborescence complète des dossiers (`components/`, `hooks/`, `lib/`, `messages/`, `public/`)
- [ ] 🔴 Configurer Tailwind avec la palette de couleurs Hoptisens complète
- [ ] 🔴 Configurer les shadows, border-radius et spacing custom dans Tailwind
- [ ] 🔴 Configurer les Fonts (Geist Sans, Inter, Geist Mono) dans le layout principal
- [ ] 🟠 Créer le fichier `.env.local` avec les 4 variables d'environnement
- [ ] 🟠 Connecter le repo Git à Vercel (CI/CD)
- [ ] 🟠 Premier déploiement vide sur Vercel
- [ ] 🟡 Connecter le domaine `hoptisens.com` (DNS A/CNAME)
- [ ] 🟡 Configurer les variables d'environnement sur Vercel (Production + Preview)

---

## Phase 2 — Design System & Composants UI (Jours 2-3)

### Composants UI (`components/ui/`)

- [ ] 🔴 `Button.tsx` — 3 variants (primary, secondary, ghost) + micro-animations hover/click
- [ ] 🔴 `Card.tsx` — Style de base + hover animation (`translateY`, `shadow-md`, `border-color`)
- [ ] 🟠 `Badge.tsx` — Variants default et accent
- [ ] 🟠 `Tag.tsx` — Style uppercase, letter-spacing
- [ ] 🔴 `Section.tsx` — Wrapper avec padding responsive (96px desktop / 64px mobile)
- [ ] 🔴 `Container.tsx` — Max-width 1200px + padding horizontal responsive
- [ ] 🟠 `FadeInUp.tsx` — Wrapper réutilisable pour scroll reveal (Framer Motion `whileInView`)

### Composants Layout (`components/layout/`)

- [ ] 🔴 `Navbar.tsx` — Structure statique (logo + liens + CTA + slot langue)
- [ ] 🔴 `Navbar.tsx` — Version mobile (hamburger + menu plein écran)
- [ ] 🔴 `Footer.tsx` — 4 colonnes (logo/tagline, offres, liens, contact) + responsive

### Utilitaires

- [ ] 🟠 `lib/utils.ts` — Fonction `cn()` (clsx + tailwind-merge)

---

## Phase 3 — Pages statiques (Jours 4-7)

### Page Accueil `/` (Jour 4)

- [ ] 🔴 `page.tsx` — Layout de la page d'accueil avec toutes les sections
- [ ] 🔴 `Hero.tsx` — Pré-titre badge + titre H1 + sous-titre + 2 CTAs + mesh gradient (statique)
- [ ] 🔴 `SchemaAnime.tsx` — Structure HTML/SVG complète (sticky + 3 phases) — **sans animations**
  - [ ] 🔴 Phase 1 : 3 nœuds gris + flèches tirets (SVG inline)
  - [ ] 🔴 Phase 2 : Nœud central HOPTISENS + lignes de connexion
  - [ ] 🔴 Phase 3 : 3 nouveaux nœuds (Agent IA, CRM Automatisé, Dashboard Pilotage)
- [ ] 🟠 `Chiffres.tsx` — Grille 4 colonnes, valeurs statiques (-80%, +3×, 10 jours, 100%)
- [ ] 🔴 `Offres.tsx` — Grille 2×2 des 4 catégories d'offres (cartes avec liens)
- [ ] 🟠 `Sprint.tsx` — Bloc pleine largeur mise en avant Sprint (490€ HT)
- [ ] 🟢 `Temoignages.tsx` — Carrousel horizontal placeholder (optionnel au lancement)

### Page Offres `/offres` (Jour 5)

- [ ] 🔴 Hero de page (titre + description)
- [ ] 🔴 4 sections détaillées (une par catégorie d'offres) avec ancres `#categorie-x`
- [ ] 🔴 Liste complète des services par catégorie
- [ ] 🟠 CTA bas de page — Bloc Sprint mis en avant

### Landing Sprint `/offres/sprint` (Jour 5)

- [ ] 🔴 Hero avec badge prix + titre + promesse
- [ ] 🔴 Section livrables (note de synthèse, fiches détaillées, devis)
- [ ] 🔴 Timeline visuelle 3 étapes (J1-J2, J3-J8, J9-J10)
- [ ] 🟠 Bloc tarif centré + mention avoir déductible
- [ ] 🟠 CTA vers `/contact` avec contexte Sprint

### Landing Lead Gen `/offres/leads` (Jour 6)

- [ ] 🔴 Hero "Alimentez votre pipeline, automatiquement."
- [ ] 🔴 3 cartes offres : Prospecteur Augmenté, Filtre IA, Système Contenu-Contact
- [ ] 🟠 CTA vers `/contact`

### Page À propos `/a-propos` (Jour 6)

- [ ] 🔴 Hero "Notre raison d'être" + vision 2030
- [ ] 🔴 3 blocs Vision / Mission / Stratégie (grille avec icônes Lucide)
- [ ] 🟠 Timeline "L'approche Hoptisens" (Diagnostic → Construction → Transfert)
- [ ] 🟠 CTA bas de page → `/contact`

### Page Contact `/contact` (Jour 7)

- [ ] 🔴 Titre + sous-titre explicatif
- [ ] 🟠 Placeholder pour l'interface chat (zone réservée)
- [ ] 🟡 Coordonnées discrètes en fallback (email direct)

### Navigation & Transitions

- [ ] 🟠 `template.tsx` — Wrapper AnimatePresence pour transitions de pages

---

## Phase 4 — Motion Design & Animations (Jours 8-9)

### Animations Navbar (Jour 8)

- [ ] 🔴 Scroll compact Navbar (`useScroll` + `useTransform` — padding, bg, blur, shadow, logo)
- [ ] 🟠 Hover underline slide-in sur les liens nav
- [ ] 🟠 Menu mobile : stagger slide-in des liens depuis la droite

### Animations Hero (Jour 8)

- [ ] 🔴 Stagger reveal du titre H1 : mot par mot (`y:20→0`, `opacity:0→1`, `0.08s/mot`)
- [ ] 🟠 Badge pré-titre : `fadeIn + slideDown`, `400ms`
- [ ] 🟠 Sous-titre + CTAs : fadeIn séquentiel avec délais
- [ ] 🔴 Mesh gradient animé : CSS `@keyframes` dérive lente (`8s infinite`)

### Scroll Reveal Sections (Jour 8)

- [ ] 🔴 Activer `FadeInUp` sur toutes les sections (`whileInView`, `once: true`)
- [ ] 🟠 Stagger enfants (`0.1s` entre chaque)

### Animations Cartes & Boutons (Jour 8)

- [ ] 🟠 Hover cartes : `translateY(-4px)`, `shadow-md`, `border-color`
- [ ] 🟡 Click boutons : `scale: 0.97`

### Counter Animé Chiffres (Jour 8)

- [ ] 🟠 Counter de 0 → valeur cible, `1500ms`, `easeOut`, `whileInView`

### ⚠️ Schéma SVG Scroll-Driven (Jour 9) — **COMPOSANT LE PLUS COMPLEXE**

- [ ] 🔴 Hook custom `useScrollTransform.ts`
- [ ] 🔴 Phase 1 (0%-30%) : `fadeIn + scaleIn` stagger sur 3 nœuds + `pathLength` sur flèches tirets
- [ ] 🔴 Phase 2 (30%-60%) : Apparition nœud HOPTISENS (`scale:0→1`) + dessin connexions (`pathLength`)
- [ ] 🔴 Phase 2→3 : Interpolation couleur nœuds (gris → bleu `#2A5BFF`)
- [ ] 🔴 Phase 3 (60%-100%) : Tirets → Flèches pleines + 3 nouveaux nœuds + points `flowDot` + badge counter
- [ ] 🟠 Vérifier performance 60fps

### Transitions de Pages (Jour 9)

- [ ] 🟠 Activer AnimatePresence dans `template.tsx` (sortie `200ms`, entrée `300ms`)

### Accessibilité (Jour 9)

- [ ] 🔴 Implémenter `prefers-reduced-motion: reduce` (Tailwind + Framer)
- [ ] 🔴 Désactiver animations lourdes pour les utilisateurs qui le demandent

---

## Phase 5 — Agent IA Conversationnel (Jours 10-11)

### Backend (Jour 10)

- [ ] 🔴 `app/api/chat/route.ts` — Route Handler Vercel AI SDK + Google Gemini API
- [ ] 🔴 System prompt de qualification (FR) — guide la conversation en 4 questions + coordonnées
- [ ] 🔴 Logique de recommandation dynamique (5 profils → 5 recommandations)
- [ ] 🔴 Intégration Resend — envoi email structuré à la fin de la conversation
- [ ] 🟠 Rate limiting via Vercel Edge (max 10 messages/session)
- [ ] 🟠 Sécuriser le system prompt (non exposé côté client)

### Frontend (Jour 11)

- [ ] 🔴 `ChatAgent.tsx` — Interface chat avec `useChat` (streaming)
- [ ] 🔴 Design des bulles : agent (fond `--surface`, gauche) + utilisateur (fond `--accent-soft`, droite)
- [ ] 🟠 Avatar agent : initiales "H" dans cercle `--accent`
- [ ] 🟠 Animation apparition fenêtre chat (`scaleY:0.95→1`, `300ms`)
- [ ] 🟠 Animation apparition bulles (`y:8→0`, `opacity:0→1`, `200ms`)
- [ ] 🟡 Indicateur de frappe (3 dots pulsants)
- [ ] 🟡 Scroll automatique vers le dernier message
- [ ] 🟡 Message de fallback si rate limit atteint

---

## Phase 6 — Internationalisation FR / EN (Jour 12)

### Configuration

- [ ] 🔴 `lib/i18n.ts` — Configuration next-intl
- [ ] 🔴 `middleware.ts` — Middleware de routing par locale (FR par défaut, cookie + Accept-Language)

### Traductions

- [ ] 🔴 `messages/fr.json` — Toutes les chaînes en français
- [ ] 🔴 `messages/en.json` — Toutes les chaînes en anglais
- [ ] 🟠 Métadonnées SEO traduites par page (title, description, og:title)
- [ ] 🟠 System prompt agent IA en anglais

### Routing bilingue

- [ ] 🔴 URLs localisées : `/a-propos` ↔ `/en/about`, `/offres` ↔ `/en/services`, etc.
- [ ] 🟠 Switcher FR|EN dans la navbar (conserve le path courant)
- [ ] 🟠 Balises `hreflang` dans le layout

### Vérification

- [ ] 🔴 Convertir tous les textes en dur vers `useTranslations()`
- [ ] 🟠 Vérifier qu'aucun texte brut ne reste dans les composants

---

## Phase 7 — SEO & Performances (Jour 13)

### Métadonnées

- [ ] 🔴 `metadata` Next.js pour chaque page (title template `%s | Hoptisens`, description, og:, twitter:)
- [ ] 🔴 Balises `og:` et `twitter:` sur chaque page

### Fichiers SEO

- [ ] 🔴 `app/sitemap.ts` — Sitemap dynamique (toutes les URL FR + EN)
- [ ] 🔴 `app/robots.ts` — Configuration robots.txt
- [ ] 🟠 JSON-LD `Organization` + `WebSite` dans le layout

### Performance

- [ ] 🔴 Audit Lighthouse → corriger si score < 90
- [ ] 🔴 Core Web Vitals : LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] 🟠 Tree-shaking des imports Framer Motion
- [ ] 🟠 Lazy loading composants lourds (`SchemaAnime`, `ChatAgent`)
- [ ] 🟡 Vérification bundle size

### Analytics

- [ ] 🟠 Activer Vercel Analytics (intégré)
- [ ] 🟢 Optionnel : intégrer Plausible Analytics (RGPD-friendly)

---

## Phase 8 — Tests & Go Live (Jour 14)

### Tests Responsive

- [ ] 🔴 Tester 375px (mobile)
- [ ] 🔴 Tester 768px (tablette)
- [ ] 🔴 Tester 1280px (laptop)
- [ ] 🔴 Tester 1440px (desktop)

### Tests Cross-Browser

- [ ] 🔴 Chrome — Test complet
- [ ] 🟠 Firefox — Vérifier backdrop-filter, animations SVG
- [ ] 🟠 Safari — Vérifier animations CSS, position sticky, backdrop-filter
- [ ] 🟡 Edge — Test global

### Tests Fonctionnels

- [ ] 🔴 Agent IA : conversation complète test en FR
- [ ] 🔴 Agent IA : conversation complète test en EN
- [ ] 🔴 Email Resend : vérifier réception et format
- [ ] 🟠 Rate limiting : vérifier blocage après 10 messages
- [ ] 🟠 Switcher de langue : test sur toutes les pages
- [ ] 🟠 Tous les liens internes : vérifier destinations
- [ ] 🟠 Tous les CTAs : vérifier actions
- [ ] 🟡 Contexte Sprint pré-rempli si vient de `/offres/sprint`

### Checklist Go Live

- [ ] 🔴 Variables d'environnement de production sur Vercel ✓
- [ ] 🔴 Domaine `hoptisens.com` pointé vers Vercel ✓
- [ ] 🔴 SSL actif (automatique Vercel) ✓
- [ ] 🔴 Sitemap accessible sur `hoptisens.com/sitemap.xml` ✓
- [ ] 🟠 Analytics Vercel activé ✓
- [ ] 🟠 `prefers-reduced-motion` vérifié ✓
- [ ] 🟠 Lighthouse score > 90 sur toutes les pages ✓
- [ ] 🟡 Console navigateur sans erreurs ✓
- [ ] 🟡 Test sur connexion lente (throttle 3G) ✓

### Mise en ligne

- [ ] 🔴 Merge `develop` → `main`
- [ ] 🔴 Vérifier déploiement automatique Vercel
- [ ] 🔴 Vérifier accès `hoptisens.com`
- [ ] 🔴 Test final post-déploiement

---

## Récapitulatif

| Phase | Nb tâches | Critiques 🔴 | Importantes 🟠 | Normales 🟡 | Optionnelles 🟢 |
|---|---|---|---|---|---|
| 1. Setup | 11 | 6 | 3 | 2 | 0 |
| 2. Design System | 11 | 6 | 4 | 0 | 0 |
| 3. Pages statiques | 24 | 16 | 7 | 1 | 1 |
| 4. Motion Design | 15 | 9 | 5 | 1 | 0 |
| 5. Agent IA | 14 | 5 | 5 | 4 | 0 |
| 6. i18n | 10 | 5 | 4 | 0 | 0 |
| 7. SEO & Perfs | 10 | 4 | 4 | 1 | 1 |
| 8. Tests & Go Live | 21 | 12 | 7 | 3 | 0 |
| **TOTAL** | **116** | **63** | **39** | **12** | **2** |

---

_Document généré le 13 Mars 2026 — Basé sur ARCHITECTURE.md et SPECS_FONCTIONNELLES.md_
