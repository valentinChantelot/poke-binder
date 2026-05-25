# poke-binder

Self-hosted Pokémon card collection manager. Single user, authentication required.

Card data provided by [TCGDex](https://tcgdex.dev/) (community API). Backend powered by [PocketBase](https://pocketbase.io/).

Licensed under [AGPL v3](./LICENSE).

## Requirements

- Node ≥ 24
- pnpm ≥ 9

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env` if needed (default PocketBase URL is `http://localhost:8090`).

### 3. PocketBase binary

The PocketBase binary is not committed — download it once per machine:

```bash
mkdir -p .pb && cd .pb
wget https://github.com/pocketbase/pocketbase/releases/download/v0.26.9/pocketbase_0.26.9_linux_amd64.zip
unzip pocketbase_0.26.9_linux_amd64.zip pocketbase
chmod +x pocketbase
rm pocketbase_0.26.9_linux_amd64.zip
cd ..
```

> For macOS or Windows, download the appropriate v0.26.x archive from the
> [PocketBase releases page](https://github.com/pocketbase/pocketbase/).

### 4. First-time PocketBase setup

```bash
pnpm pb
```

Then visit `http://localhost:8090/_/` to create the superadmin account (one-time only).

In the Admin UI → **users** collection → create a user account (email + password). This is the account used to log in to the app.

## Known Limitations

**Session invalidation is client-side only.** The auth guard checks token expiry locally (JWT claim). If a session is revoked server-side (e.g. PocketBase restarted with a new secret, or the user account deleted), the app will not redirect to login until the JWT's natural expiry or the next page navigation. API calls made during that window will fail silently with 401.

## Development

Run both servers in separate terminals:

```bash
pnpm dev   # Vite dev server — http://localhost:5173
pnpm pb    # PocketBase — http://localhost:8090
```
