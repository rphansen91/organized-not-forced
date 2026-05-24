#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_ROOT/output"
CHAPTERS_DIR="$PROJECT_ROOT/chapters"

mkdir -p "$OUTPUT_DIR"

# Chapter files in order
CHAPTERS=(
    "$CHAPTERS_DIR/00-prologue.md"
    "$CHAPTERS_DIR/01-five-goals.md"
    "$CHAPTERS_DIR/02-old-way.md"
    "$CHAPTERS_DIR/03-pistol-squat.md"
    "$CHAPTERS_DIR/04-muscle-up.md"
    "$CHAPTERS_DIR/05-hspu.md"
    "$CHAPTERS_DIR/06-front-lever.md"
    "$CHAPTERS_DIR/07-planche.md"
    "$CHAPTERS_DIR/08-skeleton.md"
    "$CHAPTERS_DIR/09-scapula.md"
    "$CHAPTERS_DIR/10-joints.md"
    "$CHAPTERS_DIR/11-carryover.md"
    "$CHAPTERS_DIR/12-organized-not-forced.md"
)

build_epub() {
    echo "Building EPUB..."
    
    # Use pandoc's auto title page, then our copyright/dedication, then TOC, then chapters
    pandoc \
        --metadata-file="$SCRIPT_DIR/metadata.yaml" \
        --metadata toc-title="Contents" \
        --css="$SCRIPT_DIR/epub.css" \
        --toc \
        --toc-depth=1 \
        --split-level=1 \
        -o "$OUTPUT_DIR/organized-not-forced.epub" \
        "$SCRIPT_DIR/frontmatter.md" \
        "${CHAPTERS[@]}"
    
    echo "✓ EPUB created: output/organized-not-forced.epub"
}

build_pdf() {
    echo "Building PDF..."
    
    TEMP_DIR=$(mktemp -d)
    trap "rm -rf $TEMP_DIR" EXIT
    
    # Build HTML first (use PDF-specific frontmatter with title page)
    pandoc \
        --metadata-file="$SCRIPT_DIR/metadata-pdf.yaml" \
        --standalone \
        --css="$SCRIPT_DIR/print.css" \
        --embed-resources \
        -o "$TEMP_DIR/book.html" \
        "$SCRIPT_DIR/frontmatter-pdf.md" \
        "${CHAPTERS[@]}"
    
    # Convert HTML to PDF using Chrome headless
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        --headless \
        --disable-gpu \
        --print-to-pdf="$OUTPUT_DIR/organized-not-forced-print.pdf" \
        --no-pdf-header-footer \
        --print-to-pdf-no-header \
        "$TEMP_DIR/book.html" \
        2>/dev/null
    
    echo "✓ PDF created: output/organized-not-forced-print.pdf"
}

count_words() {
    echo "Word count by chapter:"
    echo "========================"
    
    total=0
    
    # Frontmatter
    words=$(cat "$SCRIPT_DIR/frontmatter.md" | wc -w | tr -d ' ')
    printf "%-35s %6s words\n" "Frontmatter" "$words"
    total=$((total + words))
    
    # Chapters
    for chapter in "${CHAPTERS[@]}"; do
        name=$(basename "$chapter" .md)
        words=$(cat "$chapter" | wc -w | tr -d ' ')
        printf "%-35s %6s words\n" "$name" "$words"
        total=$((total + words))
    done
    
    echo "========================"
    printf "%-35s %6s words\n" "TOTAL" "$total"
}

case "${1:-all}" in
    epub) build_epub ;;
    pdf) build_pdf ;;
    count) count_words ;;
    all)
        build_epub
        build_pdf
        ;;
    *)
        echo "Usage: $0 [epub|pdf|count|all]"
        exit 1
        ;;
esac
