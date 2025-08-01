import { OMPICSearchResult, OMPICSearchParams } from '../types';

// Service pour la recherche OMPIC réelle
export class OMPICService {
  private static readonly BASE_URL = 'http://www.ompic.ma/fr/content/recherche-sur-les-marques-nationales';
  private static readonly PROXY_URL = '/api/ompic-proxy'; // Proxy pour éviter les problèmes CORS

  static async searchMarques(params: OMPICSearchParams): Promise<{
    results: OMPICSearchResult[];
    total: number;
    searchTime: number;
  }> {
    const startTime = Date.now();
    
    try {
      // En raison des restrictions CORS, nous utilisons un proxy ou une approche alternative
      // Pour la démonstration, nous simulons la recherche avec des données réalistes
      const response = await this.simulateOMPICSearch(params);
      
      const searchTime = Date.now() - startTime;
      
      return {
        results: response.results,
        total: response.results.length,
        searchTime
      };
    } catch (error) {
      console.error('Erreur lors de la recherche OMPIC:', error);
      
      // Fallback vers des données simulées en cas d'erreur
      return this.getFallbackResults(params, Date.now() - startTime);
    }
  }

  // Simulation de la recherche OMPIC avec des données réalistes
  private static async simulateOMPICSearch(params: OMPICSearchParams): Promise<{
    results: OMPICSearchResult[];
  }> {
    // Simulation d'un délai réseau réaliste
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const mockDatabase = [
      {
        id: '1',
        numeroDepot: 'M202411001',
        nomMarque: 'TechnoSoft',
        deposant: 'SARL TechnoMaroc',
        dateDepot: '2024-11-01',
        dateExpiration: '2034-11-01',
        statut: 'En cours' as const,
        classes: ['09', '42'],
        description: 'Logiciels informatiques, services de développement technologique',
        imageUrl: undefined
      },
      {
        id: '2',
        numeroDepot: 'M202410156',
        nomMarque: 'InnovaTech',
        deposant: 'Innovation Technologies SARL',
        dateDepot: '2024-10-15',
        dateExpiration: '2034-10-15',
        statut: 'Enregistrée' as const,
        classes: ['35', '42'],
        description: 'Services commerciaux, développement technologique, conseil en informatique'
      },
      {
        id: '3',
        numeroDepot: 'M202409088',
        nomMarque: 'MarocDesign',
        deposant: 'Société Marocaine Design',
        dateDepot: '2024-09-08',
        dateExpiration: '2034-09-08',
        statut: 'Enregistrée' as const,
        classes: ['25', '35'],
        description: 'Vêtements, chaussures, chapellerie; services de design graphique'
      },
      {
        id: '4',
        numeroDepot: 'M202408234',
        nomMarque: 'GlobalTech',
        deposant: 'Global Innovations Inc.',
        dateDepot: '2024-08-23',
        dateExpiration: '2034-08-23',
        statut: 'En cours' as const,
        classes: ['09', '35', '42'],
        description: 'Technologies informatiques, services commerciaux, recherche et développement'
      },
      {
        id: '5',
        numeroDepot: 'M202407145',
        nomMarque: 'EcoVert',
        deposant: 'EcoSolutions Maroc',
        dateDepot: '2024-07-14',
        dateExpiration: '2034-07-14',
        statut: 'Rejetée' as const,
        classes: ['03', '05'],
        description: 'Produits écologiques, produits chimiques pour l\'environnement'
      },
      {
        id: '6',
        numeroDepot: 'M202406089',
        nomMarque: 'AtlasTech',
        deposant: 'Atlas Technologies SARL',
        dateDepot: '2024-06-08',
        dateExpiration: '2034-06-08',
        statut: 'Enregistrée' as const,
        classes: ['09', '38', '42'],
        description: 'Matériel informatique, télécommunications, services informatiques'
      },
      {
        id: '7',
        numeroDepot: 'M202405167',
        nomMarque: 'BioMaroc',
        deposant: 'Laboratoires BioMaroc SA',
        dateDepot: '2024-05-16',
        dateExpiration: '2034-05-16',
        statut: 'En cours' as const,
        classes: ['05', '44'],
        description: 'Produits pharmaceutiques, services médicaux et vétérinaires'
      },
      {
        id: '8',
        numeroDepot: 'M202404123',
        nomMarque: 'DigitalMaroc',
        deposant: 'Digital Solutions Morocco',
        dateDepot: '2024-04-12',
        dateExpiration: '2034-04-12',
        statut: 'Enregistrée' as const,
        classes: ['35', '41', '42'],
        description: 'Services de publicité, éducation, services informatiques'
      },
      {
        id: '9',
        numeroDepot: 'M202403078',
        nomMarque: 'AgroTech',
        deposant: 'AgroTechnologies du Maroc',
        dateDepot: '2024-03-07',
        dateExpiration: '2034-03-07',
        statut: 'En cours' as const,
        classes: ['07', '31', '42'],
        description: 'Machines agricoles, produits agricoles, recherche technologique'
      },
      {
        id: '10',
        numeroDepot: 'M202402045',
        nomMarque: 'SmartCity',
        deposant: 'Smart Solutions International',
        dateDepot: '2024-02-04',
        dateExpiration: '2034-02-04',
        statut: 'Enregistrée' as const,
        classes: ['09', '37', '42'],
        description: 'Équipements électroniques, services de construction, développement de logiciels'
      }
    ];

    const query = params.query.toLowerCase();
    
    let filteredResults = mockDatabase.filter(result => {
      const matchesQuery = result.nomMarque.toLowerCase().includes(query) ||
                          result.deposant.toLowerCase().includes(query) ||
                          result.numeroDepot.toLowerCase().includes(query) ||
                          result.description.toLowerCase().includes(query);
      
      const matchesStatut = !params.statut || params.statut === 'Tous' || result.statut === params.statut;
      
      return matchesQuery && matchesStatut;
    });

    // Si aucun résultat exact, on fait une recherche plus large
    if (filteredResults.length === 0 && query.length > 2) {
      filteredResults = mockDatabase.filter(result => {
        return result.nomMarque.toLowerCase().includes(query.substring(0, 3)) ||
               result.deposant.toLowerCase().includes(query.substring(0, 3));
      });
    }

    return {
      results: filteredResults
    };
  }

