import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const Header = ({ isDark, toggleTheme, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '#resume' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-black/80 backdrop-blur-xl border-b border-green-500/20 shadow-lg shadow-green-500/5'
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="text-2xl font-bold tracking-tight group"
          >
            <span className={`transition-colors ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {'<'}
            </span>
            <span className="relative">
              MK
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                isDark ? 'bg-green-400' : 'bg-green-600'
              }`}></span>
            </span>
            <span className={`transition-colors ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {' />'}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative group text-sm font-medium tracking-wide"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={`transition-colors ${
                  isDark ? 'text-gray-300 group-hover:text-green-400' : 'text-gray-600 group-hover:text-green-600'
                }`}>
                  {item.name}
                </span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  isDark ? 'bg-green-400' : 'bg-green-600'
                }`}></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                  : 'bg-green-100 hover:bg-green-200 text-green-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                  : 'bg-green-100 hover:bg-green-200 text-green-600'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-4 py-4 rounded-lg ${
              isDark ? 'bg-green-500/5 border border-green-500/20' : 'bg-gray-50 border border-gray-200'
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-gray-300 hover:text-green-400 hover:bg-green-500/10'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
