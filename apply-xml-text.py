#!/usr/bin/env python3
"""
Haddock Films - WP XML → filmsData.js merger (v2)
==================================================
Mejoras vs v1:
- Detecta cuando un campo array (reparto/protagonistas/entrevistas) viene como
  prosa narrativa en lugar de lista limpia, y extrae los nombres correctamente.
- Filtra stopwords y preposiciones que se filtraban como falsos nombres.

Uso desde la raíz del repo HaddockFilms2026:
    python3 apply-xml-text-v2.py path/to/haddockfilms_WordPress_2026-05-06.xml

Output:
    filmsData.merged.js    (data lista para reemplazar src/data/filmsData.js)
    merge-report.txt       (qué cambió por film)
"""
import xml.etree.ElementTree as ET
import re
import json
import sys
import subprocess
from pathlib import Path

WP_TO_REACT_SLUG = {
    'elena-sabe-2023': 'elena-sabe',
    'un-dia-en-movimiento-2022': 'un-dia-en-movimiento',
    'carmel-quien-mato-a-maria-marta': 'carmel',
    'alfinal-del-tunel': 'al-final-del-tunel',
    'eva-no-duerme': 'eva',
}

FIELD_MAP = {
    'título': '_title_override', 'titulo': '_title_override',
    'año': '_year_override', 'ano': '_year_override',
    'episodios': 'episodios',
    'director': 'director', 'directora': 'director', 'directores': 'director',
    'directoras': 'director', 'dirección': 'director', 'direccion': 'director',
    'guion y dirección': 'director', 'guión y dirección': 'director',
    'guion': 'guionistas', 'guión': 'guionistas',
    'guionista': 'guionistas', 'guionistas': 'guionistas',
    'escrita por': 'guionistas',
    'adaptación': 'adaptacion', 'adaptacion': 'adaptacion',
    'basada en': 'basadaEn',
    'producción': 'produccion', 'produccion': 'produccion',
    'producido por': 'produccion', 'productor': 'produccion',
    'productora': 'produccion', 'productoras': 'produccion',
    'idea y producción general': 'produccion', 'realización por': 'produccion',
    'productores ejecutivos': 'productoresEjecutivos',
    'productor ejecutivo': 'productoresEjecutivos',
    'producción ejecutiva': 'productoresEjecutivos',
    'showrunner': 'showrunner',
    'dirección de fotografía': 'dirFotografia', 'fotografía': 'dirFotografia',
    'fotografia': 'dirFotografia',
    'dirección de arte': 'dirArte', 'arte': 'dirArte', 'diseño de arte': 'dirArte',
    'escenógrafa': 'dirArte', 'escenografa': 'dirArte',
    'vestuario': 'vestuario',
    'maquillaje': 'maquillaje', 'maquillaje y peinado': 'maquillaje',
    'música': 'musicaOriginal', 'musica': 'musicaOriginal',
    'música original': 'musicaOriginal',
    'edición': 'edicion', 'edicion': 'edicion', 'montaje': 'edicion',
    'dirección de sonido': 'dirSonido', 'sonido': 'dirSonido',
    'diseño sonoro': 'dirSonido', 'mezcla de sonido': 'dirSonido',
    'dirección de producción': 'dirProduccion',
    'supervisora de producción': 'dirProduccion',
    'dirección de postproducción': 'dirPostproduccion',
    'supervisión de postproducción': 'dirPostproduccion',
    'supervisora de postproducción': 'dirPostproduccion',
    'dirección de casting': 'casting', 'casting': 'casting',
    'elenco principal': 'reparto', 'elenco': 'reparto',
    'reparto': 'reparto', 'protagonistas': 'reparto',
    'protagonizado por': 'reparto', 'actriz principal': 'reparto',
    'participación especial': 'participacionEspecial',
    'distribución': 'distribucion', 'distribucion': 'distribucion',
    'entrevistas principales': 'entrevistas', 'entrevistas': 'entrevistas',
    'asistente de dirección': 'asistenteDireccion',
    'investigación': '_extra:Investigación',
    'temas musicales': '_extra:Temas musicales',
    'coordinación de archivo': '_extra:Coordinación de archivo',
    'productora de archivo': '_extra:Productora de archivo',
}

ARRAY_FIELDS = {'reparto', 'participacionEspecial', 'entrevistas'}
PRESERVE_FIELDS = {
    'id', 'slug', 'tipo', 'episodios', 'plataforma', 'plataformaColor',
    'estreno', 'poster', 'heroImage', 'protagonistas',
}

NS = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
}

# ============================================================================
# DETECCIÓN DE PROSA Y EXTRACCIÓN DE NOMBRES
# ============================================================================

