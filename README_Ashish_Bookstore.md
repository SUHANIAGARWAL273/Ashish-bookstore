# Ashish Bookstore

A full-stack bookstore website built to sell **Physiology Gold Standard
Notes (Volume 1 + Volume 2)** by Dr. Ashish Agarwal. It combines a
Next.js storefront with PostgreSQL order data, Razorpay payment
integration, private PDF delivery, and an AWS deployment pipeline.

> **Project status:** Deployed and running. Test the order, payment,
> database, and protected PDF flows in the target environment before
> treating the site as production-ready.

## Features

-   Storefront and order flow for the printed notes.
-   PostgreSQL integration for persistent order data.
-   Razorpay checkout integration (use test mode for demonstrations
    unless live credentials and production settings have been verified).
-   Private PDF storage in Amazon S3, with CloudFront signed URLs for
    protected access.
-   Admin-facing order visibility, according to the application's
    existing admin page.
-   Automated build and deployment using AWS CodePipeline.

## Tech stack

  -----------------------------------------------------------------------
  Area                    Technology              Purpose
  ----------------------- ----------------------- -----------------------
  Frontend and server     Next.js 16, React 19,   Pages, server rendering
                          TypeScript              and API routes

  Styling                 Tailwind CSS            Responsive UI styling

  Icons                   React Icons             Interface icons

  Database                PostgreSQL on Amazon    Persistent order data
                          RDS                     

  Payments                Razorpay                Checkout and payment
                                                  workflow

  File storage            Amazon S3               Private PDF/object
                                                  storage

  Content delivery        Amazon CloudFront       Asset delivery and
                                                  signed PDF access

  Compute                 Amazon EC2 (Amazon      Hosts the Next.js
                          Linux)                  application

  CI/CD                   AWS CodePipeline,       Automated source, build
                          CodeBuild, CodeDeploy   and deployment

  Source control          Git and GitHub          Version control
  -----------------------------------------------------------------------

## Architecture overview

``` text
Developer pushes to GitHub
          |
          v
   AWS CodePipeline
          |
          v
      AWS CodeBuild
   (install + Next.js build)
          |
          v
      AWS CodeDeploy
          |
          v
   Amazon EC2 / Next.js
      |      |       |
      |      |       +--> Razorpay checkout
      |      +----------> Amazon S3 / CloudFront signed PDF access
      +-----------------> Amazon RDS PostgreSQL
```

Keep database credentials, Razorpay secrets and CloudFront private keys
on the server side only.

## Repository structure

``` text
ashish-bookstore/
├── app/                  # Next.js routes, pages and API routes
├── lib/                  # Shared application utilities
├── public/               # Public static assets
├── scripts/
│   ├── start.sh          # Starts the deployed Next.js server
│   └── stop.sh           # Stops the previous server process
├── appspec.yml           # CodeDeploy instructions
├── buildspec.yml         # CodeBuild instructions
├── next.config.ts        # Next.js configuration
├── package.json
└── package-lock.json
```

## Run locally

### Prerequisites

-   Node.js compatible with the project's Next.js version
-   npm
-   Access to the required PostgreSQL database and external services for
    backend flows

### Setup

1.  Clone the repository:

    ``` bash
    git clone https://github.com/SUHANIAAGARWAL273/Ashish-bookstore.git
    cd Ashish-bookstore
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Create a local `.env.local` file and add the environment variables
    required by the application. Check the source code for the exact
    variable names. **Do not commit `.env.local` or put secrets in this
    README.**

4.  Start the development server:

    ``` bash
    npm run dev
    ```

5.  Open `http://localhost:3000`.

To create a production build locally:

``` bash
npm run build
npm run start
```

## AWS deployment

The repository is configured for an AWS pipeline:

1.  **Source:** GitHub branch `main`
2.  **Build:** AWS CodeBuild installs dependencies and runs the Next.js
    production build.
3.  **Deploy:** AWS CodeDeploy copies the artifact to the EC2
    application directory and runs deployment lifecycle scripts.
4.  **Runtime:** The Next.js application runs on EC2.

The project uses Next.js standalone output to reduce the runtime
artifact footprint. Keep `buildspec.yml`, `appspec.yml`, and the scripts
in `scripts/` consistent with one another.

### AWS services used

-   **EC2:** Runs the Next.js application.
-   **RDS for PostgreSQL:** Stores order data.
-   **S3:** Stores protected PDF assets.
-   **CloudFront:** Serves assets and supports signed access to
    protected PDFs.
-   **CodePipeline / CodeBuild / CodeDeploy:** Automates build and
    deployment.

