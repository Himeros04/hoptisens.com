# Rapport d'application — Stratégie Copywriting

**Date** : 18 mars 2026
**Branche** : `modif-1803`
**Source** : `Specs et plan d'implementation/Strategie copywriting17.03.md`
**Statut** : Build OK — Toutes les modifications compilent sans erreur

---

## Résumé exécutif

Application complète des recommandations du document de stratégie copywriting du 17 mars 2026. Les corrections couvrent les priorités P0 à P3 identifiées dans l'audit, sur **12 fichiers** du projet. L'objectif : renforcer la cohérence du site, améliorer la conversion et supprimer les freins identifiés.

---

## P0 — Corrections critiques (impact élevé, effort faible)

### 1. Nommage unifié des 4 offres

**Problème** : 3 taxonomies différentes selon l'emplacement (Homepage, /offres, Footer, pages dédiées). Perte de confiance visiteur.

**Noms définitifs appliqués partout** :

| # | Nom unifié | Ancien(s) nom(s) |
|---|-----------|-------------------|
| 1 | **Acquisition & Leads** | Ingénierie d'Acquisition / L'Étude & Les Plans / Leads & CRM |
| 2 | **Automatisation & RPA** | *(inchangé)* / Le Gros Œuvre |
| 3 | **Agents IA** | Agents IA Personnalisés / Agents IA Intelligents / Les Réseaux d'Acquisition |
| 4 | **Sprint IA** | Sprint POC / Sprint Automobilisation / Le Transfert de Compétences |

**Fichiers modifiés** :
- `components/sections/Offres.tsx`
- `components/layout/Footer.tsx`
- `app/[locale]/offres/page.tsx`
- `app/[locale]/offres/sprint/page.tsx`

---

### 2. Inversion des CTAs du Hero

**Problème** : Le CTA principal (Calendly) envoyait le visiteur froid hors du site dès la première interaction.

**Avant** :
- CTA principal : "Réserver mon Appel Stratégique" → Calendly (externe)
- CTA secondaire : "Remplir le Diagnostic Flash" → /contact

**Après** :
- CTA principal : "Remplir le Diagnostic Flash" → /contact (reste sur le site)
- CTA secondaire : "Réserver un appel" → Calendly (pour visiteurs chauds)

**Fichier modifié** : `components/sections/Hero.tsx`

---

### 3. Suppression du compteur "7 prochains clients"

**Problème** : Compteur hardcodé = destructeur de confiance pour les visiteurs récurrents.

**Avant** : `⚠️ Valable pour les 7 prochains clients`
**Après** : Supprimé sur la homepage / Remplacé par `Tarif garanti — Offre de lancement` sur `/offres/sprint`

**Fichiers modifiés** :
- `components/sections/Sprint.tsx`
- `app/[locale]/offres/sprint/page.tsx`

---

## P1 — Améliorations prioritaires (impact moyen-élevé)

### 4. Raccourcissement des descriptions des cartes Offres

Passage de 3 phrases à 1 phrase-douleur + 1 phrase-solution max.

| Offre | Avant (mots) | Après (mots) |
|-------|:---:|:---:|
| Acquisition & Leads | 33 | 17 |
| Automatisation & RPA | 27 | 14 |
| Agents IA | 25 | 15 |
| Sprint IA | 20 | 12 |

**Fichier** : `components/sections/Offres.tsx`

---

### 5. Badge Sprint IA : "Populaire" → "Commencez ici"

**Raison** : Le Sprint IA est le point d'entrée du tunnel de conversion. "Commencez ici" guide mieux que "Populaire".

**Fichier** : `components/sections/Offres.tsx`

---

### 6. Raccourcissement des labels chiffres clés

| Chiffre | Avant | Après |
|---------|-------|-------|
| 80% | "De temps de prospection manuel économisé grâce à nos systèmes de données pré-qualifiées." | "de prospection manuelle en moins" |
| 10 Jours | "Le temps exact pour cibler 2 processus clés et chiffrer votre ROI lors de notre Sprint." | "pour un premier ROI chiffré" |
| 100% | "De l'audit initial déductible de votre phase d'implémentation." | "de l'audit déductible de la mission" |
| 24/7 | "De qualification de leads grâce à nos agents IA conversationnels." | "de qualification IA, sans pause" |

**Titre section** : "Votre nouvelle architecture de croissance" → "Ce que nos clients mesurent déjà"
**Sous-titre** : Remplacé par "Moyennes constatées sur nos derniers accompagnements TPE/PME."

**Fichier** : `components/sections/Chiffres.tsx`

---

### 7. Reformulation du badge Hero + sous-titre

**Badge** : "Partenaire de la Transformation Numérique des TPE & PME" → "L'IA opérationnelle pour les PME de 10 à 300 personnes"

**Sous-titre** (68 → ~30 mots) :
- Avant : "Ne subissez plus l'évolution technologique. Hoptisens construit et déploie des systèmes d'intelligence artificielle sur-mesure (Automatisation, Agents IA, CRM) pour sécuriser vos marges et protéger le temps de vos équipes."
- Après : "Hoptisens conçoit et déploie des systèmes IA sur-mesure pour les PME : automatisation, agents intelligents, CRM connecté. Vos marges sont protégées, votre temps est libéré."

**Fichier** : `components/sections/Hero.tsx`

