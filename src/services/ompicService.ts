import { OMPICSearchResult, OMPICSearchParams } from '../types';

// Service simulé pour la recherche OMPIC
// En production, ceci ferait des appels API réels vers l'OMPIC
export class OMPICService {
  private static mockResults: OMPICSearchResult[] = [
    {
      id: '1',
      numeroDepot: 'M202411001',
      nomMarque: 'TechnoSoft',
      deposant: 'SARL TechnoMaroc',
      dateDepot: '2024-11-01',
      dateExpiration: '2034-11-01',
      statut: 'En cours',
      classes: ['09', '42'],
      description: 'Logiciels informatiques, services de développement',
      imageUrl: undefined
    },
    {
      id: '2',
      numeroDepot: 'M202410156',
      nomMarque: 'InnovaTech',
      deposant: 'Innovation Technologies SARL',
      dateDepot: '2024-10-15',
      dateExpiration: '2034-10-15',
      statut: 'Enregistrée',
      classes: ['35', '42'],
      description: 'Services commerciaux, développement technologique'
    },
    {
      id: '3',
      numeroDepot: 'M202409088',
      nomMarque: 'MarocDesign',
      deposant: 'Société Marocaine Design',
      dateDepot: '2024-09-08',
      dateExpiration: '2034-09-08',
      statut: 'Enregistrée',
      classes: ['25', '35'],
      description: 'Vêtements, services de design'
    },
    {
      id: '4',
      numeroDepot: 'M202408234',
      nomMarque: 'GlobalTech',
      deposant: 'Global Innovations Inc.',
      dateDepot: '2024-08-23',
      dateExpiration: '2034-08-23',
      statut: 'En cours',
      classes: ['09', '35', '42'],
      description: 'Technologies informatiques, services commerciaux'
    },
    {
      id: '5',
      numeroDepot: 'M202407145',
      nomMarque: 'EcoVert',
      deposant: 'EcoSolutions Maroc',
      dateDepot: '2024-07-14',
      dateExpiration: '2034-07-14',
      statut: 'Rejetée',
      classes: ['03', '05'],
      description: 'Produits écologiques, produits chimiques'
    }
  ];

  static async searchMarques(params: OMPICSearchParams): Promise<{
    results: OMPICSearchResult[];
    total: number;
    searchTime: number;
  }> {
    // Simulation d'un délai de recherche
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const query = params.query.toLowerCase();
    
    let filteredResults = this.mockResults.filter(result => {
      const matchesQuery = result.nomMarque.toLowerCase().includes(query) ||
                          result.deposant.toLowerCase().includes(query) ||
                          result.numeroDepot.toLowerCase().includes(query);
      
      const matchesStatut = !params.statut || params.statut === 'Tous' || result.statut === params.statut;
      
      return matchesQuery && matchesStatut;
    });

    // Simulation d'un temps de recherche
    const searchTime = Math.round(500 + Math.random() * 1000);

    return {
      results: filteredResults,
      total: filteredResults.length,
      searchTime
    };
  }

  static async getMarqueDetails(numeroDepot: string): Promise<OMPICSearchResult | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.mockResults.find(result => result.numeroDepot === numeroDepot) || null;
  }

  static async searchBrevets(params: OMPICSearchParams): Promise<{
    results: any[];
    total: number;
    searchTime: number;
  }> {
    // Simulation pour les brevets
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      results: [],
      total: 0,
      searchTime: 1200
    };
  }
}