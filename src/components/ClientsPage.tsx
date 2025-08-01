import React, { useState } from 'react';
import { mockClients } from '../data/mockData';
import { Client } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Plus, 
  Search, 
  Edit, 
  Phone, 
  Mail, 
  MapPin,
  Building,
  Globe,
  Calendar,
  Filter,
  User
} from 'lucide-react';

const ClientsPage: React.FC = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('Tous');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'Tous' || client.typeClient === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('clientManagement')}</h2>
          <p className="text-gray-500">{t('manageClientPortfolio')}</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{t('newClient')}</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="modern-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={t('searchByNameOrEmail')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="modern-select"
            >
              <option value="Tous">{t('allTypes')}</option>
              <option value="National">{t('nationalClients')}</option>
              <option value="International">{t('internationalClients')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card stats-card-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{t('totalClients')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{clients.length}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="stats-card stats-card-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{t('nationalClients')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {clients.filter(c => c.typeClient === 'National').length}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <Globe className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="stats-card stats-card-purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{t('internationalClients')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {clients.filter(c => c.typeClient === 'International').length}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <Building className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Clients List */}
      <div className="modern-card-elevated">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            {t('clientsList')} ({filteredClients.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredClients.map((client) => (
            <div key={client.id} className="p-6 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    client.typeClient === 'National' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {client.typeClient === 'National' ? (
                      <Globe className="h-6 w-6" />
                    ) : (
                      <Building className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-bold text-gray-900">{client.nom}</h4>
                      <span className={`badge ${
                        client.typeClient === 'National'
                          ? 'badge-blue'
                          : 'badge-green'
                      }`}>
                        {client.typeClient === 'National' ? t('national') : t('international')}
                      </span>
                      {client.actif && (
                        <span className="badge badge-green">
                          {t('active')}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{client.telephone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{client.adresse}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{t('clientSince')} {formatDate(client.dateCreation)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredClients.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('noResults')}</h3>
            <p className="text-gray-500">{t('tryModifyingSearchCriteria')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;