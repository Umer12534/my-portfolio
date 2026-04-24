import { useEffect, useRef } from "react";
import "./Particlenetwork.css";

export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const pointer = { x: null, y: null };

    // ── Adaptive particle count based on screen area ──
    const getNum = () => {
      const area = canvas.offsetWidth * canvas.offsetHeight;
      if (area < 200000) return 40;  // small mobile
      if (area < 500000) return 60;  // tablet / large mobile
      return 90;                      // desktop
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Pointer: mouse + touch ──
    const setPointer = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = x - rect.left;
      pointer.y = y - rect.top;
    };
    const clearPointer = () => { pointer.x = null; pointer.y = null; };

    canvas.addEventListener("mousemove", (e) => setPointer(e.clientX, e.clientY));
    canvas.addEventListener("mouseleave", clearPointer);
    canvas.addEventListener("touchstart", (e) => { e.preventDefault(); setPointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
    canvas.addEventListener("touchmove",  (e) => { e.preventDefault(); setPointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
    canvas.addEventListener("touchend", clearPointer);

    // ── Create particles ──
    const NUM = getNum();
    const particles = Array.from({ length: NUM }, () => ({
      x:          Math.random() * canvas.width,
      y:          Math.random() * canvas.height,
      vx:         (Math.random() - 0.5) * 1.4,
      vy:         (Math.random() - 0.5) * 1.4,
      r:          Math.random() * 1.8 + 0.8,
      pulse:      Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    const REPEL_DIST  = 80;
    const REPEL_FORCE = 0.3;

    const getDists = () =>
      canvas.width < 480
        ? { dot: 90, mouse: 120 }
        : { dot: 130, mouse: 170 };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { dot: DOT_DIST, mouse: MOUSE_DIST } = getDists();
      const hasPointer = pointer.x !== null;

      for (let i = 0; i < NUM; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;

        // Soft repulsion from pointer
        if (hasPointer) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_DIST * REPEL_DIST && d2 > 0) {
            const d = Math.sqrt(d2);
            const force = ((REPEL_DIST - d) / REPEL_DIST) * REPEL_FORCE;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        // Damping + speed clamp
        p.vx *= 0.995;
        p.vy *= 0.995;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 2.5) { p.vx *= 2.5 / speed; p.vy *= 2.5 / speed; }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0)             { p.x = 0;             p.vx =  Math.abs(p.vx); }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx = -Math.abs(p.vx); }
        if (p.y < 0)             { p.y = 0;             p.vy =  Math.abs(p.vy); }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy = -Math.abs(p.vy); }

        const pr = p.r * (1 + 0.25 * Math.sin(p.pulse));

        // Glow halo
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 4);
        glow.addColorStop(0,   "rgba(180, 190, 255, 0.8)");
        glow.addColorStop(0.4, "rgba(160, 170, 240, 0.3)");
        glow.addColorStop(1,   "rgba(160, 170, 240, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, pr * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Hard dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(210, 220, 255, 0.9)";
        ctx.fill();

        // ── Particle-to-particle lines ──
        for (let j = i + 1; j < NUM; j++) {
          const q  = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < DOT_DIST) {
            const t  = 1 - dist / DOT_DIST;
            const lg = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            lg.addColorStop(0, `rgba(150, 160, 240, ${0.3 * t})`);
            lg.addColorStop(1, `rgba(120, 130, 220, ${0.15 * t})`);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lg;
            ctx.lineWidth   = 0.6 + t * 0.4;
            ctx.stroke();
          }
        }

        // ── Particle-to-pointer lines ──
        if (hasPointer) {
          const dx   = p.x - pointer.x;
          const dy   = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST) {
            const t  = 1 - dist / MOUSE_DIST;
            const lg = ctx.createLinearGradient(p.x, p.y, pointer.x, pointer.y);
            lg.addColorStop(0, `rgba(180, 190, 255, ${0.5 * t})`);
            lg.addColorStop(1, `rgba(100, 120, 255, ${0.8 * t})`);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = lg;
            ctx.lineWidth   = 0.8 + t * 0.8;
            ctx.stroke();
          }
        }
      }

      // Pointer glow dot
      if (hasPointer) {
        const pg = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 20);
        pg.addColorStop(0,   "rgba(140, 160, 255, 0.7)");
        pg.addColorStop(0.5, "rgba(100, 120, 255, 0.2)");
        pg.addColorStop(1,   "rgba(100, 120, 255, 0)");
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-network" />;
}