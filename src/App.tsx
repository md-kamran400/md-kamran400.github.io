// App.tsx - Updated without floating particles
import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import CursorFollower from "./components/CursorFollower";
import AIChat from "./components/AIChat";
// import CursorFollower from "./components/CursorFollower";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Floating Cursor Effect */}
      {/* <div className="fixed inset-0 pointer-events-none z-50">
        <div
          className={`absolute w-8 h-8 rounded-full transition-all duration-100 ease-out ${
            isHovering ? 'scale-150 opacity-30' : 'scale-100 opacity-20'
          } ${isDark ? 'bg-green-400' : 'bg-green-600'}`}
          style={{
            left: cursorPosition.x - 16,
            top: cursorPosition.y - 16,
          }}
        ></div>
        <div
          className={`absolute w-2 h-2 rounded-full transition-all duration-75 ease-out ${
            isHovering ? 'scale-75' : 'scale-100'
          } ${isDark ? 'bg-green-400' : 'bg-green-600'}`}
          style={{
            left: cursorPosition.x - 4,
            top: cursorPosition.y - 4,
          }}
        ></div>
      </div> */}

      {/* Clean Background - No Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-black via-gray-900 to-black"
              : "bg-gradient-to-br from-white via-gray-50 to-white"
          }`}
        ></div>
      </div>

      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="relative">
        <CursorFollower />
        <Hero isDark={isDark} />
        <About isDark={isDark} />
        <Skills isDark={isDark} />
        <Portfolio isDark={isDark} />
        <Resume isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      <footer
        className={`py-8 text-center border-t backdrop-blur-sm ${
          isDark
            ? "border-green-500/20 bg-black/50"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <p className="text-sm">© 2025 Md Kamran. All rights reserved.</p>
      </footer>

      {/* AI Chat Assistant */}
      <AIChat isDark={isDark} />
    </div>
  );
}

export default App;
