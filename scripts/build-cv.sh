#!/usr/bin/env bash
# Build the machine-readable CV PDFs + resume.json end to end.
#   generate (Python) -> render HTML->PDF (Chromium) -> finalize metadata/attachments (Python)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD="$ROOT/.cv-build"
rm -rf "$BUILD"; mkdir -p "$BUILD"

python3 "$ROOT/scripts/build-cv.py" "$BUILD"
( cd "$ROOT" && node scripts/render-cv.mjs "$BUILD" )
python3 "$ROOT/scripts/finalize-cv.py" "$BUILD"

rm -rf "$BUILD"
echo "Done. PDFs in files/ , canonical resume.json in repo root."
