#!/usr/bin/env bash
# Mise à jour production Safecheck-Hub — user safecheck.
set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/safecheck-hub}"
LOCK="${APP_ROOT}/.deploy.lock"

cd "$APP_ROOT"

exec 9>"$LOCK"
if ! flock -n 9; then
  echo "Un autre déploiement est déjà en cours."
  exit 1
fi

echo "==> git"
if [ ! -d "${APP_ROOT}/.git" ]; then
  echo "ERREUR: ${APP_ROOT} n'est pas un dépôt git." >&2
  exit 1
fi
git fetch origin
git reset --hard origin/main
sed -i 's/\r$//' "${APP_ROOT}/deploy/"*.sh "${APP_ROOT}/deploy/nginx.conf" 2>/dev/null || true
chmod +x "${APP_ROOT}/deploy/"*.sh

echo "==> frontend"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build
chmod 755 "$APP_ROOT"
chmod -R a+rX dist

echo "==> OK $(git rev-parse --short HEAD)"
