# TOS Cheat Sheet - Ghost Investigation Assistant

Interactive cheat-sheet for **The Other Side** game - a ghost investigation assistance tool with multi-level evidence tracking, behavior timeline, and dynamic ghost confidence ranking.

## Features

- **Multi-level evidence tracking** - Track evidence with exact levels (1-4) per type
- **Behavior timeline** - Record ghost behaviors with temporal visualization
- **Dynamic ghost filtering** - Real-time ghost elimination based on collected evidence
- **Confidence ranking** - Dynamic ghost probability ranking based on evidence
- **3 themes** - Dark, Light, and Midnight themes
- **Offline capable** - Works without internet connection
- **Data persistence** - Save/restore investigation state

## Installation

### Option 1: GitHub Pages (Recommended)

1. Fork or clone this repository
2. Go to Settings -> Pages
3. Set Source to `main` branch / `/ (root)`
4. Your site will be available at `https://<username>.github.io/tos-cheat-sheet`

### Option 2: Local Usage

Simply open `index.html` in your browser. No server required.

```bash
# Clone the repository
git clone https://github.com/<username>/tos-cheat-sheet.git

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html  # Linux
```

## Usage

### Starting an Investigation

1. Click **START** button in the header
2. Timer begins and evidence tiles become active
3. Click evidence levels as you collect data
4. Click behavior buttons to record ghost actions
5. Ghost cards update in real-time
6. Right-click ghost cards to eliminate them

### Evidence Levels

| Type | Level 1 | Level 2 | Level 3 | Level 4 |
|------|---------|---------|---------|---------|
| **EMF** | 1.5-2.49 mG | 2.55-9.99 mG | 10-19.99 mG | 20+ mG |
| **Radiation** | 100-500 CPM | 501-1000 CPM | 1001-2000 CPM | - |
| **Thermal** | 0.5 to 4.5°C | 0.0 to -9.5°C | -13.3 to -10.0°C | -20.5 to -13.9°C |
| **UV** | Faint traces | Moderate residues | Clear patterns | - |
| **Writing** | Incomprehensible | Symbolic | Hostile | - |
| **Audio** | Unintelligible | Single word | Intelligible phrase | - |

### Behavior Tracking

- **Lights** - Track light ON/OFF events
- **Radio** - Track radio ON/OFF events
- **Candle** - Track candle lit/extinguished
- **Doors** - Track door closures
- **Hunt** - Record hunt start/end times
- **Spray** - Record holy water/spray usage
- **FLX-POD** - Track FLX-POD activation
- **Breaker** - Track breaker box manipulation

## Project Structure

```
TOS_CheatSheet/
├── index.html              # Main page (structure only)
├── README.md               # This file
├── CONTEXT.md              # Architecture documentation
├── css/
│   ├── main.css            # Base styles, CSS variables
│   ├── themes.css          # Theme overrides
│   ├── layout.css          # Layout structure
│   ├── components.css      # Component styles
│   └── timeline.css        # Timeline styles
├── js/
│   ├── config/
│   │   ├── ghosts.js       # Ghost database
│   │   ├── evidence.js     # Evidence configuration
│   │   └── behaviors.js    # Behavior configuration
│   ├── core/
│   │   ├── eventLogger.js  # Event recording
│   │   ├── evidenceTracker.js  # Evidence filtering
│   │   ├── behaviorTracker.js    # Behavior tracking
│   │   └── confidence.js         # Confidence scoring
│   ├── ui/
│   │   ├── evidenceUI.js   # Evidence interface
│   │   ├── behaviorUI.js   # Behavior interface
│   │   ├── timelineUI.js   # Timeline/graph interface
│   │   ├── ghostUI.js      # Ghost cards interface
│   │   ├── ghostRankingUI.js   # Ghost ranking interface
│   │   └── themeUI.js      # Theme management
│   ├── storage/
│   │   └── localStorage.js # Data persistence
│   ├── utils/
│   │   └── formatter.js    # Formatting utilities
│   └── app.js              # Main application
└── .github/
    └── workflows/
        └── github-pages.yml # CI/CD deployment
```

## Adding New Ghosts

Edit `js/config/ghosts.js` and add a new ghost object:

```javascript
{
    id: "ghost-name",
    name: "Ghost Name",
    evidence: {
        types: ["emf", "thermal", "uv"],
        possibleLevels: {
            emf: { min: 1, max: 4 },
            thermal: { min: 1, max: 4 },
            uv: { min: 1, max: 3 }
        }
    },
    behaviors: {
        extinguishCandles: true,
        lightsBehavior: ["on", "off"],
        radioBehavior: ["on", "off"],
        doorsBehavior: ["closes"],
        holyWaterEffectiveness: "normal",
        huntCooldown: "normal",
        baseSpeed: "normal",
        losSpeed: "normal",
        losRange: "normal"
    },
    tags: ["extinguish", "lights-on", "lights-off", "doors", "radio-on", "radio-off", "spray-normal"],
    lore: "",
    desc: []
}
```

## Adding New Evidence Types

Edit `js/config/evidence.js`:

```javascript
newEvidence: {
    id: 'new-evidence',
    name: 'New Evidence',
    color: '#ff0000',
    levels: [
        { level: 1, value: 'Value 1', description: 'Description 1' },
        { level: 2, value: 'Value 2', description: 'Description 2' }
    ],
    maxLevel: 2
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Ghost data based on The Other Side game wiki
- Inspired by [TOS Cleanse Assistant](https://p8riot.github.io/tos-cleanse-assistant/cleanse.html) by p8riot
- Built with ❤️ for the TOS community

## Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

*Last updated: 2026-07-02*
*Version: 1.0.0*
