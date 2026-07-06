# Architecture du Projet TOS CheatSheet

## Vue d'ensemble

Application web statique de suivi d'investigations pour *The Other Side* (phasmophobia-like). Optimisée pour un usage en parallèle du jeu sur un écran 1080p.

## Structure des fichiers

```
TOS_cheat_sheet/
├── index.html              # Point d'entrée unique
├── context.md              # Spécifications fonctionnelles
├── ghost.md                # Base de données des fantômes
├── architecture.md         # Ce fichier
├── README.md               # Documentation générale
├── css/
│   └── styles.css          # Styles avec variables CSS (Dark/Light)
└── js/
    ├── theme.js            # Gestion du thème (toggle + localStorage)
    ├── timer.js            # Timer global START/STOP + RESET (avec confirmation)
    └── thermal-tile.js    # Tuile de preuve thermique (Temperature)
```

## Architecture technique

### 1. Point d'entrée — [`index.html`](index.html)

Page HTML5 unique sans contenu JS inline. Structure en trois zones :

| Zone | Élément | Rôle |
|------|---------|------|
| Header | `.app-header` | Titre, timer, contrôles (START/STOP, RESET, thème) |
| Contenu | `.app-main` | Zone centrale (tuiles de preuves/comportements) |
| Footer | `.ghost-bar` | Barre de fantômes (top 3 avec score de confiance) |

### 2. Styles — [`css/styles.css`](css/styles.css)

**Système de thèmes via variables CSS et attribut `data-theme` sur `<html>` :**

- `:root` — Variables par défaut (Dark Mode)
- `[data-theme="light"]` — Variables pour le Light Mode
- Variables réutilisables : `--bg-primary`, `--text-primary`, `--deezer-purple`, etc.

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

## Principes architecturaux

1. **Modularité stricte** — Aucun JS inline, chaque module dans un fichier séparé
2. **Scope isolé** — IIFE pour encapsuler chaque module
3. **Pas de dépendances externes** — Vanilla JS pur (Chart.js sera ajouté via CDN pour les timelines)
4. **Persistance native** — `localStorage` pour le thème
5. **CSS custom properties** — Variables pour tous les thèmes et couleurs réutilisables
6. **Pas de commentaires en ligne** — Uniquement au-dessus des méthodes publiques complexes

## Flux de données

```
Utilisateur → [Clic START] → timer.js → setInterval → updateDisplay() → timerTick
Utilisateur → [Clic STOP]  → timer.js → clearInterval → updateButtonState()
Utilisateur → [Clic RESET] → timer.js → showConfirmation() → globalReset
Utilisateur → [Clic THEME] → theme.js → toggleTheme() → localStorage.setItem()
Utilisateur → [Clic Thermal] → thermal-tile.js → addPoint() → render()
```

## Évolutions futures

- **Zone centrale** — Tuiles de preuves et comportements (interactives)
- **Ghost Bar** — Top 3 dynamique avec moteur de scoring
- **Timeline** — Intégration Chart.js pour les événements temporels
- **Config fantômes** — Migration de `ghost.md` vers `js/config/ghosts.js`
