export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  typeClient: 'National' | 'International';
  dateCreation: string;
  actif: boolean;
}

export interface Affaire {
  id: string;
  clientId: string;
  titre: string;
  type: 'Marque' | 'Brevet' | 'Design' | 'Modèle' | 'Contentieux' | 'Conseil';
  statut: 'En cours' | 'En attente' | 'Terminée' | 'Suspendue';
  priorite: 'Basse' | 'Normale' | 'Haute' | 'Urgente';
  dateCreation: string;
  dateEcheance?: string;
  description: string;
  budget: number;
  montantPaye: number;
  numeroOmpic?: string;
  numeroTribunal?: string;
}

export interface Paiement {
  id: string;
  affaireId: string;
  montant: number;
  datePaiement: string;
  typePaiement: 'Espèces' | 'Chèque' | 'Virement' | 'Carte';
  statut: 'En attente' | 'Validé' | 'Rejeté';
  description: string;
}

export type NavigationPage = 'dashboard' | 'clients' | 'affaires' | 'finances' | 'outils';

export type Language = 'fr' | 'ar' | 'en' | 'es' | 'ber';

export interface Translation {
  [key: string]: string | Translation;
}

export interface OMPICSearchResult {
  id: string;
  numeroDepot: string;
  nomMarque: string;
  deposant: string;
  dateDepot: string;
  dateExpiration?: string;
  statut: 'En cours' | 'Enregistrée' | 'Expirée' | 'Rejetée';
  classes: string[];
  description?: string;
  imageUrl?: string;
}

export interface OMPICSearchParams {
  query: string;
  type: 'marque' | 'brevet' | 'design' | 'modele';
  numeroDepot?: string;
  nomMarque?: string;
  deposant?: string;
  mandataire?: string;
  numeroEnregistrement?: string;
  numeroPublication?: string;
  classeNice?: string;
  produitService?: string;
  statut?: string;
  dateDebut?: string;
  dateFin?: string;
  typeRecherche: 'simple' | 'avancee';
  operateur?: 'ET' | 'OU';
}

export interface JusticeSearchResult {
  id: string;
  numeroAffaire: string;
  tribunal: string;
  typeAffaire: string;
  parties: string;
  dateAudience: string;
  statut: string;
  objet: string;
  juge?: string;
  avocat?: string;
}

export interface JusticeSearchParams {
  query: string;
  tribunal?: string;
  typeAffaire?: string;
  numeroAffaire?: string;
  nomParties?: string;
  dateDebut?: string;
  dateFin?: string;
}