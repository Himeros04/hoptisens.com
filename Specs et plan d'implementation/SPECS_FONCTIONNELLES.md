# Spécifications Fonctionnelles — hoptisens.com

**Version** : 2.0
**Date** : Mars 2026
**Statut** : Reflet de l'état actuel du site en production

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Cible & Positionnement](#2-cible--positionnement)
3. [Architecture des pages](#3-architecture-des-pages)
4. [Design System](#4-design-system)
5. [Composants globaux](#5-composants-globaux)
6. [Pages — Détail fonctionnel](#6-pages--détail-fonctionnel)
7. [Schéma animé scroll-driven](#7-schéma-animé-scroll-driven)
8. [Calculateur ROI interactif](#8-calculateur-roi-interactif)
9. [Agent IA conversationnel — Lucio](#9-agent-ia-conversationnel--lucio)
10. [Formulaire de contact](#10-formulaire-de-contact)
11. [Schémas visuels animés des offres](#11-schémas-visuels-animés-des-offres)
12. [Motion Design — Catalogue complet](#12-motion-design--catalogue-complet)
13. [Internationalisation (FR / EN)](#13-internationalisation-fr--en)
14. [Stack technique](#14-stack-technique)
15. [Intégrations externes](#15-intégrations-externes)
16. [Déploiement](#16-déploiement)

---

## 1. Présentation du projet

### Identité

- **Nom** : Hoptisens
- **Domaine** : hoptisens.com
- **Type** : Agence IA & Automatisation
- **Slogan** : "Simplifier pour amplifier"
- **Fondateur** : Hadrien Peyron

### Vision

D'ici 2030, chaque entreprise structurée devrait avoir son propre écosystème d'IA. Hoptisens démocratise l'Intelligence Artificielle pour les PME.

### Mission

Accompagner les dirigeants dans leur transformation digitale et IA en déployant rapidement des POC à ROI direct, en liant pragmatisme et innovation.

### Objectifs du site

- Générer des prises de contact qualifiées via un formulaire, un agent IA conversationnel (Lucio) et un lien Calendly
- Présenter les 4 services principaux (Ingénierie d'Acquisition, Automatisation & RPA, Agents IA, Sprint POC)
- Démontrer le ROI via un calculateur interactif
- Incarner l'expertise IA par le design, les animations et les schémas SVG animés
- Être bilingue FR / EN

---

## 2. Cible & Positionnement

### Marché cible

- **TPE et PME** : 10 à 300 collaborateurs
- **Secteurs** : Agences marketing, ESN, SSII, Sociétés de conseils, tous secteurs avec processus répétitifs et cols blancs
- **Décideurs** : Dirigeants, CEO, CTO, DSI, DAF, CSO, responsables opérations

### Personas principaux

| Persona | Profil | Besoin principal |
| --- | --- | --- |
| Le Dirigeant | PDG / Gérant, 40-55 ans | Gagner du temps, réduire les coûts opérationnels |
| L'Opérationnel | DAF / Responsable ops | Automatiser les tâches répétitives, fiabiliser les données |
| Le Visionnaire | CTO / DSI | Intégrer l'IA de façon responsable et mesurable |
| Le Commercial | CSO / Responsable des ventes & marketing | Fluidifier les processus de vente, améliorer la qualité des leads |

### Positionnement

Hoptisens ne vend pas un logiciel, ni une simple formation. Elle co-construit avec ses clients une **architecture d'entreprise augmentée**, étape par étape, avec un ROI mesurable. L'approche est pragmatique et orientée POC : valider techniquement et financièrement avant de scaler.

---

## 3. Architecture des pages

### Routing bilingue

```text
/                        → Accueil (FR)
/en                      → Home (EN)

/a-propos                → À propos (FR)
/en/about                → About (EN)

/offres                  → Offres (FR)
/en/services             → Services (EN)

/offres/sprint           → Sprint Automobilisation (FR)
/en/services/sprint      → Sprint (EN)

/offres/leads            → Offres Lead Gen (FR)
/en/services/leads       → Lead Gen Services (EN)

/contact                 → Contact (FR)
/en/contact              → Contact (EN)
```

### Hiérarchie des composants

```text
app/
├── [locale]/
│   ├── layout.tsx             → Layout global (Navbar + Footer)
│   ├── page.tsx               → Accueil (7 sections)
│   ├── a-propos/page.tsx      → À propos
│   ├── offres/
│   │   ├── page.tsx           → Vue d'ensemble offres (tabs)
│   │   ├── sprint/page.tsx    → Landing Sprint
│   │   └── leads/page.tsx     → Landing Lead Gen
│   └── contact/page.tsx       → Contact (formulaire + chat + infos)
├── api/
│   └── chat/
│       └── route.ts           → Route Handler agent IA (Gemini)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SchemaAnime.tsx
│   │   ├── Chiffres.tsx
│   │   ├── Offres.tsx
│   │   ├── Calculateur.tsx
│   │   ├── Sprint.tsx
│   │   └── Temoignages.tsx
│   ├── visuals/
│   │   └── OfferSchemas.tsx   → Schémas SVG animés par offre
│   ├── forms/
│   │   └── ContactForm.tsx    → Formulaire de contact (Zod + Airtable)
│   ├── agent/
│   │   ├── ChatAgent.tsx      → Widget chat flottant (Lucio)
│   │   └── ContactChat.tsx    → Chat embarqué pleine largeur
│   └── ui/
│       ├── FadeInUp.tsx
│       └── Counter.tsx
└── lib/
    ├── i18n.ts
    ├── routing.ts
    └── airtable.ts            → Intégration Airtable (leads)
```

---

## 4. Design System

### 4.1 Palette de couleurs

| Token CSS | Usage |
| --- | --- |
| `--color-accent` | Couleur principale (jaune/doré) — CTA, highlights, liens actifs |
| `--color-text-primary` | Titres, corps principal |
| `--color-text-secondary` | Textes d'appui |
| `--color-bg` | Fond principal |
| `--color-surface` | Fonds de cartes, sections alternées |
| `--color-border` | Bordures fines, séparateurs |
| `--color-success` | États positifs |
| `--color-error` | États d'erreur |

### 4.2 Typographie

| Rôle | Police | Notes |
| --- | --- | --- |
| Titres (H1, H2) | Playfair Display | Serif, élégant |
| Corps / UI | Geist Sans | Sans-serif, lisible |
| Mono / Data | Geist Mono | Chiffres clés, codes |

### 4.3 Spacing & Layout

- **Max-width** : `1200px`, centré avec padding horizontal responsive
- **Sections** : padding vertical généreux (desktop > mobile)
- **Radius** : coins arrondis sur cartes, boutons, badges
- **Ombres** : multi-niveaux (sm, md, lg) pour profondeur

### 4.4 Composants UI de base

**FadeInUp** : Wrapper d'animation réutilisable (fade + translation verticale au mount, délai configurable)

**Counter** : Compteur animé de 0 vers une valeur cible, déclenché au `whileInView`

---

## 5. Composants globaux

### 5.1 Navbar

**Structure :**

```text
[ Logo Hoptisens ]   [ Offres · À propos · Contact ]   [ FR|EN · Prendre RDV → ]
```

**Comportement dynamique au scroll (seuil : 150px) :**

| Propriété | État initial (top) | État compact (scroll > 150px) |
| --- | --- | --- |
| Forme | Pleine largeur | Boîte arrondie contenue |
| Background | Transparent | Gradient métallique + blur |
| Blur | Aucun | Intensifié |
| Box-shadow | Aucune | Apparaît |
| Logo | Taille normale | Légèrement réduit |

**CTA principal Navbar** : "Prendre RDV →" — lien externe vers Calendly (`calendly.com/hoptisens/hoptisens-call`)

**Menu mobile :**

- Hamburger → slide-in depuis la droite (spring animation Framer Motion)
- Liens de navigation + toggle langue + CTA

**Switcher de langue :**

- Toggle FR | EN dans la navbar
- Conserve le path courant en changeant le locale

---

### 5.2 Footer

**4 colonnes :**

```text
[ Logo + Tagline ]   [ Offres ]   [ Entreprise ]   [ Contact ]
```

**Colonne 1 — Branding :**
- Logo Hoptisens
- Tagline : "Simplifier pour amplifier. Agence IA & Automatisation pour dirigeants lucides"

**Colonne 2 — Offres :**
- L'Étude & Les Plans
- Le Gros Œuvre
- Les Réseaux d'Acquisition
- Le Transfert de Compétences

**Colonne 3 — Entreprise :**
- À propos
- Contact
- Mentions légales
- Politique de confidentialité

**Colonne 4 — Contact :**
- Email : hadrien@hoptisens.com
- LinkedIn : Hadrien Peyron (lien)

**Bas de page :** © 2026 Hoptisens

---

## 6. Pages — Détail fonctionnel

### 6.1 Page Accueil (`/`)

La page d'accueil est composée de 7 sections enchaînées.

#### Section 1 — Hero

**Contenu textuel :**

- **Titre H1** : "Multipliez vos Prospects qualifiés, Divisez vos Coûts gaspillés"
- **Sous-titre** : "Ne subissez plus l'évolution technologique. Hoptisens construit et déploie des systèmes d'intelligence artificielle sur-mesure (Automatisation, Agents IA, CRM) pour sécuriser vos marges et protéger le temps de vos équipes"
- **CTA Principal** : "Réserver mon Appel Stratégique" — lien externe Calendly
- **CTA Secondaire** : "Remplir le Diagnostic Flash" — lien vers `/contact`
- **Lien tertiaire** : Scroll vers le calculateur ROI (`#calculateur`)

**Background :**

- Mesh gradient animé en CSS pur (dérive lente via `@keyframes`)

**Animation du titre :**

- Chaque mot apparaît en stagger avec `y → 0` + `opacity: 0 → 1`

#### Section 2 — Schéma animé scroll-driven

Voir [section 7](#7-schéma-animé-scroll-driven) pour le détail complet.

#### Section 3 — Chiffres clés

**Titre de section** : "Votre nouvelle architecture de croissance"

**Disposition** : Grille 4 colonnes (responsive)

| Chiffre | Label |
| --- | --- |
| `80%` | de gain de temps sur la prospection manuelle |
| `10 jours` | de Sprint pour valider votre ROI |
| `100%` | de l'audit initial déductible de l'implémentation |
| `24/7` | vos leads qualifiés par une IA conversationnelle |

**Animation** : Counter animé de `0` vers la valeur cible déclenché au `whileInView`

#### Section 4 — Présentation des 4 offres

**Titre de section** : "Notre ingénierie au service de votre rentabilité"

**Disposition** : Grille de 4 cartes (responsive 1 colonne sur mobile)

**Cartes :**

1. **Ingénierie d'Acquisition** (icône Users)
   - Description : "Vos commerciaux perdent un temps précieux sur des prospects froids..."
   - CTA : "Auditer mon Acquisition"

2. **Automatisation & RPA** (icône Workflow)
   - Description : "La double-saisie détruit votre rentabilité..."
   - CTA : "Chiffrer mon Gain de Temps"

3. **Agents IA Personnalisés** (icône Brain) — badge "Populaire"
   - Description : "Exploitez la richesse de vos données..."
   - CTA : "Prototyper mon Agent IA"

4. **Sprint POC** (icône Zap)
   - Description : "Un processus en deux étapes pour valider techniquement et financièrement votre transition vers l'IA..."
   - CTA : "Commencer mon Diagnostic"

#### Section 5 — Calculateur ROI interactif

Voir [section 8](#8-calculateur-roi-interactif) pour le détail complet.

#### Section 6 — Sprint (mise en avant)

**Format** : Bloc pleine largeur, fond sombre (`--text-primary`)

**Contenu :**

- Badge : "Offre de lancement — 490€ (~~990€~~)" + mention "Valable pour les 7 prochains clients"
- Titre : "Démarrez votre Transformation sans Risque"
- **2 étapes :**
  - Étape 1 : Diagnostic Data-Driven (Offert)
  - Étape 2 : Sprint Immersif 4 jours (POC payant)
  - + Garantie Confiance
- Visuel : "10 Jours pour tout changer" avec cercle accent animé
- CTA : "Commencer mon Diagnostic" → `/contact`

#### Section 7 — Témoignages / Résultats

**Titre** : "Des Résultats Concrets pour les TPE/PME"

**2 études de cas :**

1. **PME Services B2B** (25 collaborateurs)
   - Action : Déploiement d'un filtre IA d'intention
   - Résultat : −70% du temps de qualification manuelle

2. **Cabinet de Conseil** (12 collaborateurs)
   - Action : CRM semi-automatisé via Telegram
   - Résultat : Zéro erreur de saisie, synchronisation instantanée Supabase

---

### 6.2 Page À propos (`/a-propos`)

**Section 1 — Raison d'être :**

- Tagline : "Démocratiser l'Intelligence Artificielle pour les PME"
- Mission : "Chaque entreprise structurée devrait avoir son propre écosystème d'IA d'ici 2030"
- **3 cartes :**
  1. **Notre Vision** (icône Target) — "Créer un monde où l'humain est libéré des tâches répétitives..."
  2. **Notre Mission** (icône Compass) — "Accompagner les dirigeants dans leur transformation..."
  3. **Notre Stratégie** (icône Sparkles) — "Lier pragmatisme et innovation. Déployer rapidement des POC à ROI direct..."

**Section 2 — L'Approche Hoptisens (timeline) :**

3 étapes :

1. **Diagnostic** (icône Building) — Cartographie des processus, évaluation du ROI
2. **Construction** (icône Rocket) — Sourcing LLM, design workflow (Make/n8n), création d'interfaces
3. **Transfert & Formation** (icône GraduationCap) — Formation des équipes, documentation des systèmes

**CTA bas de page** : "Parler à un consultant"

---

### 6.3 Page Offres (`/offres`)

**Structure avec navigation par onglets :**

**Hero :**
- Titre : "Nos Solutions pour l'Ère de l'IA"
- Description des 4 services

**Navigation sticky (tabs) :**
- 4 onglets : Leads & CRM, Automatisation, Agents IA, Sprint POC
- + Bouton pulsant "Nous Contacter"

**Contenu par onglet (slider animé) :**
Chaque onglet affiche :
- Icône + titre du service
- Description complète
- 3-4 bullet points avec icônes CheckCircle2
- CTA spécifique (certains vers Calendly)
- Schéma SVG animé illustrant le service (voir [section 11](#11-schémas-visuels-animés-des-offres))

**Section bas de page :** Formulaire de contact embarqué ("Parlez-nous de votre projet")

---

### 6.4 Landing Sprint (`/offres/sprint`)

**Structure :**

1. **Hero** :
   - Badge : "Offre de lancement"
   - Titre H1 : "Le Sprint Automobilisation"
   - Promesse : "Passez de l'idée floue à un système d'IA opérationnel en seulement deux semaines"

2. **Carte tarif** :
   - Prix de lancement : `490€ HT` (~~990€ HT~~)
   - Mention : "Valable pour les 7 prochains clients"
   - Livrables inclus :
     - Note de synthèse détaillée
     - Fiches de cas d'usage prioritaires
     - Devis technique d'implémentation
   - Mention : "Intégralement déductible si vous poursuivez avec nous"

3. **Timeline (3 phases)** :
   - Jours 1-2 : Immersion (analyse des processus, cartographie des données)
   - Jours 3-8 : Conception (architecture, développement du prototype)
   - Jours 9-10 : Restitution (tests, livraison de la roadmap)

---

### 6.5 Landing Lead Gen (`/offres/leads`)

**Structure :**

1. **Hero** :
   - Titre : "Alimentez votre pipeline, automatiquement"
   - Sous-titre : "Nous construisons des systèmes de prospection sur-mesure combinant scraping éthique, qualification IA et outreach multi-canal"

2. **3 fonctionnalités clés (cartes)** :

   **Prospecteur Augmenté** (icône Radar)
   > Veille web en temps réel, LinkedIn, bases de données publiques

   **Filtre IA** (icône Filter)
   > L'agent IA analyse chaque prospect par rapport au Persona défini

   **Campagnes Connectées** (icône Share2)
   > Push automatique vers le CRM, séquences email personnalisées via IA

3. **CTA** : "Me générer des leads"

---

### 6.6 Page Contact (`/contact`)

**Hero :**
- Titre : "Parlons de votre avenir"
- Sous-titre : "Démarrez une conversation avec notre Agent IA pour pré-qualifier votre besoin, ou contactez-nous directement"

**Layout 3 colonnes :**

- **Gauche (2 cols)** : Formulaire de contact (voir [section 10](#10-formulaire-de-contact))
- **Droite (1 col)** : Carte de contact direct
  - Email : contact@hoptisens.com
  - LinkedIn : Hadrien Peyron
  - Délai de réponse : 24-48h ouvrées

**Widget Lucio** : Chat flottant accessible en bas à droite (voir [section 9](#9-agent-ia-conversationnel--lucio))

---

## 7. Schéma animé scroll-driven

### Concept général

Schéma SVG en position `sticky` qui évolue au fur et à mesure que l'utilisateur scrolle. Représente **l'architecture de la transformation** d'une entreprise via Hoptisens.

**Titre de section :** "L'Architecture de votre Transformation"

**Description :** Comment l'Agent IA s'intègre dans l'écosystème

### Structure du schéma

**Flow vertical en 3 couches :**

```text
Couche 1 : Audit
     ↓
Couche 2 : Infrastructure
     ↓
Couche 3 : Agent IA
     ↓  ↓  ↓  ↓  ↓
  [ Client ] [ Data ] [ Processes ] [ Tools ] [ Web Search ]
```

### Animations scroll-driven

Le schéma se révèle progressivement au scroll :

- **Phase 1** : Apparition des nœuds Audit et Infrastructure avec connecteurs animés
- **Phase 2** : Apparition du nœud Agent IA central
- **Phase 3** : Branches vers les 5 destinations (Client, Data, Processes, Tools, Web Search)
- **Points de flux animés** : Des particules d'énergie voyagent le long des connecteurs

### Implémentation technique

```tsx
// components/sections/SchemaAnime.tsx
const { scrollYProgress } = useScroll({ target: sectionRef })
// Animations pilotées par useTransform sur scrollYProgress
// Chaque couche apparaît séquentiellement selon la progression du scroll
```

---

## 8. Calculateur ROI interactif

### Concept

Calculateur en 3 étapes permettant au visiteur d'estimer les économies réalisables en déployant un agent IA. Ancre : `#calculateur` (cible de scroll depuis le Hero).

### Étape 1 — Sélection de l'agent IA

5 agents prédéfinis avec estimation d'heures économisées/mois :

| Agent | Heures économisées/mois |
| --- | --- |
| Agent de Qualification de Leads | 15h |
| Agent Support Client | 17h |
| Agent CRM & Suivi Commercial | 14h |
| Agent Administratif & Comptabilité | 16h |
| Agent Marketing & Contenu | 15h |

Sélection multiple possible (les heures s'additionnent).

### Étape 2 — Profil de coût

- Toggle entre "Salarié(e)" et "Indépendant/Freelance"
- **Salarié** : Saisie du salaire net mensuel → coût horaire = `(net × 1.82) / 151.67`
- **Indépendant** : Saisie du TJM → coût horaire = `TJM / 8`

### Étape 3 — Résultats animés

Affichage en temps réel :
- Total d'heures économisées / mois
- Économie mensuelle en € (avec projection annuelle)
- Animation counter sur les chiffres

**CTA final** : "Discuter de mon projet IA" → `/contact`

---

## 9. Agent IA conversationnel — Lucio

### Persona

- **Nom** : Lucio
- **Rôle** : Assistant IA Hoptisens
- **Ton** : Chaleureux, légèrement humoristique, professionnel

### Interface

**Widget flottant :**
- Position : bas droite, fixe
- Ouverture/fermeture par clic

**Sur la page contact :**
- Version embarquée pleine largeur (`ContactChat.tsx`)

### Message d'accueil

> "Bonjour ! Je suis Lucio, l'assistant IA d'Hoptisens. Je suis là pour comprendre vos besoins en automatisation et vous orienter vers la meilleure solution."

### Flux de conversation

Questions séquentielles (une par une) :

1. Secteur de l'entreprise et rôle de l'utilisateur
2. Processus chronophages / répétitifs identifiés
3. Expérience préalable en automatisation / IA
4. Bénéfices attendus
5. Recommandation de profil + demande de coordonnées (prénom, nom, email)

### Capture de leads

Lorsque Lucio détecte un email dans la conversation, il déclenche automatiquement la création d'un lead dans Airtable avec :
- Prénom, Nom, Email, Entreprise
- Questions posées et transcription complète
- Source : "Lucio"
- Statut : "New"

### Technique

- **SDK** : Vercel AI SDK (`@ai-sdk/google`, `@ai-sdk/react`)
- **Modèle** : Google Gemini 2.5 Flash
- **Streaming** : Réponses en temps réel via `/api/chat`
- **System prompt** : Injecté côté serveur, non exposé au client
- **Persistance** : `localStorage` (TTL 24h, max 10 messages)
- **Auto-scroll** vers le dernier message

### Animation de l'interface chat

- Bulle de message : `opacity: 0→1` + `y: 8→0` en `200ms`
- Indicateur de frappe : 3 points pulsants
- Scroll automatique vers le dernier message

---

## 10. Formulaire de contact

### Champs

| Champ | Type | Requis |
| --- | --- | --- |
| Prénom | text | Oui |
| Nom | text | Oui |
| Entreprise | text | Oui |
| Email | email | Oui (validé) |
| Catégorie(s) | checkbox multi-select | Non |
| Message | textarea | Oui |

**Options de catégories :**
- Audit
- Conception d'Agent IA
- Formation
- Workshop
- Autre

### Validation

- Validation côté client avec **Zod** (schéma de validation)
- Affichage des erreurs au niveau de chaque champ
- État de chargement avec spinner

### Soumission

- **Server Action** Next.js → appel `createLead()` dans `lib/airtable.ts`
- Création d'un enregistrement Airtable dans la table "Prospects"
- Source : "Forms"
- Message de succès avec icône CheckCircle2 après soumission

---

## 11. Schémas visuels animés des offres

4 schémas SVG animés dans `components/visuals/OfferSchemas.tsx`, utilisés sur la page Offres dans chaque onglet :

### LeadsSchema

```text
[ Sources Web/LinkedIn/Social ] → ( Filtre IA ) → [ Lead Qualifié ]
```
- Chemins en tirets animés avec particule voyageuse

### AutomatisationSchema

```text
[ Collaborateur (Slack) ] ← → [ Processus Déterministe ] ← → [ Outils ]
                                   ┌─────────┐
                                   │ Data     │
                                   │ Process  │
                                   │ Tools    │
                                   └─────────┘
Grille d'outils : Gmail, Pennylane, LinkedIn, CRM, Code, Notion
```
- Connexions animées avec transitions de couleur

### AgentsSchema

```text
[ Collaborateur ] ↔ ( Agent IA ) → [ Validation ◇ ] → [ Outputs ]
                     (cercle pulsant)
Outputs : Email, LinkedIn, Pennylane, CRM, Code, Notion
```

### SprintSchema

```text
Étape 1 : Diagnostic (Offert) → Étape 2 : Sprint (4 jours)
    📋 Livrables Étape 1          🚀 Livrables Étape 2
```
- Flèche de timeline en arrière-plan
- Bulles de livrables animées

---

## 12. Motion Design — Catalogue complet

### 12.1 Principes généraux

- **Performance first** : `transform` et `opacity` uniquement pour les animations
- **Respect des préférences** : support `prefers-reduced-motion`
- **Bibliothèque** : Framer Motion 12.x
- **Durées** : 150-300ms (interactions), 400-600ms (entrées de section)

### 12.2 Catalogue des animations

#### Navbar

| Déclencheur | Animation | Durée |
| --- | --- | --- |
| Scroll > 150px | Morphing forme (pleine largeur → boîte arrondie) | 300ms |
| Scroll > 150px | Apparition gradient métallique + blur + shadow | 300ms |

#### Hero

| Élément | Animation | Délai |
| --- | --- | --- |
| Titre H1 (mot par mot) | fadeIn + slideUp, stagger | +80ms/mot |
| Sous-titre | fadeIn | après titre |
| Boutons CTA | fadeIn + slideUp | après sous-titre |
| Mesh gradient bg | Dérive lente (CSS keyframes) | infini |

#### Schéma animé scroll-driven

| Phase | Déclencheur | Type |
| --- | --- | --- |
| Couche 1 (Audit) | Entrée viewport | fadeIn + scale |
| Couche 2 (Infrastructure) | scroll progressif | pathLength drawing |
| Couche 3 (Agent IA + branches) | scroll avancé | fadeIn + flux de particules |

#### Sections (scroll reveal)

| Pattern | Propriétés | Durée |
| --- | --- | --- |
| `FadeInUp` | `y: 20→0`, `opacity: 0→1` | 500ms |
| Stagger enfants | délai `0.1s` entre chaque | — |

Déclenchés via `whileInView` avec `once: true`.

#### Calculateur ROI

| Élément | Animation |
| --- | --- |
| Transition entre étapes | Slide horizontal |
| Résultats chiffrés | Counter animé |
| Sélection d'agent | Scale + border highlight |

#### Cartes offres

| Déclencheur | Animation | Durée |
| --- | --- | --- |
| Hover | `translateY: -4px`, shadow | 200ms |
| Hover bordure | border-color transition | 200ms |

#### Chiffres clés (counter)

- Durée : `1500ms` par counter
- Easing : `easeOut`
- Déclencheur : `whileInView`, une seule fois

#### Agent IA (chat)

| Élément | Animation | Durée |
| --- | --- | --- |
| Bulle message | `y: 8→0`, `opacity: 0→1` | 200ms |
| Indicateur typing | 3 dots en pulse alterné | infini |

#### Schémas visuels des offres

| Élément | Animation |
| --- | --- |
| Chemins SVG | stroke-dashoffset animé (particules voyageuses) |
| Cercle Agent IA | Pulse continu |
| Connecteurs | pathLength progressif |
| Transitions de couleur | Interpolation CSS |

---

## 13. Internationalisation (FR / EN)

### Stratégie

- **Package** : `next-intl` 4.x
- **Routing** : Préfixe de locale dans l'URL (`/` pour FR, `/en/` pour EN)
- **Pathnames localisés** : `/a-propos` ↔ `/about`, `/offres` ↔ `/services`, etc.
- **Switcher** : Toggle FR|EN dans la navbar, conserve la route courante

### Structure des fichiers de traduction

```text
messages/
├── fr.json    → Toutes les chaînes en français
└── en.json    → Toutes les chaînes en anglais
```

### Éléments traduits

- Textes de navigation (offres, à propos, contact, CTA)
- Labels et contenus de l'interface
- Métadonnées SEO par locale

### Éléments non traduits

- Logo, icônes, SVG
- Données structurées communes

---

## 14. Stack technique

### Dépendances principales

```json
{
  "dependencies": {
    "next": "16.x",
    "react": "19.x",
    "typescript": "5.x",
    "tailwindcss": "4.x",
    "framer-motion": "12.x",
    "next-intl": "4.x",
    "@ai-sdk/google": "latest",
    "@ai-sdk/react": "latest",
    "geist": "latest",
    "lucide-react": "latest",
    "airtable": "0.12.x",
    "zod": "latest",
    "clsx": "2.x",
    "tailwind-merge": "2.x"
  }
}
```

### Structure Next.js (App Router)

```text
app/
├── [locale]/
│   └── ...pages
├── api/
│   └── chat/
│       └── route.ts    → Route Handler agent IA Lucio
└── globals.css
```

### Variables d'environnement

```env
GEMINI_API_KEY=         # Clé API Google Gemini 2.5 Flash
AIRTABLE_API_KEY=       # Clé API Airtable
AIRTABLE_BASE_ID=       # ID de la base Airtable
AIRTABLE_TABLE_NAME=    # Nom de la table (défaut: "Prospects")
```

---

## 15. Intégrations externes

### Airtable — CRM Leads

- **Table** : "Prospects"
- **Champs** :
  - First Name, Last Name, Email, Company
  - Status (défaut : "New")
  - Source : "Lucio" (chat) ou "Forms" (formulaire)
  - Questions, Transcription (données du chat)
  - Message, Categorie (données du formulaire)
- **2 points d'entrée** : formulaire de contact + chat Lucio

### Calendly — Prise de RDV

- **URL** : `calendly.com/hoptisens/hoptisens-call`
- **Utilisé dans** : CTA navbar, CTA Hero, certains CTA d'offres

### LinkedIn

- **Profil** : Hadrien Peyron
- **Utilisé dans** : Footer, page contact

---

## 16. Déploiement

### Hébergement

- **Plateforme** : Vercel
- **Domaine** : hoptisens.com

### Environnements

| Environnement | URL | Branche Git |
| --- | --- | --- |
| Production | hoptisens.com | `main` |
| Preview | *.vercel.app | PRs |

### Performance cibles (Core Web Vitals)

| Métrique | Cible |
| --- | --- |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |

### SEO

- `sitemap.xml` généré automatiquement par Next.js
- `robots.txt` configuré
- Balises `og:` et `twitter:` pour chaque page
- Balises `hreflang` pour le bilinguisme FR/EN
- SVG exclusivement pour les illustrations

---

Document mis à jour en Mars 2026 — Hoptisens · hoptisens.com
