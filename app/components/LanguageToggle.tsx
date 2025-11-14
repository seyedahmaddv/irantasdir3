import { useLanguageStore } from '../stores/languageStore';
import { Button } from '../components/ui/button';
import { GlobeIcon } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200"
      aria-label="Toggle language"
    >
      <GlobeIcon className="w-5 h-5" strokeWidth={1.5} />
      <span className="ml-2 font-normal">{language === 'fa' ? 'EN' : 'FA'}</span>
    </Button>
  );
}
