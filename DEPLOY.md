# Deploying Fivo LLC to a VPS (MariaDB + Node SSR)

The site runs as a single Node (Express) process that server-renders React and
serves the API, reading content live from MariaDB. nginx terminates HTTPS and
proxies to Node. Target: Ubuntu 22/24.

```
Visitor ─HTTPS─▶ nginx ─▶ Node (Express + SSR) ─▶ MariaDB
                                 └▶ /api (admin auth, content, contact)
```

## 1. Server packages
```bash
sudo apt update
sudo apt install -y nginx mariadb-server
# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2
```

## 2. Database
```bash
sudo mysql_secure_installation      # set root password, harden
sudo mysql
```
```sql
CREATE DATABASE fivo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'fivo'@'localhost' IDENTIFIED BY 'a-strong-db-password';
GRANT ALL PRIVILEGES ON fivo.* TO 'fivo'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 3. App code + env
```bash
cd /var/www
git clone <your-repo> fivo && cd fivo
npm install                 # installs deps (dev deps needed for the build)
cp .env.example .env        # then edit .env with real values
```
Set in `.env`: `DB_*`, a long random `JWT_SECRET`, `ADMIN_USERNAME`,
`ADMIN_PASSWORD`, `NODE_ENV=production`, `PORT=5173`.

Generate a secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

## 4. Schema + seed (creates tables, loads content, creates admin user)
```bash
npm run db:seed
```
Re-running is safe: content is upserted; the admin password is reset from `.env`.

## 5. Build + run
```bash
npm run build                       # dist/client + dist/server
pm2 start "npm run start" --name fivo
pm2 save && pm2 startup             # run the printed command to enable on boot
```
The app now listens on `127.0.0.1:5173`.

## 6. nginx + HTTPS
`/etc/nginx/sites-available/fivo`:
```nginx
server {
  server_name fivo.llc www.fivo.llc;
  client_max_body_size 2m;

  location / {
    proxy_pass http://127.0.0.1:5173;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/fivo /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d fivo.llc -d www.fivo.llc   # provisions + auto-renews HTTPS
```
> The app trusts `X-Forwarded-*`; if rate-limit IPs look wrong, add
> `app.set('trust proxy', 1)` in `server.js`.

## 7. DNS
Point `fivo.llc` (A record) at the VPS IP. (Moving off Vercel — the app is now
served from the VPS.)

## Updating after a code change
```bash
cd /var/www/fivo && git pull
npm install && npm run build
pm2 restart fivo
```

## Notes
- Admin content edits and the contact form write to MariaDB and are live for all
  visitors immediately (server reads a short-TTL cache; see `CONTENT_TTL_MS`).
- `db/seed.mjs` also seeds if you add new services/locations to `src/data`.
- Back up: `mysqldump -u fivo -p fivo > fivo-backup.sql`.
