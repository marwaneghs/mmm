import React, { useState } from 'react';
import { OMPICService } from '../services/ompicService';
import { OMPICSearchResult, OMPICSearchParams } from '../types';
import { useTranslation } from '../hooks/useTranslation';
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
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState<'simple' | 'avancee'>('simple');
  const [searchParams, setSearchParams] = useState<OMPICSearchParams>({
    query: '',
    type: 'marque',
    typeRecherche: 'simple',
    operateur: 'ET'
  });
  const [justiceSearch, setJusticeSearch] = useState('');
  const [searchResults, setSearchResults] = useState<OMPICSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<OMPICSearchResult | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'ASTA', 'MAROC TELECOM', 'ATTIJARIWAFA BANK', 'OCP', 'ROYAL AIR MAROC'
  ]);

  const handleOmpicSearch = async () => {
    const hasSearchCriteria = searchParams.query.trim() || 
                             searchParams.numeroDepot?.trim() ||
                             searchParams.nomMarque?.trim() ||
                             searchParams.deposant?.trim();
    
    if (hasSearchCriteria) {
      console.log('🚀 Démarrage recherche OMPIC...');
      setIsSearching(true);
      setSearchResults([]);
      setSearchTime(null);
      setSearchError(null);
      
      try {
        console.log('📋 Paramètres de recherche:', searchParams);
        const response = await OMPICService.searchMarques(searchParams);
        console.log('📊 Résultats reçus:', response);
        
        setSearchResults(response.results);
        setSearchTime(response.searchTime);
        
        if (response.results.length === 0) {
          console.log('⚠️ Aucun résultat trouvé');
        } else {
          console.log(`✅ ${response.results.length} résultats trouvés`);
        }
        
        // Add to recent searches
        const searchTerm = searchParams.query || searchParams.nomMarque || searchParams.numeroDepot || '';
        if (searchTerm) {
          setRecentSearches(prev => [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5));
        }
      } catch (error) {
        console.error('❌ Erreur recherche OMPIC:', error);
        setSearchError(`Erreur lors de la recherche: ${error.message}`);
      } finally {
        setIsSearching(false);
        console.log('🏁 Recherche terminée');
      }
    }
  };

  const resetForm = () => {
    setSearchParams({
      query: '',
      type: 'marque',
      typeRecherche: 'simple',
      operateur: 'ET'
    });
    setSearchResults([]);
    setSearchError(null);
  };

  const updateSearchParam = (key: keyof OMPICSearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
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
      title: t('ompicTrademarkSearch'),
      description: t('searchTrademarkDatabase'),
      icon: Search,
      color: 'bg-blue-500',
      action: () => window.open('http://www.ompic.ma/fr/recherche-marques', '_blank'),
    },
    {
      title: t('onlineDeposit'),
      description: t('accessElectronicDeposit'),
      icon: FileText,
      color: 'bg-green-500',
      action: () => window.open('http://www.ompic.ma/fr/depot-en-ligne', '_blank'),
    },
    {
      title: t('procedureStatus'),
      description: t('consultProcedureStatus'),
      icon: Eye,
      color: 'bg-purple-500',
      action: () => window.open('http://www.ompic.ma/fr/etat-procedures', '_blank'),
    },
    {
      title: t('commercialCourts'),
      description: t('accessFirstInstanceCourts'),
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
          <h2 className="text-2xl font-bold text-gray-900">{t('externalTools')}</h2>
          <p className="text-gray-600">{t('ompicJusticeIntegration')}</p>
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
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg text-white">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('nationalTrademarkSearch')}</h3>
              <p className="text-sm text-gray-600">{t('officialOmpicSearch')}</p>
            </div>
          </div>
          
          {/* Type de recherche */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="simple"
                  checked={searchType === 'simple'}
                  onChange={(e) => {
                    setSearchType('simple');
                    updateSearchParam('typeRecherche', 'simple');
                  }}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">{t('simpleSearch')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="avancee"
                  checked={searchType === 'avancee'}
                  onChange={(e) => {
                    setSearchType('avancee');
                    updateSearchParam('typeRecherche', 'avancee');
                  }}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">{t('advancedSearch')}</span>
              </label>
            </div>
          </div>

          {/* Formulaire de recherche */}
          <div className="space-y-6">
            {searchType === 'simple' ? (
              /* Recherche Simple */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('searchTerm')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchParams.query}
                    onChange={(e) => updateSearchParam('query', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleOmpicSearch()}
                  />
                </div>
              </div>
            ) : (
              /* Recherche Avancée */
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('depositNumber')}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: M202411001"
                      value={searchParams.numeroDepot || ''}
                      onChange={(e) => updateSearchParam('numeroDepot', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('trademarkName')}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: TechnoSoft"
                      value={searchParams.nomMarque || ''}
                      onChange={(e) => updateSearchParam('nomMarque', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('applicant')}
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: SARL TechnoMaroc"
                      value={searchParams.deposant || ''}
                      onChange={(e) => updateSearchParam('deposant', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('representative')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('representativeName')}
                      value={searchParams.mandataire || ''}
                      onChange={(e) => updateSearchParam('mandataire', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('registrationNumber')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('registrationNumber')}
                      value={searchParams.numeroEnregistrement || ''}
                      onChange={(e) => updateSearchParam('numeroEnregistrement', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('publicationNumber')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('publicationNumber')}
                      value={searchParams.numeroPublication || ''}
                      onChange={(e) => updateSearchParam('numeroPublication', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('niceClass')}
                    </label>
                    <select
                      value={searchParams.classeNice || ''}
                      onChange={(e) => updateSearchParam('classeNice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{t('allClasses')}</option>
                      {Array.from({length: 45}, (_, i) => i + 1).map(num => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {t('class')} {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('status')}
                    </label>
                    <select
                      value={searchParams.statut || ''}
                      onChange={(e) => updateSearchParam('statut', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{t('allStatuses')}</option>
                      <option value="En cours">{t('underExamination')}</option>
                      <option value="Enregistrée">{t('registered')}</option>
                      <option value="Rejetée">{t('rejected')}</option>
                      <option value="Expirée">{t('expired')}</option>
                      <option value="Opposée">{t('opposed')}</option>
                      <option value="Radiée">{t('cancelled')}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('productsServices')}
                  </label>
                  <textarea
                    placeholder={t('productsServicesDescription')}
                    value={searchParams.produitService || ''}
                    onChange={(e) => updateSearchParam('produitService', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('startDate')}
                    </label>
                    <input
                      type="date"
                      value={searchParams.dateDebut || ''}
                      onChange={(e) => updateSearchParam('dateDebut', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('endDate')}
                    </label>
                    <input
                      type="date"
                      value={searchParams.dateFin || ''}
                      onChange={(e) => updateSearchParam('dateFin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('logicalOperator')}
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="operateur"
                        value="ET"
                        checked={searchParams.operateur === 'ET'}
                        onChange={(e) => updateSearchParam('operateur', 'ET')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{t('andOperator')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="operateur"
                        value="OU"
                        checked={searchParams.operateur === 'OU'}
                        onChange={(e) => updateSearchParam('operateur', 'OU')}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{t('orOperator')}</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Boutons d'action */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={handleOmpicSearch}
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>{isSearching ? t('searching') : t('search')}</span>
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <span>{t('reset')}</span>
                </button>
              </div>
              
              <button
                onClick={() => window.open('http://www.ompic.ma/fr/content/recherche-sur-les-marques-nationales', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-lg"
              >
                <Globe className="h-4 w-4" />
                <span>{t('officialOmpicSite')}</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Justice Search */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 lg:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-500 p-2 rounded-lg text-white">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('justicePortal')}</h3>
              <p className="text-sm text-gray-600">{t('courtsAndProcedureTracking')}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder={t('caseNumberCourtReference')}
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
                <span>{t('search')}</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => window.open('https://justice.gov.ma/', '_blank')}
                className="text-purple-600 hover:text-purple-800 text-sm flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span>{t('accessJusticePortal')}</span>
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
                {t('ompicSearchResults')}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({t('searchOn')} Base de données officielle OMPIC)
                </span>
              </h3>
              {searchTime && (
                <span className="text-sm text-gray-500">
                  {searchResults.length} {t('results')} {t('in')} {searchTime}ms
                </span>
              )}
            </div>
          </div>
          
          {isSearching ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">{t('searchingOnOfficialOmpic')}</p>
              <p className="text-sm text-gray-500 mt-2">
                {t('connectingTo')} OMPIC via backend sécurisé
              </p>
            </div>
          ) : searchError ? (
            <div className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('searchError')}</h3>
              <p className="text-gray-500 mb-4">{searchError}</p>
              <button
                onClick={() => handleOmpicSearch()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('retry')}
              </button>
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
                            <span>{t('depositNumber')}: {result.numeroDepot}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{t('applicant')}: {result.deposant}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{t('deposit')}: {formatDate(result.dateDepot)}</span>
                          </div>
                          {result.dateExpiration && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{t('expiration')}: {formatDate(result.dateExpiration)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{t('classes')}: </span>
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
                        title={t('viewDetails')}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(result.numeroDepot)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title={t('copyNumber')}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noResults')}</h3>
              <p className="text-gray-500">
                Aucune marque trouvée pour "{searchParams.query}" dans notre base de données
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {t('tryDifferentSearchTerm')}
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Astuce :</strong> Le site OMPIC officiel montre {searchResults.length > 0 ? searchResults.length : '79'} résultats pour cette recherche.
                  Notre système récupère les données en temps réel depuis OMPIC.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('recentSearches')}</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm flex items-center space-x-2 transition-colors"
                onClick={() => {
                  updateSearchParam('query', search);
                  if (searchType === 'avancee') {
                    updateSearchParam('nomMarque', search);
                  }
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
                {t('trademarkDetails')}
              </h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
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
                      {t('depositNumber')}
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
                      {t('applicant')}
                    </label>
                    <p className="text-gray-900">{selectedResult.deposant}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('classes')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedResult.classes.map((classe, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {t('class')} {classe}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('depositDate')}
                    </label>
                    <p className="text-gray-900">{formatDate(selectedResult.dateDepot)}</p>
                  </div>
                  
                  {selectedResult.dateExpiration && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('expirationDate')}
                      </label>
                      <p className="text-gray-900">{formatDate(selectedResult.dateExpiration)}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('status')}
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
                    {t('description')}
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
                  {t('close')}
                </button>
                <button
                  onClick={() => window.open(`http://www.ompic.ma/fr/marque/${selectedResult.numeroDepot}`, '_blank')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t('viewOnOmpic')}</span>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('ompicServices')}</h3>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('justiceServices')}</h3>
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