## Configuration and security notes

-   Never commit `.env.local`, database passwords, Razorpay secrets,
    CloudFront private keys or other credentials.
-   Keep S3 private for protected PDFs; use the intended CloudFront
    configuration and signed URLs.
-   Use Razorpay test credentials for demonstrations. Enable live
    payments only after verifying payment verification and production
    configuration.
-   Restrict database network access to the required application
    resources.
-   Do not publish instance IP addresses, database endpoints, private
    keys or secret values in documentation or screenshots.
-   AWS resources can continue to incur charges when EC2 is stopped.
    Review EC2, EBS, RDS, S3 and CloudFront resources and billing
    separately.

## Testing checklist

Before accepting real orders, verify each flow in the target
environment:

-   [ ] Homepage and book details load.
-   [ ] Order form validates required fields.
-   [ ] Order is saved to PostgreSQL.
-   [ ] Razorpay checkout opens and payment verification is handled
    server-side.
-   [ ] Success and failure states display correctly.
-   [ ] Protected PDF access uses the intended signed-access flow.
-   [ ] Admin order view displays expected records.
-   [ ] A GitHub push triggers successful CodeBuild and CodeDeploy
    executions.

## Troubleshooting notes

During deployment work, the project encountered:

-   **Missing `pg` runtime module on EC2:** the deployment artifact did
    not provide the expected runtime dependency files. This led to
    adopting Next.js standalone output and aligning the startup script
    with `server.js`.
-   **CodeDeploy exit code 137:** logs showed `npm ci --omit=dev` being
    killed during startup, consistent with memory/resource pressure on
    the small EC2 instance. Avoid reinstalling all dependencies at
    startup when the artifact already contains required runtime files.
-   **Database connection error during build:** CodeBuild logs showed an
    attempted connection to `127.0.0.1:5432`. Build-time code should not
    assume PostgreSQL is running on the build container's localhost.
-   **Razorpay configuration errors:** server-side payment routes need
    correct server-side key configuration. Never expose the secret key
    to browser code or commit it to Git.

## Future improvements

-   Add automated smoke tests after deployment.
-   Keep build and runtime configuration consistent across local, build
    and EC2 environments.
-   Store production secrets in AWS Systems Manager Parameter Store or
    AWS Secrets Manager.
-   Add structured server logging and health checks.
-   Confirm order/payment idempotency and complete payment verification
    before live use.

## Author

**Suhani Agarwal**

