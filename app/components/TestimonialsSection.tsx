import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../translations';
import { Card } from '../components/ui/card';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-react';
import { Button } from '../components/ui/button';

export function TestimonialsSection() {
  const { language, direction } = useLanguageStore();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = t.testimonials.items;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 md:py-32 bg-gradient-1"
      dir={direction}
    >
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-white/90">{t.testimonials.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white p-12 relative overflow-hidden">
              <QuoteIcon className="absolute top-8 left-8 w-16 h-16 text-primary/20" strokeWidth={1} />
              
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <p className="text-xl text-foreground leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="font-headline font-bold text-lg text-foreground">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={goToPrev}
              size="sm"
              className="bg-white text-foreground hover:bg-white/90 transition-colors duration-200 font-normal"
              aria-label="Previous testimonial"
            >
              {direction === 'rtl' ? (
                <ChevronRightIcon className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <ChevronLeftIcon className="w-5 h-5" strokeWidth={1.5} />
              )}
            </Button>
            <Button
              onClick={goToNext}
              size="sm"
              className="bg-white text-foreground hover:bg-white/90 transition-colors duration-200 font-normal"
              aria-label="Next testimonial"
            >
              {direction === 'rtl' ? (
                <ChevronLeftIcon className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <ChevronRightIcon className="w-5 h-5" strokeWidth={1.5} />
              )}
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
