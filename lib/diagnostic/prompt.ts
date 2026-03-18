import type { DiagnosticInput } from './types';
import { PROJECT_CATALOG, ROLE_LABELS, SECTOR_LABELS, PAIN_POINT_LABELS, MATURITY_LABELS, TOOL_OPTIONS } from './catalog';

const SYSTEM_PROMPT = `Tu es le moteur de diagnostic d'Hoptisens, une agence d'automatisation et d'IA pour les TPE/PME.

À partir du profil utilisateur fourni, tu dois recommander exactement 2 ou 3 projets d'automatisation/IA parmi le catalogue ci-dessous. Les projets doivent être :

1. PERTINENTS : alignés avec les douleurs identifiées et le secteur
2. VARIÉS : mélanger les niveaux de complexité (un quick-win + un projet structurant)
3. CONCRETS : utiliser les noms des outils réels du visiteur dans les descriptions
4. PROGRESSIFS : le premier projet doit être celui à démarrer immédiatement, les suivants sont des perspectives

Règles de sélection :
- La douleur marquée "priorité n°1" détermine le projet "high"
- Toujours inclure au moins un projet de complexité ≤ 4 (quick win)
- Adapter la complexité à la maturité : "Découverte" → baisser de 1-2 points, "En route" → garder ou augmenter
- Adapter à la taille de l'entreprise : "1-5" → privilégier no-code/low-code, "150+" → architectures robustes
- Pour chaque projet, sélectionne le schemaId le plus approprié depuis la bibliothèque et remplis les labels des nœuds avec les outils réels du visiteur.

Recommande aussi le meilleur point d'entrée :
- "sprint" si la maturité est Découverte ou Premiers pas
- "audit" si les douleurs sont multiples et diffuses
- "formation" si la maturité est Découverte et la taille > 50
- "rdv_direct" si l'horizon est Urgent

${PROJECT_CATALOG}`;

export function buildPrompt(input: DiagnosticInput): { system: string; user: string } {
  const toolNames = input.tools
    .map(id => TOOL_OPTIONS.find(t => t.id === id)?.name ?? id)
    .join(', ');

  const painPointLabels = input.painPoints
    .map(pp => PAIN_POINT_LABELS[pp]?.label ?? pp)
    .join(', ');

  const priorityLabel = PAIN_POINT_LABELS[input.priorityPainPoint]?.label ?? input.priorityPainPoint;

  const user = `PROFIL UTILISATEUR :
- Rôle : ${ROLE_LABELS[input.role] ?? input.role}${input.roleOther ? ` (${input.roleOther})` : ''}
- Secteur : ${SECTOR_LABELS[input.sector] ?? input.sector}${input.sectorOther ? ` (${input.sectorOther})` : ''}
- Taille de l'entreprise : ${input.companySize} collaborateurs
- Département : ${input.department}
- Outils utilisés : ${toolNames}${input.toolsOther ? `, ${input.toolsOther}` : ''}
- Douleurs identifiées : ${painPointLabels}
- Douleur prioritaire (n°1) : ${priorityLabel}${input.painPointDescription ? `\n- Description de l'irritant principal : "${input.painPointDescription}"` : ''}
- Maturité IA : ${MATURITY_LABELS[input.maturity]?.label ?? input.maturity}
- Horizon de temps : ${input.timeHorizon}

Génère les recommandations de projets en suivant strictement les règles définies.`;

  return { system: SYSTEM_PROMPT, user };
}
