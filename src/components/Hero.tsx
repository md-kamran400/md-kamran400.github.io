// Hero.tsx - Updated with modern floating rings and advanced animations
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Code2,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface HeroProps {
  isDark: boolean;
}

const Hero = ({ isDark }: HeroProps) => {
  const [text, setText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Full Stack Web Developer";
  const [showCursor, setShowCursor] = useState(true);
  const [floatingLetters, setFloatingLetters] = useState<
    Array<{ char: string; x: number; y: number; delay: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset floating letters when component mounts
    const letters = fullText.split(" ").map((char, index) => ({
      char,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: index * 100,
    }));
    setFloatingLetters(letters);

    // Start typing animation after a brief delay
    const typingTimeout = setTimeout(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }, 1000);

    // Start cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(typingTimeout);
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    // Animate floating letters coming together
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = 50;
      const centerY = 50;

      const updatedLetters = floatingLetters.map((letter, index) => ({
        ...letter,
        x: centerX + (index - fullText.length / 2) * 4,
        y: centerY,
      }));

      setTimeout(() => {
        setFloatingLetters(updatedLetters);
      }, 500);
    }
  }, []);

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circular Rings */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full border-2 ${
              isDark ? "border-green-400/30" : "border-green-500/30"
            }`}
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              top: `${20 + i * 5}%`,
              left: `${i % 2 === 0 ? -50 : 120}%`,
              animation: `floatRing${i % 2 === 0 ? "Left" : "Right"} ${
                15 + i * 2
              }s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              opacity: 0.4 - i * 0.05,
            }}
          ></div>
        ))}

        {/* Gradient Orbs */}
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse ${
            isDark ? "bg-green-500" : "bg-green-400"
          }`}
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse ${
            isDark ? "bg-green-400" : "bg-green-300"
          }`}
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? "bg-blue-500" : "bg-blue-400"
          }`}
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        ></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid-background animate-grid-flow"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Profile Avatar with Flowing Rotating Rings */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Clean Profile Avatar with true 360° flowing rings */}
            <div
              className="mb-8 inline-block relative"
              style={{ width: "128px", height: "128px" }}
            >
              {/* Ring 1 — conic sweep, slow CW, green */}
              <div
                className="avatar-ring"
                style={{
                  width: "168px",
                  height: "168px",
                  left: "-20px",
                  top: "-20px",
                  background: `conic-gradient(from 0deg, transparent 60%, ${isDark ? "#4ade80" : "#16a34a"} 100%)`,
                  animation: "ringSpinCW 4s linear infinite",
                }}
              >
                {/* Glowing dot at head of sweep */}
                <div
                  className="ring-dot"
                  style={{
                    background: isDark ? "#4ade80" : "#16a34a",
                    boxShadow: `0 0 8px 3px ${isDark ? "#4ade8099" : "#16a34a99"}`,
                  }}
                />
              </div>

              {/* Ring 2 — conic sweep, medium CCW, lighter green */}
              <div
                className="avatar-ring"
                style={{
                  width: "152px",
                  height: "152px",
                  left: "-12px",
                  top: "-12px",
                  background: `conic-gradient(from 180deg, transparent 55%, ${isDark ? "#86efac" : "#22c55e"} 100%)`,
                  animation: "ringSpinCCW 6s linear infinite",
                }}
              >
                <div
                  className="ring-dot"
                  style={{
                    background: isDark ? "#86efac" : "#22c55e",
                    boxShadow: `0 0 6px 2px ${isDark ? "#86efac88" : "#22c55e88"}`,
                  }}
                />
              </div>

              {/* Ring 3 — dashed ring, slow CCW */}
              <div
                style={{
                  position: "absolute",
                  width: "182px",
                  height: "182px",
                  left: "-27px",
                  top: "-27px",
                  borderRadius: "50%",
                  border: `1.5px dashed ${isDark ? "#4ade8044" : "#16a34a44"}`,
                  animation: "ringSpinCCW 18s linear infinite",
                }}
              />

              {/* Ring 4 — dotted outermost, slow CW */}
              <div
                style={{
                  position: "absolute",
                  width: "196px",
                  height: "196px",
                  left: "-34px",
                  top: "-34px",
                  borderRadius: "50%",
                  border: `1.5px dotted ${isDark ? "#4ade8033" : "#16a34a33"}`,
                  animation: "ringSpinCW 25s linear infinite",
                }}
              />

              {/* Main Avatar */}
              <div
                className={`relative w-32 h-32 mx-auto rounded-full border-4 overflow-hidden group ${
                  isDark
                    ? "border-green-500 shadow-2xl shadow-green-500/30"
                    : "border-green-600 shadow-2xl shadow-green-600/20"
                }`}
                style={{ position: "relative", zIndex: 2 }}
              >
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-br from-green-500/20 via-blue-500/10 to-purple-500/5"
                      : "bg-gradient-to-br from-green-100 via-blue-50 to-purple-50"
                  }`}
                ></div>

                {/* Inner rotating ring on hover */}
                <div
                  className={`absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ${
                    isDark ? "border-green-400" : "border-green-500"
                  }`}
                  style={{ animation: "ringSpinCW 2s linear infinite" }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Code2
                      size={64}
                      className={`${isDark ? "text-green-400" : "text-green-600"} drop-shadow-lg`}
                    />
                    <Sparkles
                      size={20}
                      className={`absolute -top-2 -right-2 ${
                        isDark ? "text-yellow-400" : "text-yellow-500"
                      } animate-pulse`}
                    />
                  </div>
                </div>
              </div>

              {/* Floating particles around avatar */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1.5 h-1.5 rounded-full ${
                    isDark ? "bg-green-400" : "bg-green-500"
                  } animate-float-particle`}
                  style={{
                    left: "50%",
                    top: "50%",
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                    transformOrigin: `${Math.cos((i * 45 * Math.PI) / 180) * 80}px ${Math.sin((i * 45 * Math.PI) / 180) * 80}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Name with Gradient */}
          <h1
            className={`text-5xl md:text-7xl font-bold mb-4 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Hi, I'm{" "}
            <span
              className={`inline-block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x ${
                isDark ? "drop-shadow-lg" : "drop-shadow"
              }`}
            >
              Md Kamran
            </span>
          </h1>

          {/* Enhanced Typing Animation with Floating Effect */}
          <div
            ref={containerRef}
            className="h-20 mb-8 flex items-center justify-center relative"
          >
            {/* Floating Letters Background */}
            <div className="absolute inset-0">
              {floatingLetters.map((letter, index) => (
                <span
                  key={index}
                  className={`absolute text-2xl md:text-3xl font-semibold transition-all duration-1000 ease-out ${
                    isDark ? "text-green-400/20" : "text-green-600/20"
                  }`}
                  style={{
                    left: `${letter.x}%`,
                    top: `${letter.y}%`,
                    transitionDelay: `${letter.delay}ms`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {letter.char}
                </span>
              ))}
            </div>

            {/* Main Typing Text */}
            <h2
              className={`text-2xl md:text-3xl font-semibold relative z-10 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <span className="inline-block">
                {text.split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block animate-rubber-band"
                    style={{ animationDelay: `${index * 100 + 1000}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span
                className={`inline-block w-1 h-8 ml-1 align-middle transition-opacity duration-150 ${
                  showCursor ? "opacity-100" : "opacity-0"
                } ${isDark ? "bg-green-400" : "bg-green-600"} animate-pulse`}
              ></span>
            </h2>
          </div>

          {/* Enhanced Description */}
          <p
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm rounded-lg p-4 ${
              isDark
                ? "text-gray-300 bg-black/30 border border-green-500/20"
                : "text-gray-600 bg-white/50 border border-green-200"
            }`}
          >
            Building scalable web applications with nearly 3 years of hands-on
            experience in modern web technologies. Passionate about backend
            development, API integrations, and creating efficient, secure, and
            user-focused digital solutions.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`group relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                isDark
                  ? "bg-gradient-to-r from-green-500 to-blue-600 text-black hover:shadow-2xl hover:shadow-green-500/50"
                  : "bg-gradient-to-r from-green-600 to-blue-700 text-white hover:shadow-2xl hover:shadow-green-600/30"
              }`}
            >
              <span className="relative z-10">Get In Touch</span>
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </a>

            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#portfolio")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`group relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 transform hover:scale-105 overflow-hidden ${
                isDark
                  ? "border-green-500 text-green-400 hover:bg-green-500/10"
                  : "border-green-600 text-green-600 hover:bg-green-50"
              }`}
            >
              <span className="relative z-10">View Work</span>
              <div
                className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </a>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex items-center justify-center gap-4 mt-2">
            {[
              {
                icon: Github,
                href: "https://github.com/md-kamran400",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/md-kamran-757bb0250/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:your@email.com",
                label: "Mail",
              },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                    isDark
                      ? "bg-green-500/10 hover:bg-green-500/20 text-green-400"
                      : "bg-green-100 hover:bg-green-200 text-green-600"
                  }`}
                  aria-label={social.label}
                >
                  <Icon size={22} className="relative z-10" />
                  <span
                    className={`text-xs font-medium relative z-10 ${isDark ? "text-green-400/80" : "text-green-700/80"}`}
                  >
                    {social.label}
                  </span>
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      {/* <button
        onClick={() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }}
        className="fixed bottom-8 right-8 animate-bounce cursor-pointer focus:outline-none group bg-transparent border-0 p-0 z-50"
        aria-label="Scroll to bottom"
      >
        <div className="relative">
          <ChevronDown
            size={32}
            className={`relative z-10 transition-colors duration-300 ${
              isDark
                ? "text-green-400 group-hover:text-green-300"
                : "text-green-600 group-hover:text-green-500"
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300 ${
              isDark ? "bg-green-400/50" : "bg-green-600/50"
            }`}
          ></div>
        </div>
      </button> */}

      {/* Add CSS for floating ring animations */}
      <style>{`
        /* ── Avatar Ring styles ── */
        .avatar-ring {
          position: absolute;
          border-radius: 50%;
          /* mask so only the outer 2px band shows */
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2.5px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #fff calc(100% - 2.5px));
        }
        .ring-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          top: -3.5px;
          left: calc(50% - 3.5px);
        }
        @keyframes ringSpinCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringSpinCCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* ── end avatar rings ── */

        @keyframes floatRingLeft {
          0% {
            transform: translateX(-100px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(100px) translateY(-50px) rotate(90deg);
          }
          50% {
            transform: translateX(300px) translateY(0px) rotate(180deg);
          }
          75% {
            transform: translateX(100px) translateY(50px) rotate(270deg);
          }
          100% {
            transform: translateX(-100px) translateY(0px) rotate(360deg);
          }
        }

        @keyframes floatRingRight {
          0% {
            transform: translateX(100px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-100px) translateY(-50px) rotate(-90deg);
          }
          50% {
            transform: translateX(-300px) translateY(0px) rotate(-180deg);
          }
          75% {
            transform: translateX(-100px) translateY(50px) rotate(-270deg);
          }
          100% {
            transform: translateX(100px) translateY(0px) rotate(-360deg);
          }
        }
        
        
        @keyframes float-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(var(--tx, 20px), var(--ty, -20px)) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
        }
        
        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes rubber-band {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.2);
          }
          40% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.05);
          }
          65% {
            transform: scale(0.98);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-rubber-band {
          display: inline-block;
          animation: rubber-band 0.6s ease-in-out forwards;
          opacity: 0;
          animation: rubber-band 0.6s ease-in-out forwards, fadeIn 0.1s forwards;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
