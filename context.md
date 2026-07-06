# TOS Cheat Sheet - Contexte du Projet

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

## 📋 Spécifications Globales

**Concept :** Outil interactif d'assistance à l'investigation pour le jeu "The Other Side".

**Stack Technique :**
- **Structure :** HTML5 (`index.html` central).
- **Style :** CSS3 (Variables pour thèmes : Dark/Light/Midnight, layout fixe optimisé 1080p sans scroll).
- **Logique :** JavaScript Vanilla ES6+ (fichiers séparés).
- **Graphiques :** Chart.js (CDN) pour les timelines.
- **Persistance :** `localStorage`.

---

## 📐 Architecture UI (1080p)

1. **Header :**
   - Logo et Titre.
   - Timer global (temps écoulé depuis le début).
   - Boutons START/STOP (gère le timer global et l'horodatage).
   - Toggle Thème (Dark/Light/Midnight).
2. **Zone Centrale (Tuiles) :**
   - Tuiles cliquables pour les Preuves et les Comportements.
   - Intégration de boutons de niveaux/actions et d'un mini-graphique (timeline X/Y) par tuile.
3. **Barre Inférieure (Ghost Bar) :**
   - Défilement horizontal.
   - Top 3 des fantômes avec score de confiance (ex: `#1 Banshee 85%`).

---

## 🎯 Système de Preuves (Suivi temporel et dégradation)

Chaque preuve possède des niveaux spécifiques et est représentée sur sa timeline :

- **EMF :** Niveaux 1 à 5
- **Radiation :** Niveaux 1 à 3
- **Thermal (Temperature) :** Niveaux 1 à 4
  - Level 1 - Mild (0.5°C to 4.5°C | 33.0°F to 40.0°F)
  - Level 2 - Moderate (0.0°C to 9.5°C | 32.0°F to 15.0°F)
  - Level 3 - Significant (-13.3°C to -10.0°C | 8.0°F to 14°F)
  - Level 4 - Frigid (-20.5°C to -13.9°C | -0.5°F to 7.0°F)
- **UV :** Niveaux 1 à 3
- **Audio :** Niveaux 1 à 3
- **Writing :** Niveaux 1 à 3

---

## ⚡ Système de Comportements (Actions et Cooldowns)

Boutons d'actions déclenchant un horodatage statique sur la timeline (aucun chronomètre dynamique) :

- **Light :** ON / OFF
- **Radio :** ON / OFF
- **Candle :** LIT / OUT
- **Door :** CLOSE / OPEN
- **FLX-POD :** ON / OFF
- **Breaker :** OFF / ON
- **Holy Water :** USE
- **Spray :** USE
- **Hunt (Cooldowns) :** Boutons de délai estimé (ex: 90s, 60s, 45s).

---

## 🧠 Moteur de Confiance (Scoring)

Algorithme de calcul dynamique des probabilités des fantômes basé sur :
- Les preuves validées (pondération par niveau).
- Les comportements observés.
- Le facteur de dégradation temporelle (certaines preuves peuvent être fausses).