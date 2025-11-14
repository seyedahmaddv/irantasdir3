import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../translations';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

export function HeroSection() {
  const { language, direction } = useLanguageStore();
  const t = translations[language];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
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

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden"
      dir={direction}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.video
          src="/1.mp4"
          poster="/1-poster.png"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/100" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 text-base font-normal px-8 py-6"
            >
              {t.hero.cta}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDownIcon className="w-8 h-8 text-white" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
