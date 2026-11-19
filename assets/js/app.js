/**
 * Shared app utilities — header, nav, reveal, footer injection
 */
(function () {
  'use strict';

  const BASE = document.documentElement.dataset.base || '';

  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    if (toggle && mobileNav) {
      toggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
      });
      mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => mobileNav.classList.remove('open'));
      });
    }

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href.endsWith(currentPath) || (currentPath === '' && href.endsWith('index.html')))) {
        link.classList.add('active');
      }
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.06, 0.36)}s`;
      observer.observe(el);
    });
  }

  function renderProductCard(product, base = BASE) {
    const labels = productTagLabels(product);
    const img = productImageUrl(product, base);
    return `
      <a href="${base}product.html?code=${product.code}" class="product-card reveal">
        <div class="product-card-image">
          <img src="${img}" alt="${product.title}" loading="lazy" width="400" height="400">
          <span class="product-code">کد ${product.code}</span>
        </div>
        <div class="product-card-body">
          <h3>${product.title}</h3>
          <div class="product-tags">
            <span class="tag">${labels.albums}</span>
            <span class="tag">${labels.color}</span>
            <span class="tag">${labels.pattern}</span>
          </div>
        </div>
      </a>`;
  }

  window.WallArtApp = {
    BASE,
    initHeader,
    initReveal,
    renderProductCard
  };

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initReveal();
  });
})();
