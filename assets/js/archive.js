/**
 * Archive page — subcategory filtering
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    const pills = document.querySelectorAll('.filter-pill');
    const meta = document.getElementById('results-meta');
    if (!grid) return;

    const categoryId = document.documentElement.dataset.category;
    const base = document.documentElement.dataset.base || '../';

    function render(subId) {
      const products = filterProducts(categoryId, subId || null);
      grid.innerHTML = products.map((p) => WallArtApp.renderProductCard(p, base)).join('');
      WallArtApp.initReveal();

      if (meta) {
        const cat = CATALOG.categories[categoryId];
        const subTitle = subId ? getSubTitle(categoryId, subId) : 'همه';
        meta.textContent = `${products.length} محصول در ${cat.title} — ${subTitle}`;
      }
    }

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        render(pill.dataset.filter || null);
      });
    });

    const urlSub = new URLSearchParams(window.location.search).get('sub');
    if (urlSub) {
      const match = document.querySelector(`.filter-pill[data-filter="${urlSub}"]`);
      if (match) { match.click(); return; }
    }
    render(null);
  });
})();
