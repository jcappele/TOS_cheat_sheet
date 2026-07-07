# TOS CheatSheet - Contexte du Projet

## 📚 Documents Incontournables

| Document | Description |
|----------|-------------|
| [`architecture.md`](architecture.md) | Architecture technique du projet (structure, modules, flux de données) |
| [`ghost.md`](ghost.md) | Base de données complète des fantômes (preuves, comportements, tags) |

## ⚠️ Règles de Développement (Méthodologie Agentique)

1. **Pilotage Manuel :** L'utilisateur définit et lance chaque tâche une par une.
2. **Portée Limitée :** 50 à 100 lignes de code maximum par itération, ou modification d'un seul fichier.
3. **Validation Systématique :** Test utilisateur obligatoire (via Live Server) après chaque modification.
4. **Normes de Code :**
    - Architecture strictement modulaire (aucun JS inline dans le HTML).
    - **Aucun commentaire en ligne** dans le code.
    - Chaque méthode publique doit être précédée d'un `//Summary` descriptif.
    - **Couleurs du thème** — Utiliser `getLevelColors()` pour récupérer les couleurs dynamiquement et les passer aux fonctions de rendu.

---

## 📐 Architecture UI (1080p optimisé)

### Structure globale

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

### Header

| Élément | Rôle |
|---------|------|
| `.app-title` | Titre "TOS CheatSheet" en violet Deezer |
| `.btn-reset` | Réinitialisation globale (timer + preuves) |
| `.timer-display` | Affichage du temps écoulé `MM:SS` |
| `.btn-start-stop` | Bouton combiné START/STOP (vert/rouge) |

### Tuiles de Preuves

Chaque tuile contient :
- Un titre (`h2.tile-title`)
- Un groupe de boutons de niveaux (`.button-group`)
- Un canvas pour la timeline (`canvas.graph-canvas`)
- Des boutons de contrôle (Undo/Reset)

| Tuile | Preuve | Niveaux | Couleurs |
|-------|--------|---------|----------|
| `thermal-tile` | Thermal (Temperature) | 1-4 | Bleu ciel → Bleu profond |
| `audio-tile` | Audio | 1-3 | Gris → Rouge → Vert |
| `emf-tile` | EMF | 1-4 | Gris → Violet → Rouge |
| `radiation-tile` | Radiation (CPM) | 1-3 | Blanc → Jaune → Orange |
| `uv-tile` | UV | 1-3 | Violet → Blanc |
| `writing-tile` | Writing | 1-3 | Gris → Blanc |

### Tuiles de Comportements (Counters)

| Tuile | Fonction |
|-------|----------|
| `lightOnTile` | Compteur Light On |
| `lightOffTile` | Compteur Light Off |

---

## 🎯 Système de Preuves (Suivi temporel)

Chaque preuve possède des niveaux spécifiques et est représentée sur sa timeline :

| Preuve | Niveaux | Description |
|--------|---------|-------------|
| **EMF** | 1-5 | Niveau 1: 1.5-2.49 mG, Niveau 2: 2.55-9.99 mG, Niveau 3: 10-19.99 mG, Niveau 4: 20+ mG |
| **Radiation** | 1-3 | Niveau 1: 100-500 CPM, Niveau 2: 501-1000 CPM, Niveau 3: 1001-2000 CPM |
| **Thermal** | 1-4 | Level 1: Mild (0.5°C to 4.5°C), Level 2: Moderate (0.0°C to 9.5°C), Level 3: Significant (-13.3°C to -10.0°C), Level 4: Frigid (-20.5°C to -13.9°C) |
| **UV** | 1-3 | Niveau 1: Faint traces, Niveau 2: Moderate Residues, Niveau 3: Easily Identifiable Patterns |
| **Audio** | 1-3 | Niveau 1: Unintelligible Sounds, Niveau 2: Single Word Responses, Niveau 3: Intelligible Phrases |
| **Writing** | 1-3 | Niveau 1: Incomprehensible Scribling, Niveau 2: Symbolic Enigmas, Niveau 3: Hostile Manifestifications |

---

## ⚡ Système de Comportements (Actions et Cooldowns)

Boutons d'actions déclenchant un horodatage statique sur la timeline (aucun chronomètre dynamique) :

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
| **Hunt (Cooldowns)** | Boutons de délai estimé (ex: 90s, 60s, 45s) |

---

## 🧠 Moteur de Confiance (Scoring)

Algorithme de calcul dynamique des probabilités des fantômes basé sur :
- Les preuves validées (pondération par niveau).
- Les comportements observés.
- Le facteur de dégradation temporelle (certaines preuves peuvent être fausses).

---

## 🐛 Bugs Connus

| Bug | Description |
|-----|-------------|
| **Chevauchement des échelles de temps** | Au bout d'un moment, les échelles de temps de l'axe des abcisses se chevauchent et on n'arrive plus à lire |

## 🚀 Fonctionnalités à Ajouter Prochainement

| Fonctionnalité | Description |
|----------------|-------------|
| **Surbrillance du dernier niveau** | Garder en surbrillance légère le dernier niveau qui a été sélectionné pour garder une information visuelle à ce sujet |
| **Tuiles responsives** | Rendre les tuiles adaptatives par rapport à la taille de la page |
| **Ghost Bar dynamique** | Top 3 des fantômes avec score de confiance |
| **Timeline Chart.js** | Intégration de Chart.js pour les événements temporels |
| **Config fantômes** | Migration de `ghost.md` vers `js/config/ghosts.js` |
