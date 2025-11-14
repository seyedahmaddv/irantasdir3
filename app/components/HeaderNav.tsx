import { useState, useEffect } from 'react';
import { useLanguageStore } from '../stores/languageStore';
import { useNavigationStore } from '../stores/navigationStore';
import { translations } from '../translations';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '../components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../components/ui/navigation-menu';
import { MenuIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeaderNav() {
  const { language, direction } = useLanguageStore();
  const { activeSection, setActiveSection } = useNavigationStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'products', label: t.nav.products },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  // شفاف روی Hero، سفید در بقیه
  const headerBgClass =
    activeSection === 'home' && !isScrolled
      ? 'bg-transparent'
      : 'bg-[hsl(var(--color-background))] shadow-md';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
      dir={direction}
    >
      <nav className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between min-h-[64px]">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-headline font-bold text-foreground hover:text-primary transition-colors duration-200"
            >
              {language === 'fa' ? 'صادرات ایران' : 'Iran Export'}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu
              className={`transition-colors duration-300 ${
                activeSection === 'home' && !isScrolled
                  ? 'bg-transparent'
                  : 'bg-[hsl(var(--color-background))]'
              }`}
            >
              <NavigationMenuList className="flex gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`px-4 py-2 text-base font-normal transition-colors duration-200 cursor-pointer hover:text-primary ${
                        activeSection === item.id
                          ? 'text-primary font-semibold'
                          : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <LanguageToggle />
          </div>

          {/* Mobile MenuIcon Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <MenuIcon className="w-6 h-6" strokeWidth={1.5} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[hsl(var(--color-background))] border-t border-border mt-4"
            >
              <NavigationMenu className="w-full">
                <NavigationMenuList className="flex flex-col w-full gap-2 py-4">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.id} className="w-full">
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 text-base font-normal transition-colors duration-200 cursor-pointer hover:bg-secondary hover:text-secondary-foreground ${
                          activeSection === item.id
                            ? 'text-primary font-semibold bg-secondary/20'
                            : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </button>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
