/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block: three flex-col-33 boxes inside .col_img.col_btn
  const cardsContainer = element.querySelector('.col_img.col_btn');
  if (!cardsContainer) return;

  // Get each card column
  const cardCols = cardsContainer.querySelectorAll('.flex-col-33');

  // Table header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // For each card column, extract image/icon and text content
  cardCols.forEach((col) => {
    // Image/Icon (mandatory)
    let img = col.querySelector('.firmfocusimage img');
    if (!img) return; // Only include cards with an image, as required

    // Title
    let title = col.querySelector('.ada-anchor-title');
    // Description (collapsed .firmfocus)
    let desc = col.querySelector('.firmfocus.wysiwyg-box');
    // If no description, try to grab any paragraph inside the card
    if (!desc) {
      desc = col.querySelector('p');
    }
    // If still no description, try to grab any text content
    if (!desc) {
      desc = document.createElement('div');
      desc.textContent = col.textContent.trim();
    }
    // CTA (Show more button)
    let ctaBtn = col.querySelector('.btn-wrap .btn.collapser');
    let cta = null;
    if (ctaBtn) {
      // Convert button to link
      cta = document.createElement('a');
      cta.textContent = ctaBtn.textContent.replace(/Show more/i, 'Show more');
      cta.href = '#';
      cta.className = 'cta-show-more';
    }

    // Compose second cell: title, description, CTA
    const secondCellContent = [];
    if (title) secondCellContent.push(title);
    if (desc) secondCellContent.push(desc);
    if (cta) secondCellContent.push(cta);

    // Ensure at least some text content is present
    if (secondCellContent.length === 0) {
      const fallback = document.createElement('div');
      fallback.textContent = col.textContent.trim();
      secondCellContent.push(fallback);
    }

    rows.push([img, secondCellContent]);
  });

  // Only output block if at least one card row exists
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
