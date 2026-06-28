/**
 * FluidAnimation — WebGL-inspired canvas fluid simulation.
 * Interactive organic flowing visual for the AI generation loading screen.
 * Inspired by Nagasawa's fluid simulation CodePen.
 */

import { useEffect, useRef, memo } from 'react';

const FluidAnimation = memo(function FluidAnimation({ progress = 0 }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const timeRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    function draw() {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const p = progress / 100;

      ctx.clearRect(0, 0, width, height);

      const blobCount = 6;
      for (let i = 0; i < blobCount; i++) {
        const phase = (i / blobCount) * Math.PI * 2;
        const speed = 0.3 + i * 0.1;

        let bx = width * (0.3 + 0.4 * Math.sin(t * speed + phase));
        let by = height * (0.3 + 0.4 * Math.cos(t * speed * 0.7 + phase * 1.3));

        if (pointerRef.current.active) {
          const px = pointerRef.current.x * width;
          const py = pointerRef.current.y * height;
          const dx = px - bx;
          const dy = py - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / (width * 0.4));
          bx += dx * influence * 0.15;
          by += dy * influence * 0.15;
        }

        const radius = (40 + 30 * Math.sin(t * 0.5 + i)) * (0.8 + p * 0.5);

        const hue1 = 260 + i * 15 + p * 40;
        const hue2 = 190 + i * 10 + p * 30;

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        gradient.addColorStop(0, `hsla(${hue1}, 80%, 65%, ${0.25 + p * 0.15})`);
        gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 50%, ${0.12 + p * 0.08})`);
        gradient.addColorStop(1, 'hsla(260, 60%, 40%, 0)');

        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Central glow
      const centerGrad = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.3
      );
      centerGrad.addColorStop(0, `hsla(270, 80%, 60%, ${0.08 + p * 0.12})`);
      centerGrad.addColorStop(1, 'hsla(270, 80%, 60%, 0)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      frameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-40 rounded-[var(--radius-lg)] cursor-crosshair"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
});

export default FluidAnimation;