PROSE_MARKERS = re.compile(
    r'\b(?:protagonizada?|con la participación|además|completan|presentación|cuenta con|reparto:|elenco:|junto con|presenta a|presentación de)\b',
    re.IGNORECASE
)

# Stopwords que se filtran si quedan al inicio de un nombre extraído
NAME_STOPWORDS = {
    'con', 'y', 'e', 'la', 'el', 'los', 'las', 'una', 'un',
    'además', 'también', 'protagonizada', 'protagonizado',
    'completan', 'cuenta', 'incluye', 'reparto', 'elenco',
    'participación', 'presentación', 'presenta', 'finaltwist',
    'haddock', 'final', 'twist', 'productions', 'films',
    'netflix', 'amazon', 'argentina',
}

# Frases conocidas que NO son nombres (subsecuencias capitalizadas)
NAME_BLACKLIST = {
    'Final Twist Productions', 'Haddock Films', 'Harlan Coben',
    'La Misma Sangre', 'Sin Retorno', 'El Reino', 'El Jardín',
    'Tesis De Un Homicidio', 'Patagonia', 'Ema Garay',
}

def is_prose(text):
    """¿El texto parece prosa narrativa o una lista de nombres?"""
    # Tiene puntos en medio seguidos de mayúscula → varias oraciones → prosa
    if re.search(r'\.\s+[A-ZÁÉÍÓÚÑ]', text):
        return True
    if PROSE_MARKERS.search(text):
        return True
    return False


def extract_names_from_prose(text):
    """Extrae nombres propios (Nombre Apellido) de un texto en prosa."""
    # Patrón: 2-4 palabras capitalizadas consecutivas (con conectores opcionales)
    # Ejemplos válidos: "Soledad Villamil", "Juan Manuel Tenuta", "María de los Ángeles Pérez"
    pattern = r'\b([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+(?:\s+(?:de\s+|del\s+|la\s+|los\s+|las\s+|el\s+)?[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+){1,3})\b'
    candidates = re.findall(pattern, text)

    out = []
    seen = set()
    for cand in candidates:
        # Limpiar la primer palabra si es stopword (ej "Con Fernán Mirás" → "Fernán Mirás")
        words = cand.split()
        while words and words[0].lower() in NAME_STOPWORDS:
            words = words[1:]
        # Mínimo 2 palabras (nombre + apellido)
        if len(words) < 2:
            continue
        clean = ' '.join(words)
        if clean in seen or clean in NAME_BLACKLIST:
            continue
        # Filtrar nombres de obras (películas/series mencionadas) - heurística:
        # si la sub-cadena aparece adentro de paréntesis, es obra
        seen.add(clean)
        out.append(clean)
    return out


def parse_list_value(value):
    """Convierte un valor (string) a lista de items, detectando prosa vs lista."""
    if is_prose(value):
        return extract_names_from_prose(value)
    # Lista limpia: split por coma o punto y coma
    items = [s.strip() for s in re.split(r'[,;]', value) if s.strip()]
    return items


# ============================================================================
# PARSING XML
# ============================================================================

def strip_html(s):
    if s is None:
        return ''
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'<[^>]+>', '', s)
    return (s.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&quot;', '"')
            .replace('&#8217;', "'").replace('&#8220;', '"').replace('&#8221;', '"')
            .replace('&#8211;', '–').replace('&#8212;', '—'))


def strip_shortcodes(s):
    return re.sub(r'\[/?[a-z_]+(?:\s[^\]]*)?\]', '', s, flags=re.IGNORECASE)


def extract_section(content, section_name):
    pattern = re.compile(
        r'<h3[^>]*>.*?' + re.escape(section_name) + r'.*?</h3>(.*?)(?=<h3|\[/vc_column_text\])',
        re.IGNORECASE | re.DOTALL
    )
    m = pattern.search(content)
    return m.group(1) if m else ''


def parse_ficha(ficha_html):
    text = strip_html(strip_shortcodes(ficha_html))
    lines = [l.strip() for l in text.split('\n') if l.strip()]

    result = {}
    extras = []
    current_field = None

    for line in lines:
        m = re.match(r'^([A-Za-zÁÉÍÓÚÑáéíóúñ\s]+?)[:：]\s*(.*)$', line)
        if not m:
            # Línea colgante
            if current_field and not line.startswith('•') and len(line) > 1:
                if isinstance(current_field, str) and current_field.startswith('_extra:'):
                    if extras:
                        extras[-1] = (extras[-1][0], extras[-1][1] + ', ' + line)
                elif current_field in ARRAY_FIELDS:
                    items = parse_list_value(line)
                    result.setdefault(current_field, []).extend(items)
                else:
                    result[current_field] = result.get(current_field, '') + ', ' + line
            continue

        label = m.group(1).strip().lower()
        value = m.group(2).strip()
        field = FIELD_MAP.get(label)

        if field is None:
            current_field = None
            continue

        if not value:
            current_field = field
            continue

        if field.startswith('_extra:'):
            extras.append((field[7:], value))
            current_field = field
            continue

        if field in ARRAY_FIELDS:
            items = parse_list_value(value)
            result.setdefault(field, []).extend(items)
        else:
            result[field] = result[field] + ', ' + value if field in result else value
        current_field = field

    # De-duplicar arrays
    for k in ARRAY_FIELDS:
        if k in result:
            seen = set()
            deduped = []
            for x in result[k]:
                if x not in seen:
                    seen.add(x)
                    deduped.append(x)
            result[k] = deduped

    if extras:
        parts = [f"{label}: {value}" for label, value in extras]
        result['creditosAdicionales'] = '. '.join(parts) + '.'

    return result


