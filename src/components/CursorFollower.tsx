import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorOuter = useRef<HTMLDivElement | null>(null);
  const cursorInner = useRef<HTMLDivElement | null>(null);
  const cursorTrail = useRef<HTMLDivElement | null>(null);
  const cursorGlow = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const outer = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });
  const trailPoints = useRef<Array<{ x: number; y: number; opacity: number; size: number }>>([]);

  useEffect(() => {
    let frame: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      const delta = Math.min(timestamp - lastTime, 32);
      lastTime = timestamp;

      // Different easing based on pointer state
      const ease = isPointer ? 0.22 : 0.14;
      const glowEase = isPointer ? 0.18 : 0.1;
      
      outer.current.x += (mouse.current.x - outer.current.x) * ease;
      outer.current.y += (mouse.current.y - outer.current.y) * ease;
      glow.current.x += (mouse.current.x - glow.current.x) * glowEase;
      glow.current.y += (mouse.current.y - glow.current.y) * glowEase;

      // Update trail with dynamic sizing
      trailPoints.current = trailPoints.current
        .map(p => ({ ...p, opacity: p.opacity * 0.78 }))
        .filter(p => p.opacity > 0.05);

      if (delta > 0 && (Math.abs(outer.current.x - mouse.current.x) > 0.5 || Math.abs(outer.current.y - mouse.current.y) > 0.5)) {
        const baseSize = isPointer ? 10 : 6;
        const randomSize = baseSize + Math.random() * 3;
        trailPoints.current.unshift({
          x: outer.current.x,
          y: outer.current.y,
          opacity: 0.6,
          size: randomSize,
        });
      }

      // Limit trail length
      if (trailPoints.current.length > 8) {
        trailPoints.current = trailPoints.current.slice(0, 8);
      }

      // Apply transforms
      if (cursorOuter.current) {
        cursorOuter.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0)`;
      }

      if (cursorInner.current) {
        cursorInner.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (cursorGlow.current) {
        cursorGlow.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0)`;
      }

      // Render trail with enhanced styling
      if (cursorTrail.current) {
        cursorTrail.current.innerHTML = trailPoints.current
          .map((p, i) => {
            const isEven = i % 2 === 0;
            const color = isEven ? "#f97316" : "#22c55e";
            const blurAmount = Math.min(i * 0.8, 4);
            return `
              <div style="
                position: absolute;
                border-radius: 50%;
                background: ${color};
                width: ${p.size}px;
                height: ${p.size}px;
                left: ${p.x}px;
                top: ${p.y}px;
                opacity: ${p.opacity * (isEven ? 0.7 : 0.5)};
                transform: translate(-50%, -50%) scale(${1 - i * 0.08});
                filter: blur(${blurAmount}px);
                box-shadow: 0 0 ${blurAmount * 1.5}px ${color};
                transition: all 0.05s linear;
              "></div>
            `;
          })
          .join("");
      }

      frame = requestAnimationFrame(animate);
    };

    animate(0);
    return () => cancelAnimationFrame(frame);
  }, [isPointer]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;
      let isHoverable = false;
      
      // Check for interactive elements
      if (target) {
        const computed = window.getComputedStyle(target);
        isHoverable = 
          computed.cursor === "pointer" ||
          computed.cursor === "grab" ||
          computed.cursor === "grabbing" ||
          ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "SUMMARY", "DETAILS"].includes(target.tagName) ||
          !!target.closest("button, a, input, textarea, select, [role='button'], [role='tab'], [role='link']");
      }
      
      setIsPointer(isHoverable);
    };

    const down = (e: MouseEvent) => {
      setIsClicked(true);
      // Add quick click ripple effect to trail
      if (cursorTrail.current) {
        const rippleDiv = document.createElement("div");
        rippleDiv.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f97316;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.8;
          pointer-events: none;
          z-index: 9999;
          animation: clickRipple 0.4s ease-out forwards;
        `;
        document.body.appendChild(rippleDiv);
        setTimeout(() => rippleDiv.remove(), 400);
      }
    };
    
    const up = () => setIsClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {/* Global Styles */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        @keyframes cursorPulse {
          0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
        }
        
        @keyframes clickRipple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(15); opacity: 0; }
        }
        
        @keyframes spinTick {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes dashOffset {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Trail Layer */}
      <div
        ref={cursorTrail}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9994,
        }}
      />

      {/* Outer Glow Layer */}
      <div
        ref={cursorGlow}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9995,
        }}
      >
        <div
          style={{
            width: isPointer ? 60 : 40,
            height: isPointer ? 60 : 40,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${isPointer ? "#f9731633" : "#22c55e22"} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            transition: "width 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), height 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Outer Ring — follows with lag and dynamic styling */}
      <div
        ref={cursorOuter}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9997,
        }}
      >
        <div
          style={{
            width: isPointer ? 34 : 26,
            height: isPointer ? 34 : 26,
            borderRadius: "50%",
            border: `2px solid ${isPointer ? "#f97316" : "#22c55e"}`,
            transform: `translate(-50%, -50%) scale(${isClicked ? 0.7 : 1})`,
            transition: "width 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), height 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), border-color 0.2s ease, transform 0.1s ease-out",
            boxShadow: isPointer
              ? "0 0 12px #f97316, inset 0 0 6px #f9731644"
              : "0 0 8px #22c55e, inset 0 0 4px #22c55e33",
            background: isPointer ? "#f973160a" : "#22c55e05",
          }}
        />
        
        {/* Corner ticks with animation */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isPointer ? 34 : 26,
            height: isPointer ? 34 : 26,
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        >
          {[
            { top: -2, left: -2, borderTop: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}`, borderLeft: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}` },
            { top: -2, right: -2, borderTop: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}`, borderRight: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}` },
            { bottom: -2, left: -2, borderBottom: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}`, borderLeft: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}` },
            { bottom: -2, right: -2, borderBottom: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}`, borderRight: `2.5px solid ${isPointer ? "#f97316" : "#22c55e"}` },
          ].map((style, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 6,
                height: 6,
                opacity: isPointer ? 1 : 0.5,
                transition: "opacity 0.25s ease, border-color 0.2s ease",
                animation: isPointer ? "spinTick 4s linear infinite" : "none",
                animationDelay: `${i * 0.25}s`,
                ...style,
              }}
            />
          ))}
        </div>
        
        {/* Inner rotating ring on hover */}
        {isPointer && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 40,
              height: 40,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1px dashed #f9731688`,
              animation: "spinTick 8s linear infinite",
            }}
          />
        )}
      </div>

      {/* Inner Dot — snaps to mouse instantly */}
      <div
        ref={cursorInner}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: isClicked ? 4 : isPointer ? 5 : 5,
            height: isClicked ? 4 : isPointer ? 5 : 5,
            borderRadius: "50%",
            background: isPointer ? "#f97316" : "#22c55e",
            transform: "translate(-50%, -50%)",
            transition: "width 0.1s ease, height 0.1s ease, background 0.2s ease",
            boxShadow: `0 0 12px ${isPointer ? "#f97316" : "#22c55e"}, 0 0 4px ${isPointer ? "#f97316cc" : "#86efac"}`,
          }}
        />
      </div>
    </>
  );
}