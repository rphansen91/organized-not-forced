#!/bin/bash
#
# Build script for "Organized, Not Forced"
# Generates EPUB (for Kindle) and PDF (for print)
#
# Usage:
#   ./build-book.sh          # Build both EPUB and PDF
#   ./build-book.sh epub     # Build EPUB only
#   ./build-book.sh pdf      # Build PDF only
#   ./build-book.sh html     # Build HTML preview
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BOOK_NAME="organized-not-forced"
OUTPUT_DIR="output"
PUBLISH_DIR="publish"
CHAPTERS_DIR="chapters"
ASSETS_DIR="assets"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Chapter files in order (PDF - no cover, KDP uploads cover separately)
CHAPTERS=(
  "$PUBLISH_DIR/frontmatter.md"
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

# Function to build EPUB
# EPUB chapters (skip cover.md - EPUB uses cover-image metadata)
EPUB_CHAPTERS=(
  "$PUBLISH_DIR/frontmatter.md"
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
  echo -e "${YELLOW}Building EPUB...${NC}"
  
  pandoc \
    --metadata-file="$PUBLISH_DIR/metadata.yaml" \
    --metadata toc=true \
    --css="$PUBLISH_DIR/epub.css" \
    --epub-embed-font="$PUBLISH_DIR/epub.css" \
    --toc \
    --toc-depth=1 \
    --split-level=1 \
    --standalone \
    --resource-path=".:$ASSETS_DIR:$ASSETS_DIR/pose-exports" \
    -o "$OUTPUT_DIR/$BOOK_NAME.epub" \
    "${EPUB_CHAPTERS[@]}"
  
  echo -e "${GREEN}✓ Created $OUTPUT_DIR/$BOOK_NAME.epub${NC}"
}

# Function to build PDF via HTML + WeasyPrint (or Chrome)
build_pdf() {
  echo -e "${YELLOW}Building PDF (6x9 print-ready)...${NC}"
  
  # First generate print-ready HTML (no auto TOC - cover comes first)
  pandoc \
    --metadata-file="$PUBLISH_DIR/metadata.yaml" \
    --css="$PUBLISH_DIR/print.css" \
    --embed-resources \
    --standalone \
    --resource-path=".:$ASSETS_DIR:$ASSETS_DIR/pose-exports" \
    -o "$OUTPUT_DIR/$BOOK_NAME-print.html" \
    "${CHAPTERS[@]}"
  
  echo -e "${GREEN}✓ Created $OUTPUT_DIR/$BOOK_NAME-print.html${NC}"
  
  # Try WeasyPrint first
  if command -v weasyprint &> /dev/null; then
    if weasyprint "$OUTPUT_DIR/$BOOK_NAME-print.html" "$OUTPUT_DIR/$BOOK_NAME.pdf" 2>/dev/null; then
      echo -e "${GREEN}✓ Created $OUTPUT_DIR/$BOOK_NAME.pdf${NC}"
      return 0
    fi
  fi
  
  # Fallback: Use Chrome headless if available
  if [[ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
      --headless \
      --disable-gpu \
      --print-to-pdf="$OUTPUT_DIR/$BOOK_NAME.pdf" \
      --no-pdf-header-footer \
      "file://$(pwd)/$OUTPUT_DIR/$BOOK_NAME-print.html" 2>/dev/null
    
    if [[ -f "$OUTPUT_DIR/$BOOK_NAME.pdf" ]]; then
      echo -e "${GREEN}✓ Created $OUTPUT_DIR/$BOOK_NAME.pdf (via Chrome)${NC}"
      return 0
    fi
  fi
  
  echo -e "${YELLOW}Note: PDF not generated automatically.${NC}"
  echo "  To create PDF:"
  echo "    1. Open $OUTPUT_DIR/$BOOK_NAME-print.html in your browser"
  echo "    2. Print → Save as PDF (6x9 page size)"
  echo ""
  echo "  Or install LaTeX: brew install --cask basictex"
  echo "  Then run: pandoc --pdf-engine=xelatex -o $OUTPUT_DIR/$BOOK_NAME.pdf ..."
}

# Function to build HTML preview
build_html() {
  echo -e "${YELLOW}Building HTML preview...${NC}"
  
  pandoc \
    --metadata-file="$PUBLISH_DIR/metadata.yaml" \
    --css="$PUBLISH_DIR/epub.css" \
    --embed-resources \
    --standalone \
    --toc \
    --toc-depth=1 \
    --resource-path=".:$ASSETS_DIR:$ASSETS_DIR/pose-exports" \
    -o "$OUTPUT_DIR/$BOOK_NAME.html" \
    "${CHAPTERS[@]}"
  
  echo -e "${GREEN}✓ Created $OUTPUT_DIR/$BOOK_NAME.html${NC}"
  echo -e "${YELLOW}Open with: open $OUTPUT_DIR/$BOOK_NAME.html${NC}"
}

# Function to get word count
word_count() {
  echo -e "${YELLOW}Word count by chapter:${NC}"
  echo ""
  total=0
  for chapter in "${CHAPTERS[@]}"; do
    if [[ -f "$chapter" ]]; then
      count=$(wc -w < "$chapter" | tr -d ' ')
      total=$((total + count))
      printf "  %-40s %6d words\n" "$(basename "$chapter")" "$count"
    fi
  done
  echo ""
  echo -e "${GREEN}Total: $total words${NC}"
}

# Main
case "${1:-all}" in
  epub)
    build_epub
    ;;
  pdf)
    build_pdf
    ;;
  html)
    build_html
    ;;
  count)
    word_count
    ;;
  all)
    build_epub
    build_pdf
    echo ""
    word_count
    echo ""
    echo -e "${GREEN}Build complete!${NC}"
    echo "  EPUB: $OUTPUT_DIR/$BOOK_NAME.epub (upload to KDP for Kindle)"
    echo "  PDF:  $OUTPUT_DIR/$BOOK_NAME.pdf (upload to KDP for paperback)"
    ;;
  *)
    echo "Usage: $0 [epub|pdf|html|count|all]"
    exit 1
    ;;
esac
