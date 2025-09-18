/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab-pane blocks (each is a column)
  const panes = Array.from(element.querySelectorAll(':scope > div.tab-pane'));
  if (!panes.length) return;

  // Only use the first tab-pane (the bio pane)
  const mainPane = panes[0];
  const dFlex = mainPane.querySelector('.d-flex');
  if (!dFlex) return;

  // Get columns: photo and content
  const columns = Array.from(dFlex.children);
  if (columns.length < 2) return;

  // Column 1: Photo
  const photoCol = columns[0];
  const img = photoCol.querySelector('img');
  const leftCell = img ? img : document.createElement('div');

  // Column 2: Content
  const contentCol = columns[1];
  const rightCellContent = [];

  // Title block (name, titles)
  const titleBlock = contentCol.querySelector('.title');
  if (titleBlock) rightCellContent.push(titleBlock);

  // Bio paragraphs (skip empty)
  const paragraphs = Array.from(contentCol.querySelectorAll('p'));
  paragraphs.forEach(p => {
    if (p.textContent.trim()) rightCellContent.push(p);
  });

  // Registered States
  const regStatesBlock = contentCol.querySelector('.flex-col-100');
  if (regStatesBlock) rightCellContent.push(regStatesBlock);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns4)'];
  const contentRow = [leftCell, rightCellContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
