import React from 'react';
import { mockClients, mockAffaires, mockPaiements } from '../data/mockData';
import { 
  Users, 
  FileText, 
  AlertCircle, 
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Building
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const affairesEnCours = mockAffaires.filter(a => a.statut === 'En cours').length;
  const affairesUrgentes = mockAffaires.filter(a => a.priorite === 'Urgente').length;
  const totalBudget = mockAffaires.reduce((sum, a) => sum + a.budget, 0);
  const totalPaye = mockAffaires.reduce((sum, a) => sum + a.montantPaye, 0);
  const paymentsEnAttente = mockPaiements.filter(p => p.statut === 'En attente').length;

  const stats = [
    {
      title: 'Clients actifs',
      value: mockClients.filter(c => c.actif).length,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Affaires en cours',
      value: affairesEnCours,
      icon: FileText,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Affaires urgentes',
      value: affairesUrgentes,
      icon: AlertCircle,
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
    },
    {
      title: 'CA Total',
      value: `${totalBudget.toLocaleString()} MAD`,
      icon: DollarSign,
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
    },
  ];

  const recentAffaires = mockAffaires.slice(0, 3);
  const prochainEcheances = mockAffaires
    .filter(a => a.dateEcheance)
    .sort((a, b) => new Date(a.dateEcheance!).getTime() - new Date(b.dateEcheance!).getTime())
    .slice(0, 3);

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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aperçu financier</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Budget total</span>
              <span className="font-semibold text-gray-900">{totalBudget.toLocaleString()} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Montant perçu</span>
              <span className="font-semibold text-green-600">{totalPaye.toLocaleString()} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reste à percevoir</span>
              <span className="font-semibold text-orange-600">{(totalBudget - totalPaye).toLocaleString()} MAD</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(totalPaye / totalBudget) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Taux de recouvrement: {Math.round((totalPaye / totalBudget) * 100)}%
            </p>
          </div>
        </div>

        {/* Recent Affairs */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Affaires récentes</h3>
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          
          <div className="space-y-3">
            {recentAffaires.map((affaire) => {
              const client = mockClients.find(c => c.id === affaire.clientId);
              return (
                <div key={affaire.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 text-sm">{affaire.titre}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatutColor(affaire.statut)}`}>
                      {affaire.statut}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{client?.nom}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPrioriteColor(affaire.priorite)}`}>
                      {affaire.priorite}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(affaire.dateCreation)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Prochaines échéances</h3>
          <Calendar className="h-5 w-5 text-orange-500" />
        </div>
        
        <div className="space-y-3">
          {prochainEcheances.map((affaire) => {
            const client = mockClients.find(c => c.id === affaire.clientId);
            const isUrgent = new Date(affaire.dateEcheance!) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div key={affaire.id} className={`p-4 rounded-lg border ${isUrgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{affaire.titre}</h4>
                    <p className="text-sm text-gray-600">{client?.nom}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {isUrgent ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={`text-sm font-medium ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(affaire.dateEcheance!)}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full mt-1 inline-block ${getPrioriteColor(affaire.priorite)}`}>
                      {affaire.priorite}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;