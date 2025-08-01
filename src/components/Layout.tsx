import React from 'react';
import { NavigationPage } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calculator, 
  ExternalLink,
  Scale,
  Building2
} from 'lucide-react';

interface LayoutProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentPage, onNavigate, children }) => {
  const navigationItems = [
    { id: 'dashboard' as NavigationPage, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'clients' as NavigationPage, label: 'Clients', icon: Users },
    { id: 'affaires' as NavigationPage, label: 'Affaires', icon: FileText },
    { id: 'finances' as NavigationPage, label: 'Finances', icon: Calculator },
    { id: 'outils' as NavigationPage, label: 'Outils externes', icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cabinet IP</h1>
              <p className="text-sm text-gray-500">Propriété Industrielle</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {navigationItems.find(item => item.id === currentPage)?.label}
              </h2>
              <div className="flex items-center space-x-4">
                <Building2 className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Cabinet d'Avocats - Propriété Industrielle</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;