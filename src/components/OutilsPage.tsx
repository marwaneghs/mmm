import React, { useState } from 'react';
import { 
  ExternalLink, 
  Search, 
  Globe, 
  FileText, 
  Scale, 
  Building,
  Eye,
  Copy,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const OutilsPage: React.FC = () => {
  const [ompicSearch, setOmpicSearch] = useState('');
  const [justiceSearch, setJusticeSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'TechnoSoft',
    'M202411001',
    'InnovaTech',
    'COM2024/156'
  ]);

  const handleOmpicSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      const url = `http://www.ompic.ma/fr/recherche?query=${encodeURIComponent(searchTerm)}`;
      window.open(url, '_blank');
      
      // Add to recent searches
      setRecentSearches(prev => [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5));
    }
  };

  const handleJusticeSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      const url = `https://justice.gov.ma/tribunaux-de-premiere-instance/`;
      window.open(url, '_blank');
      
      // Add to recent searches
      setRecentSearches(prev => [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5));
    }
  };

  const quickActions = [
    {
      title: 'Recherche Marques OMPIC',
      description: 'Rechercher dans la base de données des marques déposées',
      icon: Search,
      color: 'bg-blue-500',
      action: () => window.open('http://www.ompic.ma/fr/recherche-marques', '_blank'),
    },
    {
      title: 'Dépôt en ligne OMPIC',
      description: 'Accéder au système de dépôt électronique',
      icon: FileText,
      color: 'bg-green-500',
      action: () => window.open('http://www.ompic.ma/fr/depot-en-ligne', '_blank'),
    },
    {
      title: 'État des procédures',
      description: 'Consulter l\'état d\'avancement des dossiers',
      icon: Eye,
      color: 'bg-purple-500',
      action: () => window.open('http://www.ompic.ma/fr/etat-procedures', '_blank'),
    },
    {
      title: 'Tribunaux Commerce',
      description: 'Accéder aux tribunaux de première instance',
      icon: Scale,
      color: 'bg-orange-500',
      action: () => window.open('https://justice.gov.ma/tribunaux-de-premiere-instance/', '_blank'),
    },
  ];

  const ompicServices = [
    {
      name: 'Recherche Marques',
      description: 'Base de données des marques déposées au Maroc',
      url: 'http://www.ompic.ma/fr/recherche-marques',
      status: 'active'
    },
    {
      name: 'Recherche Brevets',
      description: 'Consultation des brevets d\'invention',
      url: 'http://www.ompic.ma/fr/recherche-brevets',
      status: 'active'
    },
    {
      name: 'Registre Commerce',
      description: 'Registre central du commerce',
      url: 'http://www.ompic.ma/fr/registre-commerce',
      status: 'active'
    },
    {
      name: 'Dépôt Électronique',
      description: 'Système de dépôt en ligne',
      url: 'http://www.ompic.ma/fr/depot-electronique',
      status: 'maintenance'
    }
  ];

  const justiceServices = [
    {
      name: 'Tribunaux de Commerce',
      description: 'Juridictions spécialisées en droit commercial',
      url: 'https://justice.gov.ma/tribunaux-de-premiere-instance/',
      status: 'active'
    },
    {
      name: 'Suivi des Affaires',
      description: 'Consultation de l\'état des procédures',
      url: 'https://justice.gov.ma/suivi-affaires/',
      status: 'active'
    },
    {
      name: 'Jurisprudence',
      description: 'Base de données jurisprudentielle',
      url: 'https://justice.gov.ma/jurisprudence/',
      status: 'active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Outils Externes</h2>
          <p className="text-gray-600">Intégration avec OMPIC et portails Justice</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105 text-left"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`${action.color} p-2 rounded-lg text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Search Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OMPIC Search */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg text-white">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recherche OMPIC</h3>
              <p className="text-sm text-gray-600">Marques, brevets et registre du commerce</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Nom de marque, numéro de dépôt..."
                value={ompicSearch}
                onChange={(e) => setOmpicSearch(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleOmpicSearch(ompicSearch)}
              />
              <button
                onClick={() => handleOmpicSearch(ompicSearch)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Rechercher</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.open('http://www.ompic.ma/fr', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span>Accéder au site OMPIC</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Justice Search */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-500 p-2 rounded-lg text-white">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Portail Justice</h3>
              <p className="text-sm text-gray-600">Tribunaux et suivi des procédures</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Numéro d'affaire, référence tribunal..."
                value={justiceSearch}
                onChange={(e) => setJusticeSearch(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && handleJusticeSearch(justiceSearch)}
              />
              <button
                onClick={() => handleJusticeSearch(justiceSearch)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Rechercher</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.open('https://justice.gov.ma/', '_blank')}
                className="text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span>Accéder au portail Justice</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recherches Récentes</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm flex items-center space-x-2 transition-colors"
                onClick={() => {
                  setOmpicSearch(search);
                  handleOmpicSearch(search);
                }}
              >
                <span>{search}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Services Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OMPIC Services */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services OMPIC</h3>
          <div className="space-y-3">
            {ompicServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    {service.status === 'active' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <button
                  onClick={() => window.open(service.url, '_blank')}
                  className="ml-4 text-blue-600 hover:text-blue-800"
                  disabled={service.status === 'maintenance'}
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Justice Services */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Justice</h3>
          <div className="space-y-3">
            {justiceServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <button
                  onClick={() => window.open(service.url, '_blank')}
                  className="ml-4 text-purple-600 hover:text-purple-800"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutilsPage;