# Architecture du Projet TOS CheatSheet

## Vue d'ensemble

Application web statique de suivi d'investigation pour *The Other Side* (phasmophobia-like). Optimisée pour un usage en parallèle du jeu sur un écran 1080p.

## Structure des fichiers

```
TOS_cheat_sheet/
├── index.html              # Point d'entrée unique
├── context.md              # Spécifications fonctionnelles
├── ghost.md                # Base de données des fantômes
├── architecture.md         # Ce fichier
├── README.md               # Documentation générale
├── css/
│   ├── reset-base.css      # Reset CSS & base (box-sizing, overflow)
│   ├── variables.css       # Variables CSS (thèmes, couleurs)
│   ├── styles.css          # Point d'entrée CSS (import des modules)
│   ├── header.css          # Styles du header
│   ├── main.css            # Zone centrale (containers flex)
│   ├── popup.css           # Popup de confirmation
│   ├── responsive.css      # Media queries fallback
│   ├── tiles.css           # Styles communs aux tuiles
│   ├── tile-thermal.css    # Tuile Thermal (Temperature)
│   ├── tile-audio.css      # Tuile Audio
│   ├── tile-emf.css        # Tuile EMF
│   ├── tile-radiation.css  # Tuile Radiation
│   ├── tile-uv.css         # Tuile UV
│   ├── tile-writing.css    # Tuile Writing
│   └── tile-counter.css    # Tuiles Counter (comportements)
└── js/
    ├── theme.js            # Gestion du thème (Dark/Light)
    ├── timer.js            # Timer global START/STOP + RESET
    ├── graph-renderer.js   # Renderer Canvas pour timelines
    └── tiles/
        ├── thermal-tile.js # Tuile Thermal (4 niveaux)
        ├── audio-tile.js   # Tuile Audio (3 niveaux)
        ├── emf-tile.js     # Tuile EMF (4 niveaux)
        ├── radiation-tile.js # Tuile Radiation (3 niveaux)
        ├── uv-tile.js      # Tuile UV (3 niveaux)
        ├── writing-tile.js # Tuile Writing (3 niveaux)
        └── tile-counter.js # Comportements (Light On/Off)
```

## Architecture technique

### 1. Point d'entrée — [`index.html`](index.html)

Page HTML5 unique sans contenu JS inline. Structure en trois zones :

| Zone | Élément | Rôle |
|------|---------|------|
| Header | `.app-header` | Titre, timer, contrôles (START/STOP, RESET) |
| Contenu | `.app-main` | Zone centrale (tuiles de preuves/comportements) |
| Footer | `.ghost-bar` | Barre de fantômes (top 3 avec score de confiance) |

**Scripts chargés :**
- `js/theme.js` — Gestion du thème
- `js/timer.js` — Timer global
- `js/graph-renderer.js` — Renderer Canvas partagé
- `js/tiles/*.js` — Modules de tuiles individuelles

### 2. Styles — [`css/`](css/)

**Système de thèmes via variables CSS et attribut `data-theme` sur `<html>` :**

| Fichier | Rôle |
|---------|------|
| `variables.css` | Variables CSS (`--bg-primary`, `--text-primary`, `--deezer-purple`, etc.) |
| `reset-base.css` | Reset CSS (box-sizing, overflow, margin/padding) |
| `styles.css` | Point d'entrée (import des modules CSS) |
| `header.css` | Styles du header (titre, timer, boutons) |
| `main.css` | Zone centrale (containers flex, ghost bar) |
| `popup.css` | Popup de confirmation |
| `responsive.css` | Media queries fallback |
| `tiles.css` | Styles communs aux tuiles |
| `tile-*.css` | Styles spécifiques par tuile |

**Principes :**
- Layout fixe `1080p` sans scroll (`overflow: hidden` sur `html, body`)
- Flexbox pour le header et le footer
- Transitions douces sur les changements de thème (`0.3s ease`)
- Boutons avec états `:hover`, `:active`, `:disabled`

### 3. Thème — [`js/theme.js`](js/theme.js)

**IIFE** (Immediately Invoked Function Expression) pour éviter la pollution du scope global.

| Fonction | Rôle |
|----------|------|
| `getStoredTheme()` | Lit le thème depuis `localStorage` |
| `setStoredTheme(theme)` | Sauvegarde le thème dans `localStorage` |
| `applyTheme(theme)` | Applique `data-theme` sur `<html>` et met à jour l'icône |
| `toggleTheme()` | Bascule entre les thèmes et sauvegarde |
| `initTheme()` | Initialise le thème au chargement |

