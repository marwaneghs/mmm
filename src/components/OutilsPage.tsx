import React, { useState } from 'react';
import { useEffect } from 'react';
import { OMPICService } from '../services/ompicService';
import { JusticeService } from '../services/justiceService';
import { OMPICSearchResult, OMPICSearchParams } from '../types';
import { JusticeSearchResult, JusticeSearchParams } from '../types';
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
  const [justiceResults, setJusticeResults] = useState<JusticeSearchResult[]>([]);
  const [isJusticeSearching, setIsJusticeSearching] = useState(false);
  const [justiceSearchTime, setJusticeSearchTime] = useState<number | null>(null);
  const [justiceSearchError, setJusticeSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<OMPICSearchResult[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<OMPICSearchResult | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'ASTA', 'MAROC TELECOM', 'ATTIJARIWAFA BANK', 'OCP', 'ROYAL AIR MAROC'
  ]);
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  // Charger le CAPTCHA au montage du composant
  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    setIsCaptchaLoading(true);
    setCaptchaError(null);
    
    try {
      console.log('🔄 Chargement du CAPTCHA OMPIC...');
      const captchaData = await OMPICService.getCaptcha();
      setCaptchaImage(captchaData.imageUrl);
      console.log('✅ CAPTCHA chargé avec succès');
    } catch (error) {
      console.error('❌ Erreur chargement CAPTCHA:', error);
      setCaptchaError('Impossible de charger le CAPTCHA OMPIC');
      // Générer un CAPTCHA de fallback
      setCaptchaImage(generateFallbackCaptcha());
    } finally {
      setIsCaptchaLoading(false);
    }
  };

  const generateFallbackCaptcha = () => {
    const code = Math.floor(100 + Math.random() * 900).toString();
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" fill="#f0f0f0" stroke="#ccc"/>
        <text x="60" y="25" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#333">
          ${code}
        </text>
        <line x1="10" y1="15" x2="30" y2="25" stroke="#999" stroke-width="1"/>
        <line x1="90" y1="10" x2="110" y2="30" stroke="#999" stroke-width="1"/>
      </svg>
    `)}`;
  };

  const handleOmpicSearch = async () => {
    // Vérifier que le code CAPTCHA est saisi
    if (!captchaCode.trim()) {
      setSearchError('Veuillez saisir le code de vérification');
      return;
    }

    const hasSearchCriteria = searchParams.query.trim() || 
                             searchParams.numeroDepot?.trim() ||
                             searchParams.nomMarque?.trim() ||
                             searchParams.deposant?.trim();
    
    if (hasSearchCriteria) {
      console.log('🚀 Démarrage recherche OMPIC...');
      console.log('🔐 Code CAPTCHA utilisé:', captchaCode);
      setIsSearching(true);
      setSearchResults([]);
      setSearchTime(null);
      setSearchError(null);
      
      try {
        const searchParamsWithCaptcha = {
          ...searchParams,
          captchaCode: captchaCode
        };
        console.log('📋 Paramètres de recherche:', searchParamsWithCaptcha);
        const response = await OMPICService.searchMarques(searchParamsWithCaptcha);
        console.log('📊 RÉSULTATS RÉELS REÇUS:', response);
        
        // Stocker les résultats
        setSearchResults(response.results);
        setSearchTotal(response.total);
        setSearchTime(response.searchTime);
        
        // Ouvrir les résultats dans un nouvel onglet
        openResultsInNewTab(response.results, response.total, response.searchTime, searchParams);
        
        if (response.results.length === 0) {
          console.log('⚠️ AUCUN RÉSULTAT TROUVÉ SUR OMPIC OFFICIEL');
        } else {
          console.log(`✅ ${response.results.length} RÉSULTATS RÉELS TROUVÉS`);
        }
        
        // Add to recent searches
        const searchTerm = searchParams.query || searchParams.nomMarque || searchParams.numeroDepot || '';
        if (searchTerm) {
          setRecentSearches(prev => [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5));
        }
      } catch (error) {
        console.error('❌ Erreur recherche OMPIC:', error);
        setSearchError(`Erreur de connexion au site OMPIC officiel: ${error.message}`);
      } finally {
        setIsSearching(false);
        console.log('🏁 Recherche terminée');
      }
    }
  };

  const openResultsInNewTab = (results: OMPICSearchResult[], total: number, searchTime: number, searchParams: OMPICSearchParams) => {
    // Créer le contenu HTML pour le nouvel onglet
    const htmlContent = generateResultsHTML(results, total, searchTime, searchParams);
    
    // Ouvrir un nouvel onglet avec les résultats
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  const generateResultsHTML = (results: OMPICSearchResult[], total: number, searchTime: number, searchParams: OMPICSearchParams) => {
    const searchTerm = searchParams.typeRecherche === 'simple' ? searchParams.query : 
      [searchParams.nomMarque, searchParams.deposant, searchParams.numeroDepot].filter(Boolean).join(' ');
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Résultats OMPIC - ${searchTerm}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            color: #1e293b;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .search-info {
            background: #f1f5f9;
            padding: 20px 30px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .search-info h2 {
            color: #1e293b;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .search-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .search-detail {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        
        .search-detail strong {
            color: #1e293b;
            display: block;
            margin-bottom: 5px;
        }
        
        .stats {
            display: flex;
            justify-content: space-around;
            padding: 25px 30px;
            background: #fefefe;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #3b82f6;
            display: block;
        }
        
        .stat-label {
            color: #64748b;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .results-section {
            padding: 30px;
        }
        
        .results-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .results-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1e293b;
        }
        
        .results-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .results-table th {
            background: #f8fafc;
            padding: 18px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .results-table td {
            padding: 18px;
            border-bottom: 1px solid #f3f4f6;
            vertical-align: top;
        }
        
        .results-table tr:hover {
            background: #f8fafc;
        }
        
        .trademark-number {
            font-weight: bold;
            color: #3b82f6;
            font-size: 1.1rem;
        }
        
        .trademark-name {
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 5px;
        }
        
        .trademark-applicant {
            color: #64748b;
            font-size: 0.9rem;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .status-registered {
            background: #dcfce7;
            color: #166534;
        }
        
        .status-pending {
            background: #fef3c7;
            color: #92400e;
        }
        
        .classes {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        
        .class-badge {
            background: #e0e7ff;
            color: #3730a3;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .no-results {
            text-align: center;
            padding: 60px 30px;
            color: #64748b;
        }
        
        .no-results-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .footer {
            background: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            color: #64748b;
            font-size: 0.9rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .source-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
        }
        
        .source-link:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .stats {
                flex-direction: column;
                gap: 20px;
            }
            
            .results-table {
                font-size: 0.9rem;
            }
            
            .results-table th,
            .results-table td {
                padding: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Résultats OMPIC</h1>
            <p>Recherche dans la base de données officielle des marques</p>
        </div>
        
        <div class="search-info">
            <h2>📋 Détails de la recherche</h2>
            <div class="search-details">
                <div class="search-detail">
                    <strong>Recherche:</strong>
                    ${searchTerm}
                </div>
                <div class="search-detail">
                    <strong>Type de recherche:</strong>
                    ${searchParams.typeRecherche === 'simple' ? 'Recherche simple' : 'Recherche avancée'}
                </div>
                <div class="search-detail">
                    <strong>Date de recherche:</strong>
                    ${new Date().toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
                ${searchParams.captchaCode ? `
                <div class="search-detail">
                    <strong>Code CAPTCHA utilisé:</strong>
                    ${searchParams.captchaCode}
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="stats">
            <div class="stat">
                <span class="stat-number">${total}</span>
                <span class="stat-label">Résultats trouvés</span>
            </div>
            <div class="stat">
                <span class="stat-number">${searchTime}ms</span>
                <span class="stat-label">Temps de recherche</span>
            </div>
            <div class="stat">
                <span class="stat-number">${results.filter(r => r.statut === 'Enregistrée').length}</span>
                <span class="stat-label">Marques enregistrées</span>
            </div>
        </div>
        
        <div class="results-section">
            <div class="results-header">
                <h2 class="results-title">📊 Résultats de la recherche</h2>
            </div>
            
            ${results.length > 0 ? `
            <table class="results-table">
                <thead>
                    <tr>
                        <th>Numéro Dépôt</th>
                        <th>Nom de la Marque</th>
                        <th>Déposant</th>
                        <th>Date Dépôt</th>
                        <th>Statut</th>
                        <th>Classes</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.map(result => `
                    <tr>
                        <td>
                            <div class="trademark-number">${result.numeroDepot}</div>
                        </td>
                        <td>
                            <div class="trademark-name">${result.nomMarque}</div>
                            <div class="trademark-applicant">${result.deposant}</div>
                        </td>
                        <td>${result.deposant}</td>
                        <td>${new Date(result.dateDepot).toLocaleDateString('fr-FR')}</td>
                        <td>
                            <span class="status-badge ${result.statut === 'Enregistrée' ? 'status-registered' : 'status-pending'}">
                                ${result.statut}
                            </span>
                        </td>
                        <td>
                            <div class="classes">
                                ${result.classes.map(classe => `<span class="class-badge">${classe}</span>`).join('')}
                            </div>
                        </td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>Aucun résultat trouvé</h3>
                <p>Aucune marque ne correspond à vos critères de recherche.</p>
                <p>Essayez de modifier vos termes de recherche ou vérifiez l'orthographe.</p>
            </div>
            `}
        </div>
        
        <div class="footer">
            <p>
                Résultats obtenus depuis 
                <a href="http://search.ompic.ma/web/pages/rechercheMarque.do" target="_blank" class="source-link">
                    Site OMPIC Officiel
                </a>
                • Généré par Cabinet IP - Propriété Industrielle
            </p>
        </div>
    </div>
</body>
</html>
    `;
  };

  const resetForm = () => {
    setSearchParams({
      query: '',
      type: 'marque',
      typeRecherche: 'simple',
      operateur: 'ET'
    });
    setCaptchaCode('');
    setSearchResults([]);
    setSearchError(null);
    // Recharger un nouveau CAPTCHA
    loadCaptcha();
  };

  const updateSearchParam = (key: keyof OMPICSearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  const handleJusticeSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      performJusticeSearch(searchTerm);
    }
  };

  const performJusticeSearch = async (searchTerm: string) => {
    console.log('⚖️ Démarrage recherche Justice...');
    setIsJusticeSearching(true);
    setJusticeResults([]);
    setJusticeSearchTime(null);
    setJusticeSearchError(null);
    
    try {
      const searchParams: JusticeSearchParams = {
        query: searchTerm,
        captchaCode: captchaCode.trim()
      };
      
      console.log('📋 PARAMÈTRES ENVOYÉS:', searchParams);
      
      console.log('📋 Paramètres de recherche Justice:', searchParams);
      const response = await JusticeService.searchAffaires(searchParams);
      console.log('📊 RÉSULTATS JUSTICE RÉELS REÇUS:', response);
      
      setJusticeResults(response.results);
      setJusticeSearchTime(response.searchTime);
      
      if (response.results.length === 0) {
        console.log('⚠️ AUCUN RÉSULTAT TROUVÉ SUR PORTAIL JUSTICE OFFICIEL');
      } else {
        console.log(`✅ ${response.results.length} RÉSULTATS JUSTICE RÉELS TROUVÉS`);
      }
      
      // Add to recent searches
      setRecentSearches(prev => [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5));
      // Recharger un nouveau CAPTCHA après la recherche
      setTimeout(() => {
        loadCaptcha();
        setCaptchaCode('');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Erreur recherche Justice:', error);
      
      const errorMessage = error.message || 'Erreur lors de la recherche OMPIC';
      setSearchError(errorMessage);
      
      // Si erreur CAPTCHA, recharger automatiquement
      if (errorMessage.includes('CAPTCHA') || errorMessage.includes('Code de vérification')) {
        setTimeout(() => {
          loadCaptcha();
          setCaptchaCode('');
        }, 2000);
      }
    } finally {
      setIsJusticeSearching(false);
      console.log('🏁 Recherche Justice terminée');
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
              {/* Section CAPTCHA */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code de vérification OMPIC
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {isCaptchaLoading ? (
                        <div className="w-32 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        </div>
                      ) : captchaImage ? (
                        <img 
                          src={captchaImage} 
                          alt="Code de vérification OMPIC"
                          className="w-32 h-12 border border-gray-300 rounded-lg object-cover"
                          onError={() => {
                            console.log('❌ Erreur chargement image CAPTCHA');
                            setCaptchaImage(generateFallbackCaptcha());
                          }}
                        />
                      ) : (
                        <div className="w-32 h-12 bg-red-50 border border-red-300 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={loadCaptcha}
                      disabled={isCaptchaLoading}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Actualiser le code"
                    >
                      <ArrowRight className={`h-4 w-4 ${isCaptchaLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  {captchaError && (
                    <p className="text-xs text-red-600 mt-1">{captchaError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saisissez le code
                  </label>
                  <input
                    type="text"
                    value={captchaCode}
                    onChange={(e) => setCaptchaCode(e.target.value.toUpperCase())}
                    placeholder="Ex: ABC123"
                    maxLength={6}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-lg"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleOmpicSearch}
                  disabled={isSearching || !captchaCode.trim()}
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
                disabled={isJusticeSearching}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                {isJusticeSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>{isJusticeSearching ? t('searching') : t('search')}</span>
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
              <p className="text-gray-600 font-semibold">{t('searchingOnOfficialOmpic')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('connectingTo')} search.ompic.ma</p>
              <p className="text-xs text-gray-400 mt-1">
                Récupération des données réelles en cours...
              </p>
            </div>
          ) : searchError ? (
            <div className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('searchError')}</h3>
              <p className="text-gray-500 mb-4">{searchError}</p>
              <p className="text-xs text-gray-400 mb-4">
                💡 Le site OMPIC peut bloquer les requêtes automatiques. Essayez à nouveau ou utilisez le lien direct.
              </p>
              <button
                onClick={() => handleOmpicSearch()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('retry')}
              </button>
              <button
                onClick={() => window.open('https://search.ompic.ma/web/pages/rechercheMarque.do', '_blank')}
                className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🌐 Site OMPIC Direct
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé sur OMPIC</h3>
              <p className="text-gray-500">
                Aucune marque trouvée pour "{searchParams.query}" sur le site OMPIC officiel
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Vérifiez l'orthographe ou essayez un autre terme de recherche
              </p>
            </div>
          )}
        </div>
      )}

      {/* Justice Search Results */}
      {(justiceResults.length > 0 || isJusticeSearching) && (
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('justiceSearchResults')}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({t('searchOn')} Portail Justice officiel)
                </span>
              </h3>
              {justiceSearchTime && (
                <span className="text-sm text-gray-500">
                  {justiceResults.length} {t('results')} {t('in')} {justiceSearchTime}ms
                </span>
              )}
            </div>
          </div>
          
          {isJusticeSearching ? (
            <div className="p-12 text-center">
              <Loader2 className="h-8 w-8 text-purple-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600 font-semibold">{t('searchingOnOfficialJustice')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('connectingTo')} justice.gov.ma</p>
              <p className="text-xs text-gray-400 mt-1">
                Récupération des données réelles en cours...
              </p>
            </div>
          ) : justiceSearchError ? (
            <div className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('searchError')}</h3>
              <p className="text-gray-500 mb-4">{justiceSearchError}</p>
              <p className="text-xs text-gray-400 mb-4">
                💡 Le portail Justice peut bloquer les requêtes automatiques. Essayez à nouveau ou utilisez le lien direct.
              </p>
              <button
                onClick={() => performJusticeSearch(justiceSearch)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('retry')}
              </button>
              <button
                onClick={() => window.open('https://justice.gov.ma/', '_blank')}
                className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🌐 Portail Justice Direct
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {justiceResults.map((result) => (
                <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{result.numeroAffaire}</h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          {result.statut}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {result.typeAffaire}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Scale className="h-4 w-4" />
                            <span>{t('court')}: {result.tribunal}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{t('parties')}: {result.parties}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{t('hearing')}: {formatDate(result.dateAudience)}</span>
                          </div>
                          {result.juge && (
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{t('judge')}: {result.juge}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {result.objet && (
                        <div className="flex items-start space-x-2">
                          <Info className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700">{result.objet}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(result.numeroAffaire)}
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
          
          {!isJusticeSearching && justiceResults.length === 0 && justiceSearch && (
            <div className="p-12 text-center">
              <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé sur le portail Justice</h3>
              <p className="text-gray-500">
                Aucune affaire trouvée pour "{justiceSearch}" sur le portail Justice officiel
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Vérifiez le numéro d'affaire ou essayez un autre terme de recherche
              </p>
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