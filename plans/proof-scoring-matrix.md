# Matrice de Scoring Granulaire pour les Preuves

## 1. Définition des Seuils de Validation par Preuve

Chaque preuve a un **niveau minimum requis** et un **nombre minimum de points** pour être considérée comme valide.

| Preuve | Niveau Minimum | Points Minimum | Cas "Guaranteed" |
|--------|---------------|----------------|------------------|
| EMF | Niveau 4 | 4 points | 1×N5 OU 5×N4 |
| Thermal | Niveau 3+ | 3 points | 1×N3+ (temp négative) OU 5×N4 |
| Audio | Niveau 3 | 3 points | 5×N3 |
| Radiation | Niveau 3 | 3 points | 5×N3 |
| UV | Niveau 3 | 3 points | 5×N3 |
| Writing | Niveau 3 | 3 points | 5×N3 |

## 2. Définition des Preuves Valides vs Invalides

**Preuve valide** : Un point qui atteint le niveau minimum requis pour cette preuve.
**Preuve invalide (fausse)** : Un point qui est en dessous du niveau minimum.

Exemple pour EMF (niveau minimum = 4) :
- Points niveau 4 ou 5 = vraies preuves
- Points niveau 1, 2 ou 3 = fausses preuves

Exemple pour Thermal (niveau minimum = 3) :
- Points niveau 3 ou 4 = vraies preuves
- Points niveau 1 ou 2 = fausses preuves

## 3. Matrice de Scoring par Nombre de Vraies/Fausses Preuves

### Principe général

Le score final est calculé selon :
1. **Nombre de vraies preuves** (points ≥ niveau minimum)
2. **Nombre de fausses preuves** (points < niveau minimum)
3. **Stabilité des mesures** (intervalle entre les points valides)
4. **Ratio de confiance** = vraies / (vraies + fausses)

### Tableau matriciel commun (pour Audio, Radiation, UV, Writing)

Ces 4 preuves ont la même structure : 3 niveaux, 3 points minimum au niveau 3.

| Vraies | Fausses | Score | Niveau | Explication |
|--------|---------|-------|--------|-------------|
| 3 | 0 | 100% | Guaranteed | 3+ points valides, aucune fausse |
| 2 | 0 | 85% | Confident | 2 points valides, stable |
| 2 | 1 | 70% | Confident | 2 valides + 1 fausse, ratio 67% |
| 2 | 2 | 55% | Mixed | 2 valides + 2 fausses, ratio 50% |
| 1 | 0 | 85% | Confident | 1 point valide isolé |
| 1 | 1 | 50% | Mixed | 1 valide + 1 fausse, ratio 50% |
| 1 | 2 | 35% | Unsure | 1 valide + 2 fausses, ratio 33% |
| 0 | 0+ | 0% | False | Aucune preuve valide |
| 3+ | 1 | 95% | Guaranteed | 3+ valides + 1 fausse, ratio 75% |
| 3+ | 2 | 85% | Confident | 3+ valides + 2 fausses, ratio 60% |
| 3+ | 3 | 70% | Confident | 3+ valides + 3 fausses, ratio 50% |

### Tableau matriciel pour EMF

EMF a une particularité : le niveau 5 est instantanément "Guaranteed".

| Vraies | Fausses | Score | Niveau | Explication |
|--------|---------|-------|--------|-------------|
| 1×N5 | 0+ | 100% | Guaranteed | 1 point niveau 5 = guaranteed instant |
| 4 | 0 | 100% | Guaranteed | 4 points niveau 4 |
| 5 | 0 | 100% | Guaranteed | 5 points niveau 4 |
| 3 | 0 | 85% | Confident | 3 points niveau 4, stables |
| 3 | 1 | 70% | Confident | 3 valides + 1 fausse |
| 3 | 2 | 55% | Mixed | 3 valides + 2 fausses |
| 3 | 3 | 45% | Unsure | 3 valides + 3 fausses, ratio 50% |
| 2 | 0 | 70% | Confident | 2 points niveau 4 |
| 2 | 1 | 55% | Mixed | 2 valides + 1 fausse |
| 2 | 2 | 40% | Unsure | 2 valides + 2 fausses |
| 2 | 3 | 30% | Unsure | 2 valides + 3 fausses |
| 1 | 0 | 70% | Confident | 1 point niveau 4 isolé |
| 1 | 1 | 40% | Unsure | 1 valide + 1 fausse |
| 1 | 2 | 25% | Unsure | 1 valide + 2 fausses |
| 1 | 3 | 15% | Unsure | 1 valide + 3 fausses |
| 0 | 0+ | 0% | False | Aucune preuve valide |

