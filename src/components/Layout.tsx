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
  Building2,
  Bell,
  Search,
  Menu
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient rounded-xl flex items-center justify-center shadow-sm">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{t('appTitle')}</h1>
              <p className="text-xs text-gray-500 font-medium">{t('appSubtitle')}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <span>CA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Cabinet Avocat</p>
              <p className="text-xs text-gray-500 truncate">Propriété Industrielle</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {navigationItems.find(item => item.id === currentPage)?.label}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="modern-input pl-10 w-64"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* Profile Badge */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{t('headerSubtitle')}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;