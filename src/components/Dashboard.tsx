import React from 'react';
import { mockClients, mockAffaires, mockPaiements } from '../data/mockData';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Users, 
  FileText, 
  AlertCircle, 
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  Target,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const affairesEnCours = mockAffaires.filter(a => a.statut === 'En cours').length;
  const affairesUrgentes = mockAffaires.filter(a => a.priorite === 'Urgente').length;
  const totalBudget = mockAffaires.reduce((sum, a) => sum + a.budget, 0);
  const totalPaye = mockAffaires.reduce((sum, a) => sum + a.montantPaye, 0);
  const recoveryRate = Math.round((totalPaye / totalBudget) * 100);

  const stats = [
    {
      title: t('activeClients'),
      value: mockClients.filter(c => c.actif).length,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'stats-card-blue',
    },
    {
      title: t('ongoingCases'),
      value: affairesEnCours,
      change: '+8%',
      changeType: 'positive',
      icon: FileText,
      color: 'stats-card-green',
    },
    {
      title: t('urgentCases'),
      value: affairesUrgentes,
      change: '-2%',
      changeType: 'negative',
      icon: AlertCircle,
      color: 'stats-card-orange',
    },
    {
      title: t('totalRevenue'),
      value: `${(totalBudget / 1000).toFixed(0)}K MAD`,
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'stats-card-purple',
    },
  ];

  const recentAffaires = mockAffaires.slice(0, 5);
  const prochainEcheances = mockAffaires
    .filter(a => a.dateEcheance)
    .sort((a, b) => new Date(a.dateEcheance!).getTime() - new Date(b.dateEcheance!).getTime())
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En cours': return 'badge-blue';
      case 'En attente': return 'badge-yellow';
      case 'Terminée': return 'badge-green';
      case 'Suspendue': return 'badge-red';
      default: return 'badge-gray';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'Urgente': return 'badge-red';
      case 'Haute': return 'badge-yellow';
      case 'Normale': return 'badge-blue';
      case 'Basse': return 'badge-gray';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <div className="modern-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Bonjour, Cabinet d'Avocats 👋</h1>
            <p className="text-gray-600">Voici un aperçu de votre activité aujourd'hui</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stats-card ${stat.color} slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <ArrowUpRight className={`h-4 w-4 ${
                      stat.changeType === 'negative' ? 'rotate-90' : ''
                    }`} />
                    <span className="font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Overview */}
        <div className="lg:col-span-2 modern-card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{t('financialOverview')}</h3>
              <p className="text-sm text-gray-600">Suivi des revenus et paiements</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm py-2 px-3">
                <Calendar className="h-4 w-4 mr-2" />
                Ce mois
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {(totalBudget / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Budget Total</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {(totalPaye / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Montant Perçu</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {((totalBudget - totalPaye) / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Reste à Percevoir</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Taux de recouvrement</span>
              <span className="text-sm font-bold text-gray-900">{recoveryRate}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${recoveryRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="modern-card-elevated p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle Affaire
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              Ajouter Client
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Enregistrer Paiement
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Activité Récente</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 text-sm">
                  <span className="text-gray-900">Paiement reçu</span>
                  <span className="text-gray-500 block">Il y a 2h</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 text-sm">
                  <span className="text-gray-900">Nouveau client ajouté</span>
                  <span className="text-gray-500 block">Il y a 4h</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1 text-sm">
                  <span className="text-gray-900">Échéance approche</span>
                  <span className="text-gray-500 block">Il y a 6h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <div className="modern-card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">{t('recentCases')}</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {recentAffaires.map((affaire) => {
              const client = mockClients.find(c => c.id === affaire.clientId);
              return (
                <div key={affaire.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{affaire.titre}</h4>
                    <p className="text-sm text-gray-500">{client?.nom}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${getStatutColor(affaire.statut)}`}>
                      {affaire.statut}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(affaire.dateCreation)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="modern-card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">{t('upcomingDeadlines')}</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {prochainEcheances.map((affaire) => {
              const client = mockClients.find(c => c.id === affaire.clientId);
              const isUrgent = new Date(affaire.dateEcheance!) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              
              return (
                <div key={affaire.id} className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                  isUrgent ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isUrgent ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    {isUrgent ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{affaire.titre}</h4>
                    <p className="text-sm text-gray-500">{client?.nom}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${getPrioriteColor(affaire.priorite)}`}>
                      {affaire.priorite}
                    </span>
                    <p className={`text-xs mt-1 ${isUrgent ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {formatDate(affaire.dateEcheance!)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;