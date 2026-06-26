# Trello Clone

## Stack
- Frontend: React + Vite, Tailwind CSS
- Backend: Node.js + Express
- DB: PostgreSQL with Prisma ORM
- Auth: JWT + bcrypt
- Real-time: Socket.io

## Commands
- `npm run dev` starts the frontend
- `npm run server` starts the backend
- `npx prisma migrate dev` runs migrations
- `npx prisma studio` opens DB GUI

## Rules
- Always use async/await, never callbacks
- All API routes must use the JWT middleware
- Keep controllers thin, logic in service files