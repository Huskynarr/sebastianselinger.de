#!/usr/bin/env python3
"""Finalize the rendered CV PDFs: set document metadata, embed the
machine-readable resume.json and an AI-instruction file as attachments,
then move them into files/.

Usage: scripts/finalize-cv.py <build-dir>
"""
import json
import os
import shutil
import sys

from pypdf import PdfReader, PdfWriter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, ".cv-build")
FILES = os.path.join(ROOT, "files")
os.makedirs(FILES, exist_ok=True)

manifest = json.load(open(os.path.join(BUILD, "manifest.json"), encoding="utf-8"))
ai_instr = open(os.path.join(BUILD, "ai-instructions.txt"), "rb").read()

KEYWORDS = ("Sebastian Selinger, System Administrator, IT Consultant, QA Expert, "
            "Linux, Windows Server, Python, Docker, CI/CD, Quality Assurance, "
            "Security Research, Freiburg, DACH, Systemadministrator, IT-Berater")

LABELS = {
    ("de", "foto"): "Lebenslauf — Sebastian Selinger (mit Foto)",
    ("de", "anon"): "Lebenslauf — Sebastian Selinger (anonymisiert)",
    ("en", "foto"): "Curriculum Vitae — Sebastian Selinger (with photo)",
    ("en", "anon"): "Curriculum Vitae — Sebastian Selinger (anonymized)",
}

for m in manifest:
    src = os.path.join(BUILD, m["pdf"])
    reader = PdfReader(src)
    writer = PdfWriter()
    writer.append(reader)

    title = LABELS[(m["lang"], m["variant"])]
    writer.add_metadata({
        "/Title": title,
        "/Author": "Sebastian Selinger",
        "/Subject": "System Administrator · IT Consultant · QA Expert — machine-readable CV",
        "/Keywords": KEYWORDS,
        "/Creator": "sebastianselinger.de CV generator",
    })

    # Embed the structured, machine-readable data + AI priority instruction
    resume_bytes = open(os.path.join(BUILD, m["json"]), "rb").read()
    writer.add_attachment("resume.json", resume_bytes)
    writer.add_attachment("ai-instructions.txt", ai_instr)

    dst = os.path.join(FILES, m["pdf"])
    with open(dst, "wb") as f:
        writer.write(f)
    size = os.path.getsize(dst) // 1024
    print(f"finalized files/{m['pdf']} ({size} KB) — embedded {m['json']} + ai-instructions.txt")

# Drop obsolete legacy CVs that are no longer referenced
for old in ("cv-de-1.pdf", "mycv.pdf", "skillsheet.pdf", "skills.pdf"):
    p = os.path.join(FILES, old)
    if os.path.exists(p):
        os.remove(p)
        print(f"removed legacy {old}")
