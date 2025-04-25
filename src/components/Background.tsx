import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create stars
    const stars: Star[] = [];
    const numberOfStars = Math.floor(canvas.width * canvas.height / 5000);
    
    interface Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      speed: number;
      cycleTime: number;
      currentTime: number;
    }
    
    for (let i = 0; i < numberOfStars; i++) {
      const radius = Math.random() * 1.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
        alpha: Math.random(),
        speed: Math.random() * 0.005 + 0.001,
        cycleTime: Math.random() * 5000 + 3000,
        currentTime: Math.random() * 5000
      });
    }
    
    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1A1F4A');
      gradient.addColorStop(1, '#31275E');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        
        // Update star pulsation
        star.currentTime = (star.currentTime + star.speed * 16.67) % star.cycleTime;
        star.alpha = 0.3 + 0.7 * Math.sin(Math.PI * 2 * star.currentTime / star.cycleTime);
        
        // Draw star
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
};

export default Background;