GitHub: [SUHANIAAGARWAL273](https://github.com/SUHANIAAGARWAL273)

------------------------------------------------------------------------

---

## 🐛 Incident Report — RDS PostgreSQL Orders Not Saving (Oct 2026)

### Summary

After deployment to EC2, new orders were not being saved to the RDS
PostgreSQL database even though Razorpay payments were completing
successfully.

### Architecture at time of incident

```text
User Browser
    ↓ Payment
Razorpay API
    ↓ Success callback
Next.js App (EC2: port 3000)
    ↓ POST /api/verify-payment
RDS PostgreSQL (Amazon RDS, us-east-1)
```

---

### Root Cause 1 — `.env.local` missing RDS credentials on EC2

**What happened:**  
`.gitignore` contained `.env*`, so `.env.local` was never pushed to
GitHub and never deployed via CodeDeploy. An older version of
`.env.local` existed on EC2 (with only Razorpay keys) but the RDS
credentials added locally were never synced to EC2.

**Clue:** Razorpay payments succeeded (proving `.env.local` existed) but
DB inserts failed.

**Fix:**
```bash
sudo nano /home/ec2-user/bookstore/.env.local
```
Add the missing lines:
```env
RDS_HOST=<your-rds-endpoint>
RDS_PORT=5432
RDS_DATABASE=bookstore
RDS_USER=postgres
RDS_PASSWORD=<your-password>
```

---

### Root Cause 2 — Permission denied saving `.env.local`

**Error:**
```
Error writing /home/ec2-user/bookstore/.env.local: Permission denied
```

**Cause:** Running `nano` as `ssm-user` without sudo on a root-owned file.

**Fix:** Always use `sudo nano` to edit protected files:
```bash
sudo nano /home/ec2-user/bookstore/.env.local
```

---

### Root Cause 3 — PM2 had no registered process

**Error:**
```
[PM2][WARN] No process found
```

**Cause:** The app was previously started outside of PM2, so PM2 had
nothing to restart.

**Fix:** Switch to `ec2-user` and start the app fresh under PM2:
```bash
sudo su - ec2-user
cd /home/ec2-user/bookstore
pm2 start npm --name "bookstore" -- start
pm2 save
```

---

### Root Cause 4 — Port 3000 already in use (`EADDRINUSE`)

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause:** A previous app instance was already running on port 3000. PM2
kept trying to start a new instance on the same port, causing a crash
loop.

**Fix:**
```bash
sudo fuser -k 3000/tcp    # kill the process on port 3000
pm2 delete bookstore       # remove the broken PM2 entry
cd /home/ec2-user/bookstore
pm2 start npm --name "bookstore" -- start
pm2 save
```

---

### Root Cause 5 — `.env.local` owned by root (unreadable by app)

**Error:**
```
Error: `key_id` or `oauthToken` is mandatory
path: '/home/ec2-user/bookstore/.env.local'
```

**Cause:** `sudo nano` created the file owned by `root`. The app runs as
`ec2-user` which could not read it.

**Confirmed with:**
```bash
ls -la /home/ec2-user/bookstore/.env.local
# output: -rw------- root root  ← wrong owner
```

**Fix:**
```bash
sudo chown ec2-user:ec2-user /home/ec2-user/bookstore/.env.local
```

---

### Root Cause 6 — `pg` module not found / broken build

**Error:**
```
ERR_MODULE_NOT_FOUND: Cannot find package 'pg-587764f78a6c7a9c'
imported from /home/ec2-user/bookstore/.next/server/chunks/[turbopack]_runtime.js
```

**Cause:** The entire `/home/ec2-user/bookstore` folder (including
`node_modules` and `.next`) was owned by `root`, so `ec2-user` could
not write to it. `npm install` and `npm run build` both failed with
`EACCES` permission errors, leaving the `pg` package missing from the
build.

**Fix (run in order):**
```bash
# Step 1 — Fix all folder permissions recursively
sudo chown -R ec2-user:ec2-user /home/ec2-user/bookstore

# Step 2 — Reinstall packages
cd /home/ec2-user/bookstore
npm install

# Step 3 — Rebuild Next.js app
npm run build

# Step 4 — Restart app
pm2 restart bookstore
```

---

### Final verification

After all fixes, the PM2 process showed `online` with 0 restarts and
build logs confirmed:

```
✓ Compiled successfully in 11.2s
Environments: .env.local        ← env file being read
CloudFront private key loaded: true
✓ Ready in 255ms
```

New orders began appearing correctly in the `orders` table on RDS.

---

### Quick Reference — EC2 Commands

| Task | Command |
|---|---|
| Switch to ec2-user | `sudo su - ec2-user` |
| Check current user | `whoami` |
| View live app logs | `pm2 logs bookstore` |
| Check PM2 status | `pm2 list` |
| Restart app | `pm2 restart bookstore` |
| Kill port 3000 | `sudo fuser -k 3000/tcp` |
| Fix all folder permissions | `sudo chown -R ec2-user:ec2-user /home/ec2-user/bookstore` |
| Fix single file permission | `sudo chown ec2-user:ec2-user /path/to/file` |
| Edit env file safely | `sudo nano /home/ec2-user/bookstore/.env.local` |
| Reinstall packages | `npm install` |
| Rebuild Next.js | `npm run build` |

---

### Key File Locations on EC2

| File | Path |
|---|---|
| App root | `/home/ec2-user/bookstore/` |
| Environment variables | `/home/ec2-user/bookstore/.env.local` |
| PM2 logs | `/home/ec2-user/.pm2/logs/` |
| Next.js build output | `/home/ec2-user/bookstore/.next/` |
| DB connection | `lib/db.js` |
| Order save API | `app/api/verify-payment/route.js` |
| Payment create API | `app/api/create-order/route.js` |

---

### Rules to Remember for Future Deployments

- **Never use `sudo pm2`** — always run PM2 commands as `ec2-user`
  directly. Mixing `sudo pm2` and `pm2` creates two separate PM2
  instances and causes confusion.
- **After editing `.env.local` with sudo**, always fix file ownership:
  ```bash
  sudo chown ec2-user:ec2-user /home/ec2-user/bookstore/.env.local
  ```
- **After any CodeDeploy deployment**, if packages or build seem
  broken:
  ```bash
  sudo chown -R ec2-user:ec2-user /home/ec2-user/bookstore
  npm install && npm run build && pm2 restart bookstore
  ```
- **To survive EC2 reboots**, run this once after setup:
  ```bash
  sudo env PATH=$PATH:/usr/bin /usr/lib/node/nodejs22/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
  pm2 save
  ```

---

Update this README whenever routes, environment variables, AWS
architecture or deployment scripts change.
