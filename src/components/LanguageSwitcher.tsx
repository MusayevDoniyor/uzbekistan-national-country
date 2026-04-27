import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 md:top-10 md:right-10 z-[100] bg-[#1A1A1A] text-white px-4 py-2 text-xs md:text-sm uppercase tracking-widest font-bold shadow-lg hover:bg-[#333] transition-colors"
      aria-label="Toggle Language"
    >
      {i18n.language === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}