def extract_imdb(content):
    m = re.search(r'imdb\.com/title/(tt\d+)', content)
    return f'https://www.imdb.com/title/{m.group(1)}/' if m else None


def extract_video(content):
    m = re.search(r'vc_video\s+link="([^"]+)"', content)
    if not m:
        return None
    url = m.group(1)
    yt = re.search(r'(?:youtu\.be/|watch\?v=)([\w-]+)', url)
    if yt:
        return f'https://www.youtube.com/embed/{yt.group(1)}'
    return url


def extract_reconocimientos(content):
    block = extract_section(content, 'RECONOCIMIENTOS')
    text = strip_html(strip_shortcodes(block))
    items = []
    for chunk in re.split(r'[•·]', text):
        cleaned = re.sub(r'\s+', ' ', chunk.strip().replace('\n', ' '))
        if len(cleaned) > 8:
            items.append(cleaned)
    return items


def extract_sinopsis(content):
    block = extract_section(content, 'SINOPSIS')
    text = strip_html(strip_shortcodes(block))
    return re.sub(r'\s+', ' ', text).strip()


def parse_xml(xml_path):
    tree = ET.parse(xml_path)
    channel = tree.getroot().find('channel')

    films = {}
    for item in channel.findall('item'):
        pt = item.find('wp:post_type', NS)
        if pt is None or pt.text != 'dt_portfolio':
            continue

        wp_slug = item.find('wp:post_name', NS).text
        react_slug = WP_TO_REACT_SLUG.get(wp_slug, wp_slug)
        title_raw = item.find('title').text or ''
        content = item.find('content:encoded', NS).text or ''

        year_m = re.search(r'\((\d{4})\)', title_raw)
        year = year_m.group(1) if year_m else None
        title_clean = re.sub(r'\s*\(\d{4}\)\s*$', '', title_raw).strip()

        ficha_block = extract_section(content, 'FICHA TÉCNICA')
        ficha = parse_ficha(ficha_block)

        if '_title_override' in ficha:
            title_clean = ficha.pop('_title_override')
        if '_year_override' in ficha:
            year = ficha.pop('_year_override')

        data = {
            'title': title_clean,
            'year': year,
            'sinopsis': extract_sinopsis(content),
            'trailer': extract_video(content),
            'imdb': extract_imdb(content),
            'reconocimientos': extract_reconocimientos(content),
            **ficha,
        }
        data = {k: v for k, v in data.items() if v not in (None, '', [])}
        films[react_slug] = data

    return films


# ============================================================================
# MERGE
# ============================================================================