  // Méthode pour faire une vraie requête HTTP vers l'OMPIC (à implémenter avec un proxy backend)
  private static async makeOMPICRequest(params: OMPICSearchParams): Promise<any> {
    // Cette méthode nécessiterait un proxy backend pour éviter les problèmes CORS
    // Exemple d'implémentation :
    
    const searchParams = new URLSearchParams({
      'search_term': params.query,
      'search_type': 'marque',
      'status': params.statut || '',
      'date_start': params.dateDebut || '',
      'date_end': params.dateFin || ''
    });

    const response = await fetch(`${this.PROXY_URL}?${searchParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return response.json();
  }

  // Données de fallback en cas d'erreur
  private static getFallbackResults(params: OMPICSearchParams, searchTime: number): {
    results: OMPICSearchResult[];
    total: number;
    searchTime: number;
  } {
    return {
      results: [],
      total: 0,
      searchTime
    };
  }

  static async getMarqueDetails(numeroDepot: string): Promise<OMPICSearchResult | null> {
    try {
      // Simulation de récupération des détails
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En production, ceci ferait un appel API spécifique pour récupérer les détails
      const mockDetails: OMPICSearchResult = {
        id: numeroDepot,
        numeroDepot,
        nomMarque: 'Marque Détaillée',
        deposant: 'Déposant Exemple',
        dateDepot: '2024-01-01',
        dateExpiration: '2034-01-01',
        statut: 'Enregistrée',
        classes: ['09', '42'],
        description: 'Description détaillée de la marque récupérée depuis l\'OMPIC'
      };
      
      return mockDetails;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails:', error);
      return null;
    }
  }

  // Méthode pour parser les résultats HTML de l'OMPIC (si nécessaire)
  private static parseOMPICResponse(htmlContent: string): OMPICSearchResult[] {
    // Cette méthode parserait le HTML retourné par l'OMPIC
    // et extrairait les informations des marques
    
    const results: OMPICSearchResult[] = [];
    
    // Logique de parsing HTML ici
    // Utilisation de DOMParser ou d'une bibliothèque de parsing
    
    return results;
  }

  // Méthode pour valider les données reçues
  private static validateSearchResult(data: any): OMPICSearchResult | null {
    try {
      if (!data.numeroDepot || !data.nomMarque || !data.deposant) {
        return null;
      }

      return {
        id: data.id || data.numeroDepot,
        numeroDepot: data.numeroDepot,
        nomMarque: data.nomMarque,
        deposant: data.deposant,
        dateDepot: data.dateDepot,
        dateExpiration: data.dateExpiration,
        statut: data.statut || 'En cours',
        classes: Array.isArray(data.classes) ? data.classes : [],
        description: data.description || '',
        imageUrl: data.imageUrl
      };
    } catch (error) {
      console.error('Erreur lors de la validation des données:', error);
      return null;
    }
  }

  // Méthode pour rechercher des brevets (extension future)
  static async searchBrevets(params: OMPICSearchParams): Promise<{
    results: any[];
    total: number;
    searchTime: number;
  }> {
    const startTime = Date.now();
    
    // Simulation pour les brevets
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      results: [],
      total: 0,
      searchTime: Date.now() - startTime
    };
  }
}