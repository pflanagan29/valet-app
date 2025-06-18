# Valet App Frontend

The frontend application for the Valet App, built with Next.js.

## 🛠 Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- ESLint

## 📁 Project Structure

```
src/
├── app/             # App Router pages and layouts
├── components/      # Reusable React components
├── lib/            # Utility functions and shared logic
└── styles/         # Global styles and Tailwind config
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000  # FastAPI backend URL
```

## 📚 Key Features

- Dashboard with real-time statistics
- Active vehicle management
- User settings and preferences
- Customizable parking lot configuration
