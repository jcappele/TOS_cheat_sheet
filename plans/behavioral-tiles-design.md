# Design: Tuiles Comportementales Fantômes

## Contexte

Ce document décrit le design détaillé des nouvelles tuiles comportementales pour l'identification des fantômes dans TOS. Chaque tuile permet d'éliminer ou d'augmenter la confiance envers un ou plusieurs fantômes basée sur des **comportements observables**.

---

## Architecture des Tuiles Comportementales

### Structure HTML Générale

Chaque tuile comportementale suit cette structure :

```html
<div class="behavior-tile" data-behavior="tile-type">
  <div class="behavior-tile-header">
    <span class="behavior-tile-icon">📡</span>
    <span class="behavior-tile-title">Titre</span>
  </div>
  <div class="behavior-tile-buttons">
    <button class="behavior-btn" data-value="value1">
      <span class="btn-label">Label</span>
      <span class="btn-ghosts">Fantômes concernés</span>
    </button>
    <button class="behavior-btn" data-value="value2">
      <span class="btn-label">Label</span>
      <span class="btn-ghosts">Fantômes concernés</span>
    </button>
  </div>
</div>
```

### CSS des Tuiles

```css
/* Conteneur principal de la tuile */
.behavior-tile {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid var(--border-color);
}

.behavior-tile-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-primary);
}

.behavior-tile-icon {
  font-size: 16px;
}

.behavior-tile-title {
  font-size: 14px;
}

/* Conteneur des boutons */
.behavior-tile-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Bouton individuel */
.behavior-btn {
  flex: 1;
  min-width: 80px;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--btn-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.behavior-btn:hover {
  background: var(--btn-hover-bg);
  border-color: var(--accent-color);
}

.behavior-btn.active {
  background: var(--btn-active-bg);
  border-color: var(--accent-color);
  box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.3);
}

.behavior-btn.eliminated {
  opacity: 0.4;
  text-decoration: line-through;
}

.btn-label {
  font-size: 12px;
  font-weight: 600;
}

.btn-ghosts {
  font-size: 9px;
  color: var(--text-secondary);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## Tuiles Comportementales Détaillées

### 1. Tuile: Lumières

**ID:** `lights`
**Icône:** 💡
**Boutons:** 3 (Allumées, Éteintes, Les deux)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Allumées | `on` | The Echo | Banshee, Bhoot, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia, Strigoi, Tantalus, Wisp |
| Éteintes | `off` | The Echo | Demon, Phantom, Strigoi, Tariaksuq, Wewe Gombel, Wraith |
| Les deux | `on-off` | The Echo, Wisp (on-only), Demon (off-only), Strigoi (on-only), Tariaksuq (off-only), Wewe Gombel (off-only), Phantom (off-only) | Bhoot, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia |

**Impact trust:**
- Bouton "Allumées" → +15 vers Wisp, +10 vers les autres
- Bouton "Éteintes" → +15 vers Demon, +10 vers les autres
- Bouton "Les deux" → +15 vers Bhoot, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia

---

### 2. Tuile: Bougies

**ID:** `candles`
**Icône:** 🕯️
**Boutons:** 2 (Éteintes, Ignorées)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Éteintes | `extinguish` | Skia, Phantom, Wisp, Strigoi, The Echo | Banshee, Bhoot, Demon, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Tantalus, Tariaksuq, Wewe Gombel, Wraith |
| Ignorées | `ignore` | Banshee, Bhoot, Demon, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Tantalus, Tariaksuq, Wewe Gombel, Wraith | Skia, Phantom, Wisp, Strigoi, The Echo |

**Impact trust:**
- Bouton "Éteintes" → +20 vers Banshee, +15 vers les autres fantômes éteigneurs
- Bouton "Ignorées" → +20 vers Phantom, +15 vers Skia, Wisp, Strigoi

---

### 3. Tuile: Radio

**ID:** `radio`
**Icône:** 📻
**Boutons:** 4 (Activée, Désactivée, Les deux, Ignorée)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Activée | `on` | Phantom, Strigoi | Banshee, Bhoot, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia, Tantalus, Tariaksuq, The Echo, Wewe Gombel, Wisp, Wraith |
| Désactivée | `off` | Strigoi | Banshee, Bhoot, Demon, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Shura, Skia, Tantalus, Tariaksuq, The Echo, Wewe Gombel, Wisp, Wraith |
| Les deux | `on-off` | Strigoi (on-only), Phantom (off-only) | Banshee, Bhoot, Demon, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia, Tantalus, Tariaksuq, The Echo, Wewe Gombel, Wisp, Wraith |
| Ignorée | `ignore` | Banshee, Bhoot, Demon, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia, Tantalus, Tariaksuq, Wewe Gombel, Wraith | The Echo |

**Impact trust:**
- Bouton "Activée" → +15 vers Banshee (cri à travers radio), +10 vers les autres
- Bouton "Désactivée" → +20 vers Phantom, +10 vers les autres
- Bouton "Les deux" → +15 vers les fantômes interactifs
- Bouton "Ignorée" → +25 vers The Echo

---

### 4. Tuile: Portes

**ID:** `doors`
**Icône:** 🚪
**Boutons:** 2 (Ferme, Ne ferme pas)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Ferme | `yes` | Tantalus | Banshee, Bhoot, Demon, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Shura, Skia, Strigoi, Tariaksuq, The Forgotten, Wewe Gombel, Wraith |
| Ne ferme pas | `no` | Tous sauf Tantalus | Tantalus |

**Impact trust:**
- Bouton "Ferme" → +10 vers tous les fantômes fermants
- Bouton "Ne ferme pas" → +25 vers Tantalus

---

### 5. Tuile: Cooldown Chasse

**ID:** `cooldown`
**Icône:** ⏱️
**Boutons:** 3 (Court, Normal, Long)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Court | `short` | Bhoot, Skia, Tariaksuq, Wisp (normal), Wraith (normal), Banshee, Doppelganger, Iblis, Poltergeist, Revenant, Strigoi, Tantalus, The Echo, The Forgotten (normal) | Shura, Wewe Gombel |
| Normal | `normal` | Shura, Wewe Gombel, Bhoot, Skia, Tariaksuq | Banshee, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Strigoi, Tantalus, The Echo, The Forgotten, Wisp (après reset) |
| Long | `long` | Shura, Wewe Gombel, Banshee, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Strigoi, Tantalus, The Echo, The Forgotten, Wisp | Bhoot, Skia, Tariaksuq |

**Impact trust:**
- Bouton "Court" → +20 vers Shura, Wewe Gombel
- Bouton "Normal" → +15 vers les fantômes à cooldown normal
- Bouton "Long" → +20 vers Bhoot, Skia, Tariaksuq

---

### 6. Tuile: Vitesse du Fantôme

**ID:** `speed`
**Icône:** ⚡
**Boutons:** 2 (Rapide, Normal)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Rapide | `fast` | Banshee, Bhoot, Doppelganger, Phantom, Poltergeist, Revenant, Skia (rapide mais variable), Strigoi, Tantalus, Tariaksuq, The Echo, The Forgotten | Shura, Wewe Gombel, Wisp, Wraith |
| Normal | `normal` | Shura, Wewe Gombel, Wisp, Wraith, Demon | Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Skia, Strigoi, Tantalus, Tariaksuq, The Echo, The Forgotten |

**Impact trust:**
- Bouton "Rapide" → +20 vers Demon, Iblis, Shura, Wisp, Wraith
- Bouton "Normal" → +15 vers les fantômes normaux

---

### 7. Tuile: Eau Bénite (Désorientation)

**ID:** `holy-water`
**Icône:** 💧
**Boutons:** 2 (Normale 3s, Très efficace 5s)

> **Note:** Le cooldown de chasse (60s/90s) est traité dans la tuile "Cooldown Chasse" (section 5), pas ici. Cette tuile concerne uniquement la **durée de désorientation** après un spray.

| Bouton | Valeur | Désorientation | Fantômes éliminés | Fantômes confirmés |
|--------|--------|----------------|-------------------|-------------------|
| Normale 3s | `normal` | 3 secondes | Demon, Wisp, Wewe Gombel | Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Shura, Skia, Strigoi, Tantalus, Tariaksuq, The Echo, The Forgotten |
| Très efficace 5s | `more` | 5 secondes | Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Shura, Skia, Strigoi, Tantalus, Tariaksuq, The Echo, The Forgotten, Wisp | Demon, Wewe Gombel, Wraith |

**Impact trust:**
- Bouton "Normale 3s" → +10 vers les fantômes normaux
- Bouton "Très efficace 5s" → +20 vers Demon, Wewe Gombel, Wraith

---

### 8. Tuile: Vitesse en Ligne de Vue (LOS)

**ID:** `los-speed`
**Icône:** 👁️⚡
**Boutons:** 3 (Rapide, Normal, Lent)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Rapide | `fast` | Demon, Iblis, Phantom, Poltergeist, Revenant, Skia (vers cible), Strigoi, Tantalus, The Echo, The Forgotten, Wisp | Shura, Wewe Gombel, Wraith |
| Normal | `normal` | Shura, Wewe Gombel, Wraith, Demon (slow), Iblis, Phantom, Poltergeist, Revenant, Skia (après 2m), Strigoi, Tantalus, The Echo, The Forgotten, Wisp | Tariaksuq |
| Lent | `slow` | Shura, Wewe Gombel, Wisp, Wraith, Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Skia, Strigoi, Tantalus, Tariaksuq, The Echo, The Forgotten | Demon |

**Impact trust:**
- Bouton "Rapide" → +15 vers Shura, Wewe Gombel, Wraith
- Bouton "Normal" → +15 vers Tariaksuq, Banshee, Bhoot, Doppelganger
- Bouton "Lent" → +25 vers Demon

---

### 9. Tuile: Portée Ligne de Vue (LOS Range)

**ID:** `los-range`
**Icône:** 📏
**Boutons:** 4 (Faible, Normale, Élevée, Très élevée)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Faible | `low` | Shura, Skia, Strigoi, Tantalus, Tariaksuq, The Echo, The Forgotten, Wisp, Wraith, Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Wewe Gombel | Demon |
| Normale | `normal` | Demon (low), Shura (high), Skia (normal), Strigoi (normal), Tantalus (normal), Tariaksuq, The Echo, The Forgotten, Wisp, Wraith (very-high), Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant | Wewe Gombel |
| Élevée | `high` | Demon (low), Skia (normal), Strigoi (normal), Tantalus (normal), Tariaksuq, The Echo, The Forgotten, Wisp, Wraith (very-high), Banshee, Bhoot, Doppelganger, Iblis, Phantom, Poltergeist, Revenant, Wewe Gombel | Shura |
| Très élevée | `very-high` | Tous sauf Wraith | Wraith |

**Impact trust:**
- Bouton "Faible" → +25 vers Demon
- Bouton "Normale" → +10 vers les fantômes normaux
- Bouton "Élevée" → +25 vers Shura
- Bouton "Très élevée" → +30 vers Wraith

---

### 10. Tuile: FLX-POD (Flashlight)

**ID:** `flx-pod`
**Icône:** 🔦
**Boutons:** 3 (Interagit, Ne peut pas, Shadow uniquement)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Interagit | `interact` | Phantom, Tantalus, The Echo | Banshee, Bhoot, Demon, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia, Strigoi, Tariaksuq, Wewe Gombel, Wraith |
| Ne peut pas | `ignore` | Banshee, Bhoot, Demon, Doppelganger, Iblis, Poltergeist, Revenant, Shura, Skia, Strigoi, Tariaksuq, Wewe Gombel, Wraith | Phantom, Tantalus, The Echo |
| Shadow uniquement | `shadow-only` | Tous sauf Phantom, Strigoi, Tariaksuq | Phantom, Strigoi, Tariaksuq |

**Impact trust:**
- Bouton "Interagit" → +10 vers les fantômes interactifs
- Bouton "Ne peut pas" → +15 vers Phantom, Tantalus, The Echo
- Bouton "Shadow uniquement" → +20 vers Phantom, Strigoi, Tariaksuq

---

### 11. Tuile: Disjoncteur (Breaker)

**ID:** `breaker`
**Icône:** ⚡🔌
**Boutons:** 2 (Casse, Ne casse pas)

| Bouton | Valeur | Fantômes éliminés | Fantômes confirmés |
|--------|--------|-------------------|-------------------|
| Casse | `active` | The Echo, Wewe Gombel | Tous les autres |
| Ne casse pas | `no-breaker` | Tous sauf The Echo, Wewe Gombel | The Echo, Wewe Gombel |

**Impact trust:**
- Bouton "Casse" → +10 vers tous les fantômes normaux
- Bouton "Ne casse pas" → +25 vers The Echo, Wewe Gombel

---

## Matrice de Confiance par Bouton

### Système de Score

Chaque bouton active modifie le score de confiance du fantôme :

| Action | Impact |
|--------|--------|
| Confirmation forte (1-2 fantômes) | +20 à +30 |
| Confirmation moyenne (3-5 fantômes) | +15 à +20 |
| Confirmation faible (6+ fantômes) | +10 à +15 |
| Élimination (tous sauf 1-2) | -10 vers tous sauf le confirmé |

### Niveaux de Confiance Finaux

| Score | Niveau | Couleur |
|-------|--------|---------|
| 100 | Guaranteed | Vert vif |
| 75-99 | Confident | Bleu |
| 40-74 | Mixed | Orange |
| 10-39 | Unsure | Gris |
| 0 | False | Rouge |

---

## Intégration avec l'Architecture Existant

### Fichiers à Modifier

1. **`js/tiles/ghost-tiles.js`** - Ajouter la fonction `createBehaviorTiles()` pour générer les tuiles
2. **`css/tiles.css`** - Ajouter les styles `.behavior-tile`, `.behavior-btn`
3. **`index.html`** - Ajouter le conteneur des tuiles comportementales
4. **`js/engine/proof-trust-engine.js`** - Ajouter la méthode `applyBehaviorFilter(behaviorType, value)`

### Fonction d'Intégration Principale

```javascript
function applyBehaviorFilter(behaviorType, value) {
  // Met à jour le filtre comportemental actif
  state.activeFilters[behaviorType] = value;
  
  // Recalcule les scores fantômes en fonction des filtres
  var filteredScores = calculateFilteredGhostScores();
  
  // Émet l'événement de mise à jour
  emitGhostScores(filteredScores);
}
```

### Algorithme de Calcul avec Filtres

```
Pour chaque fantôme:
  scoreInitial = scoreDeBase
  
  Pour chaque filtre actif:
    Si le fantôme correspond au filtre:
      scoreInitial += bonusConfirmation
      
    Si le fantôme ne correspond PAS au filtre:
      scoreInitial -= penaltyElimination
  
  Limiter le score entre 0 et 100
  Déterminer le niveau de confiance
