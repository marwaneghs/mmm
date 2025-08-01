import React, { useState } from 'react';
import { mockAffaires, mockClients } from '../data/mockData';
import { Affaire } from '../types';
import { 
  Plus, 
  Search, 
  Edit, 
  Calendar, 
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle,
  Filter,
  FileText,
  ExternalLink
} from 'lucide-react';

const AffairesPage: React.FC = () => {
  const [affaires, setAffaires] = useState<Affaire[]>(mockAffaires);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [filterType, setFilterType] = useState<string>('Tous');

  const filteredAffaires = affaires.filter(affaire => {
    const client = mockClients.find(c => c.id === affaire.clientId);
    const matchesSearch = affaire.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affaire.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = filterStatut === 'Tous' || affaire.statut === filterStatut;
    const matchesType = filterType === 'Tous' || affaire.type === filterType;
    return matchesSearch && matchesStatut && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Terminée': return 'bg-green-100 text-green-800';
      case 'Suspendue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'Urgente': return 'bg-red-100 text-red-800';
      case 'Haute': return 'bg-orange-100 text-orange-800';
      case 'Normale': return 'bg-blue-100 text-blue-800';
      case 'Basse': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'En cours': return <Clock className="h-4 w-4" />;
      case 'En attente': return <AlertCircle className="h-4 w-4" />;
      case 'Terminée': return <CheckCircle className="h-4 w-4" />;
      case 'Suspendue': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const calculateProgress = (affaire: Affaire) => {
    return Math.round((affaire.montantPaye / affaire.budget) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Affaires</h2>
          <p className="text-gray-600">Suivi de vos dossiers et procédures</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nouvelle Affaire</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher par titre, client ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="En cours">En cours</option>
                <option value="En attente">En attente</option>
                <option value="Terminée">Terminée</option>
                <option value="Suspendue">Suspendue</option>
              </select>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Tous">Tous les types</option>
              <option value="Marque">Marque</option>
              <option value="Brevet">Brevet</option>
              <option value="Design">Design</option>
              <option value="Modèle">Modèle</option>
              <option value="Contentieux">Contentieux</option>
              <option value="Conseil">Conseil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Affaires</p>
              <p className="text-2xl font-bold text-blue-600">{affaires.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-green-600">
                {affaires.filter(a => a.statut === 'En cours').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgentes</p>
              <p className="text-2xl font-bold text-red-600">
                {affaires.filter(a => a.priorite === 'Urgente').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA Total</p>
              <p className="text-2xl font-bold text-purple-600">
                {affaires.reduce((sum, a) => sum + a.budget, 0).toLocaleString()} MAD
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Affairs List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Liste des Affaires ({filteredAffaires.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAffaires.map((affaire) => {
            const client = mockClients.find(c => c.id === affaire.clientId);
            const progress = calculateProgress(affaire);
            const isUrgent = affaire.priorite === 'Urgente';
            const hasDeadline = affaire.dateEcheance && new Date(affaire.dateEcheance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div key={affaire.id} className={`p-6 hover:bg-gray-50 transition-colors ${isUrgent ? 'border-l-4 border-red-500' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Title and Status */}
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{affaire.titre}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getStatutColor(affaire.statut)}`}>
                        {getStatutIcon(affaire.statut)}
                        <span>{affaire.statut}</span>
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPrioriteColor(affaire.priorite)}`}>
                        {affaire.priorite}
                      </span>
                    </div>
                    
                    {/* Client and Type */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{client?.nom}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {affaire.type}
                      </span>
                      {affaire.numeroOmpic && (
                        <span className="text-blue-600">OMPIC: {affaire.numeroOmpic}</span>
                      )}
                      {affaire.numeroTribunal && (
                        <span className="text-purple-600">Tribunal: {affaire.numeroTribunal}</span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-700 mb-3">{affaire.description}</p>
                    
                    {/* Dates and Progress */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Créée le {formatDate(affaire.dateCreation)}</span>
                        </div>
                        {affaire.dateEcheance && (
                          <div className={`flex items-center space-x-2 text-sm ${hasDeadline ? 'text-red-600' : 'text-gray-600'}`}>
                            <Clock className="h-4 w-4" />
                            <span>Échéance: {formatDate(affaire.dateEcheance)}</span>
                            {hasDeadline && <AlertCircle className="h-4 w-4" />}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Budget: {affaire.budget.toLocaleString()} MAD</span>
                          <span className="text-green-600">Payé: {affaire.montantPaye.toLocaleString()} MAD</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          {progress}% payé
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {affaire.numeroOmpic && (
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir sur OMPIC">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    )}
                    {affaire.numeroTribunal && (
                      <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Voir au Tribunal">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredAffaires.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune affaire trouvée</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffairesPage;