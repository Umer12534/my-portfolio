import { useEffect, useRef } from "react";
import "./ParticleNetwork.css";

export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    // Mouse position — updated on mousemove
    const mouse = { x: null, y: null };

    // ── Resize canvas to fill its container ──
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Track mouse position relative to canvas ──
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // ── Clear mouse when cursor leaves ──
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ── Create particles ──
    const NUM = 80;
    const particles = Array.from({ length: NUM }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 3.0,
      vy: (Math.random() - 0.5) * 3.0,
      r:  Math.random() * 2 + 1,       // radius 1 – 3 px
    }));

    // ── Max distances for drawing lines ──
    const DOT_CONNECT_DIST   = 130;  // line between two particles
    const MOUSE_CONNECT_DIST = 160;  // line between particle and cursor

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw each particle
      for (let i = 0; i < NUM; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(210, 210, 220, 0.7)";
        ctx.fill();

        // ── Lines between nearby particles ──
        for (let j = i + 1; j < NUM; j++) {
          const q    = particles[j];
          const dx   = p.x - q.x;
          const dy   = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < DOT_CONNECT_DIST) {
            // Opacity fades as distance grows
            const alpha = 0.25 * (1 - dist / DOT_CONNECT_DIST);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(200, 200, 215, ${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }

        // ── Lines from particle to mouse cursor ──
        if (mouse.x !== null) {
          const dx   = p.x - mouse.x;
          const dy   = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_CONNECT_DIST) {
            // Brighter line toward cursor, fades with distance
            const alpha = 0.6 * (1 - dist / MOUSE_CONNECT_DIST);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(220, 220, 235, ${alpha})`;
            ctx.lineWidth   = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-network" />;
}