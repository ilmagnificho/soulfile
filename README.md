# THE SAJA ARCHIVES

> A cyber-shamanism web app that disrupts the spiritual tech market by combining Korean mythology with Matrix-inspired aesthetics.

## 🎯 Concept

**THE SAJA** (The Grim Reaper) is a fortune-telling web app that mimics a "Secret Database of the Netherworld" managed by modern Korean Grim Reapers. Targeting US Gen Z with K-Pop/Anime aesthetics, it offers a unique blend of traditional shamanism and cyberpunk design.

### Core Features

- 🔮 **Soul Scanning** - Enter birth data to access your fate file
- 🔥 **Element Calculation** - Based on Five Elements (Wu Xing) system
- 🎫 **Holographic Karma Card** - Database-style identity display
- 📿 **Digital Pujeok** - CSS-based traditional Korean talisman
- 💰 **Premium Content** - Monetization via encrypted warnings ($4.99)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Geist Mono (monospaced)
- **Payment**: Lemon Squeezy (ready for integration)

## 🎨 Design System

### Color Palette
- **Absolute Black** (`#000000`)
- **Talisman Red** (`#dc2626`)
- **Dark Metal** (`#27272a`)

### Typography
Monospaced fonts throughout for terminal/database aesthetic

### Visual Effects
- Glitch animations
- Scanning overlays
- Pulsing status indicators
- Border glow effects

## 📁 Project Structure

```
the-saja/
├── app/
│   ├── layout.tsx          # Root layout with dark mode
│   ├── page.tsx            # Landing page ("Access Terminal")
│   ├── globals.css         # Custom Saja theme styles
│   └── report/
│       └── page.tsx        # Results page ("Soul File")
├── components/
│   └── saja-ui/
│       ├── SoulScanner.tsx # Animated input form
│       ├── KarmaCard.tsx   # Holographic result display
│       └── Talisman.tsx    # Digital Korean talisman
└── lib/
    └── elements.ts         # Element calculation logic
```

## 🏃‍♂️ Getting Started

### Installation

```bash
cd the-saja
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Element Calculation

The app calculates your element based on birth year using the Five Elements system:

| Last Digit | Element | Color | Traits |
|------------|---------|-------|--------|
| 0-1 | Metal | Silver | Resilient, Ambitious, Disciplined |
| 2-3 | Water | Blue | Intuitive, Flexible, Wise |
| 4-5 | Wood | Green | Creative, Compassionate, Generous |
| 6-7 | Fire | Red | Energetic, Leader, Charismatic |
| 8-9 | Earth | Amber | Practical, Reliable, Patient |

## 💳 Monetization Strategy

The app uses a **freemium model**:

- **Free**: Basic element calculation and karma card
- **Premium ($4.99)**: 
  - Critical danger period warnings for 2026
  - Lucky/unlucky dates
  - Protective measures recommendations
  - Personalized insights

Payment integration via **Lemon Squeezy** (ready to implement).

## 🎭 Design Philosophy

### Cyber-Shamanism
Blending *The Matrix* with traditional Korean exorcism aesthetics to create a unique spiritual tech experience.

### Tone & Voice
- **Authoritative**: "Identity Verification Required"
- **Protective**: "Warning: Bad Karma detected"
- **Cold but Caring**: Like a system administrator who wants to help

### Target Audience
US Gen Z who:
- Love K-Pop/K-Drama/Anime aesthetics
- Are interested in spirituality/astrology
- Appreciate premium design and unique experiences

## 📝 License

This project is private and proprietary.

## 🔮 Future Roadmap

- [ ] Lemon Squeezy payment integration
- [ ] User authentication and data persistence
- [ ] Downloadable personalized talismans
- [ ] Social sharing features
- [ ] Multi-language support (Korean/English)
- [ ] Extended fortune analysis
- [ ] Compatibility readings
- [ ] Yearly predictions

---

**Built with 🔥 by a Creative Technologist disrupting the spiritual tech market.**
