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

## Hosting

The recommended production setup is:

- MongoDB Atlas for the database
- Render for the backend API
- Vercel for the frontend

### MongoDB Atlas

1. Create a free cluster in MongoDB Atlas.
2. Add a database user.
3. Allow network access for your host.
4. Copy the connection string and set it as `MONGO_URI` on Render.

Use this format for Skyret:

```env
MONGO_URI=mongodb+srv://tradeconnect_user:<db_password>@cluster0.h2ryakl.mongodb.net/skyret_db?retryWrites=true&w=majority&appName=Cluster0
```

Replace `<db_password>` with the real password for `tradeconnect_user`.

### Render backend

Use the `backend/` folder as the Render root directory.

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Environment variables on Render:

```env
MONGO_URI=mongodb+srv://tradeconnect_user:<db_password>@cluster0.h2ryakl.mongodb.net/skyret_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret
GMAIL=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
CORS_ORIGIN=https://your-frontend.vercel.app
```

Render provides `PORT` automatically.

### Seed the admin user

The hosted Atlas database must contain an admin user before you can log in as admin.

Run this once against the same Atlas `MONGO_URI`:

```bash
cd backend
npm run seed:admin
```

Default admin credentials created by the seed script:

```text
Email: admin@gmail.com
Password: admin123
```

If the admin user already exists, the script will skip creating it.

### Vercel frontend

Use the `frontend/` folder as the Vercel root directory.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Environment variables on Vercel:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

The frontend already falls back to `/api` locally, so local development still works.

Production environment variables:

```env
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GMAIL=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

For a single-host deployment, build the frontend and start the backend:

```bash
cd frontend
npm install
npm run build

cd ../backend
npm install
npm start
```

If you host the frontend separately, set `VITE_API_URL` to the deployed backend URL.