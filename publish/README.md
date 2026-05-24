# Publishing Pipeline

Build scripts to generate EPUB and PDF versions of "Organized, Not Forced" for Amazon KDP.

## Quick Start

```bash
cd publish

# Build both EPUB and PDF
./build-book.sh

# Build only EPUB (for Kindle)
./build-book.sh epub

# Build only PDF (for paperback)
./build-book.sh pdf

# Get word count
./build-book.sh count
```

Output files are created in `output/`:
- `organized-not-forced.epub` — Upload to KDP for Kindle ebook
- `organized-not-forced-print.pdf` — Upload to KDP Print for paperback (6"×9" trim)

## Dependencies

- **pandoc** — Markdown to EPUB/HTML conversion (`brew install pandoc`)
- **Google Chrome** — PDF generation via headless mode (must be installed in Applications)

## File Structure

```
publish/
├── build-book.sh          # Main build script
├── metadata.yaml          # EPUB metadata (title, author, cover, etc.)
├── metadata-epub.yaml     # EPUB-specific metadata (no auto title page)
├── metadata-pdf.yaml      # PDF-specific metadata
├── frontmatter.md         # EPUB front matter (dedication only)
├── frontmatter-pdf.md     # PDF front matter (title page + dedication)
├── epub.css               # EPUB stylesheet
├── print.css              # PDF stylesheet (6"×9" trim)
└── README.md              # This file

chapters/                  # Source markdown files
├── 00-prologue.md
├── 01-five-goals.md
├── 02-the-old-way.md
├── ...
└── 12-organized-not-forced.md

assets/
├── organized-not-forced-cover-final.png    # EPUB cover image
└── organized-not-forced-print-ready.png    # Print cover (upload separately to KDP)

output/                    # Generated files (git-ignored)
├── organized-not-forced.epub
└── organized-not-forced-print.pdf
```

## KDP Upload Process

### Kindle Ebook
1. Run `./build-book.sh epub`
2. Upload `output/organized-not-forced.epub` to KDP
3. Cover is embedded in the EPUB

### Paperback
1. Run `./build-book.sh pdf`
2. Upload `output/organized-not-forced-print.pdf` as manuscript
3. Upload `assets/organized-not-forced-print-ready.png` as cover (separate upload)

## Customization

### Changing metadata
Edit `metadata.yaml` for title, author, description, and cover image path.

### Changing styles
- `epub.css` — Typography, colors, spacing for ebook readers
- `print.css` — Page size, margins, print-specific formatting

### Brand colors
- Gold accent: `#d4af37`
- Dark background: `#1a1a1a` / `#0d0d0d`
- Font: Inter (imported from Google Fonts)