def parse_filmsdata_js(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()
    m = re.search(r'export\s+(?:const|default)\s+\w+\s*=\s*(\[[\s\S]+?\]);?\s*(?:export|$)',
                  js, re.MULTILINE)
    if not m:
        m = re.search(r'(\[\s*\{[\s\S]+\}\s*,?\s*\])', js)
    if not m:
        raise ValueError("No pude encontrar el array de films en filmsData.js")

    arr_str = m.group(1)
    script = f"const data = {arr_str};\nconsole.log(JSON.stringify(data));"
    proc = subprocess.run(['node', '-e', script], capture_output=True, text=True)
    if proc.returncode != 0:
        raise ValueError(f"Error parseando filmsData.js: {proc.stderr}")
    return json.loads(proc.stdout)


def js_value(v, indent=4):
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        escaped = (v.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n'))
        return f"'{escaped}'"
    if isinstance(v, list):
        if not v:
            return '[]'
        if all(isinstance(x, str) for x in v):
            inner = ', '.join(js_value(x) for x in v)
            return f'[{inner}]'
        items = [js_value(x, indent + 2) for x in v]
        sep = ',\n' + ' ' * (indent + 2)
        return '[\n' + ' ' * (indent + 2) + sep.join(items) + '\n' + ' ' * indent + ']'
    if isinstance(v, dict):
        items = [f'{k}: {js_value(val, indent + 2)}' for k, val in v.items()]
        return '{ ' + ', '.join(items) + ' }'
    raise ValueError(f"Tipo no soportado: {type(v)}")


def serialize_film(film):
    lines = ['  {']
    order = [
        'id', 'slug', 'title', 'year', 'tipo', 'episodios',
        'director', 'produccion', 'productoresEjecutivos', 'showrunner',
        'guionistas', 'adaptacion', 'basadaEn',
        'dirFotografia', 'dirArte', 'vestuario', 'maquillaje',
        'musicaOriginal', 'edicion', 'dirSonido',
        'dirProduccion', 'dirPostproduccion', 'casting',
        'protagonistas', 'participacionEspecial', 'reparto',
        'distribucion', 'entrevistas', 'asistenteDireccion',
        'creditosAdicionales',
        'sinopsis', 'trailer', 'imdb',
        'reconocimientos',
        'poster', 'heroImage',
        'plataforma', 'plataformaColor', 'estreno',
    ]
    seen = set()
    for k in order:
        if k in film:
            lines.append(f'    {k}: {js_value(film[k], 4)},')
            seen.add(k)
    for k, v in film.items():
        if k not in seen:
            lines.append(f'    {k}: {js_value(v, 4)},')
    lines.append('  }')
    return '\n'.join(lines)


def merge(current_films, xml_films):
    merged = []
    report = []

    for current in current_films:
        slug = current.get('slug')
        if not slug:
            merged.append(current)
            report.append(f"⊘ Film sin slug: id={current.get('id')} (sin cambios)")
            continue

        xml_data = xml_films.get(slug)
        if not xml_data:
            merged.append(current)
            report.append(f"⊘ {slug}: no aparece en XML (sin cambios)")
            continue

        new_film = dict(current)
        changes = []
        for k, v in xml_data.items():
            if k in PRESERVE_FIELDS:
                continue
            old = current.get(k)
            if old != v:
                changes.append(f"  ↻ {k}" if k in current else f"  + {k}")
                new_film[k] = v

        merged.append(new_film)
        if changes:
            report.append(f"✓ {slug} ({len(changes)} cambios):")
            report.extend(changes)
        else:
            report.append(f"= {slug} (sin cambios)")

    current_slugs = {f.get('slug') for f in current_films}
    for slug in xml_films:
        if slug not in current_slugs:
            report.append(f"⚠ {slug}: en XML pero NO en filmsData.js (revisar manualmente)")

    return merged, report


def main():
    if len(sys.argv) < 2:
        print("Uso: python3 apply-xml-text-v2.py <path-al-xml> [path-a-filmsData.js]")
        sys.exit(1)

    xml_path = Path(sys.argv[1])
    js_path = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('src/data/filmsData.js')

    print(f"Leyendo XML: {xml_path}")
    xml_films = parse_xml(xml_path)
    print(f"  → {len(xml_films)} films extraídos")

    if not js_path.exists():
        print(f"\n⚠  filmsData.js no encontrado en {js_path}")
        out = Path('filmsData.from-xml.json')
        with open(out, 'w', encoding='utf-8') as f:
            json.dump(xml_films, f, ensure_ascii=False, indent=2)
        print(f"Output: {out}")
        return

    print(f"\nLeyendo filmsData.js: {js_path}")
    current = parse_filmsdata_js(js_path)
    print(f"  → {len(current)} films actuales")

    merged, report = merge(current, xml_films)

    out_js = Path('filmsData.merged.js')
    with open(out_js, 'w', encoding='utf-8') as f:
        f.write("// AUTO-GENERADO por apply-xml-text-v2.py\n")
        f.write(f"// Fuente: WordPress WXR export\n")
        f.write(f"// Total films: {len(merged)}\n")
        f.write("// Para aplicar: reemplazar src/data/filmsData.js con esto.\n")
        f.write("// Los campos de imagen (poster, heroImage) NO fueron tocados.\n\n")
        f.write("export const filmsData = [\n")
        f.write(',\n'.join(serialize_film(film) for film in merged))
        f.write('\n];\n\nexport default filmsData;\n')

    out_report = Path('merge-report.txt')
    with open(out_report, 'w', encoding='utf-8') as f:
        f.write("MERGE REPORT - Haddock Films WP XML → filmsData.js\n")
        f.write("=" * 60 + "\n\n")
        f.write('\n'.join(report))
        f.write(f"\n\nTotal films merged: {len(merged)}\n")

    print(f"\n✓ Merge completo")
    print(f"  → filmsData.merged.js  ({len(merged)} films)")
    print(f"  → merge-report.txt")


if __name__ == '__main__':
    main()