### Tableau matriciel pour Thermal

Thermal a une particularité : le niveau 3+ (température négative) est immédiatement valide.

| Vraies | Fausses | Score | Niveau | Explication |
|--------|---------|-------|--------|-------------|
| 1×N3+ | 0 | 100% | Guaranteed | 1 point température négative |
| 1×N3+ | 1+ | 70% | Confident | Temp négative + fausses mesures |
| 4 | 0 | 100% | Guaranteed | 4 points niveau 4 |
| 5 | 0 | 100% | Guaranteed | 5 points niveau 4 |
| 3 | 0 | 85% | Confident | 3 points niveau 3/4, stables |
| 3 | 1 | 70% | Confident | 3 valides + 1 fausse |
| 3 | 2 | 55% | Mixed | 3 valides + 2 fausses |
| 3 | 3 | 45% | Unsure | 3 valides + 3 fausses |
| 2 | 0 | 70% | Confident | 2 points niveau 3/4 |
| 2 | 1 | 55% | Mixed | 2 valides + 1 fausse |
| 2 | 2 | 40% | Unsure | 2 valides + 2 fausses |
| 2 | 3 | 30% | Unsure | 2 valides + 3 fausses |
| 1 | 0 | 70% | Confident | 1 point niveau 3/4 isolé |
| 1 | 1 | 40% | Unsure | 1 valide + 1 fausse |
| 1 | 2 | 25% | Unsure | 1 valide + 2 fausses |
| 1 | 3 | 15% | Unsure | 1 valide + 3 fausses |
| 0 | 0+ | 0% | False | Aucune preuve valide |

## 4. Formule de Calcul du Score

```
score = baseScore × confidenceRatio × stabilityFactor

où:
- baseScore : score de base selon la matrice (0, 15, 25, 30, 40, 45, 55, 70, 85, 95, 100)
- confidenceRatio = vraies / (vraies + fausses) [0 à 1]
- stabilityFactor : 1.0 si mesures stables, 0.8 si instables
```

### Exemples de calcul :