**Persistance :** Clé `localStorage` = `tos-cheatsheet-theme`. Valeurs possibles : `dark`, `light`.

### 4. Timer — [`js/timer.js`](js/timer.js)

**IIFE** indépendant du module de thème.

| Fonction | Rôle |
|----------|------|
| `formatTime(totalSeconds)` | Formate en `MM:SS` |
| `updateDisplay()` | Met à jour le texte du timer |
| `updateButtonState()` | Alterne le bouton entre START/STOP et change la couleur |
| `startTimer()` | Démarre l'intervalle d'1 seconde |
| `stopTimer()` | Arrête l'intervalle |
| `resetAll()` | Remet le compteur à zéro (avec confirmation pop-up) |

**Bouton combiné START/STOP :**
- État `START` → fond vert `#1db954`
- État `STOP` → fond rouge `#e91e63` (classe `.is-stopping`)

**Bouton RESET :**
- Toujours actif (même pendant l'exécution)
- Affiche un pop-up de confirmation avant de réinitialiser
- Réinitialise le timer ET déclenche l'événement `globalReset`

### 5. Graph Renderer — [`js/graph-renderer.js`](js/graph-renderer.js)

Module partagé pour le rendu des graphiques Canvas.

| Fonction | Rôle |
|----------|------|
| `renderGraph(canvas, points, maxDisplayTime, currentTime, maxLevel, levelColors, options)` | Rendu standard d'une timeline |
| `renderGlobalProof(canvas, points, maxDisplayTime, currentTime, levelColors)` | Rendu de la preuve globale |
| `showConfirmation(title, message, onConfirm)` | Affiche le popup de confirmation |
| `hideConfirmation()` | Cache le popup de confirmation |
| `getComputedColor(variable, element)` | Récupère une variable CSS calculée |
| `formatTimeShort(totalSeconds)` | Formate en `MM:SS` |
| `getCanvasDimensions(canvas)` | Ajuste la taille du canvas pour le DPR |

**Fonctionnalités du rendu :**
- Grille temporelle dynamique (intervalle 15s ou 30s selon `maxDisplayTime`)
- Axe Y avec niveaux
- Ligne de temps actuelle (pointillés violets)
- Points colorés par niveau avec bordure
- Adaptation au device pixel ratio

### 6. Tuiles de Preuves — [`js/tiles/`](js/tiles/)

Chaque tuile suit un pattern similaire :

| Module | Preuve | Niveaux | Storage Key |
|--------|--------|---------|-------------|
| [`thermal-tile.js`](js/tiles/thermal-tile.js) | Thermal | 4 | `tos-cheatsheet-thermal-points` |
| [`audio-tile.js`](js/tiles/audio-tile.js) | Audio | 3 | `tos-cheatsheet-audio-points` |
| [`emf-tile.js`](js/tiles/emf-tile.js) | EMF | 4 | `tos-cheatsheet-emf-points` |
| [`radiation-tile.js`](js/tiles/radiation-tile.js) | Radiation | 3 | `tos-cheatsheet-radiation-points` |
| [`uv-tile.js`](js/tiles/uv-tile.js) | UV | 3 | `tos-cheatsheet-uv-points` |
| [`writing-tile.js`](js/tiles/writing-tile.js) | Writing | 3 | `tos-cheatsheet-writing-points` |

**Pattern commun :**
- `state.points` — Tableau des points `{time, level}`
- `state.currentTime` — Temps actuel (synchronisé via `timerTick`)
- `state.maxDisplayTime` — Fenêtre temporelle dynamique (démarre à 60s, s'agrandit par paliers de 60s)
- `addPoint(level)` — Ajoute un point et rend le graphique
- `removeLastPoint()` — Supprime le dernier point
- `resetPoints()` — Réinitialise la tuile
- `updateTimer(seconds)` — Met à jour le temps et rend
- `getLevelColors()` — Récupère les couleurs CSS dynamiquement
- `render()` — Rend le graphique via `GraphRenderer.renderGraph()`
- `renderGlobalProof()` — Rend la preuve globale (si applicable)

**Tuiles avec `renderGlobalProof` :**
- `thermal-tile.js`
- `radiation-tile.js`
- `uv-tile.js`
- `writing-tile.js`

### 7. Tuiles de Comportements — [`js/tiles/tile-counter.js`](js/tiles/tile-counter.js)

Gère les compteurs de comportements (Light On / Light Off).

| Fonction | Rôle |
|----------|------|
| `incrementCount(type)` | Incrémente le compteur |
| `decrementCount(type)` | Décrémente le compteur |
| `resetCount(type)` | Réinitialise le compteur |
| `updateDisplay(type)` | Met à jour l'affichage |

**Persistance :** Clés `localStorage` = `tos-cheatsheet-{type}-count`

## Principes architecturaux

1. **Modularité stricte** — Aucun JS inline, chaque module dans un fichier séparé
2. **Scope isolé** — IIFE pour encapsuler chaque module
3. **Pas de dépendances externes** — Vanilla JS pur (Chart.js sera ajouté via CDN pour les timelines)
4. **Persistance native** — `localStorage` pour le thème et les données
5. **CSS custom properties** — Variables pour tous les thèmes et couleurs réutilisables
6. **Pas de commentaires en ligne** — Uniquement au-dessus des méthodes publiques complexes
7. **Événements personnalisés** — `timerTick` et `globalReset` pour la communication inter-modules

## Flux de données

```
Utilisateur → [Clic START] → timer.js → setInterval → updateDisplay() → timerTick
Utilisateur → [Clic STOP]  → timer.js → clearInterval → updateButtonState()
Utilisateur → [Clic RESET] → timer.js → showConfirmation() → globalReset
Utilisateur → [Clic THEME] → theme.js → toggleTheme() → localStorage.setItem()
Utilisateur → [Clic Thermal] → thermal-tile.js → addPoint() → render()
Utilisateur → [Clic EMF] → emf-tile.js → addPoint() → render()
Utilisateur → [Clic Counter] → tile-counter.js → incrementCount() → updateDisplay()
```

## Communication inter-modules

| Événement | Émetteur | Destinataires |
|-----------|----------|---------------|
| `timerTick` | `timer.js` | Toutes les tuiles (mise à jour du temps) |
| `globalReset` | `timer.js` | Toutes les tuiles (réinitialisation) |

## Système de couleurs

### Variables globales (`css/variables.css`)

| Variable | Dark Mode | Light Mode | Usage |
|----------|-----------|------------|-------|
| `--bg-primary` | `#121216` | `#ffffff` | Fond principal |
| `--bg-secondary` | `#191922` | `#f5f5f5` | Fond secondaire |
| `--bg-tertiary` | `#23232e` | `#eeeeee` | Fond tertiaire |
| `--bg-hover` | `#2a2a36` | `#e0e0e0` | Fond au survol |
| `--text-primary` | `#ffffff` | `#121216` | Texte principal |
| `--text-secondary` | `#a2a2ad` | `#666666` | Texte secondaire |
| `--text-muted` | `#6b6b75` | `#999999` | Texte atténué |
| `--border-color` | `#2a2a36` | `#e0e0e0` | Bordures |
| `--deezer-purple` | `#a238ff` | `#a238ff` | Couleur signature |
| `--deezer-purple-hover` | `#b866ff` | `#b866ff` | Survol violet |
| `--deezer-purple-active` | `#8a2be0` | `#8a2be0` | Actif violet |

### Variables par tuile (`--graph-point-{N}`)

Chaque tuile définit ses propres couleurs via des variables CSS personnalisées :

| Tuile | Niveau 1 | Niveau 2 | Niveau 3 | Niveau 4 |
|-------|----------|----------|----------|----------|
| Thermal | `#b2dfff` | `#7ac7ff` | `#3daeff` | `#0095ff` |
| Audio | `#d7ffd0` | `#94fa85` | `#2eff27` | — |
| EMF | `#ffffff` | `#ffb7b7` | `#ff5d5d` | `#ff0000` |
| Radiation | `#ffffff` | `#ffde89` | `#ffb700` | — |
| UV | `#d9adff` | `#975bff` | `#970eff` | — |
| Writing | `#7e7e7e` | `#bcbcbc` | `#ffffff` | — |

## Évolutions futures

- **Surbrillance du dernier niveau** — Garder en surbrillance légère le dernier niveau sélectionné
- **Zone centrale** — Tuiles de preuves et comportements (interactives)
- **Ghost Bar** — Top 3 dynamique avec moteur de scoring
- **Timeline** — Intégration Chart.js pour les événements temporels
- **Config fantômes** — Migration de `ghost.md` vers `js/config/ghosts.js`
- **Tuiles responsives** — Rendre les tuiles adaptatives par rapport à la taille de la page
