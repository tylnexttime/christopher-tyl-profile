/* =============================================================================
   crystallisationgap.com — particle constellation
   ---------------------------------------------------------------------------
   Vanilla Canvas2D, ~120 lines, zero dependencies.
   Echoes the book cover's dot pattern across the whole page background:
   golden dots in three sizes, slow drift, subtle parallax on mouse, faint
   link lines when the cursor is near. Respects prefers-reduced-motion.

   The canvas is positioned fixed, behind everything (z-index: -1), with
   mix-blend-mode: multiply so the gold integrates with the white paper
   instead of overlaying it.

   Created 2026-04-10 by Claude Tyl for crystallisationgap.com.
   ============================================================================ */

(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── Setup ────────────────────────────────────────────────────────────
    const canvas = document.createElement('canvas');
    canvas.className = 'particles';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Colours sampled from the book cover constellation
    const GOLD = 'rgba(167, 139, 95, ';
    const SIZES = [1.5, 2.2, 3.5, 5.0];   // Mostly small dots, occasional larger
    const SIZE_WEIGHTS = [0.45, 0.30, 0.18, 0.07];

    // Density: ~1 dot per 25,000 px², capped at 60. The cover has ~30-40 dots;
    // we want the page to feel like an extension, not a different drawing.
    const TARGET_DENSITY = (w, h) => Math.min(60, Math.max(20, Math.round(w * h / 25000)));

    let particles = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let width = 0, height = 0;
    let rafId = null;
    let lastTime = 0;

    // ─── Helpers ──────────────────────────────────────────────────────────
    function pickSize() {
        const r = Math.random();
        let acc = 0;
        for (let i = 0; i < SIZE_WEIGHTS.length; i++) {
            acc += SIZE_WEIGHTS[i];
            if (r < acc) return SIZES[i];
        }
        return SIZES[0];
    }

    function makeParticle() {
        return {
            baseX: Math.random() * width,
            baseY: Math.random() * height,
            x: 0, y: 0,
            r: pickSize(),
            // very slow drift, randomised direction
            vx: (Math.random() - 0.5) * 0.04,
            vy: (Math.random() - 0.5) * 0.04,
            // each particle has its own subtle opacity for depth
            alpha: 0.55 + Math.random() * 0.35,
        };
    }

    // ─── Sizing + spawn ───────────────────────────────────────────────────
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const target = TARGET_DENSITY(width, height);
        particles = Array.from({ length: target }, makeParticle);
    }

    // ─── Draw ─────────────────────────────────────────────────────────────
    function draw(t) {
        const dt = lastTime ? Math.min((t - lastTime) / 16.667, 3) : 1;
        lastTime = t;

        ctx.clearRect(0, 0, width, height);

        // Update + draw particles
        for (const p of particles) {
            // Slow drift
            p.baseX += p.vx * dt;
            p.baseY += p.vy * dt;

            // Wrap (the constellation breathes around the edges instead of stopping)
            if (p.baseX < -10) p.baseX = width + 10;
            if (p.baseX > width + 10) p.baseX = -10;
            if (p.baseY < -10) p.baseY = height + 10;
            if (p.baseY > height + 10) p.baseY = -10;

            // Parallax: dots shift up to ~6px toward (or away from) the cursor.
            // Smaller dots shift more — fakes parallax depth.
            let px = 0, py = 0;
            if (mouse.active) {
                const dx = mouse.x - p.baseX;
                const dy = mouse.y - p.baseY;
                const dist = Math.hypot(dx, dy);
                const influence = Math.max(0, 1 - dist / 250);
                const depth = (5 - p.r) * 1.2;          // smaller dots = more parallax
                px = (dx / (dist || 1)) * influence * depth;
                py = (dy / (dist || 1)) * influence * depth;
            }
            p.x = p.baseX + px;
            p.y = p.baseY + py;

            // Draw dot
            ctx.beginPath();
            ctx.fillStyle = GOLD + p.alpha + ')';
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Faint link lines between dots near the cursor (Universal Hive's "grab" mode,
        // but extremely subtle — only visible when you're hovering over a region).
        if (mouse.active) {
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                const dax = a.x - mouse.x;
                const day = a.y - mouse.y;
                if (Math.hypot(dax, day) > 180) continue;

                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d > 110) continue;
                    const op = (1 - d / 110) * 0.10;
                    ctx.strokeStyle = GOLD + op + ')';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        if (!reducedMotion) {
            rafId = requestAnimationFrame(draw);
        }
    }

    // ─── Events ───────────────────────────────────────────────────────────
    window.addEventListener('resize', () => {
        resize();
        if (reducedMotion) draw(0);
    });

    window.addEventListener('pointermove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
        mouse.active = false;
    });

    // Pause when tab is hidden (saves battery)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = null;
        } else if (!reducedMotion && !rafId) {
            lastTime = 0;
            rafId = requestAnimationFrame(draw);
        }
    });

    // ─── Go ───────────────────────────────────────────────────────────────
    resize();
    if (reducedMotion) {
        // Render once, no animation
        draw(0);
    } else {
        rafId = requestAnimationFrame(draw);
    }
})();
