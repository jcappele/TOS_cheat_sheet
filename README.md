# TOS CheatSheet — Ghost Investigation Assistant

> Outil interactif d'assistance à l'investigation pour *The Other Side* (phasmophobia-like).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-orange.svg)]()
[![1080p Optimized](https://img.shields.io/badge/1080p-Optimized-blue.svg)]()

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Aperçu](#-aperçu)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [Preuves](#-preuves)
- [Comportements](#-comportements)
- [Fantômes](#-fantômes)
- [Développement](#-développement)
- [Roadmap](#-roadmap)
- [License](#-license)

## ✨ Fonctionnalités

- **Timer global** — Chronométrage d'investigation START/STOP avec reset
- **Tuiles de preuves** — Suivi temporel visuel pour chaque type de preuve
- **Graphiques en temps réel** — Timelines dynamiques avec niveaux colorés
- **Comportements** — Compteurs pour les actions observées
- **Thèmes** — Dark Mode / Light Mode avec persistance
- **Persistance locale** — Données sauvegardées dans `localStorage`
- **Optimisé 1080p** — Conçu pour un usage en parallèle du jeu

## 🖥️ Aperçu

```
┌─────────────────────────────────────────────────────────┐
│  Header (70px)                                          │
│  [TOS CheatSheet] [RESET]  [00:00]  [START]           │
├─────────────────────────────────────────────────────────┤
│  Main (flex, sans scroll)                               │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Proofs Container (tuiles de preuves)              │ │
│  │ [Thermal] [Audio] [EMF] [Radiation] [UV] [Writing]│ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Behaviors Container (comportements)               │ │
│  │ [Light On +1/-1] [Light Off +1/-1]               │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Ghosts Container (placeholder)                    │ │
│  │ Top 3 Ghosts — Coming Soon                        │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  Ghost Bar (60px)                                       │
│  [Top 3 Ghosts — Coming Soon]                          │
└─────────────────────────────────────────────────────────┘
```

## 📦 Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-nom/tos-cheatsheet.git
   ```

2. Ouvrez [`index.html`](index.html) dans votre navigateur préféré.

3. **Recommandé :** Utilisez un serveur local (Live Server dans VS Code).

## 🚀 Utilisation

### Timer Global

| Bouton | Action |
|--------|--------|
| **START** | Démarre le chronomètre (fond vert) |
| **STOP** | Arrête le chronomètre (fond rouge) |
| **RESET** | Réinitialise le timer et toutes les preuves |

### Tuiles de Preuves

Chaque tuile permet de enregistrer des niveaux de preuves :

1. **Cliquez** sur un bouton de niveau pour ajouter un point sur la timeline
2. **Undo** — Supprime le dernier point
3. **Reset** — Réinitialise la tuile (avec confirmation)

Les couleurs des boutons changent selon le niveau sélectionné.

### Thèmes

Cliquez sur le bouton de thème pour basculer entre Dark et Light mode. Le choix est sauvegardé automatiquement.

## 🏗️ Architecture

### Structure du projet

```
TOS_cheat_sheet/
├── index.html              # Point d'entrée unique
├── context.md              # Spécifications fonctionnelles
├── ghost.md                # Base de données des fantômes
├── architecture.md         # Architecture technique
├── README.md               # Documentation générale
├── css/
│   ├── reset-base.css      # Reset CSS & base
│   ├── variables.css       # Variables CSS (thèmes, couleurs)
│   ├── styles.css          # Point d'entrée CSS
│   ├── header.css          # Styles du header
│   ├── main.css            # Zone centrale
│   ├── popup.css           # Popup de confirmation
│   ├── responsive.css      # Media queries
│   ├── tiles.css           # Styles communs aux tuiles
│   ├── tile-thermal.css    # Tuile Thermal
│   ├── tile-audio.css      # Tuile Audio
│   ├── tile-emf.css        # Tuile EMF
│   ├── tile-radiation.css  # Tuile Radiation
│   ├── tile-uv.css         # Tuile UV
│   ├── tile-writing.css    # Tuile Writing
│   └── tile-counter.css    # Tuiles Counter
└── js/
    ├── theme.js            # Gestion du thème
    ├── timer.js            # Timer global
    ├── graph-renderer.js   # Renderer Canvas
    └── tiles/
        ├── thermal-tile.js # Tuile Thermal
        ├── audio-tile.js   # Tuile Audio
        ├── emf-tile.js     # Tuile EMF
        ├── radiation-tile.js # Tuile Radiation
        ├── uv-tile.js      # Tuile UV
        ├── writing-tile.js # Tuile Writing
        └── tile-counter.js # Comportements
```

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Structure | HTML5 (`index.html`) |
| Style | CSS3 (Variables, Flexbox, Grid) |
| Logique | JavaScript Vanilla ES6+ (IIFE) |
| Graphiques | Canvas API natif |
| Persistance | `localStorage` |

### Principes architecturaux

1. **Modularité stricte** — Aucun JS inline, chaque module dans un fichier séparé
2. **Scope isolé** — IIFE pour encapsuler chaque module
3. **Pas de dépendances externes** — Vanilla JS pur
4. **Persistance native** — `localStorage` pour le thème et les données
5. **CSS custom properties** — Variables pour tous les thèmes et couleurs
6. **Événements personnalisés** — `timerTick` et `globalReset` pour la communication inter-modules

## 🎯 Preuves

| Preuve | Niveaux | Description |
|--------|---------|-------------|
| **EMF** | 1-5 | Mesure des champs électromagnétiques |
| **Radiation** | 1-3 | Mesure du taux de comptage (CPM) |
| **Thermal** | 1-4 | Température (Mild → Frigid) |
| **UV** | 1-3 | Résidus UV (Faint → Identifiable) |
| **Audio** | 1-3 | Réponses vocales (Unintelligible → Phrases) |
| **Writing** | 1-3 | Écritures (Scribbling → Hostile) |

## ⚡ Comportements

| Comportement | Actions |
|--------------|---------|
| **Light** | ON / OFF |
| **Radio** | ON / OFF |
| **Candle** | LIT / OUT |
| **Door** | CLOSE / OPEN |
| **FLX-POD** | ON / OFF |
| **Breaker** | OFF / ON |
| **Holy Water** | USE |
| **Spray** | USE |
| **Hunt** | Cooldowns (90s, 60s, 45s) |

## 🧠 Fantômes

La base de données complète des fantômes est disponible dans [`ghost.md`](ghost.md).

### Fantômes inclus

| Fantôme | Preuve 1 | Preuve 2 | Preuve 3 |
|---------|----------|----------|----------|
| Banshee | Audio | EMF | Radiation |
| Bhoot | Thermal | Radiation | Writing |
| Demon | Radiation | UV | Writing |
| Doppelganger | Audio | UV | Writing |
| Iblis | Audio | Thermal | Writing |
| Phantom | Audio | Radiation | UV |
| Poltergeist | EMF | Radiation | Writing |
| Revenant | EMF | UV | Writing |
| Shura | EMF | Thermal | Writing |
| Skia | Audio | EMF | UV |
| Strigoi | Thermal | UV | Writing |
| Tantalus | EMF | Thermal | UV |
| Tariaksuq | Audio | EMF | Thermal |
| The Echo | Thermal | Radiation | UV |
| The Forgotten | EMF | Radiation | UV |
| Wewe Gombel | EMF | Thermal | Radiation |
| Wisp | Audio | Thermal | Radiation |
| Wraith | Audio | Thermal | UV |

## 🛠️ Développement

### Règles de développement

1. **Pilotage Manuel** — L'utilisateur définit et lance chaque tâche une par une
2. **Portée Limitée** — 50 à 100 lignes de code maximum par itération
3. **Validation Systématique** — Test utilisateur obligatoire après chaque modification
4. **Normes de Code** :
   - Architecture strictement modulaire
   - Aucun commentaire en ligne
   - Méthodes publiques documentées
   - Couleurs dynamiques via `getLevelColors()`

### Commandes utiles

```bash
# Démarrer un serveur local
npx http-server . -p 8080

# Ou utiliser VS Code Live Server
# Installer l'extension "Live Server" puis clic droit sur index.html → Open with Live Server
```

## 🗺️ Roadmap

### Prochaines fonctionnalités

| Priorité | Fonctionnalité | Description |
|----------|---------------|-------------|
| 🔴 Haute | **Surbrillance du dernier niveau** | Garder en surbrillance légère le dernier niveau sélectionné |
| 🔴 Haute | **Tuiles responsives** | Rendre les tuiles adaptatives par rapport à la taille de la page |
| 🟡 Moyenne | **Ghost Bar dynamique** | Top 3 des fantômes avec score de confiance |
| 🟡 Moyenne | **Timeline Chart.js** | Intégration de Chart.js pour les événements temporels |
| 🟢 Basse | **Config fantômes** | Migration de `ghost.md` vers `js/config/ghosts.js` |

### Bugs connus

| Bug | Description |
|-----|-------------|
| **Chevauchement des échelles de temps** | Au bout d'un moment, les échelles de temps de l'axe des abcisses se chevauchent et on n'arrive plus à lire |

## 📄 License

Distribué sous la licence [MIT](https://opensource.org/licenses/MIT).

---

**Made with ❤️ for ghost hunters**
