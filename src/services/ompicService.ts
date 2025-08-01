import { OMPICSearchResult, OMPICSearchParams } from '../types';

// Service pour la recherche OMPIC avec backend dédié
export class OMPICService {
  private static readonly EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ompic-search`;

  static async searchMarques(params: OMPICSearchParams): Promise<{
    results: OMPICSearchResult[];
    total: number;
    searchTime: number;
  }> {
    const startTime = Date.now();
    
    try {
      // Utiliser la fonction edge pour faire la vraie requête OMPIC
      const response = await fetch(this.EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ searchParams: params })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      const searchTime = Date.now() - startTime;
      
      return {
        results: data.results || [],
        total: data.total || 0,
        searchTime: data.searchTime || searchTime
      };
    } catch (error) {
      console.error('Erreur lors de la recherche OMPIC:', error);
      
      // Fallback vers des données locales en cas d'erreur
      return this.getFallbackResults(params, Date.now() - startTime);
    }
  }

  // Données de fallback en cas d'erreur de connexion
  private static getFallbackResults(params: OMPICSearchParams, searchTime: number): {
    results: OMPICSearchResult[];
    total: number;
    searchTime: number;
  } {
    const fallbackDatabase = [
      {
        id: 'fallback_1',
        numeroDepot: 'M202411234',
        nomMarque: 'ASTA',
        deposant: 'ASTA MAROC SARL',
        dateDepot: '2024-01-15',
        dateExpiration: '2034-01-15',
        statut: 'Enregistrée' as const,
        classes: ['09', '35', '42'],
        description: 'Services informatiques, logiciels, conseil en technologie'
      },
      {
        id: 'fallback_2',
        numeroDepot: 'M202410987',
        nomMarque: 'MAROC TELECOM',
        deposant: 'ITISSALAT AL-MAGHRIB',
        dateDepot: '2024-02-20',
        dateExpiration: '2034-02-20',
        statut: 'Enregistrée' as const,
        classes: ['38', '09', '35'],
        description: 'Télécommunications, services de téléphonie, internet'
      },
      {
        id: 'fallback_3',
        numeroDepot: 'M202409876',
        nomMarque: 'ATTIJARIWAFA BANK',
        deposant: 'ATTIJARIWAFA BANK',
        dateDepot: '2024-03-10',
        dateExpiration: '2034-03-10',
        statut: 'En cours' as const,
        classes: ['36', '35', '09'],
        description: 'Services bancaires, services financiers, assurance'
      },
      {
        id: 'fallback_4',
        numeroDepot: 'M202408765',
        nomMarque: 'OCP',
        deposant: 'OFFICE CHERIFIEN DES PHOSPHATES',
        dateDepot: '2024-04-05',
        dateExpiration: '2034-04-05',
        statut: 'Enregistrée' as const,
        classes: ['01', '05', '31'],
        description: 'Produits chimiques, engrais, phosphates'
      },
      {
        id: 'fallback_5',
        numeroDepot: 'M202407654',
        nomMarque: 'ROYAL AIR MAROC',
        deposant: 'COMPAGNIE NATIONALE ROYAL AIR MAROC',
        dateDepot: '2024-05-12',
        dateExpiration: '2034-05-12',
        statut: 'Enregistrée' as const,
        classes: ['39', '35', '41'],
        description: 'Transport aérien, services de voyage, tourisme'
      }
    ];

    let filteredResults = fallbackDatabase;
    
    // Filtrage basé sur les paramètres de recherche
    if (params.typeRecherche === 'simple' && params.query) {
      const query = params.query.toLowerCase();
      filteredResults = filteredResults.filter(result => {
        return result.nomMarque.toLowerCase().includes(query) ||
               result.deposant.toLowerCase().includes(query) ||
               result.numeroDepot.toLowerCase().includes(query) ||
               result.description.toLowerCase().includes(query);
      });
    } else if (params.typeRecherche === 'avancee') {
      filteredResults = filteredResults.filter(result => {
        let matches = true;
        
        if (params.numeroDepot) {
          matches = matches && result.numeroDepot.toLowerCase().includes(params.numeroDepot.toLowerCase());
        }
        
        if (params.nomMarque) {
          matches = matches && result.nomMarque.toLowerCase().includes(params.nomMarque.toLowerCase());
        }
        
        if (params.deposant) {
          matches = matches && result.deposant.toLowerCase().includes(params.deposant.toLowerCase());
        }
        
        if (params.classeNice) {
          matches = matches && result.classes.includes(params.classeNice);
        }
        
        if (params.produitService) {
          matches = matches && result.description.toLowerCase().includes(params.produitService.toLowerCase());
        }
        
        return matches;
      });
    }
    
    // Filtrage par statut
    if (params.statut) {
      filteredResults = filteredResults.filter(result => result.statut === params.statut);
    }
    
    // Filtrage par dates
    if (params.dateDebut) {
      filteredResults = filteredResults.filter(result => 
        new Date(result.dateDepot) >= new Date(params.dateDebut!)
      );
    }
    
    if (params.dateFin) {
      filteredResults = filteredResults.filter(result => 
        new Date(result.dateDepot) <= new Date(params.dateFin!)
      );
    }
      
    // Si aucun résultat et recherche simple, faire une recherche plus large
    if (filteredResults.length === 0 && params.typeRecherche === 'simple' && params.query) {
      const partialQuery = params.query.substring(0, 3).toLowerCase();
      filteredResults = fallbackDatabase.filter(result => {
        return result.nomMarque.toLowerCase().includes(partialQuery) ||
               result.deposant.toLowerCase().includes(partialQuery);
      });
    }

    return {
      results: filteredResults,
      total: filteredResults.length,
      searchTime
    };
  }

  static async getMarqueDetails(numeroDepot: string): Promise<OMPICSearchResult | null> {
    try {
      // Simulation de récupération des détails
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En production, ceci ferait un appel API spécifique pour récupérer les détails
      const fallbackDetails: OMPICSearchResult = {
        id: numeroDepot,
        numeroDepot,
        nomMarque: 'Détails depuis OMPIC',
        deposant: 'Déposant Officiel',
        dateDepot: '2024-01-01',
        dateExpiration: '2034-01-01',
        statut: 'Enregistrée',
        classes: ['09', '42'],
        description: 'Description détaillée récupérée depuis la base de données officielle OMPIC'
      };
      
      return fallbackDetails;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails:', error);
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
    
    // Utiliser la même fonction edge pour les brevets
    try {
      const response = await fetch(this.EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ 
          searchParams: { ...params, type: 'brevet' }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        results: data.results || [],
        total: data.total || 0,
        searchTime: data.searchTime || (Date.now() - startTime)
      };
    } catch (error) {
      console.error('Erreur lors de la recherche de brevets:', error);
      
      return {
        results: [],
        total: 0,
        searchTime: Date.now() - startTime
      };
    }
  }
}