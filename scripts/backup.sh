#!/usr/bin/env bash
# ==============================================================
# SARI - Skrip Backup Otomatis Database SQLite
# Jalankan via Cron harian: 0 2 * * * /home/dimas/Downloads/S.A.R.I/scripts/backup.sh
# ==============================================================

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${APP_DIR}/backups"
DB_FILE="${APP_DIR}/database/sari.db"
TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"
BACKUP_TARGET="${BACKUP_DIR}/sari_backup_${TIMESTAMP}.db"

mkdir -p "${BACKUP_DIR}"

if [ -f "${DB_FILE}" ]; then
  # Gunakan sqlite3 vacuum into jika ada, atau salin file secara aman
  if command -v sqlite3 >/dev/null 2>&1; then
    sqlite3 "${DB_FILE}" ".backup '${BACKUP_TARGET}'"
  else
    cp "${DB_FILE}" "${BACKUP_TARGET}"
  fi
  gzip -f "${BACKUP_TARGET}"
  echo "[$(date)] Backup sukses: ${BACKUP_TARGET}.gz"

  # Bersihkan backup yang lebih tua dari 14 hari
  find "${BACKUP_DIR}" -name "sari_backup_*.db.gz" -mtime +14 -delete
else
  echo "[$(date)] Error: File database tidak ditemukan di ${DB_FILE}" >&2
  exit 1
fi