```

---

## Ordre d'Priorité des Tuiles

Pour une identification optimale, les tuiles devraient être utilisées dans cet ordre:

1. **Lumières** - Élimine rapidement The Echo et d'autres
2. **Bougies** - Élimine Phantom, Skia, Wisp, Strigoi
3. **Radio** - Élimine Strigoi (on-only), Phantom (off-only)
4. **Portes** - Élimine Tantalus
5. **Eau Bénite** - Élimine Demon, Wisp, Wewe Gombel, Wraith (très efficace 5s) ou confirme les autres (normale 3s)
6. **Cooldown** - Élimine Shura, Wewe Gombel (court) ou confirme Bhoot, Skia (long)
7. **Vitesse** - Élimine Demon, Iblis (rapide) ou confirme les normaux
8. **FLX-POD** - Élimine Phantom, Tantalus, The Echo (ne peut pas)
9. **Vitesse LOS** - Élimine Demon (lent) ou confirme Shura, Wraith (rapide)
10. **Portée LOS** - Élimine Demon (faible), Shura (élevée), Wraith (très élevée)
11. **Breaker** - Élimine The Echo, Wewe Gombel (ne casse pas)

---

## Résumé des Tuiles

| # | Tuile | ID | Boutons | Fantômes impactés |
|---|-------|-----|---------|-------------------|
| 1 | Lumières | `lights` | 3 (On, Off, On-Off) | Tous |
| 2 | Bougies | `candles` | 2 (Éteint, Ignore) | 16/18 |
| 3 | Radio | `radio` | 4 (On, Off, On-Off, Ignore) | Tous |
| 4 | Portes | `doors` | 2 (Ferme, Ne ferme pas) | 17/18 |
| 5 | Cooldown | `cooldown` | 3 (Court, Normal, Long) | 17/18 |
| 6 | Vitesse | `speed` | 2 (Rapide, Normal) | 18/18 |
| 7 | Eau Bénite | `holy-water` | 2 (Normale 3s, Très efficace 5s) | 18/18 |
| 8 | Vitesse LOS | `los-speed` | 3 (Rapide, Normal, Lent) | 18/18 |
| 9 | Portée LOS | `los-range` | 4 (Faible, Normale, Élevée, Très élevée) | 18/18 |
| 10 | FLX-POD | `flx-pod` | 3 (Interagit, Ignore, Shadow) | 18/18 |
| 11 | Breaker | `breaker` | 2 (Casse, Ne casse pas) | 18/18 |

**Total: 11 tuiles comportementales avec 26 boutons au total**
