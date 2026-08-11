import React, { useEffect, useRef } from 'react';
import './CanvasBackground.css';

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height, particles, animationId;
    const mouse = { x: null, y: null, active: false };

    const DOT_COLOR = '237, 234, 226';
    const ACCENT_COLOR = '255, 122, 69';
    const LINK_DISTANCE = 140;
    const MOUSE_LINK_DISTANCE = 200;
    const PARTICLE_COUNT_DIVISOR = 13000;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(130, Math.floor((width * height) / PARTICLE_COUNT_DIVISOR));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.7,
        isNode: Math.random() < 0.12,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function handleMove(e) {
      const point = e.touches ? e.touches[0] : e;
      mouse.x = point.clientX;
      mouse.y = point.clientY;
      mouse.active = true;
    }

    function handleLeave() {
      mouse.active = false;
    }

    let t = 0;

    function step() {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160 && dist > 0.01) {
            p.x -= (dx / dist) * 0.25;
            p.y -= (dy / dist) * 0.25;
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT_COLOR}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_LINK_DISTANCE) {
            const opacity = (1 - dist / MOUSE_LINK_DISTANCE) * 0.5;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${ACCENT_COLOR}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const twinkle = 0.55 + Math.sin(t + p.twinklePhase) * 0.35;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isNode ? p.r * 1.8 : p.r, 0, Math.PI * 2);

        if (p.isNode) {
          ctx.fillStyle = `rgba(${ACCENT_COLOR}, ${twinkle})`;
          ctx.shadowColor = `rgba(${ACCENT_COLOR}, 0.8)`;
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(${DOT_COLOR}, ${twinkle * 0.5})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(step);
    }

    resize();
    step();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background" aria-hidden="true" />;
}
