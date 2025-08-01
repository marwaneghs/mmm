import React, { useState } from 'react';
import { OMPICService } from '../services/ompicService';
import { OMPICSearchResult, OMPICSearchParams } from '../types';
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
  CheckCircle,
  Loader2,
  Calendar,
  User,
  Hash,
  Tag,
  Info
} from 'lucide-react';

const OutilsPage: React.FC = () => {
  const [ompicSearch, setOmpicSearch] = useState('');
  const [justiceSearch, setJusticeSearch] = useState('');
  const [searchResults, setSearchResults] = useState<OMPICSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<OMPICSearchResult | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'TechnoSoft',
    'M202411001',
    'InnovaTech',
  ]);

  const handleOmpicSearch = async (searchTerm: string) => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      setSearchResults([]);
      setSearchTime(null);
      
      try {
        const params: OMPICSearchParams = {
          query: searchTerm,
          type: 'marque'
        };
        
        const response = await OMPICService.searchMarques(params);
        setSearchResults(response.results);
        setSearchTime(response.searchTime);
        
        // Add to recent searches
        setRecentSearches(prev => [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5));
      } catch (error) {
        console.error('Erreur lors de la recherche OMPIC:', error);
      } finally {
        setIsSearching(false);
      }
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

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Enregistrée': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Rejetée': return 'bg-red-100 text-red-800';
      case 'Expirée': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
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
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>{isSearching ? 'Recherche...' : 'Rechercher'}</span>
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

      {/* Search Results */}
      {(searchResults.length > 0 || isSearching) && (
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Résultats de recherche OMPIC
              </h3>
              {searchTime && (
                <span className="text-sm text-gray-500">
                  {searchResults.length} résultat(s) en {searchTime}ms
                </span>
              )}
            </div>
          </div>
          
          {isSearching ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Recherche en cours dans la base OMPIC...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {searchResults.map((result) => (
                <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{result.nomMarque}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatutColor(result.statut)}`}>
                          {result.statut}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-4 w-4" />
                            <span>N° Dépôt: {result.numeroDepot}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Déposant: {result.deposant}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Dépôt: {formatDate(result.dateDepot)}</span>
                          </div>
                          {result.dateExpiration && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>Expiration: {formatDate(result.dateExpiration)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Classes: </span>
                        {result.classes.map((classe, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {classe}
                          </span>
                        ))}
                      </div>
                      
                      {result.description && (
                        <div className="flex items-start space-x-2">
                          <Info className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700">{result.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setSelectedResult(result)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(result.numeroDepot)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copier le numéro"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isSearching && searchResults.length === 0 && ompicSearch && (
            <div className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-500">
                Aucune marque trouvée pour "{ompicSearch}" dans la base OMPIC
              </p>
            </div>
          )}
        </div>
      )}

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

      {/* Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Détails de la marque
              </h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">{selectedResult.nomMarque}</h2>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatutColor(selectedResult.statut)}`}>
                  {selectedResult.statut}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de dépôt
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-mono text-gray-900">{selectedResult.numeroDepot}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedResult.numeroDepot)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Déposant
                    </label>
                    <p className="text-gray-900">{selectedResult.deposant}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Classes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedResult.classes.map((classe, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          Classe {classe}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de dépôt
                    </label>
                    <p className="text-gray-900">{formatDate(selectedResult.dateDepot)}</p>
                  </div>
                  
                  {selectedResult.dateExpiration && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'expiration
                      </label>
                      <p className="text-gray-900">{formatDate(selectedResult.dateExpiration)}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatutColor(selectedResult.statut)}`}>
                      {selectedResult.statut}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedResult.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedResult.description}
                  </p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => window.open(`http://www.ompic.ma/fr/marque/${selectedResult.numeroDepot}`, '_blank')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Voir sur OMPIC</span>
                </button>
              </div>
            </div>
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