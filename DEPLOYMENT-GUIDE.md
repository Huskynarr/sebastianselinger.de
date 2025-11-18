# Deployment Guide - Moderne Next.js Portfolio Website

## Übersicht

Die neue Portfolio-Website wurde mit folgenden modernen Technologien erstellt:

- **Next.js 14** - React Framework mit App Router
- **TypeScript** - Type-sicherer Code
- **Tailwind CSS** - Utility-first CSS Framework
- **Framer Motion** - Animation Library
- **React Icons** - Icon Library

## Projektstruktur

```
nextjs-portfolio/
├── app/
│   ├── layout.tsx          # Root Layout mit Navigation
│   ├── page.tsx             # Homepage mit allen Sektionen
│   └── globals.css          # Globale Styles mit Tailwind
├── components/
│   ├── Navigation.tsx       # Moderne Navigation mit Sticky Header
│   ├── Hero.tsx            # Hero-Sektion mit Animation
│   ├── About.tsx           # Über mich Sektion
│   ├── Experience.tsx      # Berufserfahrung
│   ├── Services.tsx        # Angebotene Services
│   ├── Skills.tsx          # Technologie-Stack
│   ├── Portfolio.tsx       # Projekt-Portfolio
│   ├── Dissertations.tsx   # NEU: Dissertation & Forschung
│   ├── Certifications.tsx  # NEU: Professionelle Zertifikate
│   └── Contact.tsx         # Kontaktformular
├── public/
│   └── CNAME               # Domain für GitHub Pages
├── next.config.js          # Next.js Konfiguration für statischen Export
├── tailwind.config.js      # Tailwind Konfiguration
└── postcss.config.mjs      # PostCSS Konfiguration

```

## Neue Features

### 1. **Dissertationen-Sektion**
- Akademische Arbeiten und Forschungsbeiträge
- Details zu Forschungsthemen
- Status-Anzeige (Abgeschlossen/In Arbeit)
- PDF-Download-Links
- Forschungsinteressen

### 2. **Zertifizierungen-Sektion**
- Professionelle Zertifikate
- Von LinkedIn Learning, Google, EASA, etc.
- Credential IDs für Verifizierung
- Badges für Themengebiete
- Verifizierungs-Links

### 3. **Modernes Design**
- Glassmorphism-Effekte
- Gradient-Animationen
- Responsive Design
- Dark Theme mit Purple/Pink-Akzenten
- Smooth Scrolling
- Hover-Animationen

## Installation & Deployment

### Lokale Entwicklung

\`\`\`bash
cd nextjs-portfolio
npm install
npm run dev
\`\`\`

Website läuft auf: http://localhost:3000

### Production Build

\`\`\`bash
npm run build
\`\`\`

Dies erstellt einen statischen Export im `out/` Ordner.

### Deployment auf GitHub Pages

#### Option 1: GitHub Actions (Empfohlen)

1. Repository auf GitHub erstellen
2. Code pushen
3. In GitHub Settings → Pages → Source auf "GitHub Actions" stellen
4. Der Workflow in `.github/workflows/nextjs.yml` wird automatisch ausgeführt

#### Option 2: Manuelles Deployment

\`\`\`bash
npm run build
# out/ Ordner auf GitHub Pages deployen
\`\`\`

## Anpassung

### Persönliche Daten

Alle Komponenten in `/components` können direkt bearbeitet werden:

- **Hero.tsx**: Name, Titel, Social Links
- **About.tsx**: Beschreibungstext, Skills
- **Experience.tsx**: Arbeitserfahrung
- **Services.tsx**: Angebotene Services
- **Portfolio.tsx**: Projekte
- **Dissertations.tsx**: Akademische Arbeiten (NEU)
- **Certifications.tsx**: Zertifikate (NEU)
- **Contact.tsx**: Formspree-URL anpassen

### Styling

- **Farben**: In `app/globals.css` ändern
- **Tailwind-Config**: `tailwind.config.js`
- **Layout**: `app/layout.tsx`

### Formular

Das Kontaktformular verwendet [Formspree](https://formspree.io/). 
URL in `components/Contact.tsx` anpassen:

\`\`\`typescript
const response = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
  // ...
});
\`\`\`

## Wichtige Hinweise

### Tailwind CSS Installation

Falls Tailwind nicht korrekt installiert wird:

\`\`\`bash
rm -rf node_modules package-lock.json
npm install
npm install -D tailwindcss@3.4.1 postcss autoprefixer
\`\`\`

### Next.js Version

Empfohlen: Next.js 14.2.x (stabil)
- Vermeiden: Next.js 16.x (hat Build-Probleme mit Turbopack)

### Statischer Export

Die `next.config.js` ist bereits konfiguriert für:
```javascript
output: 'export',
images: { unoptimized: true },
```

Dies ermöglicht statisches Hosting auf GitHub Pages.

## SEO & Meta Tags

Alle SEO-relevanten Meta Tags sind in `app/layout.tsx` konfiguriert:
- Open Graph Tags
- Twitter Card
- Structured Data
- Canonical URLs

## Performance

- Lazy Loading von Bildern
- Code Splitting durch Next.js
- Optimierte CSS mit Tailwind
- Minimales JavaScript
- Static Generation

## Browser-Kompatibilität

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Browser

## Support

Bei Fragen oder Problemen:
1. Next.js Dokumentation: https://nextjs.org/docs
2. Tailwind CSS Dokumentation: https://tailwindcss.com/docs
3. GitHub Issues im Repository

---

**Entwickelt mit ❤️ für Sebastian Selinger**
