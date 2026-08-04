# Shopiffy Backend API

This is the missing piece between your two HTML files (`index.html` and `admin.html`) and a
real MongoDB database. Right now both files just use the browser's `localStorage`, which only
works because they happen to be opened in the same browser. This API server gives you a real,
permanent database that any device can read from and write to.

## What this does

- Connects to a MongoDB database using **Mongoose**
- Exposes REST API endpoints for everything your site already tracks:
  - Sign-ups → `/api/signups`
  - Orders → `/api/orders` (plus `/api/orders/lookup` for Track Order)
  - Products → `/api/products`
  - Sell on Shopiffy requests → `/api/sell-requests`
  - Help Center messages → `/api/help-messages`

Once this is deployed, I can update `index.html` and `admin.html` to call these endpoints with
`fetch()` instead of `localStorage` — at that point, data submitted through your live URL will
genuinely be saved in MongoDB, and the Admin Panel will read straight from the same database.

## Step 1 — Create a free MongoDB Atlas database

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account
2. Create a free (M0) cluster — any provider/region is fine
3. Under **Database Access**, create a database user with a username and password (save these)
4. Under **Network Access**, click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
   — simplest option while you're getting this running
5. Click **Connect** on your cluster → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
6. Add `shopiffy` as the database name right before the `?`, so it looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/shopiffy?retryWrites=true&w=majority
   ```

## Step 2 — Deploy this server (Render is easiest, and free)

1. Push this `shopiffy-backend` folder to its own GitHub repo (separate from your website repo)
2. Go to https://render.com → sign up/log in → **New +** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment Variables**, add:
   - `MONGODB_URI` → your full connection string from Step 1
6. Click **Create Web Service** — Render will give you a live URL like:
   ```
   https://shopiffy-api.onrender.com
   ```

(Railway.app and Fly.io work the same way if you'd rather use one of those.)

## Step 3 — Tell me the live API URL

Once you have that `https://...onrender.com` URL, send it to me and I'll update `index.html`
and `admin.html` to call it — replacing every `localStorage.getItem`/`setItem` for signups,
orders, products, sell requests, and help messages with real `fetch()` calls to your new API.
Nothing about how the site looks or behaves will change — it'll just be backed by a real
database instead of the browser.

## Local testing (optional)

If you want to test this on your own machine before deploying:

```bash
npm install
cp .env.example .env
# edit .env and paste in your real MONGODB_URI
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Shopiffy API listening on port 5000
```

Then try, e.g., `http://localhost:5000/api/products` in your browser — it should return `[]`
until you add products.
