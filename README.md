# Jiahui Huang

Personal website, published with GitHub Pages at https://sally1913105.github.io/.

An academic profile with a concise biography, research interests, selected publications, professional experience, and postgraduate education. English is the default for new visitors; the language controls also provide Chinese and remember the reader's choice.

The profile includes the owner's supplied portrait. Personal image metadata has been removed; the photograph's pixels are unchanged.

## Edit the site

- `index.html`: page structure and default Chinese text.
- `content.js`: Chinese and English copy. Edit the matching values in both languages.
- `publications.js`: verified publication metadata, research questions, method summaries, original figures, paper/PDF links, and citation file paths.
- `assets/publications/`: original paper figures and source/attribution records. Clicking a figure opens its full-size version.
- `styles.css`: layout, colors, and responsive styles.
- `assets/citations/`: downloadable BibTeX entries with complete author lists.
- `assets/`: portrait, favicon, and locally hosted fonts.

The site is static and does not require installation or a build step. Serve this directory with `python3 -m http.server 4173` for local preview.

## Publish

In the repository's **Settings → Pages**, select **Deploy from a branch**, branch **main**, and folder **/(root)**. Saving or pushing updates to main then updates the website.

## Credits

Manrope is distributed under the SIL Open Font License. See `assets/fonts/OFL.txt`.
