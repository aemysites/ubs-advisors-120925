/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards section: three cards in a row, each with image/icon and text
  // This is the section with class 'container col_img col_btn'
  const cardsSection = element.querySelector('.container.col_img.col_btn');
  if (!cardsSection) return;

  // Each card is in a .flex-col-33
  const cardEls = Array.from(cardsSection.querySelectorAll('.flex-col-33'));
  if (!cardEls.length) return;

  // Build the table rows
  const rows = [];
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);

  cardEls.forEach(cardEl => {
    // Image or video
    let media = '';
    let imgContainer = cardEl.querySelector('.img-container.firmfocusimage');
    if (imgContainer) {
      // Standard image
      const img = imgContainer.querySelector('img');
      if (img) media = img;
    } else {
      // Video (Brightcove)
      const videoContainer = cardEl.querySelector('.grid-brightcove-container');
      if (videoContainer) {
        // Try to get video id
        const videoId = videoContainer.getAttribute('data-video-id');
        // Use a link to the video if possible
        let videoLink = null;
        if (videoId) {
          // Brightcove public player link
          videoLink = document.createElement('a');
          videoLink.href = `https://players.brightcove.net/${videoContainer.getAttribute('data-account')}/${videoContainer.getAttribute('data-player')}_${videoContainer.getAttribute('data-embed')}/index.html?videoId=${videoId}`;
          videoLink.textContent = 'Watch video';
          videoLink.target = '_blank';
        }
        if (videoLink) media = videoLink;
      }
    }

    // Text content
    // Title: h2. Description: .collapse.firmfocus.wysiwyg-box (hidden by default)
    const textParts = [];
    const title = cardEl.querySelector('h2');
    if (title) textParts.push(title);
    const desc = cardEl.querySelector('.collapse.firmfocus.wysiwyg-box');
    if (desc) textParts.push(desc);
    // Call-to-action: button in .btn-wrap.btn-box
    const btnWrap = cardEl.querySelector('.btn-wrap.btn-box');
    if (btnWrap) {
      const btn = btnWrap.querySelector('button, a');
      if (btn) textParts.push(btn);
    }

    rows.push([
      media,
      textParts
    ]);
  });

  // Replace the original section with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  cardsSection.replaceWith(block);
}
