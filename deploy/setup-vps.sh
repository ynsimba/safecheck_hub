#!/usr/bin/env bash
# Premier déploiement Safecheck-Hub sur le VPS (root). Idempotent.
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

APP_ROOT="${APP_ROOT:-/var/www/safecheck-hub}"
DOMAIN="${DOMAIN:-hub.safecheckrdc.com}"
REPO="${REPO:-https://github.com/ynsimba/safecheck_hub.git}"
BRANCH="${BRANCH:-main}"
SKIP_CERTBOT="${SKIP_CERTBOT:-0}"

if [ "$(id -u)" -ne 0 ]; then
  echo "ERREUR: lancer en root." >&2
  exit 1
fi

echo "==> prérequis"
id safecheck >/dev/null
command -v nginx >/dev/null
command -v node >/dev/null
command -v npm >/dev/null
command -v git >/dev/null
command -v certbot >/dev/null
mkdir -p /var/www/certbot
usermod -aG safecheck www-data || true

echo "==> code source $APP_ROOT ($BRANCH)"
mkdir -p "$APP_ROOT"
chown safecheck:safecheck "$APP_ROOT"
if [ "${SKIP_GIT:-0}" != "1" ]; then
  if [ ! -d "${APP_ROOT}/.git" ]; then
    sudo -u safecheck git clone --branch "$BRANCH" "$REPO" "$APP_ROOT"
  else
    sudo -u safecheck git -C "$APP_ROOT" fetch --prune origin
    sudo -u safecheck git -C "$APP_ROOT" checkout "$BRANCH"
    sudo -u safecheck git -C "$APP_ROOT" reset --hard "origin/$BRANCH"
  fi
elif [ ! -f "${APP_ROOT}/package.json" ]; then
  echo "ERREUR: SKIP_GIT=1 mais ${APP_ROOT}/package.json absent." >&2
  exit 1
fi
chown -R safecheck:safecheck "$APP_ROOT"
chmod 755 "$APP_ROOT"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NGINX_SRC="${NGINX_SRC:-$SCRIPT_DIR/nginx.conf}"
if [ ! -f "$NGINX_SRC" ]; then
  NGINX_SRC="$APP_ROOT/deploy/nginx.conf"
fi
if [ ! -f "$NGINX_SRC" ]; then
  echo "ERREUR: vhost Nginx introuvable ($NGINX_SRC)." >&2
  exit 1
fi
mkdir -p "$APP_ROOT/deploy"
if [ "$(readlink -f "$NGINX_SRC")" != "$(readlink -f "$APP_ROOT/deploy/nginx.conf")" ]; then
  cp "$NGINX_SRC" "$APP_ROOT/deploy/nginx.conf"
fi
if [ "$(readlink -f "$0")" != "$(readlink -f "$APP_ROOT/deploy/setup-vps.sh")" ]; then
  cp "$0" "$APP_ROOT/deploy/setup-vps.sh"
fi
sed -i 's/\r$//' "$APP_ROOT/deploy/"*.sh "$APP_ROOT/deploy/nginx.conf" 2>/dev/null || true
chmod +x "$APP_ROOT/deploy/"*.sh

echo "==> frontend"
if [ -f "${APP_ROOT}/package-lock.json" ]; then
  sudo -u safecheck bash -lc "cd ${APP_ROOT} && npm ci && npm run build"
else
  sudo -u safecheck bash -lc "cd ${APP_ROOT} && npm install && npm run build"
fi
chmod 755 "$APP_ROOT"
chmod -R a+rX "${APP_ROOT}/dist"
test -f "${APP_ROOT}/dist/index.html"

echo "==> nginx"
cp "$APP_ROOT/deploy/nginx.conf" "/etc/nginx/sites-available/${DOMAIN}"
ln -sfn "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
nginx -t
systemctl reload nginx

if [ "$SKIP_CERTBOT" != "1" ]; then
  echo "==> certificat TLS"
  if [ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect \
      --register-unsafely-without-email
  else
    certbot install --nginx -d "$DOMAIN" --non-interactive --reinstall --redirect || true
  fi
  nginx -t && systemctl reload nginx
fi

echo "==> smoke"
curl -sS -o /dev/null -w "HTTP %{http_code}  https://${DOMAIN}/\n" "https://${DOMAIN}/" || true
curl -sS -o /dev/null -w "HTTP %{http_code}  http://${DOMAIN}/\n" "http://${DOMAIN}/" || true

echo "==> Déploiement Hub terminé: https://${DOMAIN}/"
