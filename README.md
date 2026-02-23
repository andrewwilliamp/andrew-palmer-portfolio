# Andrew Palmer - Portfolio Website

A professional portfolio website showcasing education, experience, and technical skills. Built with React, TypeScript, Tailwind CSS, and Vite for optimal performance.

## Features

- **Responsive Design**: Mobile-first approach with smooth interactions
- **Modern Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **AI Chat Widget**: Floating chat assistant powered by Google Gemini API for answering questions about Andrew's background
- **Clean Architecture**: Modular components with clear separation of concerns
- **Professional Styling**: Custom Tailwind configuration with consistent branding
- **Fast Performance**: Optimized build with Vite for quick load times

## Project Structure

```
src/
├── components/          # React components
│   ├── App.tsx         # Main application component
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section with intro
│   ├── About.tsx       # About section
│   ├── Experience.tsx  # Work experience section
│   ├── Education.tsx   # Education section
│   ├── Skills.tsx      # Skills section
│   ├── ChatWidget.tsx  # Floating AI chat assistant
│   └── Footer.tsx      # Footer with contact info
├── data.ts             # Centralized data (experiences, education, skills)
├── index.css           # Global styles with Tailwind
└── main.tsx            # React entry point

Configuration Files:
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── postcss.config.js   # PostCSS configuration
├── .env.local          # Environment variables (Gemini API key)
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```Environment Setup

Create a `.env.local` file in the root directory with your Google Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Get your free API key at [Google AI Studio](https://makersuite.google.com/app/apikey).

### 

### Development

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

### Build

```bash
npm run build
```AI Chat Widget

The portfolio includes an intelligent chat widget powered by Google's Gemini API. Visitors can:

- Click the floating 💬 button in the bottom right corner
- Ask questions about Andrew's background, experience, skills, and education
- Receive AI-generated responses based on resume data
- Enjoy a seamless conversational interface

The chat assistant:
- Speaks in 3rd person about Andrew
- Only answers questions related to professional background
- Provides concise, well-formatted responses
- Automatically manages conversation history

## 

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

- **Google Generative AI** - AI-powered chat assistant (Gemini API)
### Update Personal Information

Edit [src/data.ts](src/data.ts) to update:
- Work experience and descriptions
- Education history and coursework
- Skills and categories
- Contact information

### Styling

Global styles are defined in [src/index.css](src/index.css) using Tailwind CSS utilities. Modify [tailwind.config.ts](tailwind.config.ts) to customize the color scheme and theme.

### Add New Sections

1. Create a new component in `src/components/`
2. Import and add it to [src/components/App.tsx](src/components/App.tsx)
3. Add navigation link in [src/components/Header.tsx](src/components/Header.tsx)

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Deployment

This site is ready for deployment to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project and upload the `dist/` directory to your hosting platform.

## License

This project is open source and available under the MIT License.
