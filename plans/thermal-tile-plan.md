# Plan - Tuile de Preuve Thermale (Thermal)

## Contexte
Intégrer une tuile de preuve de température dans l'zone centrale (`<main>`) de l'application TOS CheatSheet. Cette tuile permet de enregistrer des points de température pendant l'investigation.

## Spécifications Fonctionnelles

### 1. Quatre boutons de niveaux de température
| Bouton | Niveau | Représentation Y |
|--------|--------|------------------|
| Niveau 1 | Froid extrême | Y=3 (haut du graphique) |
| Niveau 2 | Froid | Y=2 |
| Niveau 3 | Froid modéré | Y=1 |
| Niveau 4 | Température normale | Y=0 (bas du graphique) |

**Comportement des boutons :**
- Clic unique (pas de toggle/sélection persistante)
- Chaque clic ajoute un point au graphique à la position temporelle courante
- Le bouton retourne à son état normal après le clic

### 2. Axe des X (Temps)
- Défilement automatique par tranches de 1 minute
- Après chaque minute écoulée, le graphique s'étend vers la droite
- Affiche les minutes:secunden (ex: `00:00`, `01:00`, `02:00`)
- Le graphique suit l'investigation en temps réel

### 3. Axe des Y (Niveaux de température)
- Inversé : Niveau 4 (froid) en bas, Niveau 0 (pas de froid) en haut
- Ou selon la spécification : Niveau 4 (le plus froid) en haut, Niveau 0 (pas de froid) en bas
- Graduations de 0 à 4

### 4. Graphique
- Ligne reliant les points entre eux
- Points visibles avec des marqueurs
- Style cohérent avec le thème (Dark/Light/Midnight)

### 5. Boutons de contrôle
| Bouton | Fonction |
|--------|----------|
| `Retour` | Retire le dernier point ajouté |
| `Reset` | Supprime tous les points (avec popup de confirmation) |

### 6. Popup de confirmation
- Pour le reset global (header) et le reset de la tuile
- Modal simple avec boutons "Annuler" et "Confirmer"

---

## Architecture Technique

### Fichiers à modifier/créer

#### 1. [`index.html`](index.html) - Modification
Remplacer la zone placeholder par la tuile Thermal :

```html
<main class="app-main">
    <section class="tile thermal-tile" id="thermalTile">
        <h2 class="tile-title">Preuve Thermale</h2>
        <div class="thermal-buttons">
            <button class="btn-thermal" data-level="1" aria-label="Niveau 1">N1</button>
            <button class="btn-thermal" data-level="2" aria-label="Niveau 2">N2</button>
            <button class="btn-thermal" data-level="3" aria-label="Niveau 3">N3</button>
            <button class="btn-thermal" data-level="4" aria-label="Niveau 4">N4</button>
        </div>
        <div class="thermal-graph-container">
            <canvas id="thermalCanvas" width="800" height="200"></canvas>
        </div>
        <div class="thermal-controls">
            <button class="btn-thermal-control" id="thermalUndo" aria-label="Retirer le dernier point">
                &#8617; Retour
            </button>
            <button class="btn-thermal-control" id="thermalReset" aria-label="Réinitialiser la tuile">
                &#128465; Reset
            </button>
        </div>
    </section>
</main>
```

#### 2. [`css/styles.css`](css/styles.css) - Ajout de styles
Nouvelles classes CSS :

```css
/* --- Tuile Thermal --- */
.tile {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.tile-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
}

.thermal-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.btn-thermal {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-thermal:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px var(--shadow-color);
}

.btn-thermal:active {
    transform: scale(0.95);
}

.thermal-graph-container {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
}

#thermalCanvas {
    width: 100%;
    height: 200px;
    display: block;
}

.thermal-controls {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.btn-thermal-control {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-thermal-control:hover {
    background-color: var(--bg-hover);
    transform: scale(1.05);
}

/* --- Popup de confirmation --- */
.confirmation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.confirmation-overlay.is-visible {
    opacity: 1;
    pointer-events: auto;
}

.confirmation-modal {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    min-width: 300px;
    box-shadow: 0 8px 32px var(--shadow-color);
}

.confirmation-modal h3 {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 16px;
}

.confirmation-modal p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 20px;
}

.confirmation-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.btn-confirm-cancel {
    padding: 8px 20px;
    border-radius: 8px;
    border: none;
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-confirm-cancel:hover {
    background-color: var(--bg-hover);
}

.btn-confirm-action {
    padding: 8px 20px;
    border-radius: 8px;
    border: none;
    background-color: var(--btn-stop-bg);
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-confirm-action:hover {
    background-color: var(--btn-stop-hover);
}
```

