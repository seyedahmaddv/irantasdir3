import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../translations';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const { language, direction } = useLanguageStore();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-neutral"
      dir={direction}
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
            {t.about.title}
          </h2>
          <p className="text-xl text-muted-foreground">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: direction === 'rtl' ? 50 : -50 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/aboutus_2.png"
              alt="company mission image"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: direction === 'rtl' ? -50 : 50 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground leading-relaxed">
              {t.about.description}
            </p>
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
              <p className="text-lg text-foreground font-semibold">
                {t.about.mission}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
