# Skyret

Skyret is a full-stack e-commerce project with a Node.js/Express backend and a React/Vite frontend.

## Repository Layout

- `backend/` - Express API, MongoDB models, routers, and uploads
- `frontend/` - React app built with Vite

## Prerequisites

- Node.js 18 or newer
- MongoDB connection string

## Environment Variables

Backend: create `backend/.env`

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Frontend: create `frontend/.env`

```env
VITE_API_URL=http://localhost:3000/api
```

## Install

Install dependencies in both folders:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

## Useful Scripts

Backend:

- `npm run dev` - start the API with nodemon
- `npm start` - start the API with Node.js

Frontend:

- `npm run dev` - start Vite dev server
- `npm run build` - build production assets
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

## Notes

- The backend serves uploaded files from `/uploads`.
- The frontend points to the API through `VITE_API_URL`.