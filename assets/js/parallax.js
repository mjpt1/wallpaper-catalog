/**
 * Smooth parallax engine — rAF + translate3d, WebGL hero fallback
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768 || /iPhone|iPad|Android/i.test(navigator.userAgent);

  /** Lightweight CSS parallax for layers */
  class SmoothParallax {
    constructor() {
      this.layers = [];
      this.rafId = null;
      this.scrollY = 0;
      this.bindEvents();
      this.collect();
    }

    collect() {
      document.querySelectorAll('[data-parallax-speed]').forEach((el) => {
        this.layers.push({
          el,
          speed: parseFloat(el.dataset.parallaxSpeed) || 0.2,
          offset: 0
        });
      });
      if (this.layers.length && !prefersReducedMotion) this.start();
    }

    bindEvents() {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (prefersReducedMotion) return;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            this.scrollY = window.scrollY;
            this.update();
            ticking = false;
          });
        }
      }, { passive: true });

      window.addEventListener('resize', () => this.update(), { passive: true });
    }

    update() {
      this.layers.forEach(({ el, speed }) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const delta = (center - viewCenter) * speed * -0.15;
        el.style.transform = `translate3d(0, ${delta}px, 0)`;
      });
    }

    start() {
      this.update();
    }
  }

  /** Hero depth canvas — subtle mesh gradient, falls back to static image */
  class HeroDepth {
    constructor(container) {
      this.container = container;
      this.canvas = container.querySelector('canvas');
      this.fallback = container.querySelector('.hero-bg-fallback');
      this.supportsWebGL = this.checkWebGL();

      if (prefersReducedMotion || !this.supportsWebGL || !this.canvas) {
        this.showFallback();
        return;
      }

      this.init();
    }

    checkWebGL() {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    }

    showFallback() {
      if (this.canvas) this.canvas.style.display = 'none';
      if (this.fallback) this.fallback.style.opacity = '1';
    }

    init() {
      const gl = this.canvas.getContext('webgl', { alpha: true, antialias: !isMobile });
      if (!gl) { this.showFallback(); return; }

      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
      const resize = () => {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      const vsSource = `
        attribute vec2 a_position;
        void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
      `;
      const fsSource = `
        precision mediump float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          vec2 center = vec2(0.5, 0.45);
          float dist = distance(uv, center + u_mouse * 0.05);
          vec3 c1 = vec3(0.12, 0.11, 0.10);
          vec3 c2 = vec3(0.25, 0.22, 0.18);
          vec3 c3 = vec3(0.77, 0.65, 0.45);
          float wave = sin(uv.x * 8.0 + u_time * 0.3) * 0.03 + sin(uv.y * 6.0 - u_time * 0.2) * 0.03;
          float blend = smoothstep(0.0, 1.0, 1.0 - dist + wave);
          vec3 col = mix(c1, mix(c2, c3, blend * 0.35), blend);
          gl_FragColor = vec4(col, 0.85);
        }
      `;

      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource));
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(program, 'u_time');
      const uRes = gl.getUniformLocation(program, 'u_resolution');
      const uMouse = gl.getUniformLocation(program, 'u_mouse');

      let mouse = { x: 0, y: 0 };
      let targetMouse = { x: 0, y: 0 };
      this.container.addEventListener('mousemove', (e) => {
        const r = this.container.getBoundingClientRect();
        targetMouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        targetMouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }, { passive: true });

      let scrollOffset = 0;
      window.addEventListener('scroll', () => {
        scrollOffset = window.scrollY * 0.0003;
      }, { passive: true });

      let start = performance.now();
      const animate = (now) => {
        mouse.x += (targetMouse.x - mouse.x) * 0.06;
        mouse.y += (targetMouse.y - mouse.y) * 0.06;
        gl.uniform1f(uTime, (now - start) * 0.001 + scrollOffset);
        gl.uniform2f(uRes, this.canvas.width, this.canvas.height);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        this.rafId = requestAnimationFrame(animate);
      };
      this.rafId = requestAnimationFrame(animate);

      if (this.fallback) this.fallback.style.opacity = '0.3';
    }

    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new SmoothParallax();
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) new HeroDepth(heroBg);
  });
})();
