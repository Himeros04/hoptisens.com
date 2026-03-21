# Plan d'Implémentation - Sauvegarde Progressive AutoDiag dans Airtable

## Contexte

Le diagnostic actuel (AutoDiag) collecte des données en 5 étapes mais **ne les sauvegarde pas** dans Airtable. Ce plan propose une sauvegarde progressive pour :
- Récupérer les données même si l'utilisateur abandonne en cours de route
- Enrichir le CRM avec du contexte riche pour les conversations futures
- Permettre le retargeting des visiteurs ayant commencé le diagnostic

---

## Structure de la Nouvelle Table Airtable

### Nom suggéré : `Diagnostics`

### Schéma des champs

| Champ | Type | Description | Étape de sauvegarde |
|-------|------|-------------|---------------------|
| **ID temporaire** | Texte | UUID généré côté client pour identifier la session | Création (étape 1) |
| **Statut** | Sélection | `En cours` / `Terminé` / `Abandonné` | Mise à jour continue |
| **Source** | Sélection | `AutoDiag` (fixe) | Création |
| **Étape actuelle** | Nombre | 1-5 (étape en cours) | Mise à jour à chaque step |
| **Rôle** | Sélection | Dirigeant, DAF, etc. | Étape 1 |
| **Rôle (autre)** | Texte | Si rôle = "Autre" | Étape 1 |
| **Secteur** | Sélection | Agence, Conseil, etc. | Étape 1 |
| **Secteur (autre)** | Texte | Si secteur = "Autre" | Étape 1 |
| **Taille entreprise** | Sélection | 1-5, 6-20, etc. | Étape 2 |
| **Département** | Sélection | Direction, Commercial, etc. | Étape 2 |
| **Outils** | Plusieurs Sélections | Liste des outils sélectionnés | Étape 3 |
| **Autres outils** | Texte | Si autres outils spécifiés | Étape 3 |
| **Processus** | Plusieurs Sélections | Liste des processus (PainPoints) | Étape 4 |
| **Processus prioritaire** | Sélection | Le processus #1 | Étape 4 |
| **Description processus** | Texte | Description libre (max 200 car.) | Étape 4 |
| **Maturité IA** | Sélection | Découverte, Premiers pas, En route | Étape 5 |
| **Horizon temporel** | Sélection | Urgent, Court terme, Moyen terme, Exploration | Étape 5 |
| **Email** | Email | Coordonnées (si collectées) | Étape 5 ou post-diagnostic |
| **Prénom** | Texte | Coordonnées (si collectées) | Étape 5 ou post-diagnostic |
| **Entreprise** | Texte | Coordonnées (si collectées) | Étape 5 ou post-diagnostic |
| **Résultats du diagnostic** | Long texte | JSON des projets recommandés | Après soumission |
| **Point d'entrée recommandé** | Sélection | sprint, audit, formation, rdv_direct | Après soumission |
| **Date début** | Date | Timestamp début du diagnostic | Création |
| **Date fin** | Date | Timestamp soumission ou abandon | Fin |
| **Durée (secondes)** | Nombre | Calculée | Fin |

---

## Flux de Sauvegarde Progressive

