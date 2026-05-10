# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Top, avec ces réponses je peux te recommander la solution la plus alignée avec ton projet. Spoiler : **PocketBase** est le bon choix.

---

## 🎯 Pourquoi PocketBase pour ton cas

Tu coches toutes les cases qui rendent PocketBase pertinent :

✅ **Tu es seul user** → SQLite est largement suffisant (PocketBase peut tenir des dizaines de milliers d'users sans broncher)
✅ **Tu acceptes de payer un VPS** → Pas de dépendance à un cloud gratuit qui peut limiter ou disparaître
✅ **Tu veux de l'open source clean** → MIT, code ultra-lisible, philosophie "do one thing well"
✅ **Tu connais Docker** → Déploiement trivial : `docker run pocketbase/pocketbase`
✅ **Tu veux que d'autres puissent self-host** → C'est littéralement le cas d'usage parfait : ils clonent ton repo, lancent le docker-compose, c'est en ligne

Et au-delà de ça, PocketBase a quelques atouts qui collent vraiment bien :

- **Backup = 1 fichier `.db` à copier**. Tu peux versionner l'état de ton inventaire facilement, le mettre sur ton Drive perso, etc.
- **Dashboard admin intégré** : tu accèdes à une UI web pour voir/éditer ta BDD directement, sans avoir à coder un back-office
- **API REST + SDK JS auto-générés** : ton front communique direct avec PocketBase via le SDK officiel
- **Auth incluse** : email/password, OAuth (Google, GitHub...), magic links — tout est là, prêt à l'emploi

---

## 🏗️ Architecture proposée

Voici comment je vois le projet :

```
┌─────────────────────────────────────────────────────────────┐
│                     TON DÉPÔT GITHUB                        │
│                                                             │
│  ┌──────────────────┐         ┌──────────────────────┐      │
│  │  /frontend       │         │  /backend            │      │
│  │  (React + Vite)  │ ──API──>│  PocketBase binaire  │      │
│  │  Tailwind CSS    │         │  + migrations init   │      │
│  │  TCGdex API      │         │  + schema cartes     │      │
│  └──────────────────┘         └──────────────────────┘      │
│           │                              │                  │
│           └────────────┬─────────────────┘                  │
│                        │                                    │
│                docker-compose.yml                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ git clone + docker compose up
                         ▼
              ┌─────────────────────┐
              │ Anyone's VPS / Pi   │
              │  → app fonctionnelle│
              └─────────────────────┘
```

### Stack détaillée

| Couche | Techno |
|---|---|---|
| **Front** | **React + Vite + TypeScript** | 
| **Styling** | **SCSS** | 
| **State management** | **TanStack Query** |
| **Routing** | **React Router** ou **TanStack Router** | 
| **Backend** | **PocketBase** | 
| **API cartes** | **TCGdex** | 
| **Hébergement** | **VPS (Hetzner CX11 ~4€/mois)** | 
| **Reverse proxy** | **Caddy** | 
| **CI/CD** | **GitHub Actions** | 

---

## 🗂️ Modèle de données 

```
sets
├── id (ME2.5)
├── name (Héros Transcendants)
├── code (ASC)
├── release_date
├── total_cards
└── tcgdex_id (pour récupérer les visuels)

cards
├── id
├── set_id → sets.id
├── number (1, 2, ... 295)
├── name
├── type (Pokémon / Dresseur / Énergie)
├── rarity (Commune / Peu Commune / Holo / ...)
├── tcgdex_card_id (pour le visuel)
└── notes_publiques

card_variants
├── id
├── card_id → cards.id
├── variant_type (normal / holo / reverse_energie / reverse_classique / reverse_ball)
├── available (bool — ce variant existe-t-il pour cette carte ?)
└── market_price (cache du dernier prix connu)

inventory
├── id
├── user_id → users.id
├── card_variant_id → card_variants.id
├── quantity
├── condition (NM par défaut)
├── personal_notes
└── added_at
```



**Phase 1 — Fondations (1-2 weekends)**
- Repo GitHub avec README open source clean
- Setup Docker + PocketBase + front Vite
- Schema BDD initial
- Seed du set ME2.5 (les 295 cartes, les variants)
- Auth basique (toi en mode admin)

**Phase 2 — Inventaire fonctionnel (1-2 weekends)**
- Vue liste des cartes avec filtres (set, rareté, possédée/manquante)
- Édition des quantités par variant
- Visuels via TCGdex
- Code couleur (vert/orange/rouge) comme dans l'Excel

**Phase 3 — Dashboard (1 weekend)**
- Stats globales, complétion par rareté
- Top cartes possédées
- Barre de progression

**Phase 4 — Prix (selon ambitions)**
- Saisie manuelle d'abord
- Plus tard : intégration Cardmarket (manuel ou semi-auto)

**Phase 5 — Polish open source**
- Doc d'installation pour self-host
- CONTRIBUTING.md
- Issues templates
- Petite landing/screenshot
