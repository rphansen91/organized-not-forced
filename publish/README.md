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

## Publishing to Amazon KDP

### Getting Started
1. Go to [kdp.amazon.com](https://kdp.amazon.com)
2. Sign in with your Amazon account (or create one)
3. Complete tax information (required before publishing)

### Kindle Ebook
1. Run `./build-book.sh epub`
2. Click "Create" → "Kindle eBook"
3. Fill in book details (title, author, description, categories, keywords)
4. Upload `output/organized-not-forced.epub` as manuscript
5. Cover is embedded — KDP will extract it automatically
6. Set pricing (you choose royalty: 35% or 70%)
7. Publish — book goes live in 24-72 hours

### Paperback
1. Run `./build-book.sh pdf`
2. Click "Create" → "Paperback"
3. Fill in book details (same as ebook, or link to existing ebook)
4. Choose trim size: **6" x 9"** (this PDF is formatted for that)
5. Choose paper: cream or white, matte or glossy cover
6. Upload `output/organized-not-forced-print.pdf` as manuscript interior
7. Upload `assets/organized-not-forced-print-ready.png` as cover
8. Use KDP's Cover Creator if you need to add spine/back cover
9. Order a proof copy before publishing (recommended)
10. Set pricing (you set list price, KDP calculates royalty based on print cost)

### Hardcover
Same process as paperback, but select "Hardcover" — requires case laminate cover. You may need to adjust the cover file dimensions for hardcover specs.

### Before Publishing Checklist
- [ ] Preview ebook in Kindle Previewer (free download from Amazon)
- [ ] Preview PDF in KDP's online previewer
- [ ] Order a physical proof copy for paperback/hardcover
- [ ] Set up Author Central profile at [author.amazon.com](https://author.amazon.com)
- [ ] Prepare book description with formatting (supports basic HTML)
- [ ] Research categories and keywords for discoverability

### Pricing Notes
- Kindle: 70% royalty available for $2.99-$9.99, 35% outside that range
- Paperback: Royalty = List Price - Print Cost - Amazon's cut (40% for most regions)
- Print cost depends on page count and trim size (~$3-5 for a 100-page 6x9 book)

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
