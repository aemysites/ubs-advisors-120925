/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main flex container for columns
  const flexContainer = element.querySelector('.d-flex');
  if (!flexContainer) return;

  // Find the two main column divs
  const columns = flexContainer.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: image only (do not mention blurred face)
  const imgCol = columns[0];
  const img = imgCol.querySelector('img');
  // Defensive: Only include image if present
  let col1Content = [];
  if (img) {
    col1Content.push(img);
  }

  // Second column: all text and lists
  const textCol = columns[1];
  // We'll collect the name/title block, bio paragraphs, and registered states
  const titleBlock = textCol.querySelector('.title');
  // Get all paragraphs after the title block
  const paragraphs = [];
  let next = titleBlock ? titleBlock.nextElementSibling : null;
  while (next) {
    // Only include non-empty paragraphs
    if (next.tagName === 'P' && next.textContent.trim()) {
      paragraphs.push(next);
    }
    // Stop at the registered states block
    if (next.classList.contains('flex-col-100')) break;
    next = next.nextElementSibling;
  }
  // Registered states block
  const statesBlock = textCol.querySelector('.flex-col-100');
  // Compose column 2 content
  let col2Content = [];
  if (titleBlock) col2Content.push(titleBlock);
  if (paragraphs.length) col2Content = col2Content.concat(paragraphs);
  if (statesBlock) col2Content.push(statesBlock);

  // Table header
  const headerRow = ['Columns (columns4)'];
  // Table columns row
  const columnsRow = [col1Content, col2Content];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  element.replaceWith(table);
}
