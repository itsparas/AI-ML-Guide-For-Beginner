import React, { useRef, useEffect } from "react";

// Particle factory (using plain objects instead of class to satisfy React linting)
function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    hue: Math.random() * 60 + 220,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

function updateParticle(p, time, width, height) {
  p.x += p.speedX;
  p.y += p.speedY;
  p.opacity =
    ((Math.sin(time * p.pulseSpeed + p.pulseOffset) + 1) / 2) * 0.4 + 0.1;
  if (p.x < 0) p.x = width;
  if (p.x > width) p.x = 0;
  if (p.y < 0) p.y = height;
  if (p.y > height) p.y = 0;
}

function drawParticle(ctx, p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
  ctx.fill();
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const particleCount = Math.min(80, Math.floor((w * h) / 8000));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(w, h));
    }

    // Floating orbs (larger gradient circles)
    const orbs = [
      { x: 0.2, y: 0.3, size: 200, hue: 250, speed: 0.0005 },
      { x: 0.7, y: 0.5, size: 180, hue: 280, speed: 0.0007 },
      { x: 0.5, y: 0.8, size: 150, hue: 200, speed: 0.0003 },
    ];

    let time = 0;
    const animate = () => {
      time++;
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      // Draw floating orbs
      orbs.forEach((orb) => {
        const ox = (orb.x + Math.sin(time * orb.speed) * 0.1) * cw;
        const oy = (orb.y + Math.cos(time * orb.speed * 1.3) * 0.08) * ch;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size);
        gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 50%, 0.08)`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 70%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw particles
      particles.forEach((p) => {
        updateParticle(p, time, cw, ch);
        drawParticle(ctx, p);
      });

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(240, 50%, 60%, ${(1 - dist / 100) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.7 }}
    />
  );
};

export default AnimatedBackground;
