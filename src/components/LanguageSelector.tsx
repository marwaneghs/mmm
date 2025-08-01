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
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus-ring"
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
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="dropdown-content fade-in">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`dropdown-item ${currentLanguage === language.code ? 'active' : ''}`}
              >
                <span className="text-lg mr-3">{language.flag}</span>
                <span className="flex-1 text-left font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 text-blue-600" />
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