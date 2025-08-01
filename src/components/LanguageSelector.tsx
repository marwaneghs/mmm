import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-white/80 rounded-xl transition-all duration-300 hover-lift shadow-soft bg-white/60 backdrop-blur-sm"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang?.flag}</span>
        <span className="hidden md:inline font-medium">{currentLang?.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl rounded-xl shadow-large border border-white/20 z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    changeLanguage(language.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center space-x-3 transition-all duration-200 ${
                    currentLanguage === language.code 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {currentLanguage === language.code && (
                    <span className="ml-auto text-blue-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;