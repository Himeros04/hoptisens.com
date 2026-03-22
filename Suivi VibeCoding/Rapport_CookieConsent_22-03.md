# Rapport — Bannière de Consentement Cookies (RGPD)

**Date** : 22 mars 2026
**Stack** : Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion 12 · next-intl

---

## Contexte

Le site hoptisens.com ne disposait d'aucune bannière de consentement aux cookies. La politique de confidentialité existait (`/politique-confidentialite`) mais aucun mécanisme visuel ne permettait aux visiteurs d'accepter ou refuser les cookies. Le site ne dépose aucun cookie publicitaire ou de tracking — seuls des cookies strictement nécessaires (session, sécurité) et liés au chatbot IA (Google Gemini) sont utilisés.

---

## Modifications effectuées

### 1. Création — `components/layout/CookieBanner.tsx`

Composant client avec animation d'entrée/sortie (Framer Motion). Bannière fixée en bas de viewport, visible uniquement si aucun cookie de consentement n'est trouvé.

- Lecture du cookie `cookie_consent` via `useState` avec initialisation lazy (pas d'`useEffect`)
- Boutons **Accepter** / **Refuser** avec mise en valeur égale (pas de dark pattern)
- Lien vers `/politique-confidentialite` (composant `Link` de `next-intl`)
- Export de `resetCookieConsent()` pour réafficher la bannière
- Attributs ARIA (`role="dialog"`, `aria-label`)

### 2. Création — `components/layout/ManageCookiesButton.tsx`

Composant client simple (bouton) permettant de supprimer le cookie de consentement et recharger la page pour réafficher la bannière.

### 3. Modification — `messages/fr.json`

Ajout de la section `CookieConsent` :
```json
"CookieConsent": {
  "message": "Ce site utilise des cookies pour assurer son bon fonctionnement...",
  "accept": "Accepter",
  "refuse": "Refuser",
  "policyLink": "Politique de confidentialité",
  "manage": "Gérer mes cookies"
}
```

### 4. Modification — `messages/en.json`

Ajout de la section `CookieConsent` (traduction anglaise).

### 5. Modification — `app/[locale]/layout.tsx`

- Import de `CookieBanner`
- Rendu de `<CookieBanner />` après `<ChatAgent />` dans le `<NextIntlClientProvider>`

### 6. Modification — `components/layout/Footer.tsx`

- Import de `ManageCookiesButton`
- Ajout d'un `<ManageCookiesButton>` dans la colonne Entreprise, sous le lien Politique de confidentialité

---

## Fichiers créés

| Fichier | Lignes | Description |
|---------|--------|-------------|
| `components/layout/CookieBanner.tsx` | ~75 | Bannière de consentement |
| `components/layout/ManageCookiesButton.tsx` | ~20 | Bouton "Gérer mes cookies" |

## Fichiers modifiés

| Fichier | Changement |
|---------|------------|
| `messages/fr.json` | +8 lignes (section `CookieConsent`) |
| `messages/en.json` | +8 lignes (section `CookieConsent`) |
| `app/[locale]/layout.tsx` | +2 lignes (import + rendu) |
| `components/layout/Footer.tsx` | +3 lignes (import + usage `ManageCookiesButton`) |

---

## Conformité RGPD

| Critère | Status |
|---------|--------|
| Consentement avant dépôt de cookies (opt-in) | ✅ Cookie posé uniquement après clic |
| Égalité visuelle des boutons accepter/refuser | ✅ Pas de dark pattern |
| Lien vers politique de confidentialité | ✅ Visible dans la bannière |
| Droit de retrait (art. 7.3) | ✅ Bouton "Gérer mes cookies" dans le Footer |
| Durée du cookie de consentement | ✅ 13 mois (conformité CNIL) |
| Cookies strictement nécessaires | ✅ Pas besoin de consentement |

---

## Validation

- TypeScript `tsc --noEmit` : **0 erreur**
- ESLint : **0 erreur, 0 warning**

> **Note** : Aucune bibliothèque externe n'a été ajoutée. Le site ne déposant aucun script de tracking tiers, un composant custom léger suffit — pas besoin de CMP tierce (Cookiebot, Axeptio, etc.).