---

### 8. Unification du nom Sprint

"Sprint Automobilisation" → "Sprint IA" sur la page dédiée `/offres/sprint`.
Description raccourcie et recentrée sur le ROI.

**Fichier** : `app/[locale]/offres/sprint/page.tsx`

---

## P2 — Améliorations de conversion (impact moyen)

### 9. Reformulation SchemaAnime

- **Titre** : "L'Architecture de votre Transformation." → "Comment votre entreprise fonctionne avec un Agent IA"
- **Description** : "puissance algorithmique" supprimé → "Agent IA central qui travaille pour vous 24/7"
- **Schéma SVG** : "Flux n8n / Make connectés" → "Vos outils d'automatisation connectés"

**Fichier** : `components/sections/SchemaAnime.tsx`

---

### 10. Amélioration page Contact

- **Titre** : "Parlons de votre avenir" → "Démarrez votre projet IA"
- **Guidance ajoutée** : 3 micro-textes orientant le visiteur selon son profil (formulaire / Lucio / téléphone)

**Fichier** : `app/[locale]/contact/page.tsx`

---

### 11. CTA dynamique du calculateur ROI

- **Avant** : "Discuter de mon projet IA" (générique)
- **Après** : "Récupérer {X}h/mois — Parlons-en" (contextuel, basé sur le résultat du calcul)

**Fichier** : `components/sections/Calculateur.tsx`

---

### 12. Micro-texte de réassurance (étape salaire)

Ajout de : *"Cette donnée reste anonyme et sert uniquement à estimer votre coût horaire réel. Rien n'est stocké."*

**Fichier** : `components/sections/Calculateur.tsx`

---

### 13. Message d'accueil Lucio reformulé

- **Avant** : "Bonjour ! Je suis Lucio, l'assistant IA d'Hoptisens. Je suis là pour comprendre vos besoins..."
- **Après** : "En 2 minutes, je vous indique quel type d'IA peut vous faire gagner du temps. Je suis Lucio, l'assistant Hoptisens. Quel est votre secteur d'activité ?"

Bénéfice d'abord, présentation ensuite.

**Fichier** : `components/agent/ChatAgent.tsx`

---

### 14. "10 jours pour tout changer" → "10 jours pour prouver que ça marche"

Promesse tempérée mais toujours impactante.

**Fichier** : `components/sections/Sprint.tsx`

---

## P3 — Chantier de fond

### 15. Témoignages → Études de cas

- **Titre** : "Des Résultats Concrets pour les TPE/PME" → "Études de cas"
- **Sous-titre** : "Résultats constatés sur des accompagnements récents."
- Plus honnête tant que les témoignages restent anonymisés.

**Fichier** : `components/sections/Temoignages.tsx`

---

### 16. Purge du jargon technique (page À propos)

| Avant | Après |
|-------|-------|
| "blueprint validé ensemble" | "plan d'action validé ensemble" |
| "sourcing des LLMs" | "choix des modèles d'IA" |
| "workflows d'automatisation (Make/n8n)" | "flux d'automatisation" |

**Fichier** : `app/[locale]/a-propos/page.tsx`

---

### 17. CTA À propos humanisé

"Parler à un consultant" → "Réserver 30 min avec Hadrien"

**Fichier** : `app/[locale]/a-propos/page.tsx`

---

## Récapitulatif des fichiers modifiés

| Fichier | Modifications |
|---------|---------------|
| `components/sections/Hero.tsx` | Badge, sous-titre, inversion CTAs |
| `components/sections/Offres.tsx` | Nommage, descriptions, badge "Commencez ici", titre section |
| `components/sections/Chiffres.tsx` | Labels courts, titre, sous-titre |
| `components/sections/Sprint.tsx` | Compteur supprimé, titre, "10 jours", jargon |
| `components/sections/SchemaAnime.tsx` | Titre, description, schéma SVG |
| `components/sections/Temoignages.tsx` | Titre "Études de cas" |
| `components/sections/Calculateur.tsx` | CTA dynamique, réassurance salaire |
| `components/layout/Footer.tsx` | Nommage des 4 offres |
| `components/agent/ChatAgent.tsx` | Message d'accueil Lucio |
| `app/[locale]/offres/page.tsx` | Nommage, descriptions offres |
| `app/[locale]/offres/sprint/page.tsx` | Nom Sprint IA, compteur, description |
| `app/[locale]/contact/page.tsx` | Titre, guidance visiteur |
| `app/[locale]/a-propos/page.tsx` | Purge jargon, CTA humanisé |

---

## Actions restantes (hors périmètre code)

Ces éléments nécessitent du contenu ou des décisions business :

| # | Action | Dépendance |
|---|--------|------------|
| 1 | **Obtenir 3-5 vrais témoignages nommés** (nom, poste, entreprise, citation, photo) | Accord clients |
| 2 | **Ajouter une section "Le fondateur"** sur /a-propos (photo Hadrien + bio 3 lignes + lien LinkedIn) | Photo + bio à fournir |
| 3 | **Implémenter un vrai compteur backend** si l'urgence commerciale est souhaitée | Décision business |
| 4 | **Passe éditoriale complète** sur les pages /offres/leads et /offres détaillées restantes | Relecture manuelle |

---

*Rapport généré le 18 mars 2026 — Branche `modif-1803`*
