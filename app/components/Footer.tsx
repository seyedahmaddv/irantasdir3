import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../translations';
import { Separator } from './ui/separator';
import { LanguageToggle } from './LanguageToggle';

export function Footer() {
  const { language, direction } = useLanguageStore();
  const t = translations[language];

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
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'products', label: t.nav.products },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16" dir={direction}>
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-headline font-bold mb-4">
              {language === 'fa' ? 'صادرات ایران' : 'Iran Export'}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {language === 'fa'
                ? 'ارائه بهترین محصولات ایرانی به بازارهای جهانی'
                : 'Delivering the finest Iranian products to global markets'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-4">
              {t.footer.links}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/90 hover:text-white transition-colors duration-200 cursor-pointer text-base font-normal"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Toggle */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-4">
              {language === 'fa' ? 'زبان' : 'Language'}
            </h4>
            <LanguageToggle />
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div className="text-center">
          <p className="text-white/90 text-sm">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
