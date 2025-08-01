import React, { useState } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-white/60 rounded-xl transition-all duration-200 focus-ring backdrop-blur-sm"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline text-lg">{currentLang?.flag}</span>
        <span className="hidden md:inline font-medium">{currentLang?.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10 bg-black/5 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl min-w-[200px] z-20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm transition-all hover:bg-blue-50 ${
                  currentLanguage === language.code 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                <span className="text-lg mr-3">{language.flag}</span>
                <span className="flex-1 text-left font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 text-blue-600 animate-in zoom-in-50 duration-200" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;