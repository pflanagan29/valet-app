# Valet App

A modern valet parking management system built with Next.js and FastAPI.

## 🚗 Features

- Real-time vehicle tracking
- Dashboard with daily statistics
- Active vehicle management
- Customizable parking lot locations
- User authentication and management

## 📁 Project Structure

```
valet-app/
├── web/            # Next.js frontend
├── api/            # FastAPI backend
├── tasks/          # Development task files
└── .env.example    # Environment variables template
```

## 🛠 Tech Stack

### Frontend (`/web`)
- Next.js with App Router
- TypeScript
- Tailwind CSS
- ESLint

### Backend (`/api`)
- FastAPI
- UV package manager
- PostgreSQL

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/valet-app.git
   cd valet-app
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Follow the setup instructions in:
   - Frontend: [web/README.md](web/README.md)
   - Backend: [api/README.md](api/README.md)

## 📝 Development

- Frontend development server: `cd web && npm run dev`
- Backend development server: `cd api && uvicorn app.main:app --reload`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 