```
┌─────────────────────────────────────────────────────────────────┐
│                    DIAGNOSTIC WIZARD                            │
├─────────────────────────────────────────────────────────────────┤
│  Étape 0: Intro (step=0)                                        │
│       ↓ Pas de sauvegarde (pas de données)                     │
├─────────────────────────────────────────────────────────────────┤
│  Étape 1: Profile (step=1) - goNext()                          │
│       ↓ [CREATE] Nouveau record avec:                          │
│         - ID temporaire (UUID)                                 │
│         - Source = "AutoDiag"                                   │
│         - Statut = "En cours"                                   │
│         - Étape = 1                                             │
│         - Rôle + Rôle (autre)                                  │
│         - Secteur + Secteur (autre)                             │
├─────────────────────────────────────────────────────────────────┤
│  Étape 2: Company (step=2) - goNext()                          │
│       ↓ [UPDATE] record existant:                              │
│         - Taille entreprise                                    │
│         - Département                                          │
│         - Étape = 2                                             │
├─────────────────────────────────────────────────────────────────┤
│  Étape 3: Tools (step=3) - goNext()                            │
│       ↓ [UPDATE] record existant:                              │
│         - Outils                                               │
│         - Autres outils                                        │
│         - Étape = 3                                             │
├─────────────────────────────────────────────────────────────────┤
│  Étape 4: PainPoints (step=4) - goNext()                       │
│       ↓ [UPDATE] record existant:                               │
│         - Processus                                             │
│         - Processus prioritaire                                │
│         - Description processus                                │
│         - Étape = 4                                             │
├─────────────────────────────────────────────────────────────────┤
│  Étape 5: Maturity (step=5) - goNext() → submitDiagnostic()    │
│       ↓ [UPDATE] record existant + [CREATE/FINALIZE]           │
│         - Maturité IA                                          │
│         - Horizon temporel                                     │
│         - Étape = 5                                            │
│         - Statut = "Terminé"                                   │
│         - Date fin                                             │
│         - Durée                                                │
│         - Résultats (JSON)                                      │
│         - Point d'entrée recommandé                            │
├─────────────────────────────────────────────────────────────────┤
│  Abandon (utilisateur ferme la page)                           │
│       ↓ Pas d'action automatique (pas de hook)                 │
│       → Optionnel: ajout d'un beforeunload pour finalize        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Liste des Tâches d'Implémentation

### Phase 1 : Préparation Airtable

- [ ] **1.1** Créer la table `Diagnostics` dans Airtable avec tous les champs définis ci-dessus
- [ ] **1.2** Ajouter la configuration dans `.env.local` pour la nouvelle table
- [ ] **1.3** Mettre à jour `lib/airtable.ts` pour ajouter les fonctions de la nouvelle table

### Phase 2 : Backend API

- [ ] **2.1** Créer une nouvelle API route `POST /api/diagnostics` pour créer un enregistrement
- [ ] **2.2** Créer une API route `PATCH /api/diagnostics/[id]` pour mettre à jour l'enregistrement
- [ ] **2.3** Implémenter la logique de calcul de durée

### Phase 3 : Frontend - Sauvegarde Progressive

- [ ] **3.1** Modifier `DiagnosticWizard.tsx` pour :
  - Générer un UUID au démarrage (step=0 → step=1)
  - Appeler l'API de création à la première navigation (step=1 → step=2)
  - Appeler l'API de mise à jour à chaque `goNext()`
- [ ] **3.2** Ajouter la sauvegarde des coordonnées (email, prénom, entreprise) si collectées dans le formulaire final
- [ ] **3.3** Gérer l'abandon potentiel (optionnel : `beforeunload` ou `navigator.sendBeacon`)

### Phase 4 : Intégration des Résultats

- [ ] **4.1** Modifier `submitDiagnostic()` pour sauvegarder les résultats dans Airtable
- [ ] **4.2** Transformer les résultats en JSON pour le champ "Résultats du diagnostic"
- [ ] **4.3** Mettre à jour le statut à "Terminé" et calculer la durée

### Phase 5 : Tests & Validation

- [ ] **5.1** Tester le parcours complet avec sauvegarde
- [ ] **5.2** Tester l'abandon en cours de route
- [ ] **5.3** Vérifier les données dans Airtable
- [ ] **5.4** Tester le cas où Airtable échoue (gestion d'erreur silencieuse)

---

## Détail Technique des Modifications

### Fichier : `lib/airtable.ts` (à modifier)

```typescript
// Nouvelle table pour les diagnostics
export const diagnosticsTable = base(process.env.AIRTABLE_DIAGNOSTICS_TABLE || 'Diagnostics');

export interface DiagnosticData {
  tempId: string;
  currentStep: number;
  status: 'En cours' | 'Terminé' | 'Abandonné';
  // ... tous les champs
}

export async function createDiagnostic(data: DiagnosticData) { ... }
export async function updateDiagnostic(tempId: string, data: Partial<DiagnosticData>) { ... }
```

### Fichier : `components/diagnostic/DiagnosticWizard.tsx` (à modifier)

```typescript
// Ajout d'un useEffect pour la sauvegarde progressive
useEffect(() => {
  if (step >= 1 && step <= 5) {
    saveProgress();
  }
}, [step, data]);

const saveProgress = async () => {
  // Appeler API de sauvegarde
};
```

### Nouveau fichier : `app/api/diagnostics/route.ts`

```typescript
// POST - Créer un diagnostic
// PATCH - Mettre à jour un diagnostic
```

---

## Considérations Importantes

1. **ID temporaire** : Utiliser un UUID côté client pour suivre la session sans consentement cookies
2. **Échec silencieux** : Si Airtable échoue, ne pas bloquer le diagnostic (mode dégradé)
3. **Vie privée** : Aucune donnée personnelle collectée par défaut (email optional)
4. **Nettoyage** : Optionnel - supprimer les enregistrements "En cours" de plus de 7 jours via CRON

---

## Évolutions Possibles

- Ajouter un champ "Score de complétion" (étape actuelle / 5)
- Envoyer un email de follow-up si abandon à l'étape 4-5
- Permettre de reprendre le diagnostic ultérieurement avec le même ID
- Ajouter le scoring automatique des prospects basé sur les réponses