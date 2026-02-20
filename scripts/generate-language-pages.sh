#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_FILE="$ROOT_DIR/index.html"
DE_FILE="$ROOT_DIR/de/index.html"
EN_FILE="$ROOT_DIR/en/index.html"

mkdir -p "$ROOT_DIR/de" "$ROOT_DIR/en"
cp "$SOURCE_FILE" "$DE_FILE"
cp "$SOURCE_FILE" "$EN_FILE"

# German landing page
perl -0777 -i -pe 's#<link rel="canonical" href="https://sebastianselinger\.de/">#<link rel="canonical" href="https://sebastianselinger.de/de/">#g; s#<meta property="og:url" content="https://sebastianselinger\.de/">#<meta property="og:url" content="https://sebastianselinger.de/de/">#g' "$DE_FILE"

# English landing page
perl -0777 -i -pe '
  s#<html lang="de">#<html lang="en">#g;
  s#<title>Sebastian Selinger \| Systemadministrator, IT-Berater & QA-Experte</title>#<title>Sebastian Selinger | System Administrator, IT Consultant & QA Expert</title>#g;
  s#<meta name="description" content="[^"]*">#<meta name="description" content="Sebastian Selinger - System Administrator (University of Freiburg), IT Consultant (Selinger Consulting), and QA Expert. 10+ years of experience. Available for projects in the DACH region.">#g;
  s#<meta name="keywords" content="[^"]*">#<meta name="keywords" content="Sebastian Selinger, system administrator, IT consultant, QA expert, Selinger Consulting, University of Freiburg, quality assurance, IT consulting, DACH, infrastructure, DevOps, security research">#g;
  s#<meta name="language" content="German">#<meta name="language" content="English">#g;
  s#<link rel="canonical" href="https://sebastianselinger\.de/">#<link rel="canonical" href="https://sebastianselinger.de/en/">#g;
  s#<meta property="og:url" content="https://sebastianselinger\.de/">#<meta property="og:url" content="https://sebastianselinger.de/en/">#g;
  s#<meta property="og:title" content="[^"]*">#<meta property="og:title" content="Sebastian Selinger | System Administrator, IT Consultant & QA Expert">#g;
  s#<meta property="og:description" content="[^"]*">#<meta property="og:description" content="System Administrator at the University of Freiburg, IT Consultant at Selinger Consulting, and QA Expert. 10+ years of experience, available across the DACH region.">#g;
  s#<meta property="og:locale" content="de_DE">#<meta property="og:locale" content="en_US">#g;
  s#<meta property="og:locale:alternate" content="en_US">#<meta property="og:locale:alternate" content="de_DE">#g;
  s#<meta name="twitter:title" content="[^"]*">#<meta name="twitter:title" content="Sebastian Selinger | System Administrator, IT Consultant & QA Expert">#g;
  s#<meta name="twitter:description" content="[^"]*">#<meta name="twitter:description" content="System Administrator, IT Consultant, and QA Expert. 10+ years of experience, available for projects in the DACH region.">#g;
' "$EN_FILE"

printf 'Generated %s and %s\n' "$DE_FILE" "$EN_FILE"
