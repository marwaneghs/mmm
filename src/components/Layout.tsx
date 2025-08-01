import React from 'react';
import { NavigationPage } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';
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
  const { t } = useTranslation();
  
  const navigationItems = [
    { id: 'dashboard' as NavigationPage, label: t('dashboard'), icon: LayoutDashboard },
    { id: 'clients' as NavigationPage, label: t('clients'), icon: Users },
    { id: 'affaires' as NavigationPage, label: t('affaires'), icon: FileText },
    { id: 'finances' as NavigationPage, label: t('finances'), icon: Calculator },
    { id: 'outils' as NavigationPage, label: t('outils'), icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-xl shadow-large border-r border-white/20">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-3 gradient-primary text-white rounded-xl shadow-medium">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{t('appTitle')}</h1>
              <p className="text-sm text-gray-600">{t('appSubtitle')}</p>
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
                className={`w-full flex items-center px-6 py-4 text-left transition-all duration-300 hover-lift ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-r-4 border-blue-500 shadow-soft'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-blue-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white/70 backdrop-blur-xl shadow-soft border-b border-white/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
                {navigationItems.find(item => item.id === currentPage)?.label}
              </h2>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-white/50 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{t('headerSubtitle')}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;