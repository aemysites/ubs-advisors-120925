/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main d-flex container (the columns wrapper)
  const dFlex = element.querySelector('.d-flex');
  if (!dFlex) return;

  // Get all direct children of d-flex (should be the columns)
  const columns = Array.from(dFlex.children);
  if (columns.length < 2) return;

  // Only use the content column (skip the image column)
  const contentCol = columns[1];
  const contentCell = [];
  Array.from(contentCol.children).forEach(child => {
    if (child.tagName === 'P' && !child.textContent.trim()) return;
    contentCell.push(child);
  });

  // Build the table with only one column in the second row (no empty columns)
  const headerRow = ['Columns (columns5)'];
  const contentRow = [contentCell];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
