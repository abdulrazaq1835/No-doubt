# NoDoubt App

A full-stack web application that fetches posts from JSONPlaceholder API, stores them in MongoDB, and displays them with a real-time WebSocket search feature.

## Live URLs

- Frontend: https://no-doubt.vercel.app
- Backend: https://no-doubt.onrender.com

## Tech Stack

- Frontend: React.js + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- WebSocket: ws
- External API: JSONPlaceholder

## How to Run Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your MONGO_URI in .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

## Api endpoints

## Note

WebSocket is deployed on Render as Vercel does not support persistent WebSocket connections.