'use strict';
/* Kinetic Engineering: no tracking, external assets, dependencies, or layout-blocking loops. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const KEY = 'autodev_motion_enabled_v1';
  const sections = [...document.querySelectorAll('main > section[id]')];
  if (!sections.length) return;
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch { /* optional preference */ }
  let enabled = !reduced.matches && saved !== 'off';
  const body = document.body;
  let routes = { left: [], right: [] };
  let lastMovingTimer;
  let pendingPosition = false;
  let pendingLayout = false;
  let lastScrollY = window.scrollY;

  // Inline SVGs keep the tiny characters crisp and entirely self-contained.
  const rover = `<svg viewBox="0 0 72 72" role="presentation" focusable="false">
    <ellipse cx="36" cy="65" rx="21" ry="3" fill="currentColor" opacity=".12"/>
    <path d="M35 17V10m-4 0h8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="36" cy="8" r="3.5" fill="currentColor" opacity=".8"/>
    <path class="bot-leg-left" d="M28 50v12l-8 1" fill="none" stroke="#6f9898" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="bot-leg-right" d="M44 50v12l8 1" fill="none" stroke="#6f9898" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 37l-7 7 4 7M55 37l7 7-4 7" fill="none" stroke="#749ca2" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="16" y="19" width="40" height="35" rx="11" fill="#2d505b" stroke="currentColor" stroke-width="1.8"/>
    <rect x="21" y="25" width="30" height="20" rx="7" fill="#0a1d29"/>
    <circle class="bot-eye" cx="30" cy="34" r="3.2"/><circle class="bot-eye" cx="43" cy="34" r="3.2"/>
    <path d="M33 41q4 3 8 0" stroke="#87aeaa" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M29 52h14" stroke="currentColor" stroke-width="1" opacity=".4"/>
  </svg>`;
  const hopper = `<svg viewBox="0 0 72 72" role="presentation" focusable="false">
    <ellipse cx="37" cy="64" rx="18" ry="3" fill="currentColor" opacity=".12"/>
    <path d="M20 27 16 13 29 21M52 27 58 13 43 21" fill="#584b44" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path class="bot-leg-left" d="M28 53l-6 9-7 0" fill="none" stroke="#847a70" stroke-width="3.5" stroke-linecap="round"/>
    <path class="bot-leg-right" d="M45 53l6 9 7 0" fill="none" stroke="#847a70" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="15" y="22" width="43" height="33" rx="11" fill="#4e4a46" stroke="currentColor" stroke-width="1.8"/>
    <rect x="20" y="27" width="33" height="19" rx="6.5" fill="#151f29"/>
    <rect x="25" y="33" width="7" height="5" rx="2.5" fill="#e0bb8a"/>
    <rect x="41" y="33" width="7" height="5" rx="2.5" fill="#e0bb8a"/>
    <path d="M34 42h6" stroke="#bfa17b" stroke-linecap="round" stroke-width="1.5"/>
    <circle cx="36.5" cy="51" r="1.5" fill="currentColor" opacity=".7"/>
  </svg>`;
  const drone = `<svg viewBox="0 0 74 67" role="presentation" focusable="false">
    <ellipse cx="37" cy="61" rx="19" ry="2.5" fill="currentColor" opacity=".1"/>
    <path d="M19 33 9 25M55 33l10-8" stroke="#8caec4" stroke-width="3" stroke-linecap="round"/>
    <g class="drone-propeller"><path d="M3 22h17M54 22h17" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" opacity=".85"/></g>
    <path d="M18 33 21 51M56 33 53 51" fill="none" stroke="#688b9a" stroke-width="3" stroke-linecap="round"/>
    <rect x="17" y="29" width="40" height="23" rx="10" fill="#344c62" stroke="currentColor" stroke-width="1.8"/>
    <rect x="23" y="34" width="28" height="12" rx="5" fill="#0b202d"/>
    <rect x="28" y="38" width="5" height="4" rx="2" fill="#94b9c7"/>
    <rect x="41" y="38" width="5" height="4" rx="2" fill="#94b9c7"/>
    <circle cx="37" cy="25" r="2" fill="currentColor"/>
  </svg>`;

  // Purely decorative; no click handler competes with portfolio controls.
  const world = document.createElement('div');
  world.className = 'motion-world';
  world.setAttribute('aria-hidden', 'true');
  world.innerHTML = `<svg class="motion-rails" aria-hidden="true" preserveAspectRatio="none"></svg>
    <div class="motion-actor motion-actor--rover"><div class="mini-loiter"><div class="mini-jumper">${rover}</div></div><span class="bot-caption">T-01 / ROVER</span></div>
    <div class="motion-actor motion-actor--hopper"><div class="mini-loiter"><div class="mini-jumper">${hopper}</div></div><span class="bot-caption">T-02 / HOPPER</span></div>
    <div class="motion-actor motion-actor--drone"><div class="mini-loiter"><div class="mini-jumper">${drone}</div></div><span class="bot-caption">D-03 / SCOUT</span></div>`;
  document.body.appendChild(world);
  const actors = [...world.querySelectorAll('.motion-actor')];
  const rail = world.querySelector('.motion-rails');

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'motion-switch';
  toggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><rect x="5" y="7" width="14" height="12" rx="4"/><path d="M12 7V4m-3 0h6M2 13h3m14 0h3M9 19v2m6-2v2"/><path d="M9 12h.01M15 12h.01" stroke-width="2.6"/></svg><span class="motion-switch-label"></span><span class="motion-led" aria-hidden="true"></span>`;
  body.appendChild(toggle);
  const label = toggle.querySelector('.motion-switch-label');
  function syncUI() {
    body.classList.toggle('motion-enabled', enabled);
    body.classList.toggle('motion-off', !enabled);
    const english = document.documentElement.lang === 'en';
    label.textContent = english ? `Robots · ${enabled ? 'ON' : 'OFF'}` : `Robot · ${enabled ? 'BẬT' : 'TẮT'}`;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', english ? `${enabled ? 'Pause' : 'Start'} robot animations` : `${enabled ? 'Tắt' : 'Bật'} hiệu ứng chuyển động robot`);
    toggle.disabled = reduced.matches;
    toggle.title = reduced.matches ? (english ? 'Reduced motion is enabled in your device settings' : 'Thiết bị đang bật chế độ giảm chuyển động') : (english ? 'Toggle gentle motion effects' : 'Bật/tắt chuyển động nhẹ');
    if (enabled) schedulePosition();
  }
  toggle.addEventListener('click', () => {
    if (reduced.matches) return;
    enabled = !enabled;
    saved = enabled ? 'on' : 'off';
    try { localStorage.setItem(KEY, saved); } catch { /* optional */ }
    syncUI();
    if (enabled) showVisibleNow();
  });
  reduced.addEventListener?.('change', event => {
    enabled = !event.matches && saved !== 'off';
    syncUI();
  });

  const limit = (n, low, high) => Math.min(Math.max(n, low), high);
  const mix = (a, b, t) => a + (b - a) * t;
  function pointOnRoute(points, currentY) {
    if (!points.length) return { x: 30, y: 300 };
    if (currentY <= points[0].y) return points[0];
    const last = points[points.length - 1];
    if (currentY >= last.y) return last;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i + 1];
      if (currentY <= b.y) {
        const t = limit((currentY - a.y) / Math.max(1, b.y - a.y), 0, 1);
        const smooth = t * t * (3 - 2 * t);
        return { x: mix(a.x, b.x, smooth), y: mix(a.y, b.y, t) };
      }
    }
    return last;
  }
  function routePath(points) {
    return points.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  }
  function layout() {
    pendingLayout = false;
    const width = document.documentElement.clientWidth;
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    world.style.height = `${height}px`;
    const mobile = width < 851;
    const gutter = mobile ? (width <= 620 ? 24 : 28) : limit((width - Math.min(1240, width - 96)) * .32, 29, 82);
    routes.left = []; routes.right = [];
    sections.forEach((section, index) => {
      const box = section.getBoundingClientRect();
      const y = window.scrollY + box.top + limit(box.height * .37, 155, 350);
      const offset = mobile ? 0 : Math.sin(index * 1.3) * 10;
      routes.left.push({ x: gutter + offset, y });
      routes.right.push({ x: width - gutter - offset, y });
    });
    rail.setAttribute('viewBox', `0 0 ${width} ${height}`);
    if (!mobile) {
      const paths = [routes.left, routes.right].map(points => `<path d="${routePath(points)}"/>`).join('');
      const points = [...routes.left, ...routes.right].map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5"/><circle class="rail-core" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="1.5"/>`).join('');
      rail.innerHTML = paths + points;
    } else rail.innerHTML = '';
    position();
  }
  function position() {
    pendingPosition = false;
    if (!enabled) return;
    const scrollFocus = window.scrollY + window.innerHeight * .57;
    const locations = [
      pointOnRoute(routes.left, scrollFocus),
      pointOnRoute(routes.right, scrollFocus + 130),
      pointOnRoute(routes.right, scrollFocus - 170)
    ];
    actors.forEach((actor, i) => {
      const point = locations[i];
      actor.style.transform = `translate3d(${point.x.toFixed(1)}px,${point.y.toFixed(1)}px,0)`;
    });
  }
  function schedulePosition() {
    if (!pendingPosition) {
      pendingPosition = true;
      requestAnimationFrame(position);
    }
  }
  function scheduleLayout() {
    if (!pendingLayout) {
      pendingLayout = true;
      requestAnimationFrame(layout);
    }
  }
  window.addEventListener('scroll', () => {
    if (!enabled) return;
    schedulePosition();
    if (Math.abs(window.scrollY - lastScrollY) > 2) {
      actors.forEach(actor => actor.classList.add('is-traveling'));
      clearTimeout(lastMovingTimer);
      lastMovingTimer = setTimeout(() => actors.forEach(actor => actor.classList.remove('is-traveling')), 400);
    }
    lastScrollY = window.scrollY;
  }, { passive: true });
  window.addEventListener('resize', scheduleLayout, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(scheduleLayout).observe(document.querySelector('main'));

  // Reveal only in-view elements. Lazy observation also handles project filtering/editor renders.
  const revealSelector = '.hero-copy,.hero-art,.section-heading,.intro-card,.focus-card,.skill-card,.project-card,.journey-story,.timeline-item,.contact-wrap';
  const revealed = new WeakSet();
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -35px 0px' }) : null;
  function discover(root = document) {
    const elements = [...(root.matches?.(revealSelector) ? [root] : []), ...root.querySelectorAll(revealSelector)];
    elements.forEach(el => {
      if (revealed.has(el)) return;
      revealed.add(el);
      el.classList.add('reveal-target');
      const group = el.parentElement;
      if (el.matches('.skill-card,.project-card,.focus-card,.timeline-item')) {
        const index = [...group.children].indexOf(el);
        el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
      }
      if (observer) observer.observe(el); else el.classList.add('is-visible');
    });
  }
  function showVisibleNow() {
    document.querySelectorAll('.reveal-target').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
    });
  }
  discover();
  const dynamic = new MutationObserver(records => records.forEach(record => {
    record.addedNodes.forEach(node => { if (node.nodeType === 1) discover(node); });
    scheduleLayout();
  }));
  ['#skills-grid', '#projects-grid', '#timeline'].forEach(selector => {
    const root = document.querySelector(selector);
    if (root) dynamic.observe(root, { childList: true });
  });

  // Labels also follow the original portfolio's Vietnamese / English switch.
  const langButton = document.querySelector('#language-toggle');
  langButton?.addEventListener('click', () => requestAnimationFrame(syncUI));
  syncUI();
  scheduleLayout();
})();
