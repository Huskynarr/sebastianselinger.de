#!/usr/bin/env python3
import os
import re
import json
import pypdf

MONTH_MAP = {
    'jan': 1, 'feb': 2, 'märz': 3, 'apr': 4, 'mai': 5, 'jun': 6,
    'jul': 7, 'aug': 8, 'sep': 9, 'okt': 10, 'nov': 11, 'dez': 12,
    'januar': 1, 'februar': 2, 'april': 4, 'juni': 6, 'juli': 7,
    'august': 8, 'september': 9, 'oktober': 10, 'november': 11, 'dezember': 12
}

GERMAN_MONTHS = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
ENGLISH_MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

ALLGEMEIN_CERTS = [
    {
        "id": "easa_drone",
        "title_de": "EASA Drohnenführerschein (UAS A1/A3)",
        "title_en": "EASA Drone License (UAS A1/A3)",
        "issuer_de": "EASA / DGAC Luxemburg",
        "issuer_en": "EASA / DGAC Luxembourg",
        "date_de": "12. Juni 2026",
        "date_en": "June 12, 2026",
        "sort_date": "2026-06-12",
        "files": {
            "de": "/files/sonstiges/EASA Drohnen Schein.PDF",
            "en": "/files/sonstiges/easa-drone-license.pdf"
        }
    },
    {
        "id": "eu_ai_act",
        "title_de": "EU AI Act Essentials",
        "title_en": "EU AI Act Essentials",
        "issuer_de": "KI-Campus",
        "issuer_en": "KI-Campus",
        "date_de": "12. Juni 2026",
        "date_en": "June 12, 2026",
        "sort_date": "2026-06-12",
        "files": {
            "de": "/files/sonstiges/eu-ai-act-essentials.pdf",
            "en": "/files/sonstiges/eu-ai-act-essentials.pdf"
        }
    },
    {
        "id": "efset_english",
        "title_de": "EF SET Englisch-Zertifikat (B2)",
        "title_en": "EF SET English Certificate (B2)",
        "issuer_de": "EF Standard English Test",
        "issuer_en": "EF Standard English Test",
        "date_de": "12. Juni 2026",
        "date_en": "June 12, 2026",
        "sort_date": "2026-06-12",
        "files": {
            "de": "/files/sonstiges/efset-english-certificate.pdf",
            "en": "/files/sonstiges/efset-english-certificate.pdf"
        }
    },
    {
        "id": "haccp",
        "title_de": "HACCP & Hygieneschulung",
        "title_en": "HACCP & Food Hygiene Training",
        "issuer_de": "METRO Deutschland GmbH",
        "issuer_en": "METRO Germany GmbH",
        "date_de": "10. August 2025",
        "date_en": "August 10, 2025",
        "sort_date": "2025-08-10",
        "files": {
            "de": "/files/sonstiges/HACCP.pdf",
            "en": "/files/sonstiges/haccp-food-safety-certificate.pdf"
        }
    },
    {
        "id": "ibm_web",
        "title_de": "IBM Web Development Fundamentals",
        "title_en": "IBM Web Development Fundamentals",
        "issuer_de": "IBM SkillsBuild",
        "issuer_en": "IBM SkillsBuild",
        "date_de": "08. August 2025",
        "date_en": "August 8, 2025",
        "sort_date": "2025-08-08",
        "files": {
            "de": "/files/sonstiges/IBMDesign20250808-31-p1dibg.pdf",
            "en": "/files/sonstiges/ibm-web-development-fundamentals.pdf"
        }
    },
    {
        "id": "infektionsschutz",
        "title_de": "Erstbelehrung zum Infektionsschutz",
        "title_en": "Infection Protection Instruction",
        "issuer_de": "Landratsamt Breisgau-Hochschwarzwald",
        "issuer_en": "Landratsamt Breisgau-Hochschwarzwald",
        "date_de": "07. August 2025",
        "date_en": "August 7, 2025",
        "sort_date": "2025-08-07",
        "files": {
            "de": "/files/sonstiges/Bescheinigung_Lebensmittelbelehrung_AZiFKTo6fT2g2CE8Jj_SyQ.pdf",
            "en": "/files/sonstiges/infektionsschutz-lebensmittelbelehrung.pdf"
        }
    },
    {
        "id": "gdpr",
        "title_de": "Datenschutz-Schulung (Basis)",
        "title_en": "Data Protection Training (Basic)",
        "issuer_de": "PROLIANCE GmbH",
        "issuer_en": "PROLIANCE GmbH",
        "date_de": "03. November 2023",
        "date_en": "November 3, 2023",
        "sort_date": "2023-11-03",
        "files": {
            "de": "/files/sonstiges/Proliance - Data Protection training basic.pdf",
            "en": "/files/sonstiges/gdpr-data-protection-certificate.pdf"
        }
    },
    {
        "id": "avm_smart_home",
        "title_de": "AVM Premium Zertifikat (Multi-Media Smart Home)",
        "title_en": "AVM Premium Certificate (Multi-Media Smart Home)",
        "issuer_de": "AVM GmbH",
        "issuer_en": "AVM GmbH",
        "date_de": "11. September 2018",
        "date_en": "September 11, 2018",
        "sort_date": "2018-09-11",
        "files": {
            "de": "/files/sonstiges/AVM Zertifikat.PDF",
            "en": "/files/sonstiges/avm-smart-home-certificate.pdf"
        }
    },
    {
        "id": "google_digitalmarketing",
        "title_de": "Google Digital Workshop - Grundlagen des Onlinemarketings",
        "title_en": "Google Digital Workshop - Fundamentals of Digital Marketing",
        "issuer_de": "Google",
        "issuer_en": "Google",
        "date_de": "12. Oktober 2022",
        "date_en": "October 12, 2022",
        "sort_date": "2022-10-12",
        "files": {
            "de": "/files/sonstiges/zertifikat_digitalmarketing-1.pdf",
            "en": "/files/sonstiges/Fundamentals of digital marketing _ Google.pdf"
        }
    },
    {
        "id": "unknown_cert",
        "title_de": "Zertifikat (30.09.2024)",
        "title_en": "Certificate (30.09.2024)",
        "issuer_de": "Sonstiges",
        "issuer_en": "Other",
        "date_de": "30. September 2024",
        "date_en": "September 30, 2024",
        "sort_date": "2024-09-30",
        "files": {
            "de": "/files/sonstiges/30092401.PDF",
            "en": "/files/sonstiges/30092401.PDF"
        }
    }
]

def parse_date(date_str):
    date_str = date_str.strip()
    match = re.search(r'([a-zA-ZäÄöÖüÜß.]+)\s+(\d{1,2}),\s+(\d{4})', date_str)
    if match:
        month_str = match.group(1).lower().replace('.', '')
        day = int(match.group(2))
        year = int(match.group(3))
        month = MONTH_MAP.get(month_str, 1)
        return f"{year:04d}-{month:02d}-{day:02d}", day, month, year
    return "0000-00-00", 0, 0, 0

def clean_title(title):
    # Normalize spaces and strip
    title = re.sub(r'\s+', ' ', title).strip()
    # Replace common issues if any
    return title

def parse_pdf(path):
    try:
        reader = pypdf.PdfReader(path)
        text = reader.pages[0].extract_text()
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        
        idx = -1
        for i, line in enumerate(lines):
            if 'Kurs von Sebastian Selinger abgeschlossen' in line:
                idx = i
                break
        
        if idx != -1:
            title = clean_title(' '.join(lines[:idx]))
            date_line = lines[idx+1]
            date_str = date_line.split(' at ')[0]
            sort_date, day, month, year = parse_date(date_str)
            de_date = f"{day:02d}. {GERMAN_MONTHS[month]} {year}" if year else date_str
            en_date = f"{ENGLISH_MONTHS[month]} {day}, {year}" if year else date_str
            return {
                "title": title,
                "date_de": de_date,
                "date_en": en_date,
                "sort_date": sort_date
            }
        return None
    except Exception as e:
        print(f"Error parsing {path}: {e}")
        return None

def process_folder(folder_name):
    folder_path = os.path.join('files', folder_name)
    certs = []
    seen_titles = set()
    
    if not os.path.exists(folder_path):
        return certs
        
    for filename in sorted(os.listdir(folder_path)):
        if not filename.lower().endswith('.pdf'):
            continue
        path = os.path.join(folder_path, filename)
        info = parse_pdf(path)
        if info:
            title = info["title"]
            sort_title = re.sub(r'[^a-zA-Z0-9]', '', title).lower()
            
            # Simple deduplication: if same title is seen, keep the one with newer date
            if sort_title in seen_titles:
                # Find existing and compare
                for c in certs:
                    if re.sub(r'[^a-zA-Z0-9]', '', c["title"]).lower() == sort_title:
                        if info["sort_date"] > c["sort_date"]:
                            c.update({
                                "date_de": info["date_de"],
                                "date_en": info["date_en"],
                                "sort_date": info["sort_date"],
                                "file": f"/files/{folder_name}/{filename}"
                            })
                        break
                continue
                
            seen_titles.add(sort_title)
            certs.append({
                "title": title,
                "date_de": info["date_de"],
                "date_en": info["date_en"],
                "sort_date": info["sort_date"],
                "file": f"/files/{folder_name}/{filename}"
            })
            
    # Sort by date descending
    certs.sort(key=lambda x: x["sort_date"], reverse=True)
    return certs

def main():
    print("Processing Allgemein...")
    # Sort Allgemein by sort_date descending
    allgemein = sorted(ALLGEMEIN_CERTS, key=lambda x: x["sort_date"], reverse=True)
    
    print("Processing PMI...")
    pmi = process_folder('pmi')
    
    print("Processing LinkedIn...")
    linkedin = process_folder('linkedIn')
    
    data = {
        "allgemein": allgemein,
        "pmi": pmi,
        "linkedIn": linkedin
    }
    
    output_path = 'js/downloads-data.js'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// Auto-generated data file. Do not edit manually.\n")
        f.write("const DOWNLOADS_DATA = ")
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        
    print(f"Successfully generated {output_path}")
    print(f"Allgemein: {len(allgemein)} certs")
    print(f"PMI: {len(pmi)} certs")
    print(f"LinkedIn: {len(linkedin)} certs")

if __name__ == '__main__':
    main()
