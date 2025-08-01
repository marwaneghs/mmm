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
  Globe,
  Building
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const affairesEnCours = mockAffaires.filter(a => a.statut === 'En cours').length;
  const affairesUrgentes = mockAffaires.filter(a => a.priorite === 'Urgente').length;
  const totalBudget = mockAffaires.reduce((sum, a) => sum + a.budget, 0);
  const totalPaye = mockAffaires.reduce((sum, a) => sum + a.montantPaye, 0);
  const paymentsEnAttente = mockPaiements.filter(p => p.statut === 'En attente').length;

  const stats = [
    {
      title: t('activeClients'),
      value: mockClients.filter(c => c.actif).length,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('ongoingCases'),
      value: affairesEnCours,
      icon: FileText,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    {
      title: t('urgentCases'),
      value: affairesUrgentes,
      icon: AlertCircle,
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
    },
    {
      title: t('totalRevenue'),
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
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-white/20 shadow-medium hover-lift card-hover backdrop-blur-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl text-white shadow-medium`}>
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
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-medium border border-white/20 p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{t('financialOverview')}</h3>
            <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{t('totalBudget')}</span>
              <span className="font-bold text-gray-900 text-lg">{totalBudget.toLocaleString()} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{t('amountReceived')}</span>
              <span className="font-bold text-green-600 text-lg">{totalPaye.toLocaleString()} MAD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{t('remainingAmount')}</span>
              <span className="font-bold text-orange-600 text-lg">{(totalBudget - totalPaye).toLocaleString()} MAD</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full shadow-soft transition-all duration-1000" 
                style={{ width: `${(totalPaye / totalBudget) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-gray-600 text-center">
              {t('recoveryRate')}: {Math.round((totalPaye / totalBudget) * 100)}%
            </p>
          </div>
        </div>

        {/* Recent Affairs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-medium border border-white/20 p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{t('recentCases')}</h3>
            <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-3">
            {recentAffaires.map((affaire) => {
              const client = mockClients.find(c => c.id === affaire.clientId);
              return (
                <div key={affaire.id} className="border-l-4 border-gradient-to-b from-blue-400 to-indigo-500 pl-4 py-3 bg-gradient-to-r from-blue-50/50 to-transparent rounded-r-lg hover-lift">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 text-sm">{affaire.titre}</h4>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatutColor(affaire.statut)}`}>
                      {affaire.statut}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-600 mt-1">{client?.nom}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getPrioriteColor(affaire.priorite)}`}>
                      {affaire.priorite}
                    </span>
                    <span className="text-xs font-medium text-gray-500">{formatDate(affaire.dateCreation)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-medium border border-white/20 p-6 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{t('upcomingDeadlines')}</h3>
          <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          {prochainEcheances.map((affaire) => {
            const client = mockClients.find(c => c.id === affaire.clientId);
            const isUrgent = new Date(affaire.dateEcheance!) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div key={affaire.id} className={`p-4 rounded-xl border transition-all duration-300 hover-lift ${isUrgent ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-soft' : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{affaire.titre}</h4>
                    <p className="text-sm font-medium text-gray-600">{client?.nom}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {isUrgent ? (
                        <div className="p-1 bg-red-100 rounded-full">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      ) : (
                        <div className="p-1 bg-gray-100 rounded-full">
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                      <span className={`text-sm font-bold ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                        {t('deadline')}: {formatDate(affaire.dateEcheance!)}
                      </span>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full mt-2 inline-block font-medium ${getPrioriteColor(affaire.priorite)}`}>
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