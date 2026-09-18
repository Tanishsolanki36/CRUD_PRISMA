# Replacing In-Memory CRUD with Prisma — Starter

Prisma is **already connected** to this Express + React app (schema, migration, and
`PrismaClient` singleton are in place). But the four route handlers in
`server/routes/threads.js` **still use an in-memory array** — restart the server and
every thread disappears.

**Your task:** replace all four handlers with real **Prisma queries** so the data lives
in PostgreSQL — **without changing a single line of the React frontend.**

## Prerequisites
- Node.js 18+
- A local **PostgreSQL** server running

## Setup
```bash
npm run setup

# server env
cp server/.env.example server/.env         # then set a real DATABASE_URL
createdb threadbase                         # create the database

# apply the shipped migration + generate the client
cd server && npx prisma migrate dev && cd ..

# client env
cp client/.env.development.example client/.env.development
```

## What you implement — only `server/routes/threads.js`
| Route | Replace with |
|---|---|
| `GET /api/threads` | `await prisma.thread.findMany()` |
| `POST /api/threads` | `await prisma.thread.create({ data: { title, body } })` → 201 |
| `PUT /api/threads/:id` | `await prisma.thread.update({ where: { id: parseInt(id) }, data })` |
| `DELETE /api/threads/:id` | `await prisma.thread.delete({ where: { id: parseInt(id) } })` → 200 |

For **every** handler: make it `async`, `await` the Prisma call, wrap it in `try/catch`
(call `next(error)`), `parseInt` the id in write routes, and pass an **explicit** `data`
object — never `data: req.body`. When you're done, nothing should reference the old
`threads` array.

## Run
```bash
npm run dev     # server :3001, client :5173
```

## Success looks like
- Create a thread in the React app → it appears in the list.
- **Restart the server**, refresh → the thread is **still there** (it's in PostgreSQL now).
- `psql threadbase -c 'SELECT * FROM "Thread";'` shows the same row.

> **Never commit `.env`.** It holds your database password. `.gitignore` already excludes it.
