import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../translations';
import { Card } from '../components/ui/card';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ProductsSection() {
  const { language, direction } = useLanguageStore();
  const t = translations[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const productImages = [
    '/product_3.png',
    '/product_2.png',
    '/product_4.png',
    '/product_5.png',
  ];

  return (
    <section
      id="products"
      ref={ref}
      className="py-24 md:py-32 bg-background"
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
            {t.products.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.products.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.products.categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 bg-card text-card-foreground border border-border">
                <div className="relative overflow-hidden">
                  <img
                    src={productImages[index]}
                    alt={`Placeholder alt tag for asset ai_${index + 2}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-headline font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {category.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
