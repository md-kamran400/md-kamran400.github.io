import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorOuter = useRef<HTMLDivElement | null>(null);
  const cursorInner = useRef<HTMLDivElement | null>(null);
  const cursorRing = useRef<HTMLDivElement | null>(null);
  const cursorShine = useRef<HTMLDivElement | null>(null);
  const cursorTrail = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const outer = useRef({ x: 0, y: 0 });
  const trailPoints = useRef<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  // Smooth trailing motion with advanced physics
  useEffect(() => {
    const speed = 0.1;
    let frame: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      // Advanced easing with momentum
      const ease = isPointer ? 0.2 : 0.15;
      outer.current.x += (mouse.current.x - outer.current.x) * ease;
      outer.current.y += (mouse.current.y - outer.current.y) * ease;

      // Update trail points
      trailPoints.current = trailPoints.current
        .map(point => ({
          ...point,
          size: point.size * 0.85,
          opacity: point.opacity * 0.7
        }))
        .filter(point => point.opacity > 0.05);

      // Add new trail point
      if (delta > 0) {
        trailPoints.current.unshift({
          x: outer.current.x,
          y: outer.current.y,
          size: isPointer ? 20 : 12,
          opacity: 0.6 // Reduced opacity
        });
      }

      // Keep trail length manageable
      if (trailPoints.current.length > 8) {
        trailPoints.current = trailPoints.current.slice(0, 8);
      }

      // Update DOM elements
      if (cursorOuter.current) {
        cursorOuter.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0)`;
      }
      
      if (cursorInner.current) {
        cursorInner.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      
      if (cursorRing.current) {
        const rotation = Date.now() / 15;
        cursorRing.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) rotate(${rotation}deg)`;
      }

      if (cursorShine.current) {
        const shineRotation = Date.now() / 10;
        cursorShine.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) rotate(${shineRotation}deg)`;
      }

      if (cursorTrail.current) {
        cursorTrail.current.innerHTML = trailPoints.current
          .map((point, index) => `
            <div class="absolute rounded-full bg-gradient-to-r from-cyan-400/60 to-emerald-400/60 backdrop-blur-sm"
                  style="width: ${point.size}px; height: ${point.size}px;
                         left: ${point.x}px; top: ${point.y}px;
                         opacity: ${point.opacity};
                         transform: translate(-50%, -50%) scale(${0.5 + (index * 0.07)});
                         filter: blur(${5 - index * 0.5}px);">
            </div>
          `)
          .join('');
      }

      frame = requestAnimationFrame(animate);
    };

    animate(0);
    return () => cancelAnimationFrame(frame);
  }, [isPointer]);

  // Handle mouse events
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const t = e.target as HTMLElement;
      const hoverable =
        window.getComputedStyle(t).cursor === "pointer" ||
        ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) ||
        !!t.closest("button, a, input, textarea, select, [role='button']");

      setIsPointer(hoverable);
      setIsHovering(hoverable);
    };

    const down = () => {
      setIsClicked(true);
      // Add click ripple effect
      if (cursorTrail.current) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 animate-ripple';
        ripple.style.cssText = `
          left: ${outer.current.x}px;
          top: ${outer.current.y}px;
          transform: translate(-50%, -50%);
        `;
        cursorTrail.current.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    };
    
    const up = () => setIsClicked(false);
    const leave = () => setIsHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      {/* Advanced Trail System */}
      <div
        ref={cursorTrail}
        className="fixed top-0 left-0 pointer-events-none z-[9995]"
      />

      {/* Main Orbital Ring System */}
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-700 ease-out-expo"
      >
        <div className={`relative transition-all duration-500 ${isPointer ? "scale-125" : "scale-100"}`}>
          {/* Outer Ring */}
          <div className="w-20 h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 bg-origin-border p-0.5">
            <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-md" />
          </div>
          
          {/* Orbiting Dots */}
          <div className="absolute inset-0 animate-orbit-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
          </div>
          <div className="absolute inset-0 animate-orbit-reverse">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
          </div>
        </div>
      </div>

      {/* Shine Effect Layer */}
      <div
        ref={cursorShine}
        className="fixed top-0 left-0 pointer-events-none z-[9996] transition-all duration-1000 ease-out-expo"
      >
        <div className={`relative transition-all duration-400 ${isPointer ? "scale-150 opacity-50" : "scale-100 opacity-30"}`}>
          <div className="w-28 h-28 rounded-full bg-gradient-conic from-transparent via-cyan-400/20 to-transparent" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/15 via-transparent to-emerald-400/15 blur-sm" />
        </div>
      </div>

      {/* Outer Halo Glow */}
      <div
        ref={cursorOuter}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-screen"
      >
        <div className={`relative transition-all duration-500 ease-out-back ${
          isPointer 
            ? "scale-150 opacity-35" 
            : "scale-100 opacity-20"
        } ${isClicked ? "scale-90 opacity-50" : ""}`}>
          {/* Main Halo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/25 via-emerald-400/25 to-teal-400/25 blur-xl" />
          
          {/* Secondary Glow */}
          <div className="absolute inset-0 w-20 h-20 -translate-x-2 -translate-y-2 rounded-full bg-gradient-to-r from-cyan-600/15 to-emerald-600/15 blur-lg" />
        </div>
      </div>

      {/* Core Cursor - Updated to be smaller with less opacity */}
      <div
        ref={cursorInner}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <div className="relative">
          {/* Main Core - Made smaller and more transparent */}
          <div className={`relative transition-all duration-300 ease-out-back ${
            isPointer
              ? "w-4 h-4 scale-110"  // Smaller size
              : "w-3 h-3 scale-100"  // Smaller default size
          } ${isClicked ? "scale-70" : ""}`}>
            {/* Core Gradient with reduced opacity */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-400 transform rotate-45"
              style={{ opacity: 0.7 }} // Reduced opacity
            />
            
            {/* Core Glow with reduced opacity */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 blur-sm"
              style={{ opacity: 0.5 }} // Reduced opacity
            />
            
            {/* Center Dot - smaller and less opaque */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full z-10"
              style={{ opacity: 0.8 }} // Reduced opacity
            />
            
            {/* Inner Ring with reduced opacity */}
            <div 
              className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-pulse-slow"
              style={{ opacity: 0.6 }} // Reduced opacity
            />
          </div>

          {/* Hover Expansion Rings with reduced opacity */}
          {isPointer && (
            <>
              <div className="absolute -inset-2 rounded-full border border-emerald-400/20 animate-ping-slow" />
              <div className="absolute -inset-3 rounded-full border border-cyan-400/15 animate-ping-slower" />
            </>
          )}

          {/* Dynamic Crosshair with reduced opacity */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            isPointer ? "opacity-0 scale-0" : "opacity-30 scale-100"
          }`}>
            <div className="flex items-center justify-center">
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent absolute" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes orbit-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.6; }
          100% { width: 80px; height: 80px; opacity: 0; }
        }
        
        .animate-orbit-slow {
          animation: orbit-slow 4s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 1.5s ease-out infinite;
        }
        
        .animate-ping-slower {
          animation: ping-slower 2s ease-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .ease-out-back {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .bg-gradient-conic {
          background: conic-gradient(from 0deg, transparent, currentColor, transparent);
        }
      `}</style>
    </>
  );
}