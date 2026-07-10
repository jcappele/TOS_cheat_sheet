# TOS Cheat Sheet - Base de Données des Fantômes

> Liste complète des fantômes avec leurs preuves et comportements.

---

## Table des matières

1. [Banshee](#banshee)
2. [Bhoot](#bhoot)
3. [Demon](#demon)
4. [Doppelganger](#doppelganger)
5. [Iblis](#iblis)
6. [Phantom](#phantom)
7. [Poltergeist](#poltergeist)
8. [Revenant](#revenant)
9. [Shura](#shura)
10. [Skia](#skia)
11. [Strigoi](#strigoi)
12. [Tantalus](#tantalus)
13. [Tariaksuq](#tariaksuq)
14. [The Echo](#the-echo)
15. [The Forgotten](#the-forgotten)
16. [Wewe Gombel](#wewe-gombel)
17. [Wisp](#wisp)
18. [Wraith](#wraith)

---

## Légende des comportements

| Tag | Signification |
|-----|---------------|
| `extinguish` | Éteint les bougies |
| `candles-ignore` | Ignore les bougies |
| `lights-on` | Peut allumer les lumières |
| `lights-off` | Peut éteindre les lumières |
| `lights-ignore` | Ignore les lumières |
| `radio-on` | Peut activer la radio |
| `radio-off` | Peut désactiver la radio |
| `radio-ignore` | Ignore la radio |
| `doors` | Peut fermer les portes |
| `no-doors` | Ne ferme jamais les portes |
| `spray-normal` | Eau bénite efficace (normal) |
| `spray-more` | Eau bénite très efficace |
| `spray-90s` | Eau bénite efficace pendant 90s |
| `spray-2m` | Eau bénite efficace à 2m |
| `cooldown-short` | Cooldown de chasse court |
| `cooldown-normal` | Cooldown de chasse normal |
| `cooldown-long` | Cooldown de chasse long |
| `speed-fast` | Vitesse de base rapide |
| `speed-normal` | Vitesse de base normale |
| `los-fast` | Vitesse en ligne de vue rapide |
| `los-medium` | Vitesse en ligne de vue moyenne |
| `los-slow` | Vitesse en ligne de vue lente |
| `los-variable` | Vitesse en ligne de vue variable |
| `los-low` | Portée de ligne de vue faible |
| `los-normal` | Portée de ligne de vue normale |
| `los-high` | Portée de ligne de vue élevée |
| `los-very-high` | Portée de ligne de vue très élevée |
| `shadow-only` | Preuve shadow camera uniquement |
| `flx-ignore` | Ignore le flashlight |
| `no-breaker` | Ne casse pas les circuit breakers |

---

## Preuves par fantôme

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

---

## Détails des comportements

### Banshee

> La Banshee est une présence glaçante liée aux présages de mort, amplifiant la peur par ses cris perçants et ses interférences électriques erratiques.

| Propriété | Valeur |
|-----------|--------|
| ID | `banshee` |
| Preuves | Audio, EMF 20+, Radiation |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off (peut crier à travers) |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s) |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal` |

**Traits spéciaux :**
- 25% de chance d'entendre les cris de la Banshee si ramenée du domaine astral.
- Peut crier à travers les radios lorsqu'elles sont activées.
- Taux cardiaque plus élevé = plus de chances de crier à travers les équipements audio.

---

### Bhoot

> Le Bhoot est un esprit tourmenté, lié au lieu de sa souffrance et alimenté par un besoin de vengeance. Les enquêteurs rapportent ressentir un froid intense lorsque le Bhoot approche.

| Propriété | Valeur |
|-----------|--------|
| ID | `bhoot` |
| Preuves | Températures glaciales, Radiation, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Long (90 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s) |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `cooldown-long` |

**Traits spéciaux :**
- La pièce où le fantôme commence sa chasse (pas nécessairement sa pièce favorite) devient beaucoup plus froide (baisse d'environ 30ºF/16.67ºC par rapport à la température actuelle) ~2 secondes avant le début de la chasse.
- Utiliser un Thermomètre Laser pour suivre les déplacements du fantôme et la chute rapide de température pour un relevé immédiat.
- Sur les runs sans preuve, ce comportement s'applique toujours et peut montrer du gel.

---

### Demon

> Le Demon est une force de malice implacable, animée purement par son désir de nuire. Les rapportent des accès intenses d'agressivité, et les objets devenant chauds au toucher. L'eau bénite semble garder le Demon à distance, pour un temps court.

| Propriété | Valeur |
|-----------|--------|
| ID | `demon` |
| Preuves | Radiation, UV, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | Off uniquement |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Très efficace (5 secondes) |
| Cooldown chasse | Variable (40 secondes ou 2 minutes après spray) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Lente (200 cm/s), facile à rompre la LOS |
| Portée (LOS) | Faible |
| Tags | `extinguish`, `flx-interact`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-more`, `cooldown-short`, `speed-fast`, `los-slow`, `los-low` |

**Traits spéciaux :**
- Laisse des températures chaudes sur les objets touchés (interrupteurs, portes, Sanctified Cross, FLX-POD, téléviseurs, réveils, etc.)
- Cooldown de chasse dynamique : après spray, ne peut pas chasser pendant 2 minutes, puis revient au cooldown normal pour la prochaine chasse

---

### Doppelganger

> Le Doppelganger est un esprit trompeur, souvent capable de tromper ses cibles prévues. Les enquêteurs rapportent se sentir seuls juste avant que le fantôme ne chasse.

| Propriété | Valeur |
|-----------|--------|
| ID | `doppelganger` |
| Preuves | Audio, UV, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s), facile à rompre la LOS |
| Portée (LOS) | Faible |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `los-low` |

**Traits spéciaux :**
- Retourne dans sa pièce favorite pour commencer la chasse depuis le milieu de celle-ci.
- C'est le seul fantôme qui doit obligatoirement chasser de sa pièce, contrairement aux autres qui peuvent chasser de leur pièce favorite ou d'autres pièces.

---

### Iblis

> L'Iblis est une entité puissante et énigmatique, enracinée dans l'antique lore et associée à la magie et au libre arbitre. Les enquêteurs rapportent voir le fantôme changer de forme, apparaissant plus "vivant".

| Propriété | Valeur |
|-----------|--------|
| ID | `iblis` |
| Preuves | Audio, Températures glaciales, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Moyenne (270 cm/s) |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `speed-fast` |

**Traits spéciaux :**
- Se métamorphose pendant les chasses. Ces changements sont uniquement cosmétiques, le modèle du fantôme reste le même selon la carte.

---

### Phantom

> Le Phantom est une entité sinistre née de l'obscurité pure, opérant en silence et dans les ombres. Les enquêteurs rapportent des interruptions fréquentes de fréquences radio, mais n'ont jamais vu le Phantom en forme complète, seulement dans les ombres.

| Propriété | Valeur |
|-----------|--------|
| ID | `phantom` |
| Preuves | Audio, Radiation, UV |
| Éteint bougies | Non (ne peut pas éteindre) |
| FLX-POD | Ne peut pas interagir |
| Lumières | On / Off |
| Radio | Off uniquement |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s) |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `flx-ignore`, `lights-on`, `lights-off`, `doors`, `radio-off`, `shadow-only`, `spray-normal` |

**Traits spéciaux :**
- Pas d'événements de manifestation. Seulement des événements d'ombre.
- Incapable d'allumer les radios, seulement de les éteindre.

---

### Poltergeist

> Le Poltergeist est une entité chaotique et espiègle, notoire pour sa présence perturbatrice. Les enquêteurs rapportent que ce fantôme prospère en manipulant l'environnement, jetant plus d'objets que tout autre esprit.

| Propriété | Valeur |
|-----------|--------|
| ID | `poltergeist` |
| Preuves | EMF 20+, Radiation, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Moyenne (270 cm/s) |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal` |

**Traits spéciaux :**
- Jette plus d'objets que les autres fantômes.
- Peut jeter au moins 3 objets en 1 minute.

---

### Revenant

> Le Revenant est une entité implacable et à haut risque, connue pour sa présence agressive. Les enquêteurs rapportent que se faire chasser par l'un d'eux ressemble à une suffocation littérale, rendant plus difficile la course-poursuite.

| Propriété | Valeur |
|-----------|--------|
| ID | `revenant` |
| Preuves | EMF 20+, UV, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s) |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal` |

**Traits spéciaux :**
- L'endurance se vide plus rapidement après avoir été ciblé pendant une chasse, jusqu'à la fin du contrat.
- L'endurance normale permet de sprinter pendant ~7 secondes. L'endurance affectée permet seulement ~4 secondes de sprint.

---

### Shura

> La Shura est un esprit maudit de rage pure, coincé entre les mondes, par un destin même que l'underworld rejette. Alimentée par la violence, les enquêteurs mettent en garde contre son agressivité, sa vitesse et ses yeux perçants.

| Propriété | Valeur |
|-----------|--------|
| ID | `shura` |
| Preuves | EMF 20+, Températures glaciales, Writing |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Court (40 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Rapide (310 cm/s), portée élevée |
| Portée (LOS) | Élevée |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `cooldown-short`, `speed-fast`, `los-fast`, `los-high` |

**Traits spéciaux :**
- L'un des fantômes les plus difficiles à éviter, avec une portée LOS élevée et une vitesse rapide, un cooldown de chasse court, et 3 secondes de désorientation avec l'eau bénite.

---

### Skia

> Le Skia est un esprit gardien. Célébré dans le lore comme protecteur de personnes, de lieux ou de legacies. Bien que non intrinsèquement dangereux, les enquêteurs rapportent des sons détressés et une activité inhabituelle sur la Spirit Box.

| Propriété | Valeur |
|-----------|--------|
| ID | `skia` |
| Preuves | Audio, EMF 20+, UV |
| Éteint bougies | Non (ne peut pas éteindre) |
| FLX-POD | Ne peut pas interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Long (90 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Rapide (310 cm/s) jusqu'à la cible, puis entre lent et normal (235 cm/s) à ~2m du joueur |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `flx-ignore`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `cooldown-long`, `speed-fast`, `los-variable` |

**Traits spéciaux :**
- Vitesse de chasse spécifique. Réponses audio uniques et non agressives.
- 33% de chance toutes les 5 secondes que le Skia fasse son bruit détressé/pleurs près d'un joueur pendant une chasse.

---

### Strigoi

> Le Strigoi est un esprit sans repos, non-mort, tiré des anciennes légendes et censé se relever de sa tombe pour tourmenter les vivants, surtout sous couverture de nuit. Les enquêteurs rapportent ne jamais voir un Strigoi en forme complète, et ressentir une panique accrue quand un Strigoi est proche.

| Propriété | Valeur |
|-----------|--------|
| ID | `strigoi` |
| Preuves | Températures glaciales, UV, Writing |
| Éteint bougies | Non (ne peut pas éteindre) |
| FLX-POD | Peut interagir |
| Lumières | On / Off |
| Radio | On uniquement |
| Portes | Ferme |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Moyenne (270 cm/s) |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `shadow-only`, `spray-normal`, `speed-fast` |

**Traits spéciaux :**
- Augmente activement le taux cardiaque quand dans la même pièce que le fantôme, pouvant mener à des chasses anticipées.
- Pas d'événements de manifestation. Seulement des événements d'ombre.

---

### Tantalus

> Le Tantalus est un esprit agressif attiré vers ceux qui ont rencontré la mort, se nourrissant du résidu émotionnel laissé derrière. Les enquêteurs rapportent ce fantôme comme étant plus silencieux que les autres, et mettent en garde contre l'eau bénite moins efficace.

| Propriété | Valeur |
|-----------|--------|
| ID | `tantalus` |
| Preuves | EMF 20+, Températures glaciales, UV |
| Éteint bougies | Oui (uniquement) |
| FLX-POD | Ne peut pas interagir |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ne ferme jamais |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Moyenne (270 cm/s) |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `flx-ignore`, `no-doors`, `lights-on`, `lights-off`, `radio-on`, `radio-off`, `spray-normal`, `speed-fast` |

**Traits spéciaux :**
- Ne fait jamais de mouvement de fermeture sur les portes (si une porte est ouverte, elle ne peut pas la fermer à moitié, mais si une porte est fermée, elle peut l'ouvrir à moitié)
- Ne ferme jamais les portes en force, sauf pendant une chasse

---

### Tariaksuq

> La Tariaksuq est une entité sombre et insaisissable liée à l'obscurité, la mort et l'invisible. Les enquêteurs la décrivent comme étant impartiale face à l'obscurité, souvent en train de manipuler toutes les sources de lumière qui osent l'exposer.

| Propriété | Valeur |
|-----------|--------|
| ID | `tariaksuq` |
| Preuves | Audio, EMF 20+, Températures glaciales |
| FLX-POD | Peut interagir |
| Lumières | Off uniquement |
| Eau bénite | Plus efficace (90 secondes) |
| Cooldown chasse | Dynamique (60 secondes si non pulvérisé, 90 secondes après pulvérisation) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s) |
| Tags | `extinguish`, `flx-interact`, `lights-off`, `doors`, `radio-on`, `radio-off`, `shadow-only`, `spray-90s` |

**Traits spéciaux :**
- Peut souffler jusqu'à 10 bougies d'affilée
- Éteint les lumières plus fréquemment
- Événements uniquement en ombre

---

### The Echo

> Le Echo est un esprit passif et résiduel. Les enquêteurs rapportent une atmosphère étrangement silencieuse, avec des lumières jamais affectées par ce fantôme.

| Propriété | Valeur |
|-----------|--------|
| ID | `the-echo` |
| Preuves | Températures glaciales, Radiation, UV |
| FLX-POD | Ne peut pas interagir |
| 🕯️ Bougies | Ne peut pas éteindre |
| 💡 Lumières | Ni On ni Off |
| 📻 Radio | Ni On ni Off |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Normale (250 cm/s) |
| Tags | `flx-ignore`, `lights-ignore`, `radio-ignore`, `spray-normal` |

**Traits spéciaux :**
- Ne peut pas interagir avec le disjoncteur principal (sauf après une chasse)

---

### The Forgotten

> Le Forgotten a une présence presque silencieuse. Passif, froid et insaisissable, comme s'il était à peine là. Les enquêteurs rapportent une activité minimale, aucun comportement défini, et un sentiment de sécurité - jusqu'à ce que Le Forgotten frappe.

| Propriété | Valeur |
|-----------|--------|
| ID | `the-forgotten` |
| Preuves | EMF 20+, Radiation, UV |
| FLX-POD | Ne peut pas interagir |
| 🕯️ Bougies | Éteindre uniquement |
| 💡 Lumières | On / Off |
| 📻 Radio | On / Off |
| Eau bénite | Normale (3 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Moyenne (270 cm/s) |
| Tags | `extinguish`, `flx-ignore`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `speed-fast` |

**Traits spéciaux :**
- Retarde la fourniture des preuves

---

### Wewe Gombel

> Le Wewe Gombel est un esprit vengeur et malveillant, enraciné dans le folklore comme une force impitoyable qui punit ceux qu'il juge digns. Les enquêteurs rapportent ce fantôme comme incroyablement rapide, considérant l'eau bénite comme une nécessité lors d'une rencontre.

| Propriété | Valeur |
|-----------|--------|
| ID | `wewe-gombel` |
| Preuves | EMF 20+, Températures glaciales, Radiation |
| FLX-POD | Peut interagir |
| 🕯️ Bougies | Éteindre uniquement |
| 💡 Lumières | Off uniquement |
| 📻 Radio | On / Off |
| Eau bénite | Très efficace (5 secondes) |
| Cooldown chasse | Court (40 secondes) |
| Vitesse de base | Normale (242 cm/s) |
| Vitesse (LOS) | Rapide (310 cm/s) |
| Tags | `extinguish`, `flx-interact`, `lights-off`, `doors`, `radio-on`, `radio-off`, `no-breaker`, `spray-more`, `cooldown-short`, `los-fast` |

**Traits spéciaux :**
- L'un des plus difficiles à fuir, avec une vitesse de chasse élevée et un cooldown court
- Ne peut pas interagir avec le disjoncteur principal (sauf après une chasse)

---

### Wisp

> Le Wisp est un esprit rapide, trompeur et séduisant, souvent dépeint dans le folklore comme une lumière guide qui mène les curieux vers leur perte. Les enquêteurs rapportent des lumières qui s'allument fréquemment, et se sentent trompés par les véritables intentions du Wisp. L'eau bénite semble garder le Wisp à distance.

| Propriété | Valeur |
|-----------|--------|
| ID | `wisp` |
| Preuves | Audio, Températures glaciales, Radiation |
| FLX-POD | Peut interagir |
| 🕯️ Bougies | Ne peut pas éteindre |
| 💡 Lumières | On uniquement |
| 📻 Radio | On / Off |
| Eau bénite | Très efficace (5 secondes) |
| Cooldown chasse | Dynamique (60 secondes ou 2 minutes après pulvérisation) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Moyenne (270 cm/s) |
| Tags | `candles-ignore`, `flx-interact`, `lights-on`, `doors`, `radio-on`, `radio-off`, `spray-more`, `speed-fast` |

**Traits spéciaux :**
- Allume les lumières significativement plus que les autres fantômes
- Le cooldown dynamique se réinitialise lors de la prochaine chasse (si non pulvérisé après la chasse 2, retour au cooldown normal pour la chasse 3)

---

### Wraith

> Le Wraith est une entité rapide et vengeresse, alimentée par une profonde tristesse et colère. Les enquêteurs les rapportent comme des entités incroyablement rapides, et se sentent ciblés. Vous voudrez avoir de l'eau bénite sous la main pour ce fantôme.

| Propriété | Valeur |
|-----------|--------|
| ID | `wraith` |
| Preuves | Audio, Températures glaciales, UV |
| FLX-POD | Peut interagir |
| 🕯️ Bougies | Éteindre uniquement |
| 💡 Lumières | On / Off |
| 📻 Radio | On / Off |
| Eau bénite | Très efficace (5 secondes) |
| Cooldown chasse | Normal (60 secondes) |
| Vitesse de base | Rapide (260 cm/s) |
| Vitesse (LOS) | Rapide (310 cm/s) |
| Portée (LOS) | Très élevée |
| Tags | `extinguish`, `flx-interact`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-more`, `speed-fast`, `los-fast`, `los-very-high` |

**Traits spéciaux :**
- Cible un joueur spécifique lors de la chasse
- Pas de pieds ni de bruits de pas pendant la chasse, difficile à suivre
- Si la cible principale est alive et à l'extérieur, le Wraith choisira une autre cible à l'intérieur
- Après la première chasse, ne montre plus ses pieds sur les manifests (comportement non intentionnel, sera retiré dans les mises à jour futures)

---

## Résumé par type de preuve

### Audio
- Banshee
- Doppelganger
- Iblis
- Phantom
- Skia
- Wisp
- Wraith

### EMF
- Banshee
- Poltergeist
- Revenant
- Shura
- Skia
- Tantalus
- Tariaksuq
- The Forgotten
- Wewe Gombel

### Radiation
- Banshee
- Bhoot
- Demon
- Phantom
- Poltergeist
- The Echo
- The Forgotten
- Wewe Gombel
- Wisp

### Thermal
- Bhoot
- Iblis
- Poltergeist
- Shura
- Strigoi
- Tantalus
- Tariaksuq
- The Echo
- Wisp
- Wraith

### UV
- Demon
- Doppelganger
- Phantom
- Poltergeist
- Revenant
- Shura
- Skia
- Strigoi
- Tantalus
- Wraith

### Writing
- Bhoot
- Demon
- Doppelganger
- Iblis
- Poltergeist
- Revenant
- Shura
- Strigoi

---

*Généré automatiquement depuis [`js/config/ghosts.js`](js/config/ghosts.js)*
