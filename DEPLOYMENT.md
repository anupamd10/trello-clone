# Deployment Checklist

## Railway (Backend)

### One-time setup
- [ ] Create a new Railway project
- [ ] Add a **PostgreSQL** plugin — Railway auto-sets `DATABASE_URL`
- [ ] Connect your GitHub repo; set **Root Directory** to `server/`
- [ ] Railway will use `server/railway.toml` automatically

### Environment variables to set in Railway dashboard
| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | a random string, min 32 chars (use `openssl rand -base64 32`) |
| `CLIENT_URL` | your Vercel URL, e.g. `https://your-app.vercel.app` |
| `DATABASE_URL` | auto-provided by the Railway Postgres plugin |
| `PORT` | leave unset — Railway injects this automatically |

### Verify
- [ ] Deploy succeeds and logs show `Server running on port ...`
- [ ] Prisma migrations ran without errors (check deploy logs)
- [ ] Note your Railway public URL (e.g. `https://your-api.up.railway.app`)

---

## Vercel (Frontend)

### One-time setup
- [ ] Import your GitHub repo in Vercel
- [ ] Vercel will detect `vercel.json` at the root and use it

### Environment variables to set in Vercel dashboard
| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://your-api.up.railway.app/api` |
| `VITE_SOCKET_URL` | `https://your-api.up.railway.app` |

### Verify
- [ ] Build succeeds (`cd client && npm install && npm run build`)
- [ ] Opening the app URL loads the login page
- [ ] Navigating directly to `/boards` (or any deep link) still loads the app (SPA routing)

---

## End-to-end smoke test
- [ ] Register a new user
- [ ] Log in
- [ ] Create a board
- [ ] Add a list and a card
- [ ] Open the same board in two browser tabs — confirm card/list changes appear in real time (Socket.io)
- [ ] Log out, confirm redirect to `/login`

---

## Notes
- `prisma migrate deploy` runs automatically on every Railway deploy (see `railway.toml`). It is safe to re-run — it only applies pending migrations.
- `VITE_*` variables are baked into the JS bundle at build time. After changing them in Vercel, trigger a redeploy.
- Keep `JWT_SECRET` secret and rotate it if compromised (all existing sessions will be invalidated).
