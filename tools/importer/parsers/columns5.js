/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first tab-pane (main bio tab)
  const tabPane = element.querySelector('.tab-pane');
  if (!tabPane) return;

  // Find the .d-flex inside the tab-pane
  const dFlex = tabPane.querySelector('.d-flex');
  if (!dFlex) return;

  // Get the two columns: image and content
  const imgCol = dFlex.querySelector('.flex-col-33-sm');
  const contentCol = dFlex.querySelector('.flex-col-66-sm');
  if (!imgCol || !contentCol) return;

  // --- LEFT COLUMN: Image ---
  let leftCell = '';
  const img = imgCol.querySelector('img');
  if (img) {
    leftCell = img.cloneNode(true); // clone image element
  }

  // --- RIGHT COLUMN: Content ---
  const rightCellContent = document.createElement('div');

  // Clone all children of contentCol except empty <p>
  Array.from(contentCol.childNodes).forEach(node => {
    if (node.nodeType === 1) { // element
      if (node.tagName === 'P' && !node.textContent.trim()) return; // skip empty <p>
      rightCellContent.appendChild(node.cloneNode(true));
    } else if (node.nodeType === 3 && node.textContent.trim()) { // text node
      rightCellContent.appendChild(document.createTextNode(node.textContent));
    }
  });

  // --- TABLE CONSTRUCTION ---
  const headerRow = ['Columns (columns5)'];
  const contentRow = [leftCell, rightCellContent.childNodes.length ? rightCellContent : ''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
