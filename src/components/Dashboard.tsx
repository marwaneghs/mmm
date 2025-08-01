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
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Bonjour, Cabinet d'Avocats 👋
            </h1>
            <p className="text-slate-600 text-lg">Voici un aperçu de votre activité aujourd'hui</p>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium text-slate-600">{new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${stat.color} slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-inner">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                  <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold text-slate-900">{stat.value}</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Overview */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{t('financialOverview')}</h3>
              <p className="text-slate-600 mt-1">Suivi des revenus et paiements</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Ce mois</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {(totalBudget / 1000).toFixed(0)}K
              </div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Budget Total</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {(totalPaye / 1000).toFixed(0)}K
              </div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Montant Perçu</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {((totalBudget - totalPaye) / 1000).toFixed(0)}K
              </div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Reste à Percevoir</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Taux de recouvrement</span>
              <span className="text-lg font-bold text-slate-900">{recoveryRate}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                style={{ width: `${recoveryRate}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Actions Rapides</h3>
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1">
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle Affaire
            </button>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md">
              <Users className="h-4 w-4 mr-2" />
              Ajouter Client
            </button>
            <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md">
              <DollarSign className="h-4 w-4 mr-2" />
              Enregistrer Paiement
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Activité Récente</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <span className="text-slate-900 font-medium">Paiement reçu</span>
                  <span className="text-slate-500 text-sm block">Il y a 2h</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="text-slate-900 font-medium">Nouveau client ajouté</span>
                  <span className="text-slate-500 text-sm block">Il y a 4h</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="text-slate-900 font-medium">Échéance approche</span>
                  <span className="text-slate-500 text-sm block">Il y a 6h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Cases */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">{t('recentCases')}</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 hover:bg-blue-50 rounded-lg transition-all">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {recentAffaires.map((affaire) => {
              const client = mockClients.find(c => c.id === affaire.clientId);
              return (
                <div key={affaire.id} className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-2xl transition-all duration-200 hover:shadow-md border border-transparent hover:border-slate-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-sm">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">{affaire.titre}</h4>
                    <p className="text-sm text-slate-500 mt-1">{client?.nom}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatutColor(affaire.statut)}`}>
                      {affaire.statut}
                    </span>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{formatDate(affaire.dateCreation)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">{t('upcomingDeadlines')}</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 hover:bg-blue-50 rounded-lg transition-all">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-4">
            {prochainEcheances.map((affaire) => {
              const client = mockClients.find(c => c.id === affaire.clientId);
              const isUrgent = new Date(affaire.dateEcheance!) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              
              return (
                <div key={affaire.id} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 ${
                  isUrgent ? 'bg-red-50 border border-red-200 shadow-sm' : 'hover:bg-slate-50 hover:shadow-md border border-transparent hover:border-slate-200'
                }`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                    isUrgent ? 'bg-gradient-to-br from-red-100 to-red-200' : 'bg-gradient-to-br from-orange-100 to-orange-200'
                  }`}>
                    {isUrgent ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">{affaire.titre}</h4>
                    <p className="text-sm text-slate-500 mt-1">{client?.nom}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPrioriteColor(affaire.priorite)}`}>
                      {affaire.priorite}
                    </span>
                    <p className={`text-xs mt-2 font-medium ${isUrgent ? 'text-red-600' : 'text-slate-500'}`}>
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