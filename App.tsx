import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Wallet, 
  User, 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  History,
  Bell,
  Search,
  Settings,
  LogOut,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Server,
  Shield,
  Wifi,
  Activity,
  Cpu,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Smartphone,
  Save,
  MoreHorizontal,
  X
} from 'lucide-react';
import { StatCard } from './components/StatCard';
import { RevenueChart } from './components/RevenueChart';
import { SourcesChart } from './components/SourcesChart';
import { GameCard } from './components/GameCard';
import { GameSession } from './components/GameSession';
import { GAMES, WEEKLY_DATA, CATEGORY_EARNINGS_DATA, MOCK_USER, TRANSACTIONS } from './constants';
import { Game, Tab, UserStats, UserProfile } from './types';

const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // User Stats State (Simulated backend data in FCFA)
  const [stats, setStats] = useState<UserStats>({
    balance: 93500,
    earningsToday: 5500,
    earningsYesterday: 8200,
    availableBalance: 85000,
    totalWithdrawn: 295000
  });

  const [user] = useState<UserProfile>(MOCK_USER);

  // Gameplay State
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  
  // Game Category State
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');

  // Config State
  const [showApiKey, setShowApiKey] = useState(false);
  const [config, setConfig] = useState({
    region: 'Europe (Paris)',
    proxyIP: '',
    secureMode: true,
    apiKey: '',
    twoFactor: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Derived Data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(GAMES.map(g => g.category)));
    return ['Tout', ...cats];
  }, []);

  const filteredGames = useMemo(() => {
    if (selectedCategory === 'Tout') return GAMES;
    return GAMES.filter(game => game.category === selectedCategory);
  }, [selectedCategory]);

  // Handlers
  const handlePlayGame = (game: Game) => {
    setActiveGame(game);
  };

  const handleGameComplete = (reward: number) => {
    setStats(prev => ({
      ...prev,
      balance: prev.balance + reward,
      earningsToday: prev.earningsToday + reward,
      availableBalance: prev.availableBalance + reward
    }));
    setActiveGame(null);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    // Simulation of saving delay and connection
    setTimeout(() => {
      setIsSaving(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleNavClick = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Render Helpers
  const renderNavButtons = (isMobile = false) => (
    <>
      <button 
        onClick={() => handleNavClick(Tab.DASHBOARD)}
        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
          activeTab === Tab.DASHBOARD 
            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <LayoutDashboard size={20} />
        <span>Tableau de bord</span>
      </button>
      <button 
        onClick={() => handleNavClick(Tab.GAMES)}
        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
          activeTab === Tab.GAMES 
            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Gamepad2 size={20} />
        <span>Jeux</span>
      </button>
      <button 
        onClick={() => handleNavClick(Tab.WALLET)}
        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
          activeTab === Tab.WALLET 
            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Wallet size={20} />
        <span>Portefeuille</span>
      </button>
      <button 
        onClick={() => handleNavClick(Tab.PROFILE)}
        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
          activeTab === Tab.PROFILE 
            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <User size={20} />
        <span>Profil</span>
      </button>
      <button 
        onClick={() => handleNavClick(Tab.CONFIGURATION)}
        className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
          activeTab === Tab.CONFIGURATION 
            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Settings size={20} />
        <span>Configuration</span>
      </button>
    </>
  );

  const renderDashboard = () => (
    <div key="dashboard" className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center">
            Bonsoir {user.name} ! <span className="ml-2 text-2xl">🌙</span>
          </h1>
          <p className="text-slate-500 mt-1">Voici les performances de Lumina Rewards cette semaine.</p>
        </div>
        <div className="hidden md:flex items-center text-sm text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
           Mise à jour : À l'instant
        </div>
      </div>

      {/* Stats Grid - 2x2 on Mobile/Tablet, 4x1 on Large screens */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          label="Solde Total" 
          value={`${stats.balance.toLocaleString()} FCFA`}
          icon={DollarSign}
        />
        <StatCard 
          label="Gains Aujourd'hui" 
          value={`${stats.earningsToday.toLocaleString()} FCFA`}
          icon={TrendingUp}
        />
        <StatCard 
          label="Solde Disponible" 
          value={`${stats.availableBalance.toLocaleString()} FCFA`}
          icon={Wallet}
        />
        <StatCard 
          label="Total Retiré" 
          value={`${stats.totalWithdrawn.toLocaleString()} FCFA`}
          icon={CreditCard}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Trafic & Revenus</h3>
          </div>
          <RevenueChart data={WEEKLY_DATA} />
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Gains par Catégorie</h3>
          <div className="flex-1 flex items-center justify-center">
            <SourcesChart data={CATEGORY_EARNINGS_DATA} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderGames = () => (
    <div key="games" className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Catalogue de Jeux</h2>
          <p className="text-slate-500 mt-1">Jouez et gagnez des FCFA instantanément.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Games Grid - 2x2 on Mobile/Tablet */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onPlay={handlePlayGame} 
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400">
            <Gamepad2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun jeu trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div key="wallet" className="animate-fade-in space-y-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mon Portefeuille</h2>
          <p className="text-slate-500 mt-1">Gérez vos retraits et consultez votre historique.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Withdrawal Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Main Balance Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
            <p className="text-slate-400 text-sm mb-1 font-medium">Solde Disponible</p>
            <h3 className="text-3xl font-bold mb-6">{stats.availableBalance.toLocaleString()} FCFA</h3>
            
            <div className="flex gap-3">
              <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                 <div className="flex items-center text-xs text-slate-300 mb-1">
                   <TrendingUp size={14} className="mr-1 text-emerald-400" /> Gains jour
                 </div>
                 <p className="font-semibold text-lg">{stats.earningsToday.toLocaleString()} FCFA</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                 <div className="flex items-center text-xs text-slate-300 mb-1">
                   <Clock size={14} className="mr-1 text-amber-400" /> En attente
                 </div>
                 <p className="font-semibold text-lg">0 FCFA</p>
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Demander un retrait</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Montant à retirer</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Min: 2000 FCFA" 
                    className="w-full pl-4 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">FCFA</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Moyen de paiement</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Orange', 'MTN', 'Wave'].map(provider => (
                    <button key={provider} className="py-2.5 px-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all">
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Numéro de téléphone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="07 00 00 00 00" 
                    defaultValue={user.phone}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all mt-2">
                Confirmer le retrait
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Historique des transactions</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Tout voir</button>
          </div>
          
          <div className="overflow-y-auto max-h-[600px]">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="p-4 sm:p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.type === 'withdrawal' 
                      ? 'bg-amber-50 text-amber-600' 
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {tx.type === 'withdrawal' ? <Wallet size={24} /> : <Gamepad2 size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      {tx.type === 'withdrawal' ? `Retrait ${tx.provider}` : 'Gain de jeu'}
                    </p>
                    <p className="text-sm text-slate-400">{tx.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    tx.type === 'withdrawal' ? 'text-slate-900' : 'text-emerald-600'
                  }`}>
                    {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount.toLocaleString()} FCFA
                  </p>
                  <div className="flex items-center justify-end text-xs font-medium mt-1">
                    {tx.status === 'completed' && (
                      <span className="flex items-center text-emerald-600">
                        <CheckCircle size={12} className="mr-1" /> Succès
                      </span>
                    )}
                    {tx.status === 'pending' && (
                      <span className="flex items-center text-amber-500">
                        <Clock size={12} className="mr-1" /> En attente
                      </span>
                    )}
                     {tx.status === 'failed' && (
                      <span className="flex items-center text-rose-500">
                        <XCircle size={12} className="mr-1" /> Échec
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfiguration = () => (
    <div key="configuration" className="animate-fade-in space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Configuration Système</h2>
          <p className="text-slate-500 mt-1">Gérez les paramètres avancés, les serveurs et la sécurité.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-sm font-medium">
          <Activity size={16} />
          <span>Système Opérationnel</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network & Server Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Server size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Serveur & Réseau</h3>
              </div>
              {isConnected ? (
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                  CONNECTÉ
                </span>
              ) : (
                <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mr-2"></div>
                  DÉCONNECTÉ
                </span>
              )}
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  <span>Région du Serveur</span>
                  <span className="text-slate-400 font-normal text-xs">Latence: {isConnected ? '24ms' : '--'}</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Europe (Paris)', 'Afrique (Abidjan)', 'USA (Est)'].map((region, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setConfig({...config, region})}
                      className={`text-sm py-2 px-3 rounded-xl border transition-all ${
                        config.region === region 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Adresse IP Proxy</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Ex: 192.168.1.45"
                      value={config.proxyIP}
                      onChange={(e) => setConfig({...config, proxyIP: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <button className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <RefreshCw size={18} />
                  </button>
                </div>
                <p className="text-xs text-slate-500 pl-1">Adresse IPv4 du serveur proxy sécurisé.</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Wifi size={20} className="text-slate-400" />
                  <div>
                    <p className="font-semibold text-sm text-slate-900">Mode Faible Latence</p>
                    <p className="text-xs text-slate-500">Optimise les paquets pour le jeu</p>
                  </div>
                </div>
                <div 
                  onClick={() => setConfig({...config, secureMode: !config.secureMode})}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${config.secureMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${config.secureMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
             <div className="flex items-center gap-3 mb-4">
                <Cpu size={20} className="text-slate-400" />
                <h3 className="font-bold text-slate-900">Performances</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>Utilisation CPU</span>
                    <span>{isConnected ? '34%' : '0%'}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: isConnected ? '34%' : '0%' }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>Mémoire</span>
                    <span>{isConnected ? '1.2 GB / 4 GB' : '0 GB / 4 GB'}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: isConnected ? '28%' : '0%' }}></div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Security & Encryption */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                  <Shield size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Sécurité Avancée</h3>
              </div>
              <span className="text-xs font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-2 py-1 rounded">
                AES-256
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Clé API Développeur</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Lock size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input 
                      type={showApiKey ? "text" : "password"} 
                      placeholder="sk_live_..."
                      value={config.apiKey} 
                      onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <button 
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                    >
                      {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <button className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-xs text-slate-500 pl-1">Entrez votre clé API privée pour activer les fonctions serveur.</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                     <Smartphone size={20} />
                   </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">Double Authentification</p>
                    <p className="text-xs text-slate-500">Sécuriser les retraits via SMS</p>
                  </div>
                </div>
                <div 
                  onClick={() => setConfig({...config, twoFactor: !config.twoFactor})}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${config.twoFactor ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${config.twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Appareils Actifs</h4>
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone size={16} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">iPhone 13 Pro</span>
                      </div>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Actuel</span>
                   </div>
                   <div className="flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">Chrome / Windows</span>
                      </div>
                      <span className="text-xs text-slate-500">Hier</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Action Bar */}
      <div className="flex justify-end pt-4 pb-8">
        <button 
          onClick={handleSaveConfig}
          disabled={isSaving}
          className={`flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSaving ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              <span>Connexion en cours...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>{isConnected ? "Mettre à jour la configuration" : "Enregistrer et Connecter"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div key="profile" className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Mon Profil</h2>
        <p className="text-slate-500 mt-1">Gérez vos informations personnelles et vos préférences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
               <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
               <p className="text-slate-500 text-sm">Membre depuis le {user.joinDate}</p>
            </div>
            <button className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">
              Modifier l'avatar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Informations Personnelles</h4>
               
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                   <div className="relative">
                     <User size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                     <input 
                       type="text" 
                       defaultValue={user.name}
                       className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-medium"
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                   <div className="relative">
                     <Mail size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                     <input 
                       type="email" 
                       defaultValue={user.email}
                       className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-medium"
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                   <div className="relative">
                     <Phone size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                     <input 
                       type="tel" 
                       defaultValue={user.phone}
                       className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-medium"
                     />
                   </div>
                 </div>

                 <button className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm">
                   Enregistrer les modifications
                 </button>
               </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Préférences & Sécurité</h4>
              
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3 group-hover:bg-indigo-100 transition-colors">
                        <Bell size={20} />
                      </div>
                      <span className="font-medium text-slate-700">Notifications</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                 </button>

                 <button 
                    onClick={() => setActiveTab(Tab.CONFIGURATION)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group"
                 >
                    <div className="flex items-center">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mr-3 group-hover:bg-emerald-100 transition-colors">
                        <Settings size={20} />
                      </div>
                      <span className="font-medium text-slate-700">Paramètres de l'application</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                 </button>
                 
                 <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-rose-50 hover:border-rose-100 transition-colors group mt-8">
                    <div className="flex items-center">
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-lg mr-3 group-hover:bg-rose-100 transition-colors">
                        <LogOut size={20} />
                      </div>
                      <span className="font-medium text-rose-600">Déconnexion</span>
                    </div>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 md:pb-0 font-sans">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b border-slate-100 p-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-md">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Lumina</span>
        </div>
        <div className="flex items-center space-x-3">
           <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors">
             <Bell size={20} />
             <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
           </button>
           <button 
             onClick={() => setActiveTab(Tab.PROFILE)}
             className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border border-slate-200"
           >
             <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
           </button>
        </div>
      </div>

      <div className="flex max-w-screen-2xl mx-auto">
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Sidebar Content */}
            <div className="relative w-72 h-full bg-white shadow-2xl flex flex-col p-6 animate-fade-in">
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <span className="text-white font-bold text-xl">L</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Lumina</span>
                 </div>
                 <button 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
                 >
                   <X size={24} />
                 </button>
               </div>
               
               <div className="space-y-2 flex-1 overflow-y-auto">
                 {renderNavButtons(true)}
               </div>

               <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm">
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-slate-100 bg-white p-6 z-30">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Lumina</span>
          </div>

          <nav className="space-y-2 flex-1">
             {renderNavButtons()}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-full overflow-hidden bg-[#F8FAFC]">
          {/* Desktop Header */}
          <header className="hidden md:flex justify-between items-center mb-10">
            <div>
               <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Espace Membre</span>
               <h2 className="text-lg font-bold text-slate-900">
                 {activeTab === Tab.DASHBOARD && "Vue d'ensemble"}
                 {activeTab === Tab.GAMES && "Zone de Jeux"}
                 {activeTab === Tab.WALLET && "Finances"}
                 {activeTab === Tab.PROFILE && "Paramètres"}
                 {activeTab === Tab.CONFIGURATION && "Configuration"}
               </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Recherche..." 
                  className="pl-10 pr-4 py-2.5 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
                />
              </div>
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm">
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-sm">
                   <p className="font-bold text-slate-900 leading-none">{user.name}</p>
                </div>
              </div>
            </div>
          </header>

          {activeTab === Tab.DASHBOARD && renderDashboard()}
          {activeTab === Tab.GAMES && renderGames()}
          {activeTab === Tab.WALLET && renderWallet()}
          {activeTab === Tab.PROFILE && renderProfile()}
          {activeTab === Tab.CONFIGURATION && renderConfiguration()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab(Tab.DASHBOARD)}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === Tab.DASHBOARD ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard size={24} strokeWidth={activeTab === Tab.DASHBOARD ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Accueil</span>
        </button>
        <button 
          onClick={() => setActiveTab(Tab.GAMES)}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === Tab.GAMES ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <Gamepad2 size={24} strokeWidth={activeTab === Tab.GAMES ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Jeux</span>
        </button>
        <button 
          onClick={() => setActiveTab(Tab.WALLET)}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === Tab.WALLET ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <Wallet size={24} strokeWidth={activeTab === Tab.WALLET ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Retraits</span>
        </button>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className={`flex flex-col items-center space-y-1 ${
            isMobileMenuOpen ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <MoreHorizontal size={24} strokeWidth={isMobileMenuOpen ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </div>

      {/* Game Modal */}
      {activeGame && (
        <GameSession 
          game={activeGame} 
          onClose={handleCloseGame} 
          onComplete={handleGameComplete} 
        />
      )}
    </div>
  );
};

// Mini helper icons for inline usage
const PlayIcon = ({ size, fill, className }: { size?: number, fill?: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

export default App;