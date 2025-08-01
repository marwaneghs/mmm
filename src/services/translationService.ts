import { Language, Translation } from '../types';

export const translations: Record<Language, Translation> = {
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    clients: 'Clients',
    affaires: 'Affaires',
    finances: 'Finances',
    outils: 'Outils externes',
    
    // Header
    appTitle: 'Cabinet IP',
    appSubtitle: 'Propriété Industrielle',
    headerSubtitle: 'Cabinet d\'Avocats - Propriété Industrielle',
    
    // Dashboard
    dashboardTitle: 'Tableau de bord',
    activeClients: 'Clients actifs',
    ongoingCases: 'Affaires en cours',
    urgentCases: 'Affaires urgentes',
    totalRevenue: 'CA Total',
    financialOverview: 'Aperçu financier',
    recentCases: 'Affaires récentes',
    upcomingDeadlines: 'Prochaines échéances',
    totalBudget: 'Budget total',
    amountReceived: 'Montant perçu',
    remainingAmount: 'Reste à percevoir',
    recoveryRate: 'Taux de recouvrement',
    createdOn: 'Créée le',
    deadline: 'Échéance',
    
    // Clients
    clientManagement: 'Gestion des Clients',
    manageClientPortfolio: 'Gérez votre portefeuille client',
    newClient: 'Nouveau Client',
    searchByNameOrEmail: 'Rechercher par nom ou email...',
    allTypes: 'Tous les types',
    nationalClients: 'Clients Nationaux',
    internationalClients: 'Clients Internationaux',
    totalClients: 'Total Clients',
    clientSince: 'Client depuis le',
    active: 'Actif',
    national: 'National',
    international: 'International',
    
    // Cases
    caseManagement: 'Gestion des Affaires',
    caseTracking: 'Suivi de vos dossiers et procédures',
    newCase: 'Nouvelle Affaire',
    searchByTitleClientDesc: 'Rechercher par titre, client ou description...',
    allStatuses: 'Tous les statuts',
    inProgress: 'En cours',
    pending: 'En attente',
    completed: 'Terminée',
    suspended: 'Suspendue',
    allCaseTypes: 'Tous les types',
    trademark: 'Marque',
    patent: 'Brevet',
    design: 'Design',
    model: 'Modèle',
    litigation: 'Contentieux',
    consulting: 'Conseil',
    totalCases: 'Total Affaires',
    urgent: 'Urgente',
    high: 'Haute',
    normal: 'Normale',
    low: 'Basse',
    casesList: 'Liste des Affaires',
    
    // Finances
    financialManagement: 'Gestion Financière',
    budgetPaymentTracking: 'Suivi des budgets, paiements et encaissements',
    newPayment: 'Nouveau Paiement',
    export: 'Exporter',
    totalTurnover: 'Chiffre d\'affaires total',
    amountCollected: 'Montant perçu',
    remainingToCollect: 'Reste à percevoir',
    pendingPayments: 'Paiements en attente',
    paymentMethods: 'Moyens de Paiement',
    paymentHistory: 'Historique des Paiements',
    validated: 'Validé',
    rejected: 'Rejeté',
    cash: 'Espèces',
    check: 'Chèque',
    transfer: 'Virement',
    card: 'Carte',
    paidOn: 'Payé le',
    collected: 'Perçu',
    remaining: 'Reste',
    thisMonth: 'Ce mois',
    thisQuarter: 'Ce trimestre',
    thisYear: 'Cette année',
    allPeriods: 'Toutes les périodes',
    case: 'Affaire',
    budget: 'Budget',
    paid: 'payé',
    
    // Tools
    externalTools: 'Outils Externes',
    ompicJusticeIntegration: 'Intégration avec OMPIC et portails Justice',
    ompicTrademarkSearch: 'Recherche Marques OMPIC',
    searchTrademarkDatabase: 'Rechercher dans la base de données des marques déposées',
    onlineDeposit: 'Dépôt en ligne OMPIC',
    accessElectronicDeposit: 'Accéder au système de dépôt électronique',
    procedureStatus: 'État des procédures',
    consultProcedureStatus: 'Consulter l\'état d\'avancement des dossiers',
    commercialCourts: 'Tribunaux Commerce',
    accessFirstInstanceCourts: 'Accéder aux tribunaux de première instance',
    justicePortal: 'Portail Justice',
    courtsAndProcedureTracking: 'Tribunaux et suivi des procédures',
    caseNumberCourtReference: 'Numéro d\'affaire, référence tribunal...',
    accessJusticePortal: 'Accéder au portail Justice',
    
    // OMPIC Search
    nationalTrademarkSearch: 'Recherche sur les Marques Nationales - OMPIC',
    officialOmpicSearch: 'Formulaire officiel de recherche dans la base de données OMPIC',
    simpleSearch: 'Recherche simple',
    advancedSearch: 'Recherche avancée',
    searchTerm: 'Terme de recherche',
    searchPlaceholder: 'Nom de marque, numéro de dépôt, déposant...',
    depositNumber: 'Numéro de dépôt',
    trademarkName: 'Nom de la marque',
    applicant: 'Déposant',
    representative: 'Mandataire',
    representativeName: 'Nom du mandataire',
    registrationNumber: 'Numéro d\'enregistrement',
    publicationNumber: 'Numéro de publication',
    niceClass: 'Classe de Nice',
    allClasses: 'Toutes les classes',
    class: 'Classe',
    productsServices: 'Produits et services',
    productsServicesDescription: 'Description des produits et services',
    status: 'Statut',
    underExamination: 'En cours d\'examen',
    registered: 'Enregistrée',
    expired: 'Expirée',
    opposed: 'Opposée',
    cancelled: 'Radiée',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    logicalOperator: 'Opérateur logique',
    andOperator: 'ET (tous les critères)',
    orOperator: 'OU (au moins un critère)',
    search: 'Rechercher',
    searching: 'Recherche en cours...',
    reset: 'Réinitialiser',
    officialOmpicSite: 'Site officiel OMPIC',
    ompicSearchResults: 'Résultats de recherche OMPIC',
    searchOn: 'Recherche sur',
    officialOmpic: 'OMPIC officiel',
    results: 'résultat(s)',
    in: 'en',
    searchingOnOfficialOmpic: 'Recherche en cours sur le site officiel OMPIC...',
    connectingTo: 'Connexion à',
    searchError: 'Erreur de recherche',
    deposit: 'Dépôt',
    expiration: 'Expiration',
    classes: 'Classes',
    viewDetails: 'Voir les détails',
    copyNumber: 'Copier le numéro',
    noTrademarkFound: 'Aucune marque trouvée pour',
    onOfficialOmpic: 'sur le site officiel OMPIC',
    tryDifferentSearchTerm: 'Essayez avec un terme de recherche différent ou vérifiez l\'orthographe',
    recentSearches: 'Recherches Récentes',
    trademarkDetails: 'Détails de la marque',
    depositDate: 'Date de dépôt',
    expirationDate: 'Date d\'expiration',
    description: 'Description',
    viewOnOmpic: 'Voir sur OMPIC',
    ompicServices: 'Services OMPIC',
    justiceServices: 'Services Justice',
    clientsList: 'Liste des Clients',
    tryModifyingSearchCriteria: 'Essayez de modifier vos critères de recherche',
    
    // Common
    loading: 'Chargement...',
    noResults: 'Aucun résultat trouvé',
    error: 'Erreur',
    retry: 'Réessayer',
    close: 'Fermer',
    details: 'Détails',
    copy: 'Copier',
    viewOn: 'Voir sur',
    language: 'Langue'
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    clients: 'Clients',
    affaires: 'Cases',
    finances: 'Finances',
    outils: 'External Tools',
    
    // Header
    appTitle: 'IP Firm',
    appSubtitle: 'Industrial Property',
    headerSubtitle: 'Law Firm - Industrial Property',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    activeClients: 'Active Clients',
    ongoingCases: 'Ongoing Cases',
    urgentCases: 'Urgent Cases',
    totalRevenue: 'Total Revenue',
    financialOverview: 'Financial Overview',
    recentCases: 'Recent Cases',
    upcomingDeadlines: 'Upcoming Deadlines',
    totalBudget: 'Total Budget',
    amountReceived: 'Amount Received',
    remainingAmount: 'Remaining Amount',
    recoveryRate: 'Recovery Rate',
    createdOn: 'Created on',
    deadline: 'Deadline',
    
    // Clients
    clientManagement: 'Client Management',
    manageClientPortfolio: 'Manage your client portfolio',
    newClient: 'New Client',
    searchByNameOrEmail: 'Search by name or email...',
    allTypes: 'All Types',
    nationalClients: 'National Clients',
    internationalClients: 'International Clients',
    totalClients: 'Total Clients',
    clientSince: 'Client since',
    active: 'Active',
    national: 'National',
    international: 'International',
    
    // Cases
    caseManagement: 'Case Management',
    caseTracking: 'Track your files and procedures',
    newCase: 'New Case',
    searchByTitleClientDesc: 'Search by title, client or description...',
    allStatuses: 'All Statuses',
    inProgress: 'In Progress',
    pending: 'Pending',
    completed: 'Completed',
    suspended: 'Suspended',
    allCaseTypes: 'All Types',
    trademark: 'Trademark',
    patent: 'Patent',
    design: 'Design',
    model: 'Model',
    litigation: 'Litigation',
    consulting: 'Consulting',
    totalCases: 'Total Cases',
    urgent: 'Urgent',
    high: 'High',
    normal: 'Normal',
    low: 'Low',
    casesList: 'Cases List',
    
    // Finances
    financialManagement: 'Financial Management',
    budgetPaymentTracking: 'Budget, payment and collection tracking',
    newPayment: 'New Payment',
    export: 'Export',
    totalTurnover: 'Total Turnover',
    amountCollected: 'Amount Collected',
    remainingToCollect: 'Remaining to Collect',
    pendingPayments: 'Pending Payments',
    paymentMethods: 'Payment Methods',
    paymentHistory: 'Payment History',
    validated: 'Validated',
    rejected: 'Rejected',
    cash: 'Cash',
    check: 'Check',
    transfer: 'Transfer',
    card: 'Card',
    paidOn: 'Paid on',
    
    // Tools
    externalTools: 'External Tools',
    ompicJusticeIntegration: 'OMPIC and Justice portals integration',
    ompicTrademarkSearch: 'OMPIC Trademark Search',
    searchTrademarkDatabase: 'Search in the registered trademark database',
    onlineDeposit: 'OMPIC Online Deposit',
    accessElectronicDeposit: 'Access electronic deposit system',
    procedureStatus: 'Procedure Status',
    consultProcedureStatus: 'Check file progress status',
    commercialCourts: 'Commercial Courts',
    accessFirstInstanceCourts: 'Access first instance courts',
    
    // OMPIC Search
    nationalTrademarkSearch: 'National Trademark Search - OMPIC',
    officialOmpicSearch: 'Official OMPIC database search form',
    simpleSearch: 'Simple Search',
    advancedSearch: 'Advanced Search',
    searchTerm: 'Search Term',
    searchPlaceholder: 'Trademark name, deposit number, applicant...',
    depositNumber: 'Deposit Number',
    trademarkName: 'Trademark Name',
    applicant: 'Applicant',
    representative: 'Representative',
    registrationNumber: 'Registration Number',
    publicationNumber: 'Publication Number',
    niceClass: 'Nice Class',
    allClasses: 'All Classes',
    productsServices: 'Products and Services',
    status: 'Status',
    startDate: 'Start Date',
    endDate: 'End Date',
    logicalOperator: 'Logical Operator',
    andOperator: 'AND (all criteria)',
    orOperator: 'OR (at least one criteria)',
    search: 'Search',
    searching: 'Searching...',
    reset: 'Reset',
    officialOmpicSite: 'Official OMPIC Site',
    
    // Common
    loading: 'Loading...',
    noResults: 'No results found',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    details: 'Details',
    copy: 'Copy',
    viewOn: 'View on',
    language: 'Language'
  },
  
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    clients: 'العملاء',
    affaires: 'القضايا',
    finances: 'المالية',
    outils: 'الأدوات الخارجية',
    
    // Header
    appTitle: 'مكتب الملكية الفكرية',
    appSubtitle: 'الملكية الصناعية',
    headerSubtitle: 'مكتب المحاماة - الملكية الصناعية',
    
    // Dashboard
    dashboardTitle: 'لوحة التحكم',
    activeClients: 'العملاء النشطون',
    ongoingCases: 'القضايا الجارية',
    urgentCases: 'القضايا العاجلة',
    totalRevenue: 'إجمالي الإيرادات',
    financialOverview: 'نظرة مالية عامة',
    recentCases: 'القضايا الأخيرة',
    upcomingDeadlines: 'المواعيد النهائية القادمة',
    totalBudget: 'إجمالي الميزانية',
    amountReceived: 'المبلغ المستلم',
    remainingAmount: 'المبلغ المتبقي',
    recoveryRate: 'معدل الاسترداد',
    createdOn: 'تم إنشاؤها في',
    deadline: 'الموعد النهائي',
    
    // Clients
    clientManagement: 'إدارة العملاء',
    manageClientPortfolio: 'إدارة محفظة عملائك',
    newClient: 'عميل جديد',
    searchByNameOrEmail: 'البحث بالاسم أو البريد الإلكتروني...',
    allTypes: 'جميع الأنواع',
    nationalClients: 'العملاء الوطنيون',
    internationalClients: 'العملاء الدوليون',
    totalClients: 'إجمالي العملاء',
    clientSince: 'عميل منذ',
    active: 'نشط',
    national: 'وطني',
    international: 'دولي',
    
    // Cases
    caseManagement: 'إدارة القضايا',
    caseTracking: 'تتبع ملفاتك وإجراءاتك',
    newCase: 'قضية جديدة',
    searchByTitleClientDesc: 'البحث بالعنوان أو العميل أو الوصف...',
    allStatuses: 'جميع الحالات',
    inProgress: 'قيد التنفيذ',
    pending: 'في الانتظار',
    completed: 'مكتملة',
    suspended: 'معلقة',
    allCaseTypes: 'جميع الأنواع',
    trademark: 'علامة تجارية',
    patent: 'براءة اختراع',
    design: 'تصميم',
    model: 'نموذج',
    litigation: 'نزاع',
    consulting: 'استشارة',
    totalCases: 'إجمالي القضايا',
    urgent: 'عاجل',
    high: 'عالي',
    normal: 'عادي',
    low: 'منخفض',
    casesList: 'قائمة القضايا',
    
    // Finances
    financialManagement: 'الإدارة المالية',
    budgetPaymentTracking: 'تتبع الميزانيات والمدفوعات والتحصيلات',
    newPayment: 'دفعة جديدة',
    export: 'تصدير',
    totalTurnover: 'إجمالي رقم الأعمال',
    amountCollected: 'المبلغ المحصل',
    remainingToCollect: 'المتبقي للتحصيل',
    pendingPayments: 'المدفوعات المعلقة',
    paymentMethods: 'طرق الدفع',
    paymentHistory: 'تاريخ المدفوعات',
    validated: 'مصدق',
    rejected: 'مرفوض',
    cash: 'نقدي',
    check: 'شيك',
    transfer: 'تحويل',
    card: 'بطاقة',
    paidOn: 'دفع في',
    
    // Tools
    externalTools: 'الأدوات الخارجية',
    ompicJusticeIntegration: 'التكامل مع أومبيك وبوابات العدالة',
    ompicTrademarkSearch: 'البحث في العلامات التجارية أومبيك',
    searchTrademarkDatabase: 'البحث في قاعدة بيانات العلامات التجارية المسجلة',
    onlineDeposit: 'الإيداع الإلكتروني أومبيك',
    accessElectronicDeposit: 'الوصول إلى نظام الإيداع الإلكتروني',
    procedureStatus: 'حالة الإجراءات',
    consultProcedureStatus: 'استشارة حالة تقدم الملفات',
    commercialCourts: 'المحاكم التجارية',
    accessFirstInstanceCourts: 'الوصول إلى محاكم الدرجة الأولى',
    
    // OMPIC Search
    nationalTrademarkSearch: 'البحث في العلامات التجارية الوطنية - أومبيك',
    officialOmpicSearch: 'نموذج البحث الرسمي في قاعدة بيانات أومبيك',
    simpleSearch: 'بحث بسيط',
    advancedSearch: 'بحث متقدم',
    searchTerm: 'مصطلح البحث',
    searchPlaceholder: 'اسم العلامة التجارية، رقم الإيداع، المودع...',
    depositNumber: 'رقم الإيداع',
    trademarkName: 'اسم العلامة التجارية',
    applicant: 'المودع',
    representative: 'الوكيل',
    registrationNumber: 'رقم التسجيل',
    publicationNumber: 'رقم النشر',
    niceClass: 'فئة نيس',
    allClasses: 'جميع الفئات',
    productsServices: 'المنتجات والخدمات',
    status: 'الحالة',
    startDate: 'تاريخ البداية',
    endDate: 'تاريخ النهاية',
    logicalOperator: 'المشغل المنطقي',
    andOperator: 'و (جميع المعايير)',
    orOperator: 'أو (معيار واحد على الأقل)',
    search: 'بحث',
    searching: 'جاري البحث...',
    reset: 'إعادة تعيين',
    officialOmpicSite: 'موقع أومبيك الرسمي',
    
    // Common
    loading: 'جاري التحميل...',
    noResults: 'لم يتم العثور على نتائج',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    details: 'التفاصيل',
    copy: 'نسخ',
    viewOn: 'عرض على',
    language: 'اللغة'
  },
  
  es: {
    // Navigation
    dashboard: 'Panel de Control',
    clients: 'Clientes',
    affaires: 'Casos',
    finances: 'Finanzas',
    outils: 'Herramientas Externas',
    
    // Header
    appTitle: 'Bufete PI',
    appSubtitle: 'Propiedad Industrial',
    headerSubtitle: 'Bufete de Abogados - Propiedad Industrial',
    
    // Dashboard
    dashboardTitle: 'Panel de Control',
    activeClients: 'Clientes Activos',
    ongoingCases: 'Casos en Curso',
    urgentCases: 'Casos Urgentes',
    totalRevenue: 'Ingresos Totales',
    financialOverview: 'Resumen Financiero',
    recentCases: 'Casos Recientes',
    upcomingDeadlines: 'Próximos Vencimientos',
    totalBudget: 'Presupuesto Total',
    amountReceived: 'Cantidad Recibida',
    remainingAmount: 'Cantidad Restante',
    recoveryRate: 'Tasa de Recuperación',
    createdOn: 'Creado el',
    deadline: 'Fecha Límite',
    
    // Clients
    clientManagement: 'Gestión de Clientes',
    manageClientPortfolio: 'Gestiona tu cartera de clientes',
    newClient: 'Nuevo Cliente',
    searchByNameOrEmail: 'Buscar por nombre o email...',
    allTypes: 'Todos los Tipos',
    nationalClients: 'Clientes Nacionales',
    internationalClients: 'Clientes Internacionales',
    totalClients: 'Total Clientes',
    clientSince: 'Cliente desde',
    active: 'Activo',
    national: 'Nacional',
    international: 'Internacional',
    
    // Cases
    caseManagement: 'Gestión de Casos',
    caseTracking: 'Seguimiento de expedientes y procedimientos',
    newCase: 'Nuevo Caso',
    searchByTitleClientDesc: 'Buscar por título, cliente o descripción...',
    allStatuses: 'Todos los Estados',
    inProgress: 'En Progreso',
    pending: 'Pendiente',
    completed: 'Completado',
    suspended: 'Suspendido',
    allCaseTypes: 'Todos los Tipos',
    trademark: 'Marca',
    patent: 'Patente',
    design: 'Diseño',
    model: 'Modelo',
    litigation: 'Litigio',
    consulting: 'Consultoría',
    totalCases: 'Total Casos',
    urgent: 'Urgente',
    high: 'Alto',
    normal: 'Normal',
    low: 'Bajo',
    casesList: 'Lista de Casos',
    
    // Finances
    financialManagement: 'Gestión Financiera',
    budgetPaymentTracking: 'Seguimiento de presupuestos, pagos y cobros',
    newPayment: 'Nuevo Pago',
    export: 'Exportar',
    totalTurnover: 'Facturación Total',
    amountCollected: 'Cantidad Cobrada',
    remainingToCollect: 'Pendiente de Cobrar',
    pendingPayments: 'Pagos Pendientes',
    paymentMethods: 'Métodos de Pago',
    paymentHistory: 'Historial de Pagos',
    validated: 'Validado',
    rejected: 'Rechazado',
    cash: 'Efectivo',
    check: 'Cheque',
    transfer: 'Transferencia',
    card: 'Tarjeta',
    paidOn: 'Pagado el',
    
    // Tools
    externalTools: 'Herramientas Externas',
    ompicJusticeIntegration: 'Integración con OMPIC y portales de Justicia',
    ompicTrademarkSearch: 'Búsqueda de Marcas OMPIC',
    searchTrademarkDatabase: 'Buscar en la base de datos de marcas registradas',
    onlineDeposit: 'Depósito en Línea OMPIC',
    accessElectronicDeposit: 'Acceder al sistema de depósito electrónico',
    procedureStatus: 'Estado de Procedimientos',
    consultProcedureStatus: 'Consultar el estado de avance de expedientes',
    commercialCourts: 'Tribunales Comerciales',
    accessFirstInstanceCourts: 'Acceder a tribunales de primera instancia',
    
    // OMPIC Search
    nationalTrademarkSearch: 'Búsqueda de Marcas Nacionales - OMPIC',
    officialOmpicSearch: 'Formulario oficial de búsqueda en base de datos OMPIC',
    simpleSearch: 'Búsqueda Simple',
    advancedSearch: 'Búsqueda Avanzada',
    searchTerm: 'Término de Búsqueda',
    searchPlaceholder: 'Nombre de marca, número de depósito, solicitante...',
    depositNumber: 'Número de Depósito',
    trademarkName: 'Nombre de la Marca',
    applicant: 'Solicitante',
    representative: 'Representante',
    registrationNumber: 'Número de Registro',
    publicationNumber: 'Número de Publicación',
    niceClass: 'Clase de Niza',
    allClasses: 'Todas las Clases',
    productsServices: 'Productos y Servicios',
    status: 'Estado',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    logicalOperator: 'Operador Lógico',
    andOperator: 'Y (todos los criterios)',
    orOperator: 'O (al menos un criterio)',
    search: 'Buscar',
    searching: 'Buscando...',
    reset: 'Restablecer',
    officialOmpicSite: 'Sitio Oficial OMPIC',
    
    // Common
    loading: 'Cargando...',
    noResults: 'No se encontraron resultados',
    error: 'Error',
    retry: 'Reintentar',
    close: 'Cerrar',
    details: 'Detalles',
    copy: 'Copiar',
    viewOn: 'Ver en',
    language: 'Idioma'
  }
};

export class TranslationService {
  private static currentLanguage: Language = 'fr';
  
  static setLanguage(language: Language) {
    this.currentLanguage = language;
    // Store in localStorage for persistence
    localStorage.setItem('app-language', language);
    
    // Update document direction for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }
  
  static getCurrentLanguage(): Language {
    // Get from localStorage or default to French
    const stored = localStorage.getItem('app-language') as Language;
    return stored || 'fr';
  }
  
  static translate(key: string): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }
  
  static getLanguages(): { code: Language; name: string; flag: string }[] {
    return [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'ar', name: 'العربية', flag: '🇲🇦' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ];
  }
}

// Initialize language on app start
TranslationService.setLanguage(TranslationService.getCurrentLanguage());