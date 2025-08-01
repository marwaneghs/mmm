import React, { useState } from 'react';
import { mockAffaires, mockClients, mockPaiements } from '../data/mockData';
import { useTranslation } from '../hooks/useTranslation';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  Filter,
  Download,
  Plus
} from 'lucide-react';

const FinancesPage: React.FC = () => {
  const { t } = useTranslation();
  const [filterPeriod, setFilterPeriod] = useState(t('allPeriods'));
  const [filterStatut, setFilterStatut] = useState(t('allStatuses'));

  const totalBudget = mockAffaires.reduce((sum, a) => sum + a.budget, 0);
  const totalPaye = mockAffaires.reduce((sum, a) => sum + a.montantPaye, 0);
  const totalEnAttente = totalBudget - totalPaye;
  const paymentsEnAttente = mockPaiements.filter(p => p.statut === 'En attente');
  const paymentsValides = mockPaiements.filter(p => p.statut === 'Validé');

  const filteredPaiements = mockPaiements.filter(paiement => {
    const matchesStatut = filterStatut === 'Tous' || paiement.statut === filterStatut;
    // Here you could add period filtering logic
    return matchesStatut;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Validé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'Validé': return <CheckCircle className="h-4 w-4" />;
      case 'En attente': return <Clock className="h-4 w-4" />;
      case 'Rejeté': return <AlertCircle className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Espèces': return 'bg-green-100 text-green-800';
      case 'Chèque': return 'bg-blue-100 text-blue-800';
      case 'Virement': return 'bg-purple-100 text-purple-800';
      case 'Carte': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    {
      title: t('totalTurnover'),
      value: `${totalBudget.toLocaleString()} MAD`,
      icon: DollarSign,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('amountCollected'),
      value: `${totalPaye.toLocaleString()} MAD`,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    {
      title: t('remainingToCollect'),
      value: `${totalEnAttente.toLocaleString()} MAD`,
      icon: TrendingDown,
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
    },
    {
      title: t('pendingPayments'),
      value: paymentsEnAttente.length,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('financialManagement')}</h2>
          <p className="text-gray-600">{t('budgetPaymentTracking')}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>{t('newPayment')}</span>
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>{t('export')}</span>
          </button>
        </div>
      </div>

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

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recouvrement Progress */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('recoveryRate')}</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round((totalPaye / totalBudget) * 100)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all" 
                  style={{ width: `${(totalPaye / totalBudget) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('collected')}</p>
                <p className="font-semibold text-green-700">{totalPaye.toLocaleString()} MAD</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('remaining')}</p>
                <p className="font-semibold text-orange-700">{totalEnAttente.toLocaleString()} MAD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par Type de Paiement */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('paymentMethods')}</h3>
            <CreditCard className="h-5 w-5 text-blue-500" />
          </div>
          
          <div className="space-y-3">
            {['Virement', 'Chèque', 'Espèces', 'Carte'].map((type) => {
              const count = mockPaiements.filter(p => p.typePaiement === type).length;
              const total = mockPaiements.filter(p => p.typePaiement === type)
                .reduce((sum, p) => sum + p.montant, 0);
              const percentage = count > 0 ? Math.round((count / mockPaiements.length) * 100) : 0;
              
              return (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(type)}`}>
                      {type}
                    </span>
                    <span className="text-sm text-gray-600">{count} paiement(s)</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{total.toLocaleString()} MAD</p>
                    <p className="text-xs text-gray-500">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Tous">{t('allStatuses')}</option>
              <option value="Validé">{t('validated')}</option>
              <option value="En attente">{t('pending')}</option>
              <option value="Rejeté">{t('rejected')}</option>
            </select>
          </div>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Tous">{t('allPeriods')}</option>
            <option value="Ce mois">{t('thisMonth')}</option>
            <option value="Trimestre">{t('thisQuarter')}</option>
            <option value="Année">{t('thisYear')}</option>
          </select>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('paymentHistory')} ({filteredPaiements.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredPaiements.map((paiement) => {
            const affaire = mockAffaires.find(a => a.id === paiement.affaireId);
            const client = mockClients.find(c => c.id === affaire?.clientId);
            
            return (
              <div key={paiement.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {paiement.montant.toLocaleString()} MAD
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getStatutColor(paiement.statut)}`}>
                        {getStatutIcon(paiement.statut)}
                        <span>{paiement.statut}</span>
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(paiement.typePaiement)}`}>
                        {paiement.typePaiement}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900 mb-1">{affaire?.titre}</p>
                        <p>{client?.nom}</p>
                        <p className="mt-1">{paiement.description}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{t('paidOn')} {formatDate(paiement.datePaiement)}</span>
                        </div>
                        {affaire && (
                          <div className="text-xs text-gray-500">
                            {t('case')}: {affaire.type} • {t('budget')}: {affaire.budget.toLocaleString()} MAD
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredPaiements.length === 0 && (
          <div className="p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noResults')}</h3>
            <p className="text-gray-500">{t('tryModifyingSearchCriteria')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancesPage;