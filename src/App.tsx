import React, { useState } from 'react';
import { useTranslation } from './hooks/useTranslation';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ClientsPage from './components/ClientsPage';
import AffairesPage from './components/AffairesPage';
import FinancesPage from './components/FinancesPage';
import OutilsPage from './components/OutilsPage';
import { NavigationPage } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientsPage />;
      case 'affaires':
        return <AffairesPage />;
      case 'finances':
        return <FinancesPage />;
      case 'outils':
        return <OutilsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;