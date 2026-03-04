# server_lca

Backend API server for the Living Companion App, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 📦 Tech Stack

- **Runtime**: Node.js + TypeScript (tsx)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (access + refresh tokens)
- **Validation**: Zod
- **Docs**: Swagger UI (`/api-docs`)
- **Migrations**: ts-migrate-mongoose
- **Seeding**: Custom seed scripts

---

## 🚀 Getting Started (First time setup)

### 1. Clone the project

```bash
git clone <repo-url>
cd server_lca
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/living_companion_app
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

### 4. Run database migrations

Apply all schema migrations to your local database:

```bash
npm run migrate:up
```

### 5. (Optional) Seed sample data

Populate the database with sample data for development:

```bash
npm run db:seed
```

> ⚠️ **Warning**: This will **clear all existing data** and replace it with seed data.

### 6. Start the development server

```bash
npm run dev
```

The server will be running at `http://localhost:3001`.  
Swagger docs: `http://localhost:3001/api-docs`

---

## 📋 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled production build |
| `npm run db:seed` | Seed the database with sample data |
| `npm run migrate:up` | Apply all pending migrations |
| `npm run migrate:down <name>` | Rollback migration by name |
| `npm run migrate:create <name>` | Create a new migration file |
| `npm run migrate:status` | List all migrations and their status |

---

## 🗄️ Database Migrations

Migrations are managed by [`ts-migrate-mongoose`](https://github.com/ilovepixelart/ts-migrate-mongoose).  
Migration state is stored in the `migrations` collection in MongoDB.

### After `git pull`

Whenever you pull new code, run this to sync your database schema:

```bash
git pull
npm install        # if there are new dependencies
npm run migrate:up # apply any new migrations
```

The tool automatically detects which migrations have already run on your machine and only applies new ones.

### Workflow for adding/changing a schema field

**Step 1** – Create a new migration file:

```bash
npm run migrate:create <descriptive-name>
# Example:
npm run migrate:create add-timezone-to-user
```

**Step 2** – Implement the migration logic in `migrations/<timestamp>-<name>.ts`:

```typescript
import type { Connection } from 'mongoose';

export async function up(connection: Connection): Promise<void> {
  // Apply changes to existing data
  const users = connection.collection('users');
  await users.updateMany(
    { timezone: { $exists: false } },
    { $set: { timezone: 'UTC' } }
  );
}

export async function down(connection: Connection): Promise<void> {
  // Rollback changes (always implement this!)
  const users = connection.collection('users');
  await users.updateMany({}, { $unset: { timezone: '' } });
}
```

**Step 3** – Update the Mongoose model (`.model.ts`) to reflect the schema change.

**Step 4** – Run the migration:

```bash
npm run migrate:up
```

**Step 5** – Commit both the migration file and model changes together:

```bash
git add migrations/ src/models/
git commit -m "feat: add timezone field to user schema"
```

### Rolling back a migration

```bash
npm run migrate:down <migration-name>
# Example:
npm run migrate:down add-timezone-to-user
```

---

## 📁 Project Structure

```
src/
├── config/          # Database and Swagger configuration
├── controllers/     # Request handlers (per feature)
├── docs/            # Swagger documentation
├── middlewares/     # Auth, error handling, etc.
├── models/          # Mongoose schemas and models
├── routers/         # Express route definitions
├── seeds/           # Database seed scripts
├── services/        # Business logic (per feature)
├── types/           # TypeScript type definitions
├── utils/           # Shared utilities
├── validations/     # Zod request validators
└── index.ts         # App entry point

migrations/          # Database migration files
migrate.ts           # Migration tool configuration
```

---

## 🔑 API Overview

All API routes are prefixed with `/api`. Full interactive docs available at `/api-docs`.

| Resource | Base Path |
|---|---|
| Auth | `/api/auth` |
| Users | `/api/users` |
| Tasks | `/api/tasks` |
| Habits | `/api/habits` |
| Transactions | `/api/transactions` |
