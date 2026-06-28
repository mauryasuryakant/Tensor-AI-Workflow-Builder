/**
 * ParticleAnimation — canvas-based particle system for AI generation loading.
 * Particles converge and form patterns, representing AI constructing the workflow.
 * Inspired by Julian Garnier's anime.js particle animation CodePen.
 */

import { useEffect, useRef, memo } from 'react';

const PARTICLE_COUNT = 120;
const COLORS = ['#8b5cf6', '#06b6d4', '#7c3aed', '#0ea5e9', '#a78bfa', '#67e8f9'];

const ParticleAnimation = memo(function ParticleAnimation({ progress = 0 }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

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

    // Initialize particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * 800,
          y: Math.random() * 400,
          originX: 400 + (Math.random() - 0.5) * 300,
          originY: 200 + (Math.random() - 0.5) * 150,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 1 + Math.random() * 2.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.3 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.5,
        });
      }
    }

    function draw() {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const p = progress / 100;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const cx = width / 2;
      const cy = height / 2;

      // As progress increases, particles converge toward center
      const convergence = Math.pow(p, 1.5);

      particles.forEach((particle, i) => {
        // Free floating movement
        const floatX = Math.sin(t * particle.speed + particle.phase) * (30 - convergence * 20);
        const floatY = Math.cos(t * particle.speed * 0.7 + particle.phase * 1.3) * (30 - convergence * 20);

        // Target: form a circular pattern as progress increases
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const targetRadius = 60 + Math.sin(t * 2 + angle * 3) * 15;
        const targetX = cx + Math.cos(angle + t * 0.3) * targetRadius;
        const targetY = cy + Math.sin(angle + t * 0.3) * targetRadius;

        // Blend between scattered and converged positions
        const scatterX = (particle.originX / 800) * width + floatX;
        const scatterY = (particle.originY / 400) * height + floatY;

        particle.x = scatterX + (targetX - scatterX) * convergence;
        particle.y = scatterY + (targetY - scatterY) * convergence;

        // Draw connections between nearby particles
        if (convergence > 0.2) {
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 60 + convergence * 40;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.15 * convergence;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Draw particle
        const glowSize = particle.radius * (2 + convergence * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        gradient.addColorStop(0, particle.color + 'cc');
        gradient.addColorStop(0.4, particle.color + '40');
        gradient.addColorStop(1, particle.color + '00');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * (0.8 + convergence * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha + convergence * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Center glow when converging
      if (convergence > 0.3) {
        const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100 * convergence);
        centerGlow.addColorStop(0, `rgba(139, 92, 246, ${0.08 * convergence})`);
        centerGlow.addColorStop(0.5, `rgba(6, 182, 212, ${0.04 * convergence})`);
        centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = centerGlow;
        ctx.fillRect(0, 0, width, height);
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-48 rounded-[var(--radius-lg)]"
      aria-hidden="true"
    />
  );
});

export default ParticleAnimation;