#### 3. [`js/thermal-tile.js`](js/thermal-tile.js) - Nouveau module
**IIFE** dédié à la gestion de la tuile Thermal.

| Fonction | Rôle |
|----------|------|
| `addPoint(level)` | Ajoute un point au niveau donné à la position temporelle courante |
| `removeLastPoint()` | Retire le dernier point ajouté |
| `resetPoints()` | Supprime tous les points |
| `render()` | Redessine le graphique Canvas |
| `showConfirmation(title, message, onConfirm)` | Affiche le popup de confirmation |
| `hideConfirmation()` | Cache le popup de confirmation |
| `init()` | Initialise les écouteurs d'événements et le rendu |

**Structure des données :**
```javascript
const state = {
    points: [],          // Array of { time: number, level: number }
    currentTime: 0,      // Temps écoulé en secondes (synchronisé avec timer.js)
    maxDisplayTime: 60,  // Temps max affiché (en secondes, s'étend dynamiquement)
    canvas: null,        // Référence au canvas
    ctx: null            // Contexte 2D du canvas
};
```

**Logique de rendu Canvas :**
- Axe X : temps de 0 à `maxDisplayTime` secondes
- Axe Y : niveaux de 0 à 4 (inversé : 0 en haut, 4 en bas)
- Les points sont reliés par des segments de ligne
- Les points sont marqués par des cercles
- Les couleurs suivent les variables CSS via `getComputedStyle()`

**Extension automatique de l'axe X :**
- Quand `currentTime > maxDisplayTime - 10`, étendre `maxDisplayTime` de 60 secondes supplémentaires
- Le graphique défile pour garder le temps courant visible

---

## Flux de données

```
Utilisateur → [Clic bouton N1-N4] → thermal-tile.js → addPoint() → render()
Utilisateur → [Clic Retour]       → thermal-tile.js → removeLastPoint() → render()
Utilisateur → [Clic Reset]        → thermal-tile.js → showConfirmation() → resetPoints() → render()
Timer global → [tick]              → thermal-tile.js → updateTimer() → render()
```

---

## Diagramme de la tuile

```
┌─────────────────────────────────────────────────────┐
│              Preuve Thermale                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│  │  N1  │ │  N2  │ │  N3  │ │  N4  │              │
│  └──────┘ └──────┘ └──────┘ └──────┘              │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │  Y 4|    *                                │   │
│  │     |   / \                               │   │
│  │  3  |  *   *      *                     │   │
│  │     | /     \    / \                    │   │
│  │  2  |/       *  *   *                  │   │
│  │     |              *                    │   │
│  │  1  |               *                   │   │
│  │     |                                  │   │
│  │  0  |___________________________________│   │
│  │     0:00   0:30   1:00   1:30   2:00   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [↺ Retour]          [🗑 Reset]                     │
└─────────────────────────────────────────────────────┘
```

---

## Ordre d'implémentation

1. **HTML** - Ajouter la structure de la tuile dans [`index.html`](index.html)
2. **CSS** - Ajouter les styles dans [`css/styles.css`](css/styles.css)
3. **JS Module** - Créer [`js/thermal-tile.js`](js/thermal-tile.js)
4. **Intégration** - Ajouter le script dans [`index.html`](index.html)
5. **Test** - Vérifier via Live Server

---

## Points d'attention

- **Synchronisation avec le timer** : Le module Thermal doit écouter les événements du timer global pour connaître le temps courant
- **Persistance** : Les points doivent être sauvegardés dans `localStorage` pour survivre au rechargement
- **Thèmes** : Les couleurs du graphique doivent s'adapter aux thèmes Dark/Light
- **Popup de confirmation** : Doit fonctionner pour le reset global ET le reset de la tuile
- **Règle des 50 lignes** : Implémenter par petites étapes, tester après chaque modification