**EMF : 3 vraies + 2 fausses**
- baseScore = 55 (d'après matrice)
- confidenceRatio = 3/(3+2) = 0.6
- stabilityFactor = 1.0 (si stable)
- score = 55 × 0.6 × 1.0 = 33%

**Audio : 2 vraies + 1 fausse**
- baseScore = 70 (d'après matrice)
- confidenceRatio = 2/(2+1) = 0.67
- stabilityFactor = 1.0
- score = 70 × 0.67 × 1.0 = 47%

**Thermal : 1×N3+ + 2 fausses**
- baseScore = 70 (temp négative détectée)
- confidenceRatio = 1/(1+2) = 0.33
- stabilityFactor = 1.0
- score = 70 × 0.33 × 1.0 = 23%

## 5. Structure des Données d'État

```javascript
state = {
  proofData: {
    thermal: {
      points: [{time: 120, level: 3}, {time: 180, level: 1}, ...],
      maxLevel: 3,
      validCount: 2,      // nouvelles propriétés
      invalidCount: 1     // nouvelles propriétés
    },
    emf: { /* ... */ },
    audio: { /* ... */ },
    radiation: { /* ... */ },
    uv: { /* ... */ },
    writing: { /* ... */ }
  },
  trustScores: {
    thermal: { level: 'Confident', score: 47, validCount: 2, invalidCount: 1 },
    emf: { level: 'Mixed', score: 33, validCount: 3, invalidCount: 2 },
    // ...
  },
  ghostScores: [/* ... */],
  currentTime: 0
}
```

## 6. UI : Compteurs de Vraies/Fausses Preuves

### Emplacement : Bloc `ghostsContainer` (index.html ligne 218-221)

Remplacement de :
```html
<h2 class="tile-title">Top Ghosts</h2>
<div class="ghosts-placeholder">Top 3 Ghosts — Coming Soon</div>
```

Par :
```html
<h2 class="tile-title">Top Ghosts</h2>
<div class="proof-stats" id="proofStats">
  <div class="proof-stat-item">
    <span class="proof-stat-label">Vraies preuves :</span>
    <span class="proof-stat-value positive" id="validProofsCount">0</span>
  </div>
  <div class="proof-stat-item">
    <span class="proof-stat-label">Fausses preuves :</span>
    <span class="proof-stat-value negative" id="invalidProofsCount">0</span>
  </div>
  <div class="proof-stat-item">
    <span class="proof-stat-label">Seuil d'élimination :</span>
    <input type="number" id="eliminationThresholdInput" min="0" max="100" value="50">
    <span class="proof-stat-unit">%</span>
  </div>
</div>
<div class="ghosts-container-inner" id="ghostsContainerInner">
  <!-- Les tuiles fantômes seront injectées ici -->
</div>
```

### Styles CSS nécessaires (à ajouter dans `css/tile-ghosts.css`)

```css
.proof-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  background-color: var(--bg-tertiary);
  border-radius: 6px;
  margin-bottom: 8px;
}

.proof-stat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.85rem;
}

.proof-stat-label {
  color: var(--text-secondary);
}

.proof-stat-value {
  font-weight: 600;
  font-size: 1rem;
  min-width: 30px;
  text-align: right;
}

.proof-stat-value.positive {
  color: #4CAF50;
}

.proof-stat-value.negative {
  color: #F44336;
}

.proof-stat-unit {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.proof-stat-item input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.85rem;
  text-align: center;
}

.proof-stat-item input:focus {
  outline: none;
  border-color: var(--deezer-purple);
  box-shadow: 0 0 4px rgba(162, 56, 255, 0.3);
}

.ghosts-container-inner {
  /* Conteneur pour les tuiles fantômes */
}
```

## 7. Indicateur de Confiance par Preuve

L'indicateur sur chaque tuile doit aussi afficher le nombre de vraies/fausses preuves :

```
Avant : "Strong: 85%"
Après : "Strong: 85% (3V/1F)"
```

Où "3V" = 3 vraies preuves, "1F" = 1 fausse preuve.

## 8. Résumé des Modifications Requises

### Fichiers à modifier :

1. **`js/engine/proof-trust-engine.js`**
   - Ajouter `validCount` et `invalidCount` dans `state.proofData`
   - Créer une fonction `countValidInvalidProofs(type)` qui calcule les compteurs
   - Refactorer `calculateProofScore()` pour utiliser la matrice
   - Mettre à jour `calculateGhostScores()` pour inclure les compteurs
   - Ajouter `getProofStats()` pour exposer les compteurs

2. **`js/proofIndicator.js`**
   - Mettre à jour `updateIndicators()` pour afficher "(3V/1F)"
   - Ajouter un écouteur pour les compteurs globaux

3. **`js/proofConfig.js`**
   - Déplacer la logique vers le nouveau conteneur dans ghostsContainer

4. **`css/tile-ghosts.css`**
   - Ajouter les styles pour `.proof-stats`
   - Ajouter les styles pour `.proof-stat-item`

5. **`index.html`**
   - Modifier la structure du `ghostsContainer`
   - Ajouter les éléments de statistiques

6. **`js/tiles/thermal-tile.js`**
   - Corriger la description du niveau 3 : "-13°C à 0°C" au lieu de "-13°C à -10°C"

7. **`css/header.css`**
   - Supprimer les styles de `.proof-config` (déplacés dans tile-ghosts.css)
