# Spécifications Fonctionnelles — hoptisens.com

**Version** : 1.0  
**Date** : Mars 2026  
**Statut** : Référence de conception

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Cible & Positionnement](#2-cible--positionnement)
3. [Architecture des pages](#3-architecture-des-pages)
4. [Design System](#4-design-system)
5. [Composants globaux](#5-composants-globaux)
6. [Pages — Détail fonctionnel](#6-pages--détail-fonctionnel)
7. [Schéma animé scroll-driven (Hero)](#7-schéma-animé-scroll-driven-hero)
8. [Agent IA conversationnel (Contact)](#8-agent-ia-conversationnel-contact)
9. [Motion Design — Catalogue complet](#9-motion-design--catalogue-complet)
10. [Internationalisation (FR / EN)](#10-internationalisation-fr--en)
11. [Stack technique](#11-stack-technique)
12. [Déploiement](#12-déploiement)
13. [Phases de développement](#13-phases-de-développement)

---

## 1. Présentation du projet

### Identité

- **Nom** : Hoptisens
- **Domaine** : hoptisens.com
- **Type** : Agence IA & Automatisation
- **Slogan** : "Simplifier pour Amplifier"

### Vision

D'ici 2030, la relation au travail va drastiquement changer. Les outils boostés à l'IA seront omniprésents. Hoptisens construit un avenir souhaitable avant de le subir.

### Mission

Permettre aux entreprises d'anticiper ce changement plutôt que de le subir, en installant les bases d'une architecture d'entreprise flexible, orientée IA et responsable.

### Objectifs du site

- Générer des prises de contact qualifiées via un agent IA conversationnel
- Présenter clairement les 4 catégories d'offres + l'offre Sprint
- Incarner l'expertise IA par le design et les animations
- Être bilingue FR / EN dès le lancement

---

## 2. Cible & Positionnement

### Marché cible

- **TPE et PME** : 10 à 300 collaborateurs
- **Secteurs** : Agences marketing, ESN, SSII, Sociétés de conseils, tous secteurs avec processus répétitifs et des cols blancs (personnes travaillant avec un ordinateur, économie de l'information..).
- **Décideurs** : Responsables opérationnels, Directeur commercial, Dirigeants, CEO, CSO, DAF, responsables opérations, DSI

### Personas principaux

| Persona | Profil | Besoin principal |
|---|---|---|
| Le Dirigeant | PDG / Gérant, 40-55 ans | Gagner du temps, réduire les coûts opérationnels |
| L'Opérationnel | DAF / Responsable ops | Automatiser les tâches répétitives, fiabiliser les données |
| Le Visionnaire | CTO / DSI | Intégrer l'IA de façon responsable et mesurable |
| Le Commercial | CSO / Responsable des ventes & marketing | Gagner du temps, fluidifier les processus de vente, améliorer la qualité des leads, se focaliser sur la relation humaine |

### Positionnement

Hoptisens ne vend pas un logiciel, ni une simple formation. Elle co-construit avec ses clients une **architecture d'entreprise augmentée**, étape par étape, avec un ROI mesurable.

---

## 3. Architecture des pages

### Routing bilingue

```
/                        → Accueil (FR)
/en                      → Home (EN)

/a-propos                → À propos (FR)
/en/about                → About (EN)

/offres                  → Offres (FR)
/en/services             → Services (EN)

/offres/sprint           → Sprint Processus Performants (FR)
/en/services/sprint      → Sprint Efficient Processes (EN)

/offres/leads            → Offres Lead Gen (FR)
/en/services/leads       → Lead Gen Services (EN)

/contact                 → Contact + Agent IA (FR)
/en/contact              → Contact + AI Agent (EN)
```

### Hiérarchie des composants

```
app/
├── [locale]/
│   ├── layout.tsx           → Layout global (Navbar + Footer)
│   ├── page.tsx             → Accueil
│   ├── a-propos/page.tsx    → À propos
│   ├── offres/
│   │   ├── page.tsx         → Vue d'ensemble offres
│   │   ├── sprint/page.tsx  → Landing Sprint
│   │   └── leads/page.tsx   → Landing Lead Gen
│   └── contact/page.tsx     → Contact + Agent IA
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SchemaAnime.tsx
│   │   ├── Offres.tsx
│   │   ├── Chiffres.tsx
│   │   ├── Sprint.tsx
│   │   └── Temoignages.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Tag.tsx
│   └── agent/
│       └── ChatAgent.tsx
└── lib/
    ├── i18n.ts
    └── ai.ts
```

---

## 4. Design System

### 4.1 Palette de couleurs

| Token CSS | Valeur HEX | Usage |
|---|---|---|
| `--bg` | `#FAFAF9` | Fond principal (blanc chaud) |
| `--surface` | `#F2F1EF` | Fonds de cartes, sections alternées |
| `--surface-hover` | `#ECEAE6` | Hover sur cartes |
| `--border` | `#E4E2DE` | Bordures fines, séparateurs |
| `--text-primary` | `#1A1916` | Titres, corps principal |
| `--text-secondary` | `#4B4A45` | Textes d'appui |
| `--text-muted` | `#78766F` | Labels, légendes, placeholders |
| `--accent` | `#2A5BFF` | Bleu électrique — CTA, highlights, liens actifs |
| `--accent-hover` | `#1A47E8` | Hover sur éléments accent |
| `--accent-soft` | `#EEF2FF` | Fond de badges, tags |
| `--accent-border` | `#C7D3FF` | Bordure des éléments accent |
| `--success` | `#16A34A` | États positifs, badges "Haute priorité" |
| `--warning` | `#D97706` | États d'alerte |

### 4.2 Typographie

| Rôle | Police | Poids | Taille | Notes |
|---|---|---|---|---|
| Hero titre | Geist | 800 | 72-96px | Tracking `-0.04em`, responsive |
| Titre H2 | Geist | 700 | 40-56px | Tracking `-0.02em` |
| Titre H3 | Geist | 600 | 28-36px | |
| Corps | Inter | 400 | 16-18px | Line-height 1.65 |
| Corps bold | Inter | 600 | 16px | Emphases, bullet points |
| Label / Tag | Inter | 500 | 11-12px | Uppercase, letter-spacing `0.08em` |
| Mono / Data | Geist Mono | 400 | 13-14px | Chiffres clés, codes |

**Installation** :

```bash
npm install geist
```

```tsx
// app/layout.tsx
import { GeistSans, GeistMono } from 'geist/font'
```

### 4.3 Spacing & Layout

- **Grille** : 12 colonnes, gutter 24px, max-width `1200px`, padding horizontal `24px` (mobile) / `48px` (desktop)
- **Sections** : `padding-y: 96px` (desktop) / `64px` (mobile)
- **Radius** : `8px` (boutons, inputs), `12px` (cartes), `16px` (grandes cartes), `9999px` (pills/badges)
- **Ombres** :
  - `shadow-sm` : `0 1px 3px rgba(0,0,0,0.06)`
  - `shadow-md` : `0 4px 16px rgba(0,0,0,0.08)`
  - `shadow-lg` : `0 8px 32px rgba(0,0,0,0.12)`

### 4.4 Composants UI de base

**Button variants :**

```
Primary   : bg-accent text-white, hover bg-accent-hover
Secondary : bg-surface border-border text-primary, hover bg-surface-hover
Ghost     : bg-transparent border-border text-primary, hover bg-surface
```

**Badge / Tag :**

```
Default : bg-surface border-border text-muted, 11px uppercase
Accent  : bg-accent-soft border-accent-border text-accent, 11px uppercase
```

**Card :**

```
Base    : bg-surface border border-border rounded-xl p-6
Hover   : shadow-md, translateY(-2px), border-color → accent-border
Durée   : 200ms ease
```

---

## 5. Composants globaux

### 5.1 Navbar — comportement scroll compact (inspiré twine.com)

**Structure :**

```
[ Logo Hoptisens ]   [ Offres · À propos · Contact ]   [ FR|EN · Prendre RDV → ]
```

**Comportement dynamique (Framer Motion `useScroll`) :**

| Propriété | État initial (top) | État compact (scroll > 80px) |
|---|---|---|
| `padding-y` | `20px` | `10px` |
| `background` | `transparent` | `rgba(250,250,249,0.92)` |
| `backdrop-filter` | `none` | `blur(12px)` |
| `box-shadow` | `none` | `0 1px 0 #E4E2DE` |
| `logo height` | `32px` | `24px` |
| Transition | — | `300ms easeInOut` |

**Implémentation :**

```tsx
const { scrollY } = useScroll()
const paddingY = useTransform(scrollY, [0, 80], [20, 10])
const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92])
const logoHeight = useTransform(scrollY, [0, 80], [32, 24])
```

**Menu mobile :**

- Hamburger → menu plein écran avec fond `--bg`
- Liens animés en stagger (slide-in depuis la droite)
- CTA "Prendre RDV" en bas du menu

**Switcher de langue :**

- Toggle FR | EN en haut à droite de la navbar
- Conserve le path courant en changeant le locale

---

### 5.2 Footer

**Colonnes :**

```
[ Logo + Tagline ]   [ Offres ]   [ Liens ]   [ Contact ]
```

- Copyright, liens légaux (mentions légales, RGPD)
- Icônes réseaux sociaux (LinkedIn, minimal)
- Fond `--surface`, bordure top `--border`

---

## 6. Pages — Détail fonctionnel

### 6.1 Page Accueil (`/`)

#### Section 1 — Hero

**Contenu textuel :**

- **Pré-titre** (tag badge) : `AGENCE IA & AUTOMATISATION`
- **Titre H1** : `Simplifiez pour Amplifier.` (FR) / `Simplify to Amplify.` (EN)
- **Sous-titre** : "Nous aidons les TPE et PME à anticiper la transformation IA plutôt que de la subir. En construisant avec vous une architecture d'entreprise flexible, mesurable et responsable."
- **CTA Principal** : `Démarrer votre diagnostic →` (→ `/offres/sprint`)
- **CTA Secondaire** : `Voir nos offres` (→ `/offres`, ghost button)

**Background :**

- Mesh gradient animé en CSS pur : 3 cercles de couleur (`#2A5BFF20`, `#7C3AED15`, `#F59E0B10`) qui dérivent lentement via `@keyframes`
- Pas d'image, pas de photo

**Animation du titre :**

- Chaque mot apparaît en stagger avec `y: 20 → 0` + `opacity: 0 → 1`
- Délai entre mots : `0.08s`
- Durée par mot : `0.5s`

#### Section 2 — Schéma animé scroll-driven

Voir section 7 pour le détail complet.

#### Section 3 — Chiffres clés

**Disposition** : Grille 4 colonnes (2 sur mobile)

| Chiffre | Label |
|---|---|
| `-80%` | temps de prospection |
| `+3×` | ROI moyen constaté |
| `10 jours` | pour un premier livrable |
| `100%` | TPE & PME accompagnées |

**Animation** : Counter animé de `0` vers la valeur cible déclenché au `whileInView`

#### Section 4 — Présentation des 4 offres

**Disposition** : Grille 2×2 (cartes), puis 1 colonne sur mobile

**Cartes :**

```
┌─────────────────────────────┐
│ [Tag] CATÉGORIE 1           │
│                             │
│ L'Étude & Les Plans         │
│ ─────────────────           │
│ Audit · Cartographie        │
│ Diagnostic · Stratégie      │
│                             │
│ [ En savoir plus → ]        │
└─────────────────────────────┘
```

Chaque carte pointe vers `/offres#categorie-x`

**4 catégories :**

1. `L'Étude & Les Plans` — Stratégie & Diagnostics
2. `Le Gros Œuvre` — Ingénierie & Déploiement
3. `Les Réseaux d'Acquisition` — Visibilité & Conversion
4. `Le Transfert de Compétences` — Hopti-Learn

#### Section 5 — Mise en avant Sprint

**Format** : Bloc pleine largeur, fond `--accent-soft`, bordure `--accent-border`

**Contenu :**

- Badge : `OFFRE D'ENTRÉE`
- Titre : `Sprint "Processus Performants"`
- Accroche : _"On ne vous propose pas un service, on initie votre transformation."_
- Sous-texte : "En 10 jours ouvrés, identifiez les 2 processus à fort ROI. 490€ HT — déductibles de la mission d'implémentation."
- CTA : `Démarrer le Sprint →`

#### Section 6 — Témoignages (optionnel au lancement)

Carrousel horizontal, 3 citations, auto-scroll toutes les 5s.

---

### 6.2 Page À propos (`/a-propos`)

**Sections :**

1. **Hero** : Titre "Notre raison d'être" + sous-titre vision 2030
2. **Vision / Mission / Stratégie** : 3 blocs en grille (icône + titre + texte)
   - Vision : D'ici 2030, notre relation au travail va changer radicalement
   - Mission : Simplifier pour Amplifier
   - Stratégie : Sensibiliser → Co-construire → Accompagner
3. **L'approche Hoptisens** : Timeline en 3 étapes (Diagnostic → Construction → Transfert)
4. **CTA bas de page** : Vers `/contact`

---

### 6.3 Page Offres (`/offres`)

**Structure :**

**Hero de page :** Titre + description courte

**4 sections d'offres (une par catégorie) :**

```
Catégorie 1 : L'Étude & Les Plans
─────────────────────────────────
Sous-titre : "L'analyse de l'existant pour concevoir une architecture solide."

Liste de services :
• Audit de l'infrastructure de données
• Audit et cartographie des processus automatisables
• Audit de l'architecture commerciale
• Diagnostic de maturité IA

Catégorie 2 : Le Gros Œuvre
────────────────────────────
• Conception d'agents IA et d'automatisations de processus
• Interconnexion des outils existants (câblage logiciel)
• Développement de CRM semi-automatisés
• Web Apps métiers & tableaux de bord interactifs

Catégorie 3 : Les Réseaux d'Acquisition
─────────────────────────────────────────
• Génération et qualification automatisée de leads
• Écosystèmes web orientés conversion
• Infrastructures de pages optimisées SEO
• Usine à contenus : génération multi-canaux IA

Catégorie 4 : Le Transfert de Compétences (Hopti-Learn)
────────────────────────────────────────────────────────
• Ateliers "Les Fondamentaux de l'IA"
• Formation : Créer ses propres assistants IA métiers
• Agents formateurs internes pour l'onboarding
```

**CTA de bas de page :** Bloc Sprint mis en avant

---

### 6.4 Landing Sprint (`/offres/sprint`)

**Structure :**

1. **Hero** :
   - Badge : `OFFRE D'ENTRÉE · 490€ HT`
   - Titre H1 : `Sprint "Processus Performants"`
   - Promesse : "En 10 jours ouvrés, nous ciblons les 2 processus où l'optimisation aura un ROI rapide et opérationnel."

2. **Ce que vous recevez** (livrables) :
   - Note de synthèse 1 page (problème + solution + ROI)
   - 2 fiches détaillées avec plan d'action et outils
   - Devis pour la phase d'implémentation

3. **Comment ça marche** (timeline visuelle 3 étapes) :
   - Étape 1 : Entretien de cadrage (J1-J2)
   - Étape 2 : Analyse & modélisation (J3-J8)
   - Étape 3 : Restitution & livrable (J9-J10)

4. **Le tarif** :
   - Bloc centré : `490€ HT`
   - Mention : "Ce montant devient un avoir déductible si vous continuez avec nous."

5. **CTA** : Formulaire simplifié ou redirection vers `/contact` avec le contexte Sprint pré-rempli dans l'agent IA

---

### 6.5 Landing Lead Gen (`/offres/leads`)

**Structure :**

1. **Hero** : Titre "Alimentez votre pipeline, automatiquement."

2. **3 offres spécialisées (cartes)** :

   **Le Prospecteur Augmenté** (Outbound)
   > Scraping + qualification IA + rédaction de premières approches ultra-personnalisées. -80% de temps de prospection manuelle.

   **Le Filtre IA** (Inbound)
   > Agent conversationnel sur votre site. Pose les bonnes questions, évalue le potentiel, ne remonte que les leads chauds dans votre CRM.

   **Le Système Contenu-Contact** (Hybride)
   > SEO + génération IA de contenu + qualification + CRM automatisé. L'offre clé en main.

3. **CTA** : `Discutons de votre pipeline →` (→ `/contact`)

---

### 6.6 Page Contact (`/contact`)

**Structure :**

1. **Titre** : "Parlons de votre transformation."
2. **Sous-titre** : "Notre assistant IA va vous poser quelques questions pour comprendre votre situation. Vous recevrez ensuite une réponse personnalisée sous 24h."
3. **Interface Agent IA** (voir section 8)
4. **Coordonnées discrètes** (sous le chat) : email direct en fallback

---

## 7. Schéma animé scroll-driven (Hero)

### Concept général

Inspiré du style **makingsoftware.com** : un schéma SVG en position `sticky` qui évolue progressivement au fur et à mesure que l'utilisateur scrolle. Le schéma représente la **transformation d'une entreprise classique en entreprise augmentée** grâce à Hoptisens.

**Titre de section** (au-dessus du schéma, sticky) :
> "De vos processus actuels à votre entreprise augmentée"

### Zones de scroll et états du schéma

La section a une hauteur de `300vh` pour permettre un scroll lent. Le schéma SVG est en `position: sticky; top: 10%`.

```
Scroll  0% → 30%  : Phase 1 — L'entreprise avant
Scroll 30% → 60%  : Phase 2 — L'intervention Hoptisens
Scroll 60% → 100% : Phase 3 — L'entreprise augmentée
```

---

### Phase 1 — "Avant" (scroll 0% → 30%)

**Apparence :**

- 3 nœuds rectangulaires gris, connectés par des **flèches en tirets** (processus manuels, lents)
- Couleur des nœuds : `#D1D5DB` (gris neutre)
- Couleur des flèches : `#9CA3AF` (gris moyen), style `stroke-dasharray: 6 4`

**Labels des nœuds :**

```
[ Prospection manuelle ]  →→→  [ Saisie de données ]  →→→  [ Reporting Excel ]
```

**Animation d'entrée :**

- Chaque nœud apparaît en `fadeIn` + `scaleIn` depuis `0.8` à `1.0`
- Stagger : `0.2s` entre chaque nœud
- Les flèches se dessinent via `pathLength: 0 → 1` après les nœuds

---

### Phase 2 — "L'intervention Hoptisens" (scroll 30% → 60%)

**Apparence :**

- Un nœud central `HOPTISENS` apparaît en fondu au centre du schéma (cercle avec logo/initiales)
- Des **lignes de connexion** s'animent depuis ce nœud vers chacun des 3 nœuds existants
- Effet "câblage progressif" : `pathLength: 0 → 1` sur chaque ligne de connexion
- Les 3 nœuds commencent à changer de couleur (gris → bleu accent, via interpolation de couleur)

**Animation :**

- Nœud central : `scale: 0 → 1` + `opacity: 0 → 1`
- Lignes de connexion : dessin séquentiel, `pathLength` piloté par `useTransform(scrollProgress, [0.3, 0.6], [0, 1])`
- Couleur des nœuds : interpolation CSS via `useTransform`

---

### Phase 3 — "Après" (scroll 60% → 100%)

**Apparence :**

- Les flèches en tirets deviennent des **flèches pleines** et animées
- 3 **nouveaux nœuds** apparaissent en bas du schéma :

  ```
  [ Agent IA ]    [ CRM Automatisé ]    [ Dashboard Pilotage ]
  ```

- Des **points animés** voyagent le long des connexions (effet de flux de données)
- Un **badge compteur** apparaît : `−80% temps opérationnel` avec counter animé

**Couleurs finales :**

- Nœuds sources : `--accent` bleu
- Nouveaux nœuds : `--surface` avec bordure `--accent`
- Lignes de flux : `--accent` avec opacité `0.6`
- Points voyageurs : `--accent`, radius `4px`

**Animation des points voyageurs (flux) :**

```css
@keyframes flowDot {
  from { offset-distance: 0%; }
  to   { offset-distance: 100%; }
}
/* offset-path: path('...') */
```

---

### Implémentation technique

```tsx
// components/sections/SchemaAnime.tsx

const { scrollYProgress } = useScroll({ target: sectionRef })

// Phase 1 → Phase 2 : apparition nœud Hoptisens
const hoptiScale   = useTransform(scrollYProgress, [0.30, 0.45], [0, 1])
const hoptiOpacity = useTransform(scrollYProgress, [0.30, 0.45], [0, 1])

// Phase 2 : dessin des connexions
const pathLength1 = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
const pathLength2 = useTransform(scrollYProgress, [0.40, 0.60], [0, 1])
const pathLength3 = useTransform(scrollYProgress, [0.45, 0.60], [0, 1])

// Phase 2 → Phase 3 : changement couleur nœuds
const nodeColor = useTransform(scrollYProgress, [0.5, 0.7], ['#D1D5DB', '#2A5BFF'])

// Phase 3 : apparition nouveaux nœuds
const newNodesOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1])
const newNodesY       = useTransform(scrollYProgress, [0.65, 0.85], [20, 0])
```

---

## 8. Agent IA conversationnel (Contact)

### Interface

- Fenêtre de chat intégrée dans la page (pas de popup)
- Largeur max `640px`, centré
- Design sobre : fond blanc, bulles avec coins arrondis
- Message de l'agent : fond `--surface`, aligné à gauche
- Message de l'utilisateur : fond `--accent-soft`, aligné à droite
- Avatar agent : initiales "H" dans un cercle `--accent`

### Flux de conversation (scénario type)

```
Agent  → "Bonjour ! Je suis l'assistant Hoptisens.
          Pour vous proposer la meilleure approche,
          j'ai besoin de vous poser 4 courtes questions.
          C'est parti ?"

User   → [Oui]

Agent  → "Dans quel secteur évolue votre entreprise,
          et combien de personnes travaillent avec vous ?"

User   → "On est dans la logistique, 45 personnes."

Agent  → "Parfait. Aujourd'hui, quelle est votre
          principale douleur opérationnelle ?
          (prospection, reporting, traitement de données,
          onboarding, autre)"

User   → "Le reporting, on passe des heures sur Excel."

Agent  → "Je comprends. Avez-vous déjà utilisé des
          outils IA ou d'automatisation, ou est-ce
          une première exploration ?"

User   → "On a essayé ChatGPT mais rien de structuré."

Agent  → "Dernière question : quel est votre horizon
          de temps pour initier ce type de projet ?"

User   → "D'ici 3 mois idéalement."

Agent  → "Merci pour ces informations. Voici ce que
          je vous recommande : [RECOMMANDATION DYNAMIQUE]

          Un membre de l'équipe Hoptisens va revenir
          vers vous sous 24h avec une proposition adaptée.

          Pour finaliser, pouvez-vous me laisser votre
          prénom et votre email ?"
```

### Logique de recommandation dynamique

| Profil détecté | Recommandation |
|---|---|
| Première exploration + processus manuel clé | Sprint "Processus Performants" (490€) |
| Besoin de leads / prospection | Le Prospecteur Augmenté |
| Site web + besoin de qualification | Le Filtre IA |
| Besoin global + budget confirmé | Système Contenu-Contact (Hybride) |
| Équipe sans compétences IA | Catégorie 4 — Hopti-Learn |

### Technique

- **SDK** : Vercel AI SDK (`ai` package)
- **Modèle** : Google Gemini API (coût maîtrisé, suffisant pour la qualification)
- **Streaming** : hook `useChat` Vercel AI SDK pour les réponses en temps réel
- **System prompt** : Injecté côté serveur (Route Handler Next.js `/api/chat`)
- **Envoi email** : À la fin de la conversation, résumé structuré envoyé via **Resend** à l'adresse Hoptisens
- **Données collectées** : secteur, taille équipe, douleur principale, maturité IA, horizon, prénom, email

### Sécurité

- Rate limiting via Vercel Edge (max 10 messages / session)
- System prompt non exposé côté client
- Pas de données stockées en base (envoi email uniquement)

### Animation de l'interface chat

- Chaque bulle apparaît avec `opacity: 0 → 1` + `y: 8 → 0` en `200ms`
- Indicateur de frappe (3 points pulsants) pendant que l'agent répond
- Scroll automatique vers le dernier message

---

## 9. Motion Design — Catalogue complet

### 9.1 Principes généraux

- **Performance first** : `will-change: transform` uniquement sur les éléments animés
- **Respect des préférences** : `prefers-reduced-motion` → toutes les animations désactivées
- **60 fps** : Uniquement `transform` et `opacity` pour les animations (pas de `height`, `width`, `top`)
- **Durées** : Courtes (150-300ms) pour les interactions, plus longues (400-600ms) pour les entrées de section

---

### 9.2 Catalogue des animations

#### Navbar

| Déclencheur | Animation | Durée | Easing |
|---|---|---|---|
| Scroll > 80px | Compactage (padding, bg, blur) | 300ms | easeInOut |
| Hover lien nav | Underline slide-in | 200ms | ease |
| Click CTA | Scale 0.97 → 1 | 150ms | spring |

#### Hero

| Élément | Animation | Délai | Durée |
|---|---|---|---|
| Badge pré-titre | fadeIn + slideDown | 0ms | 400ms |
| Titre H1 (mot 1) | fadeIn + slideUp | 200ms | 500ms |
| Titre H1 (mot 2) | fadeIn + slideUp | 280ms | 500ms |
| Titre H1 (mot N) | fadeIn + slideUp | +80ms/mot | 500ms |
| Sous-titre | fadeIn | 600ms | 400ms |
| Boutons CTA | fadeIn + slideUp | 800ms | 400ms |
| Mesh gradient bg | Dérive lente (CSS keyframes) | 0ms | 8s infini |

#### Schéma animé (voir section 7)

| Phase | Déclencheur | Type |
|---|---|---|
| Phase 1 | Entrée dans le viewport | stagger fadeIn + scaleIn |
| Phase 2 | scroll 30-60% | pathLength drawing |
| Phase 3 | scroll 60-100% | fadeIn + counter + flowDots |

#### Sections (scroll reveal)

| Pattern | Propriétés | Durée | Easing |
|---|---|---|---|
| `FadeInUp` | `y: 20→0`, `opacity: 0→1` | 500ms | easeOut |
| `FadeIn` | `opacity: 0→1` | 400ms | easeOut |
| `ScaleIn` | `scale: 0.95→1`, `opacity: 0→1` | 400ms | easeOut |
| Stagger enfants | délai `0.1s` entre chaque enfant | — | — |

Tous déclenchés via `whileInView` avec `once: true` et `margin: "-10%"`.

#### Cartes offres

| Déclencheur | Animation | Durée |
|---|---|---|
| Hover | `translateY: -4px`, `shadow-md` | 200ms |
| Hover bordure | `border-color → --accent-border` | 200ms |
| Click | `scale: 0.98` | 100ms |

#### Boutons

| Déclencheur | Animation | Durée |
|---|---|---|
| Hover primary | `bg → accent-hover`, légère luminosité | 150ms |
| Hover ghost | `bg → surface` | 150ms |
| Active/Click | `scale: 0.97` | 100ms |

#### Chiffres clés (counter)

- Durée : `1500ms` par counter
- Easing : `easeOut` (rapide au début, ralentit vers la valeur finale)
- Déclencheur : `whileInView`, une seule fois

#### Transitions de pages

- `AnimatePresence` avec `mode="wait"`
- Sortie : `opacity: 1→0`, `y: 0→-10`, `200ms`
- Entrée : `opacity: 0→1`, `y: 10→0`, `300ms`

#### Agent IA (chat)

| Élément | Animation | Durée |
|---|---|---|
| Fenêtre chat | `scaleY: 0.95→1`, `opacity: 0→1` | 300ms |
| Bulle message | `y: 8→0`, `opacity: 0→1` | 200ms |
| Indicateur typing | 3 dots en `pulse` alterné | infini |
| Bouton envoi | `scale: 0.95→1` au hover | 150ms |

---

## 10. Internationalisation (FR / EN)

### Stratégie

- **Package** : `next-intl`
- **Routing** : Préfixe de locale dans l'URL (`/` pour FR, `/en/` pour EN)
- **Détection** : `Accept-Language` header au premier accès, puis cookie
- **Switcher** : Toggle FR|EN dans la navbar, conserve la route courante

### Structure des fichiers de traduction

```
messages/
├── fr.json    → Toutes les chaînes en français
└── en.json    → Toutes les chaînes en anglais
```

### Éléments traduits

- Tous les textes de l'interface (titres, descriptions, CTA, labels)
- Les messages de l'agent IA (system prompt adapté par locale)
- Les métadonnées SEO (title, description, og:title par locale)
- Les URLs (slugs localisés)

### Éléments non traduits

- Logo, icônes, images SVG
- Données structurées communes (offres, chiffres)

---

## 11. Stack technique

### Dépendances principales

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x",
    "tailwindcss": "3.x",
    "framer-motion": "11.x",
    "next-intl": "3.x",
    "ai": "3.x",
    "geist": "1.x",
    "lucide-react": "latest",
    "resend": "3.x",
    "clsx": "2.x",
    "tailwind-merge": "2.x"
  }
}
```

### Structure Next.js 14 (App Router)

```
app/
├── [locale]/
│   └── ...pages
├── api/
│   └── chat/
│       └── route.ts    → Route Handler agent IA
└── globals.css
```

### Variables d'environnement

```env
GEMINI_API_KEY=       # Clé API Google Gemini (agent IA)
RESEND_API_KEY=       # Clé API Resend (emails)
CONTACT_EMAIL=        # Email de réception des leads
NEXT_PUBLIC_URL=      # https://hoptisens.com
```

### Configuration Tailwind

```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF9',
        surface: '#F2F1EF',
        border: '#E4E2DE',
        accent: '#2A5BFF',
        'accent-soft': '#EEF2FF',
        'text-primary': '#1A1916',
        'text-muted': '#78766F',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
}
```

---

## 12. Déploiement

### Hébergement

- **Plateforme** : Vercel
- **Domaine** : hoptisens.com (déjà possédé)
- **Configuration DNS** : Pointage A/CNAME vers Vercel

### Environnements

| Environnement | URL | Branche Git |
|---|---|---|
| Production | hoptisens.com | `main` |
| Preview | *.vercel.app | `develop` + PRs |

### Performance cibles (Core Web Vitals)

| Métrique | Cible |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |

### SEO

- `sitemap.xml` généré automatiquement par Next.js
- `robots.txt` configuré
- Balises `og:` et `twitter:` pour chaque page
- Données structurées JSON-LD (Organization, WebSite)
- Balises `hreflang` pour le bilinguisme FR/EN
- Images SVG exclusivement → performances optimales

### Analytics

- **Vercel Analytics** (intégré, sans cookie tiers)
- Optionnel : Plausible Analytics (RGPD-friendly, sans cookies)

---

## 13. Phases de développement

### Vue d'ensemble

| Phase | Durée | Livrable |
|---|---|---|
| 1. Setup & fondations | Jour 1 | Projet initialisé, déployé sur Vercel |
| 2. Design system | Jours 2-3 | Composants UI de base, tokens CSS |
| 3. Pages statiques | Jours 4-7 | Toutes les pages sans animations |
| 4. Motion design | Jours 8-9 | Toutes les animations implémentées |
| 5. Agent IA | Jours 10-11 | Chat fonctionnel + envoi email |
| 6. i18n | Jour 12 | Bilinguisme FR/EN complet |
| 7. SEO & performances | Jour 13 | Métadonnées, sitemap, Core Web Vitals |
| 8. Tests & go live | Jour 14 | Mise en ligne sur hoptisens.com |

---

### Phase 1 — Setup & Fondations (Jour 1)

```bash
npx create-next-app@latest hoptisens.com \
  --typescript --tailwind --app --src-dir=false

npm install framer-motion next-intl ai geist \
  lucide-react resend clsx tailwind-merge
```

- Configuration Tailwind (tokens couleurs, fonts)
- Connexion repo Git → Vercel (CI/CD automatique)
- Déploiement Vercel vide + connexion domaine hoptisens.com
- Variables d'environnement configurées sur Vercel

---

### Phase 2 — Design System (Jours 2-3)

**Composants à créer :**

- `Button.tsx` (3 variants : primary, secondary, ghost)
- `Card.tsx` (avec hover animation)
- `Badge.tsx` / `Tag.tsx`
- `Section.tsx` (wrapper avec padding standard)
- `Container.tsx` (max-width + padding horizontal)
- `FadeInUp.tsx` (wrapper animation scroll reveal)
- `Navbar.tsx` (structure statique d'abord)
- `Footer.tsx`

---

### Phase 3 — Pages statiques (Jours 4-7)

**Ordre de développement :**

1. Accueil (`/`) — Hero + toutes sections (sans animation)
2. Offres (`/offres`) — 4 catégories
3. Sprint (`/offres/sprint`) — Landing
4. Lead Gen (`/offres/leads`) — Landing
5. À propos (`/a-propos`)
6. Contact (`/contact`) — Structure sans agent IA

---

### Phase 4 — Motion design (Jours 8-9)

**Ordre d'implémentation :**

1. Navbar scroll compact (`useScroll` + `useTransform`)
2. Hero stagger reveal (titres mot par mot)
3. Mesh gradient background (CSS keyframes)
4. Scroll reveal sections (`whileInView` + `FadeInUp`)
5. Cartes hover animations
6. Chiffres counter animés
7. Schéma SVG scroll-driven (`SchemaAnime.tsx`)
8. Transitions de pages (`AnimatePresence`)

---

### Phase 5 — Agent IA (Jours 10-11)

**Tâches :**

1. Route Handler `app/api/chat/route.ts` (Vercel AI SDK + Gemini API)
2. System prompt de qualification (FR + EN)
3. Logique de recommandation dynamique
4. Composant `ChatAgent.tsx` (interface chat)
5. Animation des bulles de message
6. Intégration Resend : envoi du résumé de conversation par email
7. Rate limiting (Vercel Edge)

---

### Phase 6 — Internationalisation (Jour 12)

**Tâches :**

1. Configuration `next-intl` + middleware de routing
2. Fichiers `messages/fr.json` et `messages/en.json`
3. Traduction de tous les composants
4. System prompt agent IA en EN
5. Switcher FR|EN dans la navbar
6. Balises `hreflang` dans le layout

---

### Phase 7 — SEO & Performances (Jour 13)

**Tâches :**

1. `metadata` Next.js pour chaque page (title, description, og:)
2. `sitemap.ts` dynamique
3. `robots.ts`
4. JSON-LD Organization + WebSite
5. Audit Lighthouse → corriger CWV si < cibles
6. Optimisation imports Framer Motion (tree-shaking)
7. Vérification `prefers-reduced-motion`

---

### Phase 8 — Tests & Go Live (Jour 14)

**Checklist avant mise en ligne :**

- [ ] Responsive testé : 375px, 768px, 1280px, 1440px
- [ ] Cross-browser : Chrome, Firefox, Safari, Edge
- [ ] Agent IA testé (FR + EN)
- [ ] Emails Resend reçus correctement
- [ ] Variables d'environnement de production configurées
- [ ] Domaine hoptisens.com pointé vers Vercel
- [ ] SSL actif (automatique Vercel)
- [ ] Sitemap accessible sur hoptisens.com/sitemap.xml
- [ ] Analytics Vercel actif
- [ ] `prefers-reduced-motion` vérifié
- [ ] Lighthouse score > 90 sur toutes les pages

---

_Document rédigé en Mars 2026 — Hoptisens · hoptisens.com_
