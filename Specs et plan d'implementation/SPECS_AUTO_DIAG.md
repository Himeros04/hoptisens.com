# Spécifications Fonctionnelles & Techniques — Auto-Diag

**Version** : 1.0
**Date** : Mars 2026
**Statut** : Validé
**Dépendance** : SPECS_FONCTIONNELLES.md v1.0

---

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Parcours utilisateur — Funnel 5 étapes](#2-parcours-utilisateur--funnel-5-étapes)
3. [Moteur de recommandation IA](#3-moteur-de-recommandation-ia)
4. [Bibliothèque de schémas d'architecture](#4-bibliothèque-de-schémas-darchitecture)
5. [Spécifications techniques](#5-spécifications-techniques)
6. [Design UI/UX & Animations](#6-design-uiux--animations)
7. [Output multi-canal & Intégrations](#7-output-multi-canal--intégrations)
8. [Plan d'implémentation](#8-plan-dimplémentation)

---

## 1. Vue d'ensemble

### 1.1 Positionnement

L'Auto-Diag est un **outil interactif d'auto-évaluation** qui guide le visiteur à travers un entonnoir de questions pour lui proposer des **projets concrets d'automatisation et d'intégration IA**, adaptés à son contexte spécifique.

Il se positionne comme le **chaînon manquant** entre la découverte du site et la prise de contact :

```
Visiteur découvre Hoptisens
    → Calculateur ROI ("combien je gagne ?")
    → Auto-Diag ("quoi mettre en place chez moi ?")    ← NOUVEAU
    → Contact / Lucio ("je veux avancer")
```

### 1.2 Objectifs business

| Objectif | Métrique de succès |
|----------|-------------------|
| Générer des leads ultra-qualifiés | Taux de complétion du funnel > 40% |
| Réduire la friction avant la prise de RDV | +25% de conversions vers `/contact` |
| Démontrer l'expertise Hoptisens par l'outil lui-même | Temps passé sur la page > 3 min |
| Alimenter le CRM avec du contexte riche | 100% des diagnostics complétés sauvegardés dans Airtable |

### 1.3 Personas cibles (rappel)

| Persona | Attente vis-à-vis de l'Auto-Diag |
|---------|----------------------------------|
| Le Dirigeant (PDG/Gérant) | Veut une vue d'ensemble rapide des gains possibles |
| L'Opérationnel (DAF/Resp. Ops) | Cherche des solutions concrètes à ses irritants quotidiens |
| Le Visionnaire (CTO/DSI) | Veut évaluer la faisabilité technique et l'architecture |
| Le Commercial (CSO/Resp. Ventes) | Veut des résultats mesurables sur son pipeline |

### 1.4 Principes de conception

1. **Progressif** : chaque étape apporte de la valeur (pas de sentiment de formulaire bureaucratique)
2. **Visuel** : feedback immédiat, barre de progression, micro-animations
3. **Intelligent** : les questions s'adaptent au contexte (branchement conditionnel léger)
4. **Généreux** : les résultats sont riches et utiles même sans prise de contact
5. **Convertissant** : chaque résultat mène naturellement vers un CTA

### 1.5 Route et accès

```
/diagnostic          → Auto-Diag (FR)
/en/diagnostic       → Auto-Diag (EN)
```

**Points d'entrée sur le site :**
- CTA Hero : "Commencer mon Diagnostic" (CTA secondaire)
- Section Sprint : lien "Commencer par un diagnostic gratuit"
- Navbar : item "Diagnostic" dans la navigation principale
- Footer : lien dans la colonne "Offres"

---

## 2. Parcours utilisateur — Funnel 5 étapes

### 2.0 Vue d'ensemble du flow

```
┌─────────────────────────────────────────────────────────────┐
│                     ÉCRAN D'ACCUEIL                         │
│  "Découvrez en 2 minutes les projets IA                     │
│   qui auront le plus d'impact dans votre entreprise"        │
│                                                             │
│              [ Commencer le diagnostic → ]                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────▼───────────────┐
           │  ÉTAPE 1 — Votre profil       │  ████░░░░░░ 20%
           │  Rôle + Secteur d'activité    │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │  ÉTAPE 2 — Votre entreprise   │  ████████░░ 40%
           │  Taille + Département         │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │  ÉTAPE 3 — Vos outils         │  ████████████░░ 60%
           │  Stack actuelle (multi-select) │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │  ÉTAPE 4 — Vos processus      │  ████████████████░░ 80%
           │  Irritants + priorité         │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │  ÉTAPE 5 — Votre maturité     │  ████████████████████ 100%
           │  Expérience IA + horizon      │
           └───────────────┬───────────────┘
                           │
                    [ Analyse IA ]
                    (loading 2-4s)
                           │
           ┌───────────────▼───────────────┐
           │     PAGE RÉSULTATS            │
           │  2-3 projets recommandés      │
           │  + schémas d'architecture     │
           │  + niveaux de complexité      │
           │  + CTA contact                │
           └───────────────────────────────┘
```

---

### 2.1 Écran d'accueil

**Contenu :**

- Badge : `DIAGNOSTIC GRATUIT · 2 MIN`
- Titre H1 : "Quel projet IA aura le plus d'impact dans votre entreprise ?"
- Sous-titre : "Répondez à 5 questions. Notre IA analyse votre contexte et vous propose des projets concrets d'automatisation, avec leur architecture et leur niveau de complexité."
- CTA : `Commencer le diagnostic →`
- Mention : "Aucune donnée personnelle requise. Résultats immédiats."

**Éléments visuels :**

- Illustration abstraite (grille de nœuds connectés, style OfferSchemas.tsx)
- 3 mini-aperçus de fiches résultats (maquettes floues en arrière-plan pour teaser le format)

---

### 2.2 Étape 1 — Votre profil

**Question** : "Parlons de vous."

**Champs :**

| Champ | Type | Options | Requis |
|-------|------|---------|--------|
| Votre rôle | Select (chips cliquables) | Dirigeant / Gérant · Directeur Commercial · DAF / Resp. Financier · Responsable Opérations · CTO / DSI · Responsable Marketing · Autre | Oui |
| Secteur d'activité | Select (chips cliquables) | Agence / ESN · Conseil · Commerce / Retail · Industrie / Logistique · Services B2B · Santé · Immobilier · Éducation / Formation · Autre | Oui |

**Branchement conditionnel :**
- Si "Autre" est sélectionné → champ texte libre qui s'ouvre en dessous

**Micro-copy de contexte :**
> "Ces informations nous permettent de cibler les automatisations les plus pertinentes pour votre fonction et votre secteur."

---

### 2.3 Étape 2 — Votre entreprise

**Question** : "Votre entreprise en bref."

**Champs :**

| Champ | Type | Options | Requis |
|-------|------|---------|--------|
| Nombre de collaborateurs | Select (boutons radio visuels) | 1-5 · 6-20 · 21-50 · 51-150 · 150-300 · 300+ | Oui |
| Département principal concerné | Select (chips) | Direction générale · Commercial / Ventes · Marketing · Finance / Admin · Opérations / Production · IT / Tech · RH · Transversal (toute l'entreprise) | Oui |

**Branchement conditionnel :**
- Si taille "1-5" → le système adaptera les recommandations vers des outils no-code/low-code accessibles
- Si taille "150+" → le système incluera des recommandations d'architecture plus robustes (API, infrastructure)

---

### 2.4 Étape 3 — Vos outils

**Question** : "Quels outils utilisez-vous au quotidien ?"

**Type** : Multi-select visuel (grille de cards avec icônes, toggle on/off)

**Catégories et options :**

| Catégorie | Outils proposés |
|-----------|----------------|
| Email & Communication | Gmail · Outlook · Slack · Teams · WhatsApp Business |
| CRM & Ventes | HubSpot · Salesforce · Pipedrive · monday.com · Excel/Sheets (comme CRM) |
| Gestion de projet | Notion · Trello · Asana · ClickUp · monday.com |
| Comptabilité & Finance | Pennylane · QuickBooks · Sage · Excel/Sheets |
| Marketing | Mailchimp · Brevo · LinkedIn Ads · Meta Ads · WordPress |
| Autre | Champ texte libre "Précisez vos outils clés" |

**UX :**
- Chaque outil est une card avec son icône/logo simplifié
- L'utilisateur clique pour toggler (même pattern que les agents dans le Calculateur)
- Minimum 1 outil requis
- Badge "populaire" sur les 3 outils les plus courants selon le secteur sélectionné à l'étape 1

---

### 2.5 Étape 4 — Vos douleurs

**Question** : "Quels processus vous font perdre le plus de temps ?"

**Type** : Multi-select (chips) + classement par priorité (drag ou numérotation)

**Options :**

| Douleur | Description courte (tooltip) |
|---------|------------------------------|
| Prospection & qualification de leads | "Recherche manuelle de prospects, tri, relances" |
| Réponse aux demandes clients | "Emails répétitifs, FAQ, support niveau 1" |
| Saisie de données & reporting | "Double saisie, consolidation Excel, rapports manuels" |
| Suivi commercial (CRM) | "Mise à jour des fiches, relances, pipeline" |
| Facturation & administratif | "Devis, factures, relances de paiement" |
| Création de contenu | "Posts réseaux sociaux, newsletters, articles" |
| Onboarding clients/collaborateurs | "Processus d'intégration, documentation, formation" |
| Gestion des emails & tri | "Boîte de réception débordante, routage manuel" |
| Recrutement & RH | "Tri de CV, réponses candidats, planification entretiens" |

**UX :**
- L'utilisateur sélectionne 1 à 4 douleurs maximum
- Après sélection, demander : "Laquelle est votre priorité n°1 ?" (highlight avec un clic)
- Champ optionnel : "Décrivez en une phrase votre plus grand irritant" (texte libre, max 200 caractères)

**Branchement conditionnel :**
- Les douleurs sélectionnées alimentent directement le prompt IA et déterminent les projets recommandés
- La priorité n°1 détermine le projet mis en avant dans les résultats

---

### 2.6 Étape 5 — Votre maturité

**Question** : "Où en êtes-vous avec l'IA et l'automatisation ?"

**Champs :**

| Champ | Type | Options |
|-------|------|---------|
| Niveau actuel | Select (cards visuelles avec icône + description) | Voir ci-dessous |
| Horizon de temps | Select (chips) | Urgent (< 1 mois) · Court terme (1-3 mois) · Moyen terme (3-6 mois) · Exploration (pas de deadline) |

**Niveaux de maturité (cards visuelles) :**

```
┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐
│  🌱 Découverte           │  │  🔧 Premiers pas          │  │  🚀 En route             │
│                          │  │                          │  │                          │
│  "On n'a rien mis en     │  │  "On utilise ChatGPT     │  │  "On a déjà des automa-  │
│  place, on explore       │  │  ou quelques outils,     │  │  tisations (Make, Zapier) │
│  les possibilités."      │  │  mais rien de structuré." │  │  et on veut aller plus   │
│                          │  │                          │  │  loin."                  │
└──────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘
```

---

### 2.7 Écran de transition — Analyse IA

**Comportement :**
- Durée : 2-4 secondes (temps réel de l'appel API Gemini)
- Affichage : animation de chargement élégante

**Contenu visuel :**

```
        ┌─────────────────────────────────────┐
        │                                     │
        │      [ Animation : nœuds qui        │
        │        se connectent entre eux,      │
        │        style graphe / réseau ]       │
        │                                     │
        │   "Analyse de votre contexte..."    │
        │                                     │
        │   ░░░░░░░░░████████░░░░░░░░░░       │
        │                                     │
        │   • Secteur identifié ✓             │
        │   • Outils analysés ✓               │
        │   • Recommandations en cours...     │
        │                                     │
        └─────────────────────────────────────┘
```

- Checklist animée : chaque item apparaît et passe en ✓ au fur et à mesure
- Donne le sentiment que l'IA "travaille" sur le contexte
- Transition fluide vers la page résultats

---

### 2.8 Page Résultats

**Structure de la page :**

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER RÉSULTATS                                                   │
│  "Votre diagnostic personnalisé"                                    │
│  Badge: [Secteur] · [Taille] · [Maturité]                         │
│  Résumé 1 ligne IA : "Pour une ESN de 30 personnes en phase        │
│  d'exploration, voici les 3 projets à plus fort impact."           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─ PROJET RECOMMANDÉ #1 (prioritaire) ─────────────────────────┐  │
│  │                                                               │  │
│  │  [Tag: PRIORITÉ HAUTE]  [Tag: COMPLEXITÉ MOYENNE]            │  │
│  │                                                               │  │
│  │  Titre : "Agent IA de qualification de leads entrants"       │  │
│  │                                                               │  │
│  │  Description : "Un agent connecté à votre Gmail et           │  │
│  │  HubSpot qui analyse chaque demande entrante, évalue         │  │
│  │  le potentiel du prospect, et envoie une réponse             │  │
│  │  personnalisée en moins de 5 minutes."                       │  │
│  │                                                               │  │
│  │  ┌─ SCHÉMA D'ARCHITECTURE ─────────────────────────────┐    │  │
│  │  │                                                      │    │  │
│  │  │  [Gmail] ──→ [Agent IA] ──→ [HubSpot CRM]          │    │  │
│  │  │     │            │               │                   │    │  │
│  │  │     │        [Base de            │                   │    │  │
│  │  │     │        connaissances]      │                   │    │  │
│  │  │     │                            │                   │    │  │
│  │  │     └────────── [Gmail] ◄────────┘                   │    │  │
│  │  │              (réponse auto)                          │    │  │
│  │  └──────────────────────────────────────────────────────┘    │  │
│  │                                                               │  │
│  │  Complexité : ██████░░░░ Moyenne                              │  │
│  │  ROI estimé : ~20h/mois récupérées                            │  │
│  │  Délai : 2-3 semaines                                         │  │
│  │  Outils impliqués : Gmail, HubSpot, API Gemini               │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─ PROJET #2 ──────────────────────────────────────────────────┐  │
│  │  [Tag: QUICK WIN]  [Tag: COMPLEXITÉ FAIBLE]                  │  │
│  │  "Automatisation du reporting hebdomadaire"                  │  │
│  │  [Schéma] + [Métriques] ...                                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─ PROJET #3 ──────────────────────────────────────────────────┐  │
│  │  [Tag: VISION]  [Tag: COMPLEXITÉ ÉLEVÉE]                     │  │
│  │  "CRM semi-automatisé avec scoring IA"                       │  │
│  │  [Schéma] + [Métriques] ...                                  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  SECTION CTA                                                        │
│                                                                     │
│  "Envie d'aller plus loin ?"                                       │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ 📞 Réserver un    │  │ 📧 Recevoir mon   │  │ 💬 Discuter avec │  │
│  │ appel stratégique │  │ diagnostic par    │  │ Lucio           │  │
│  │                   │  │ email             │  │                  │  │
│  │ [CTA Principal]   │  │ [CTA Secondaire]  │  │ [CTA Tertiaire]  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                     │
│  Champs (si "Recevoir par email") :                                │
│  [Prénom]  [Email]  [ Envoyer → ]                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Détail d'une fiche projet :**

| Élément | Source |
|---------|--------|
| Tag priorité | Déterminé par l'IA (PRIORITÉ HAUTE / QUICK WIN / VISION) |
| Tag complexité | Calculé par l'IA (FAIBLE / MOYENNE / ÉLEVÉE) |
| Titre du projet | Généré par l'IA, basé sur le catalogue (voir section 3) |
| Description | Générée par l'IA, contextualisée avec les outils et douleurs du visiteur |
| Schéma d'architecture | Sélectionné depuis la bibliothèque (voir section 4), labels adaptés par l'IA |
| Barre de complexité | Visuelle (1-10 rendue en barre de progression) |
| ROI estimé | Calculé par l'IA en heures/mois récupérées |
| Délai estimé | Fourchette standard associée au type de projet |
| Outils impliqués | Intersection entre les outils du visiteur et les outils du projet |

---

## 3. Moteur de recommandation IA

### 3.1 Architecture du moteur

```
Données utilisateur (5 étapes)
        │
        ▼
┌─────────────────────────┐
│   PROMPT STRUCTURÉ      │
│   (system + user data)  │
│                         │
│   Modèle: Gemini 2.5    │
│   Flash                 │
│                         │
│   Output: JSON structuré│
│   via generateObject()  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   VALIDATION ZOD        │
│   (schéma strict)       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   RENDU CÔTÉ CLIENT     │
│   (fiches + schémas)    │
└─────────────────────────┘
```

**Approche** : `generateObject()` du Vercel AI SDK avec un schéma Zod strict. L'IA ne génère pas de texte libre non structuré — elle remplit un objet JSON validé.

### 3.2 Schéma Zod de sortie

```typescript
const DiagnosticResultSchema = z.object({
  summary: z.string()
    .describe("Résumé personnalisé en 1-2 phrases du diagnostic"),

  projects: z.array(z.object({
    id: z.string()
      .describe("Identifiant du template de projet depuis le catalogue"),
    title: z.string()
      .describe("Titre du projet, contextualisé au secteur du visiteur"),
    description: z.string()
      .describe("Description en 2-3 phrases, mentionnant les outils du visiteur"),
    priority: z.enum(["high", "quick_win", "vision"])
      .describe("high = impact fort et aligné avec la douleur prioritaire, quick_win = facile et rapide, vision = projet structurant à moyen terme"),
    complexity: z.number().min(1).max(10)
      .describe("1 = très simple (no-code), 10 = architecture complexe"),
    complexityLabel: z.enum(["low", "medium", "high"]),
    estimatedHoursPerMonth: z.number()
      .describe("Heures économisées par mois une fois déployé"),
    estimatedDelivery: z.string()
      .describe("Fourchette de délai ex: '1-2 semaines'"),
    schemaId: z.string()
      .describe("ID du schéma d'architecture à utiliser depuis la bibliothèque"),
    schemaLabels: z.object({
      nodes: z.array(z.object({
        id: z.string(),
        label: z.string(),
      })),
    }).describe("Labels personnalisés pour les nœuds du schéma sélectionné"),
    toolsInvolved: z.array(z.string())
      .describe("Liste des outils impliqués (issus de la sélection utilisateur + outils additionnels)"),
    offerCategory: z.enum([
      "etude_plans",
      "gros_oeuvre",
      "acquisition",
      "transfert_competences",
    ]).describe("Catégorie d'offre Hoptisens correspondante"),
  })).min(2).max(3),

  recommendedEntry: z.enum(["sprint", "audit", "formation", "rdv_direct"])
    .describe("Point d'entrée recommandé dans le parcours Hoptisens"),
});
```

### 3.3 Catalogue de projets types

Le catalogue sert de **base de connaissances** injectée dans le system prompt. L'IA choisit et adapte parmi ces templates.

#### Catégorie 1 — L'Étude & Les Plans

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| `audit-data` | Audit de l'infrastructure de données | 3/10 | `schema-audit` |
| `audit-process` | Cartographie des processus automatisables | 4/10 | `schema-audit` |
| `audit-commercial` | Audit de l'architecture commerciale | 3/10 | `schema-audit` |
| `diag-maturite` | Diagnostic de maturité IA | 2/10 | `schema-audit` |

#### Catégorie 2 — Le Gros Œuvre

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| `agent-email` | Agent IA de traitement et réponse aux emails | 6/10 | `schema-agent-email` |
| `agent-qualification` | Agent IA de qualification de leads | 7/10 | `schema-agent-leads` |
| `agent-support` | Agent IA de support client niveau 1 | 6/10 | `schema-agent-support` |
| `agent-interne` | Agent IA interne (assistant métier) | 5/10 | `schema-agent-interne` |
| `auto-reporting` | Automatisation du reporting (Excel → Dashboard) | 4/10 | `schema-auto-reporting` |
| `auto-facturation` | Automatisation facturation et relances | 5/10 | `schema-auto-facturation` |
| `auto-onboarding` | Automatisation onboarding client/collaborateur | 5/10 | `schema-auto-onboarding` |
| `crm-semi-auto` | CRM semi-automatisé | 7/10 | `schema-crm` |
| `interconnexion` | Câblage logiciel (interconnexion d'outils) | 5/10 | `schema-interconnexion` |

#### Catégorie 3 — Les Réseaux d'Acquisition

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| `prospecteur-augmente` | Prospection IA automatisée (scraping + rédaction) | 7/10 | `schema-prospecteur` |
| `filtre-ia` | Filtre IA de qualification inbound | 6/10 | `schema-filtre-ia` |
| `contenu-ia` | Usine à contenus multi-canaux IA | 5/10 | `schema-contenu` |
| `seo-infra` | Infrastructure de pages SEO optimisées | 6/10 | `schema-seo` |

#### Catégorie 4 — Le Transfert de Compétences

| ID | Projet type | Complexité base | Schéma |
|----|-------------|----------------|--------|
| `formation-fondamentaux` | Atelier "Les Fondamentaux de l'IA" | 2/10 | `schema-formation` |
| `formation-assistants` | Formation "Créer ses propres assistants IA" | 3/10 | `schema-formation` |
| `agent-formateur` | Agent formateur interne (onboarding IA) | 5/10 | `schema-agent-interne` |

### 3.4 System prompt de recommandation

```
Tu es le moteur de diagnostic d'Hoptisens, une agence d'automatisation et d'IA
pour les TPE/PME.

À partir du profil utilisateur fourni, tu dois recommander exactement 2 ou 3
projets d'automatisation/IA parmi le catalogue ci-dessous. Les projets doivent
être :

1. PERTINENTS : alignés avec les douleurs identifiées et le secteur
2. VARIÉS : mélanger les niveaux de complexité (un quick-win + un projet
   structurant)
3. CONCRETS : utiliser les noms des outils réels du visiteur dans les
   descriptions
4. PROGRESSIFS : le premier projet doit être celui à démarrer immédiatement,
   les suivants sont des perspectives

Règles de sélection :
- La douleur marquée "priorité n°1" détermine le projet "high"
- Toujours inclure au moins un projet de complexité ≤ 4 (quick win)
- Adapter la complexité à la maturité : "Découverte" → baisser de 1-2 points,
  "En route" → garder ou augmenter
- Adapter à la taille de l'entreprise : "1-5" → privilégier no-code/low-code,
  "150+" → architectures robustes
Pour chaque projet, sélectionne le schemaId le plus approprié depuis la
bibliothèque et remplis les labels des nœuds avec les outils réels du visiteur.

Recommande aussi le meilleur point d'entrée :
- "sprint" si la maturité est Découverte ou Premiers pas
- "audit" si les douleurs sont multiples et diffuses
- "formation" si la maturité est Découverte et la taille > 50
- "rdv_direct" si l'horizon est Urgent

CATALOGUE DE PROJETS :
[catalogue injecté ici]
```

### 3.5 Règles de fallback

| Situation | Fallback |
|-----------|----------|
| L'API Gemini échoue ou timeout | Recommandations rule-based pré-calculées côté serveur basées sur une matrice douleur × maturité |
| L'utilisateur ne sélectionne qu'une seule douleur | Proposer 2 projets (pas 3) |
| Aucun outil sélectionné dans l'étape 3 | Proposer des projets avec les outils les plus courants du secteur |
| Réponse IA mal formée (validation Zod échoue) | Retry une fois, puis fallback rule-based |

### 3.6 Matrice de fallback rule-based

En cas d'échec de l'IA, cette matrice détermine les recommandations :

| Douleur prioritaire | Maturité Découverte | Maturité Premiers pas | Maturité En route |
|---------------------|--------------------|-----------------------|-------------------|
| Prospection & leads | `diag-maturite` + `filtre-ia` | `prospecteur-augmente` + `auto-reporting` | `prospecteur-augmente` + `crm-semi-auto` |
| Réponse clients | `formation-fondamentaux` + `agent-support` | `agent-email` + `auto-reporting` | `agent-support` + `crm-semi-auto` |
| Saisie & reporting | `audit-process` + `auto-reporting` | `auto-reporting` + `interconnexion` | `auto-reporting` + `crm-semi-auto` + `agent-interne` |
| Suivi commercial | `audit-commercial` + `crm-semi-auto` | `crm-semi-auto` + `auto-reporting` | `crm-semi-auto` + `prospecteur-augmente` |
| Facturation & admin | `audit-process` + `auto-facturation` | `auto-facturation` + `interconnexion` | `auto-facturation` + `agent-interne` |
| Création de contenu | `formation-assistants` + `contenu-ia` | `contenu-ia` + `seo-infra` | `contenu-ia` + `seo-infra` + `prospecteur-augmente` |
| Onboarding | `audit-process` + `auto-onboarding` | `auto-onboarding` + `agent-interne` | `auto-onboarding` + `agent-formateur` |

---

## 4. Bibliothèque de schémas d'architecture

### 4.1 Principe

Chaque schéma est un **composant SVG React paramétrable** qui accepte des labels dynamiques pour ses nœuds. Le moteur IA sélectionne le bon `schemaId` et fournit les labels contextualisés.

### 4.2 Interface commune

```typescript
interface SchemaProps {
  labels: {
    nodes: Array<{
      id: string;    // ex: "source", "agent", "output", "db"
      label: string; // ex: "Gmail", "Agent IA", "HubSpot"
    }>;
  };
  animate?: boolean; // true par défaut, false si prefers-reduced-motion
}
```

### 4.3 Catalogue de schémas

#### `schema-agent-email` — Traitement intelligent d'emails

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {source} │ ───→ │  Agent IA    │ ───→ │ {output} │
│ (Email)  │      │              │      │ (CRM)    │
└──────────┘      │   ┌──────┐  │      └──────────┘
                  │   │{db}  │  │
                  │   │(BDD) │  │      ┌──────────┐
                  │   └──────┘  │ ───→ │ {reply}  │
                  └──────────────┘      │ (Email)  │
                                        └──────────┘
```

Nœuds paramétrables : `source`, `agent`, `db`, `output`, `reply`

#### `schema-agent-leads` — Qualification de leads

```
┌──────────┐ ─┐
│ {source1}│  │    ┌────────────┐      ┌───────────┐
│ (Web)    │  ├──→ │  Filtre IA │ ───→ │ {output}  │
├──────────┤  │    │            │      │ (CRM)     │
│ {source2}│  │    └────────────┘      └───────────┘
│ (LinkedIn)│ ─┘
└──────────┘
```

Nœuds : `source1`, `source2`, `filter`, `output`

#### `schema-agent-support` — Support client IA

```
┌──────────┐      ┌──────────────┐  ──→ ┌──────────┐
│ {source} │ ───→ │  Agent IA    │      │ {auto}   │
│ (Chat)   │      │  Support     │      │ (Réponse)│
└──────────┘      │   ┌──────┐  │      └──────────┘
                  │   │{kb}  │  │
                  │   │(FAQ) │  │  ──→ ┌──────────┐
                  │   └──────┘  │      │ {escalade}│
                  └──────────────┘      │ (Humain) │
                                        └──────────┘
```

Nœuds : `source`, `agent`, `kb`, `auto`, `escalade`

#### `schema-agent-interne` — Assistant métier interne

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {trigger}│ ───→ │  Agent IA    │ ───→ │ {action} │
│ (Slack)  │      │  Métier      │      │ (Notion) │
└──────────┘      │   ┌──────┐  │      └──────────┘
                  │   │{data}│  │
                  │   │(BDD) │  │
                  │   └──────┘  │
                  └──────────────┘
```

Nœuds : `trigger`, `agent`, `data`, `action`

#### `schema-auto-reporting` — Automatisation reporting

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {source1}│ ──┐  │              │      │ {output} │
│ (CRM)    │   ├→ │  Automation  │ ───→ │(Dashboard│
├──────────┤   │  │  (Make/n8n)  │      └──────────┘
│ {source2}│ ──┘  │              │
│ (Compta) │      └──────────────┘      ┌──────────┐
└──────────┘                       ───→ │ {notif}  │
                                        │ (Slack)  │
                                        └──────────┘
```

Nœuds : `source1`, `source2`, `automation`, `output`, `notif`

#### `schema-auto-facturation` — Automatisation facturation

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {trigger}│ ───→ │  Automation  │ ───→ │ {compta} │
│ (CRM)    │      │              │      │(Pennylane│
└──────────┘      │  ┌────────┐ │      └──────────┘
                  │  │Template│ │
                  │  │Facture │ │  ───→ ┌──────────┐
                  │  └────────┘ │      │ {email}  │
                  └──────────────┘      │ (Gmail)  │
                                        └──────────┘
```

Nœuds : `trigger`, `automation`, `template`, `compta`, `email`

#### `schema-auto-onboarding` — Automatisation onboarding

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {trigger}│ ───→ │  Workflow     │ ───→ │ {docs}   │
│(Nouveau  │      │  automatisé  │      │ (Notion) │
│ client)  │      │              │      └──────────┘
└──────────┘      └──────┬───────┘
                         │          ┌──────────┐
                         ├────────→ │ {email}  │
                         │          │(Séquence)│
                         │          └──────────┘
                         │          ┌──────────┐
                         └────────→ │ {task}   │
                                    │(Tâche PM)│
                                    └──────────┘
```

Nœuds : `trigger`, `workflow`, `docs`, `email`, `task`

#### `schema-crm` — CRM semi-automatisé

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {input1} │ ──┐  │              │ ───→ │ {crm}    │
│ (Web)    │   │  │   Scoring    │      │(HubSpot) │
├──────────┤   ├→ │     IA       │      └──────────┘
│ {input2} │   │  │              │
│(LinkedIn)│ ──┘  └──────┬───────┘      ┌──────────┐
└──────────┘             │         ───→ │ {alert}  │
                         │              │ (Slack)  │
                         │              └──────────┘
                         │              ┌──────────┐
                         └────────────→ │ {dash}   │
                                        │(Dashboard│
                                        └──────────┘
```

Nœuds : `input1`, `input2`, `scoring`, `crm`, `alert`, `dash`

#### `schema-interconnexion` — Câblage logiciel

```
┌──────┐   ┌──────┐   ┌──────┐
│{app1}│   │{app2}│   │{app3}│
└──┬───┘   └──┬───┘   └──┬───┘
   │          │          │
   └──────┬───┴──────┬───┘
          │          │
   ┌──────▼──────────▼──────┐
   │     Hub Automation     │
   │     (Make / n8n)       │
   └──────┬──────────┬──────┘
          │          │
   ┌──────▼───┐ ┌───▼──────┐
   │ {out1}   │ │ {out2}   │
   └──────────┘ └──────────┘
```

Nœuds : `app1`, `app2`, `app3`, `hub`, `out1`, `out2`

#### `schema-prospecteur` — Prospection IA automatisée

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {source} │ ───→ │  Scraping +  │ ───→ │ {enrich} │
│(LinkedIn)│      │  IA          │      │(Enrichiss│
└──────────┘      └──────────────┘      └────┬─────┘
                                             │
                                    ┌────────▼─────┐
                                    │  Rédaction IA │
                                    │  personnalisée│
                                    └────────┬─────┘
                                             │
                                    ┌────────▼─────┐
                                    │   {output}   │
                                    │  (CRM/Email) │
                                    └──────────────┘
```

Nœuds : `source`, `scraping`, `enrich`, `redaction`, `output`

#### `schema-filtre-ia` — Filtre IA inbound

Réutilise le composant `LeadsSchema` existant dans `OfferSchemas.tsx`, rendu paramétrable.

#### `schema-contenu` — Usine à contenus

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {brief}  │ ───→ │  Génération  │ ──┬→ │ {canal1} │
│ (Brief)  │      │  IA multi-   │  │  │(LinkedIn)│
└──────────┘      │  format      │  │  └──────────┘
                  └──────────────┘  │  ┌──────────┐
                                    ├→ │ {canal2} │
                                    │  │ (Blog)   │
                                    │  └──────────┘
                                    │  ┌──────────┐
                                    └→ │ {canal3} │
                                       │(Newsletter│
                                       └──────────┘
```

Nœuds : `brief`, `generation`, `canal1`, `canal2`, `canal3`

#### `schema-seo` — Infrastructure SEO

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {keyword}│ ───→ │  Génération  │ ───→ │ {pages}  │
│(Recherche│      │  IA de pages │      │(Site web)│
│ mots-clés│      └──────────────┘      └────┬─────┘
└──────────┘                                 │
                                    ┌────────▼─────┐
                                    │   Analytics  │
                                    │  + Suivi SEO │
                                    └──────────────┘
```

Nœuds : `keyword`, `generation`, `pages`, `analytics`

#### `schema-formation` — Formation / Transfert

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {equipe} │ ───→ │  Formation   │ ───→ │ {output} │
│(Équipe)  │      │  Hoptisens   │      │(Compéten-│
└──────────┘      │              │      │ ces IA)  │
                  │  ┌────────┐ │      └──────────┘
                  │  │Ateliers│ │
                  │  │+ TP    │ │  ───→ ┌──────────┐
                  │  └────────┘ │      │ {certif} │
                  └──────────────┘      │(Certif.) │
                                        └──────────┘
```

Nœuds : `equipe`, `formation`, `ateliers`, `output`, `certif`

#### `schema-audit` — Audit / Diagnostic

```
┌──────────┐      ┌──────────────┐      ┌──────────┐
│ {input}  │ ───→ │   Analyse    │ ───→ │ {livrable}│
│(Données  │      │   Hoptisens  │      │(Rapport + │
│existantes│      │              │      │ Plan)     │
└──────────┘      │  ┌────────┐ │      └──────────┘
                  │  │Entretien│ │
                  │  │+ Audit │ │
                  │  └────────┘ │
                  └──────────────┘
```

Nœuds : `input`, `analyse`, `entretien`, `livrable`

### 4.4 Style visuel des schémas

Les schémas suivent le même design system que les `OfferSchemas.tsx` existants :

| Élément | Style |
|---------|-------|
| Nœuds rectangulaires | `fill: var(--color-bg)`, `stroke: var(--color-border)`, `rx: 8` |
| Nœud central IA/Agent | Cercle `fill: var(--color-accent)`, texte blanc |
| Connexions | `stroke: var(--color-accent)`, `strokeWidth: 2` |
| Flux animés | `strokeDasharray: 4 4` + animation `strokeDashoffset` |
| Points voyageurs | Cercle `fill: var(--color-accent)`, `r: 3-4`, animation translate |
| Labels | `fontSize: 11-12`, `fill: var(--color-text-secondary)`, `font-sans` |
| Icônes dans nœuds | Emoji ou SVG inline, centré |
| Fond du conteneur | `bg-surface/50 rounded-2xl border border-border` |

---

## 5. Spécifications techniques

### 5.1 Nouveaux fichiers à créer

```
app/
├── [locale]/
│   └── diagnostic/
│       └── page.tsx                → Page Auto-Diag (wizard + résultats)
├── api/
│   └── diagnostic/
│       └── route.ts                → Route Handler (appel Gemini + fallback)

components/
├── diagnostic/
│   ├── DiagnosticWizard.tsx        → Composant principal orchestrateur
│   ├── steps/
│   │   ├── StepProfile.tsx         → Étape 1 : Profil
│   │   ├── StepCompany.tsx         → Étape 2 : Entreprise
│   │   ├── StepTools.tsx           → Étape 3 : Outils
│   │   ├── StepPainPoints.tsx      → Étape 4 : Douleurs
│   │   └── StepMaturity.tsx        → Étape 5 : Maturité
│   ├── DiagnosticResults.tsx       → Page résultats
│   ├── ProjectCard.tsx             → Fiche projet individuelle
│   ├── DiagnosticLoading.tsx       → Écran de transition / loading
│   └── DiagnosticIntro.tsx         → Écran d'accueil
│
├── schemas/
│   ├── SchemaRenderer.tsx          → Composant qui sélectionne et rend le bon schéma
│   ├── SchemaAgentEmail.tsx
│   ├── SchemaAgentLeads.tsx
│   ├── SchemaAgentSupport.tsx
│   ├── SchemaAgentInterne.tsx
│   ├── SchemaAutoReporting.tsx
│   ├── SchemaAutoFacturation.tsx
│   ├── SchemaAutoOnboarding.tsx
│   ├── SchemaCRM.tsx
│   ├── SchemaInterconnexion.tsx
│   ├── SchemaProspecteur.tsx
│   ├── SchemaFiltreIA.tsx
│   ├── SchemaContenu.tsx
│   ├── SchemaSEO.tsx
│   ├── SchemaFormation.tsx
│   └── SchemaAudit.tsx

lib/
└── diagnostic/
    ├── types.ts                    → Types TypeScript
    ├── catalog.ts                  → Catalogue de projets (données statiques)
    ├── fallback.ts                 → Matrice de fallback rule-based
    └── prompt.ts                   → System prompt + construction du prompt
```

### 5.2 Types TypeScript

```typescript
// lib/diagnostic/types.ts

export type UserRole =
  | "dirigeant"
  | "directeur_commercial"
  | "daf"
  | "responsable_ops"
  | "cto_dsi"
  | "responsable_marketing"
  | "autre";

export type Sector =
  | "agence_esn"
  | "conseil"
  | "commerce_retail"
  | "industrie_logistique"
  | "services_b2b"
  | "sante"
  | "immobilier"
  | "education"
  | "autre";

export type CompanySize =
  | "1-5"
  | "6-20"
  | "21-50"
  | "51-150"
  | "150-300"
  | "300+";

export type Department =
  | "direction"
  | "commercial"
  | "marketing"
  | "finance_admin"
  | "operations"
  | "it_tech"
  | "rh"
  | "transversal";

export type Tool = {
  id: string;
  name: string;
  category: ToolCategory;
  icon: string; // emoji ou nom d'icône
};

export type ToolCategory =
  | "email_communication"
  | "crm_ventes"
  | "gestion_projet"
  | "comptabilite"
  | "marketing"
  | "autre";

export type PainPoint =
  | "prospection_leads"
  | "reponse_clients"
  | "saisie_reporting"
  | "suivi_commercial"
  | "facturation_admin"
  | "creation_contenu"
  | "onboarding"
  | "gestion_emails"
  | "recrutement_rh";

export type MaturityLevel =
  | "decouverte"
  | "premiers_pas"
  | "en_route";

export type TimeHorizon =
  | "urgent"
  | "court_terme"
  | "moyen_terme"
  | "exploration";

// Données collectées à travers les 5 étapes
export interface DiagnosticInput {
  // Étape 1
  role: UserRole;
  roleOther?: string;
  sector: Sector;
  sectorOther?: string;

  // Étape 2
  companySize: CompanySize;
  department: Department;

  // Étape 3
  tools: string[]; // IDs des outils sélectionnés
  toolsOther?: string;

  // Étape 4
  painPoints: PainPoint[];
  priorityPainPoint: PainPoint;
  painPointDescription?: string;

  // Étape 5
  maturity: MaturityLevel;
  timeHorizon: TimeHorizon;
}

// Résultat retourné par l'API
export interface DiagnosticResult {
  summary: string;
  projects: ProjectRecommendation[];
  recommendedEntry: "sprint" | "audit" | "formation" | "rdv_direct";
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "quick_win" | "vision";
  complexity: number; // 1-10
  complexityLabel: "low" | "medium" | "high";
  estimatedHoursPerMonth: number;
  estimatedDelivery: string;
  schemaId: string;
  schemaLabels: {
    nodes: Array<{ id: string; label: string }>;
  };
  toolsInvolved: string[];
  offerCategory: "etude_plans" | "gros_oeuvre" | "acquisition" | "transfert_competences";
}

// État du wizard
export type WizardStep = 0 | 1 | 2 | 3 | 4 | 5; // 0 = intro, 5 = résultats

export interface WizardState {
  currentStep: WizardStep;
  data: Partial<DiagnosticInput>;
  result: DiagnosticResult | null;
  isLoading: boolean;
  error: string | null;
}
```

### 5.3 Route API — `app/api/diagnostic/route.ts`

```typescript
// Pseudo-code structurel

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { DiagnosticResultSchema } from '@/lib/diagnostic/types';
import { buildPrompt } from '@/lib/diagnostic/prompt';
import { getFallbackResult } from '@/lib/diagnostic/fallback';
import { createLead } from '@/lib/airtable';

export async function POST(req: Request) {
  const input: DiagnosticInput = await req.json();

  // 1. Validation des entrées (Zod)
  // 2. Construction du prompt avec le catalogue
  // 3. Appel Gemini via generateObject()
  // 4. Validation du résultat (Zod)
  // 5. Fallback si erreur
  // 6. Sauvegarde Airtable (diagnostic sans email → source "AutoDiag")
  // 7. Retour du résultat JSON
}
```

**Points techniques clés :**
- `generateObject()` (pas `streamText()`) : on veut un JSON structuré, pas du streaming
- Timeout : 15 secondes max (Gemini Flash est rapide)
- Rate limiting : max 5 diagnostics / IP / heure (via headers)
- Pas de données personnelles stockées à cette étape (seulement le contexte business)

### 5.4 Composant orchestrateur — `DiagnosticWizard.tsx`

```typescript
// Structure du state management (React useState, pas de lib externe)

const [step, setStep] = useState<WizardStep>(0);
const [data, setData] = useState<Partial<DiagnosticInput>>({});
const [result, setResult] = useState<DiagnosticResult | null>(null);
const [isLoading, setIsLoading] = useState(false);

// Navigation
const goNext = () => setStep(prev => Math.min(prev + 1, 5) as WizardStep);
const goBack = () => setStep(prev => Math.max(prev - 1, 0) as WizardStep);

// Soumission
const submitDiagnostic = async () => {
  setIsLoading(true);
  setStep(5); // montre l'écran de loading
  const res = await fetch('/api/diagnostic', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await res.json();
  setResult(result);
  setIsLoading(false);
};
```

### 5.5 Intégration Airtable

**Extension du modèle existant :**

Le type `Source` dans Airtable passe de `'Lucio' | 'Forms'` à `'Lucio' | 'Forms' | 'AutoDiag'`.

**Deux moments de sauvegarde :**

1. **À la soumission du diagnostic** (sans données personnelles) :
   - Source : `AutoDiag`
   - Champs business : rôle, secteur, taille, outils, douleurs, maturité
   - Recommandations générées (JSON stringifié)
   - Pas d'email → record "anonyme" pour analytics

2. **Si l'utilisateur entre son email** (CTA "Recevoir par email") :
   - Mise à jour du record existant avec prénom + email
   - Ou création d'un nouveau record complet

**Nouveaux champs Airtable suggérés :**

| Champ | Type | Description |
|-------|------|-------------|
| `Diagnostic_Role` | Single select | Rôle du visiteur |
| `Diagnostic_Sector` | Single select | Secteur d'activité |
| `Diagnostic_Size` | Single select | Taille de l'entreprise |
| `Diagnostic_Tools` | Long text | Outils sélectionnés (JSON) |
| `Diagnostic_PainPoints` | Long text | Douleurs sélectionnées (JSON) |
| `Diagnostic_Maturity` | Single select | Niveau de maturité IA |
| `Diagnostic_Results` | Long text | Résultats IA (JSON) |
| `Diagnostic_EntryPoint` | Single select | Point d'entrée recommandé |

### 5.6 Internationalisation

**Nouveaux clés dans `messages/fr.json` et `messages/en.json` :**

```json
{
  "Diagnostic": {
    "meta": {
      "title": "Auto-Diagnostic IA — Hoptisens",
      "description": "Découvrez en 2 minutes les projets IA les plus impactants pour votre entreprise."
    },
    "intro": {
      "badge": "DIAGNOSTIC GRATUIT · 2 MIN",
      "title": "Quel projet IA aura le plus d'impact dans votre entreprise ?",
      "subtitle": "Répondez à 5 questions...",
      "cta": "Commencer le diagnostic",
      "disclaimer": "Aucune donnée personnelle requise. Résultats immédiats."
    },
    "steps": {
      "profile": { "title": "Parlons de vous", "..." : "..." },
      "company": { "title": "Votre entreprise en bref", "..." : "..." },
      "tools": { "title": "Quels outils utilisez-vous au quotidien ?", "..." : "..." },
      "painPoints": { "title": "Quels processus vous font perdre le plus de temps ?", "..." : "..." },
      "maturity": { "title": "Où en êtes-vous avec l'IA et l'automatisation ?", "..." : "..." }
    },
    "loading": { "..." : "..." },
    "results": { "..." : "..." }
  }
}
```

Le system prompt IA a aussi une variante EN (le résultat est généré dans la langue de l'utilisateur).

---

## 6. Design UI/UX & Animations

### 6.1 Layout général

```
┌────────────────────────────────────────────────────┐
│  Navbar (existant)                                 │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │              Container max-w-2xl              │  │
│  │                                              │  │
│  │  [ Barre de progression ]  Étape X/5         │  │
│  │                                              │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │                                        │  │  │
│  │  │         Contenu de l'étape             │  │  │
│  │  │                                        │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │
│  │  [ ← Retour ]              [ Suivant → ]     │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
├────────────────────────────────────────────────────┤
│  Footer (existant)                                 │
└────────────────────────────────────────────────────┘
```

- Container centré, `max-w-2xl` (672px) pour le wizard
- Container `max-w-5xl` (1024px) pour la page résultats
- Fond : `var(--color-bg)`, comme le reste du site

### 6.2 Barre de progression

```
Étape 1         Étape 2         Étape 3         Étape 4         Étape 5
  ●━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━●─ ─ ─ ─ ─ ─ ─ ─○─ ─ ─ ─ ─ ─ ─ ─○
                                  ↑ active
```

- Segments complétés : trait plein `var(--color-accent)`
- Segment actif : animation pulse légère
- Segments à venir : trait pointillé `var(--color-border)`
- Points : cercle plein (complété), cercle avec pulse (actif), cercle vide (à venir)
- Labels visibles sur desktop, masqués sur mobile (uniquement "Étape X/5")

### 6.3 Chips / Boutons de sélection

Reprendre exactement le pattern du Calculateur (`Calculateur.tsx` lignes 236-326) :

```
┌─────────────────────────┐    ┌─────────────────────────┐
│  [icône]  Dirigeant     │    │  [icône]  Dir. Commercial│
│                    [✓]  │    │                         │
└─────────────────────────┘    └─────────────────────────┘
```

- Non sélectionné : `bg-surface, border-border`
- Sélectionné : `bg-accent-soft, border-accent, shadow-md`
- Hover : `border-accent-border, -translate-y-0.5`
- Transition : `200ms ease`

### 6.4 Grille d'outils (Étape 3)

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  📧     │  │  📊     │  │  💬     │  │  📝     │
│  Gmail  │  │ HubSpot │  │  Slack  │  │  Notion │
│         │  │   [✓]   │  │         │  │   [✓]   │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

- Grille 4 colonnes (desktop), 3 colonnes (tablet), 2 colonnes (mobile)
- Cards carrées avec icône + nom
- Toggle on/off au clic
- Organisées par catégorie avec un label de section discret

### 6.5 Animations

| Élément | Animation | Durée | Easing |
|---------|-----------|-------|--------|
| Transition entre étapes | Slide horizontal (`x: 20→0` entrée, `x: 0→-20` sortie) + fade | 300ms | easeInOut |
| Apparition des chips | Stagger `fadeInUp` (0.05s entre chaque) | 200ms | easeOut |
| Sélection d'un chip | `scale: 0.97→1` + changement de couleur | 150ms | spring |
| Barre de progression | `width` animé avec spring | 400ms | spring(1, 0.8, 0.2) |
| Écran loading | Checklist items en stagger + barre de progression indéterminée | - | - |
| Apparition résultats | Stagger `fadeInUp` (0.15s entre chaque fiche) | 500ms | easeOut |
| Schéma dans fiche | `opacity: 0→1` + paths `pathLength: 0→1` | 800ms | easeInOut |

**AnimatePresence** pour les transitions d'étapes :

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={step}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {renderStep(step)}
  </motion.div>
</AnimatePresence>
```

### 6.6 Responsive

| Breakpoint | Adaptations |
|------------|-------------|
| Mobile (< 640px) | Chips en pleine largeur · Grille outils 2 colonnes · Barre progression simplifiée "Étape X/5" · Schémas résultats en scrollable horizontal |
| Tablet (640-1024px) | Chips 2 colonnes · Grille outils 3 colonnes · Fiches résultats en stack vertical |
| Desktop (> 1024px) | Layout complet tel que décrit · Fiches résultats en stack vertical avec schéma à droite |

---

## 7. Output multi-canal & Intégrations

### 7.1 Affichage sur écran (principal)

Voir section 2.8 pour le détail de la page résultats. C'est le canal principal et obligatoire.

### 7.2 Envoi par email (optionnel)

**Déclencheur** : L'utilisateur clique "Recevoir mon diagnostic par email" et entre son prénom + email.

**Contenu de l'email :**

```
Objet : Votre diagnostic IA personnalisé — Hoptisens

Corps :
- Résumé personnalisé (1-2 phrases)
- Pour chaque projet recommandé :
  - Titre
  - Description
  - Complexité (texte, pas de barre visuelle)
  - ROI estimé
  - Outils impliqués
  - Lien vers la page résultats (URL avec token unique)
- CTA : "Réserver votre appel stratégique" → Calendly
- Footer : coordonnées Hoptisens
```

**Technique :**
- Template email HTML/React via **Resend** (déjà intégré dans le projet)
- URL de résultats avec token : `/diagnostic/results?token=xxx` permettant de revisiter ses résultats
- Token stocké en base (Airtable) avec TTL de 30 jours

### 7.3 Sauvegarde Airtable (automatique)

Voir section 5.5. Deux niveaux :
1. **Diagnostic anonyme** : à la soumission (analytics + amélioration du modèle)
2. **Diagnostic identifié** : si l'utilisateur laisse son email (suivi commercial)

### 7.4 Passerelle vers Lucio (le chat IA)

Si l'utilisateur clique "Discuter avec Lucio" depuis les résultats :
- Ouvrir le widget ChatAgent avec un **message de contexte pré-injecté** :

```
[Message système injecté dans le chat]
"Ce visiteur vient de compléter un Auto-Diagnostic. Voici son profil :
Rôle : Dirigeant | Secteur : ESN | Taille : 30 pers. | Maturité : Premiers pas
Douleurs : Prospection leads, Suivi CRM
Projets recommandés : Agent de qualification, CRM semi-automatisé
→ Adapte tes questions en conséquence et ne redemande pas ces informations."
```

### 7.5 Passerelle vers Calendly / Prise de RDV

Le CTA principal "Réserver un appel stratégique" redirige vers Calendly avec des paramètres UTM :
```
https://calendly.com/hoptisens/[slug]
  ?utm_source=autodiag
  &utm_medium=web
  &utm_campaign=diagnostic
  &name=[prenom si fourni]
  &email=[email si fourni]
```

---

## 8. Plan d'implémentation

### 8.1 Estimation par phase

| Phase | Durée estimée | Dépendances |
|-------|---------------|-------------|
| 1. Types + Catalogue + Prompt | 0.5 jour | Aucune |
| 2. Route API + Fallback | 1 jour | Phase 1 |
| 3. Composants wizard (5 étapes) | 1.5 jours | Phase 1 |
| 4. Écran résultats + ProjectCard | 1 jour | Phase 2 |
| 5. Bibliothèque de schémas SVG (15 schémas) | 2 jours | Aucune (parallélisable) |
| 6. SchemaRenderer + intégration | 0.5 jour | Phases 4 + 5 |
| 7. Animations + transitions | 0.5 jour | Phase 3 + 4 |
| 8. Intégration Airtable + Email (Resend) | 0.5 jour | Phase 2 |
| 9. i18n (FR + EN) | 0.5 jour | Phases 3 + 4 |
| 10. Tests + responsive + a11y | 1 jour | Tout |
| **TOTAL** | **~9 jours** | |

### 8.2 Ordre de développement recommandé

```
Jour 1    : Phase 1 (types) + Phase 2 (API) + début Phase 5 (schémas)
Jour 2-3  : Phase 3 (wizard, les 5 étapes)
Jour 3    : Phase 5 (schémas, suite — parallélisable)
Jour 4    : Phase 4 (résultats) + Phase 6 (intégration schémas)
Jour 5    : Phase 5 (fin schémas) + Phase 7 (animations)
Jour 6    : Phase 8 (Airtable + email) + Phase 9 (i18n)
Jour 7    : Phase 10 (tests, responsive, accessibilité, polish)
```

### 8.3 Points d'entrée à modifier sur le site existant

| Fichier | Modification |
|---------|-------------|
| `components/sections/Hero.tsx` | Ajouter CTA secondaire "Commencer mon diagnostic" → `/diagnostic` |
| `components/sections/Sprint.tsx` | Ajouter lien "Ou commencez par un diagnostic gratuit" |
| `components/layout/Navbar.tsx` | Ajouter "Diagnostic" dans le menu (optionnel, à valider) |
| `components/layout/Footer.tsx` | Ajouter lien dans la colonne "Offres" |
| `messages/fr.json` + `en.json` | Ajouter toutes les clés `Diagnostic.*` |
| `lib/routing.ts` | Ajouter la route `/diagnostic` / `/en/diagnostic` |
| `lib/airtable.ts` | Étendre le type `Source` avec `'AutoDiag'` |

### 8.4 Checklist de validation

- [ ] Funnel complet : 5 étapes navigables (avant/arrière) sans perte de données
- [ ] Appel API Gemini fonctionnel avec résultats structurés
- [ ] Fallback rule-based opérationnel si Gemini échoue
- [ ] 15 schémas SVG rendus correctement avec labels dynamiques
- [ ] Responsive testé : 375px, 768px, 1280px
- [ ] `prefers-reduced-motion` : toutes les animations désactivées
- [ ] Sauvegarde Airtable fonctionnelle (anonyme + identifié)
- [ ] Email Resend envoyé correctement
- [ ] Passerelle Lucio avec contexte pré-injecté
- [ ] i18n FR/EN complet
- [ ] Rate limiting API (5 diagnostics / IP / heure)
- [ ] Temps de chargement IA < 5 secondes
- [ ] Lighthouse score > 90 sur la page diagnostic

---

Document rédigé en Mars 2026 — Hoptisens · hoptisens.com
