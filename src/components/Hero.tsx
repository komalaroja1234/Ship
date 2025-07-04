
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle animation for the dots on the circuit board
  useEffect(() => {
    if (videoContainerRef.current) {
      const container = videoContainerRef.current;
      const dots = Array.from({ length: 30 }).map(() => {
        const dot = document.createElement('div');
        dot.className = 'absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 scale-0';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dot.style.animationDuration = `${2 + Math.random() * 3}s`;
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
        
        // Add animation
        setTimeout(() => {
          dot.style.transition = 'opacity 1s ease, transform 1s ease';
          dot.style.opacity = `${0.2 + Math.random() * 0.5}`;
          dot.style.transform = 'scale(1)';
        }, Math.random() * 3000);
        
        return dot;
      });
      
      dots.forEach(dot => container.appendChild(dot));
      
      return () => {
        dots.forEach(dot => {
          if (container.contains(dot)) {
            container.removeChild(dot);
          }
        });
      };
    }
  }, []);
  
  return (
    <div className="relative h-full overflow-hidden">
      {/* Static background with circuit pattern */}
      <div 
        ref={videoContainerRef}
        className="relative h-full w-full overflow-hidden flex items-center justify-center bg-tech-darker"
      >
        <div className="absolute inset-0 bg-circuit-pattern bg-cover bg-center opacity-75"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-tech-dark/90 to-tech-darker/30"></div>
        
        <div className="relative z-1 max-w-lg px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 opacity-0 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Unleash AI Superpowers <br /> for Your Business
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
