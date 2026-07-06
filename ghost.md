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

| Propriété | Valeur |
|-----------|--------|
| ID | `banshee` |
| Preuves | Audio, EMF, Radiation |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal` |

---

### Bhoot

| Propriété | Valeur |
|-----------|--------|
| ID | `bhoot` |
| Preuves | Thermal, Radiation, Writing |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Long |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `cooldown-long` |

---

### Demon

| Propriété | Valeur |
|-----------|--------|
| ID | `demon` |
| Preuves | Radiation, UV, Writing |
| Éteint bougies | Oui |
| Lumières | Off uniquement |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Plus efficace |
| Cooldown chasse | Court |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Lente |
| Portée (LOS) | Faible |
| Tags | `extinguish`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-more`, `cooldown-short`, `speed-fast`, `los-slow`, `los-low` |

---

### Doppelganger

| Propriété | Valeur |
|-----------|--------|
| ID | `doppelganger` |
| Preuves | Audio, UV, Writing |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Faible |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `los-low` |

---

### Iblis

| Propriété | Valeur |
|-----------|--------|
| ID | `iblis` |
| Preuves | Audio, Thermal, Writing |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `speed-fast` |

---

### Phantom

| Propriété | Valeur |
|-----------|--------|
| ID | `phantom` |
| Preuves | Audio, Radiation, UV |
| Éteint bougies | Non |
| Lumières | On / Off |
| Radio | Off uniquement |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `flx-ignore`, `lights-on`, `lights-off`, `doors`, `radio-off`, `shadow-only`, `spray-normal` |

---

### Poltergeist

| Propriété | Valeur |
|-----------|--------|
| ID | `poltergeist` |
| Preuves | EMF, Radiation, Writing |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Moyenne |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal` |

---

### Revenant

| Propriété | Valeur |
|-----------|--------|
| ID | `revenant` |
| Preuves | EMF, UV, Writing |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal` |

---

### Shura

| Propriété | Valeur |
|-----------|--------|
| ID | `shura` |
| Preuves | EMF, Thermal, Writing |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Court |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Rapide |
| Portée (LOS) | Élevée |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `cooldown-short`, `speed-fast`, `los-fast`, `los-high` |

---

### Skia

| Propriété | Valeur |
|-----------|--------|
| ID | `skia` |
| Preuves | Audio, EMF, UV |
| Éteint bougies | Non |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Long |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Variable |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `flx-ignore`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `cooldown-long`, `speed-fast`, `los-variable` |

---

### Strigoi

| Propriété | Valeur |
|-----------|--------|
| ID | `strigoi` |
| Preuves | Thermal, UV, Writing |
| Éteint bougies | Non |
| Lumières | On / Off |
| Radio | On uniquement |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Moyenne |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `lights-on`, `lights-off`, `doors`, `radio-on`, `shadow-only`, `spray-normal`, `speed-fast` |

---

### Tantalus

| Propriété | Valeur |
|-----------|--------|
| ID | `tantalus` |
| Preuves | EMF, Thermal, UV |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ne ferme jamais |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Moyenne |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `flx-ignore`, `no-doors`, `lights-on`, `lights-off`, `radio-on`, `radio-off`, `spray-normal`, `speed-fast` |

---

### Tariaksuq

| Propriété | Valeur |
|-----------|--------|
| ID | `tariaksuq` |
| Preuves | Audio, EMF, Thermal |
| Éteint bougies | Oui |
| Lumières | Off uniquement |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Plus efficace (90s) |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-off`, `doors`, `radio-on`, `radio-off`, `shadow-only`, `spray-normal`, `spray-90s` |

---

### The Echo

| Propriété | Valeur |
|-----------|--------|
| ID | `the-echo` |
| Preuves | Thermal, Radiation, UV |
| Éteint bougies | Non |
| Lumières | Ignore |
| Radio | Ignore |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Normale |
| Vitesse (LOS) | Normale |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `lights-ignore`, `radio-ignore`, `flx-ignore`, `doors`, `no-breaker`, `spray-normal` |

---

### The Forgotten

| Propriété | Valeur |
|-----------|--------|
| ID | `the-forgotten` |
| Preuves | EMF, Radiation, UV |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Normale |
| Cooldown chasse | Normal |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Moyenne |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `flx-ignore`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-normal`, `speed-fast` |

---

### Wewe Gombel

| Propriété | Valeur |
|-----------|--------|
| ID | `wewe-gombel` |
| Preuves | EMF, Thermal, Radiation |
| Éteint bougies | Oui |
| Lumières | Off uniquement |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Plus efficace |
| Cooldown chasse | Court |
| Vitesse de base | Normale |
| Vitesse (LOS) | Rapide |
| Portée (LOS) | Normale |
| Tags | `extinguish`, `lights-off`, `doors`, `radio-on`, `radio-off`, `no-breaker`, `spray-more`, `cooldown-short`, `los-fast` |

---

### Wisp

| Propriété | Valeur |
|-----------|--------|
| ID | `wisp` |
| Preuves | Audio, Thermal, Radiation |
| Éteint bougies | Non |
| Lumières | On uniquement |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Plus efficace (à 2m) |
| Cooldown chasse | Normal |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Moyenne |
| Portée (LOS) | Normale |
| Tags | `candles-ignore`, `lights-on`, `doors`, `radio-on`, `radio-off`, `spray-more`, `spray-2m`, `speed-fast` |

---

### Wraith

| Propriété | Valeur |
|-----------|--------|
| ID | `wraith` |
| Preuves | Audio, Thermal, UV |
| Éteint bougies | Oui |
| Lumières | On / Off |
| Radio | On / Off |
| Portes | Ferme |
| Eau bénite | Plus efficace |
| Cooldown chasse | Normal |
| Vitesse de base | Rapide |
| Vitesse (LOS) | Rapide |
| Portée (LOS) | Très élevée |
| Tags | `extinguish`, `lights-on`, `lights-off`, `doors`, `radio-on`, `radio-off`, `spray-more`, `speed-fast`, `los-fast`, `los-very-high` |

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
