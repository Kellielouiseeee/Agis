import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import { Wallet, GraduationCap, ShoppingBag, Gamepad2, Baby, TrendingUp, MessageSquare, Sparkles, Shield, Zap, BarChart3, Settings, Coins, Receipt, ArrowLeftRight, LogOut, Download, Globe, Activity, ShieldCheck } from "lucide-react";
import { CurrencyConverter } from "./CurrencyConverter";
import { CustomerSupport } from "./CustomerSupport";
import { SystemHealth } from "./SystemHealth";
import { DailyNotificationBot } from "./DailyNotificationBot";
import { ChatAvatar } from "./ChatAvatar";
import { CryptoPurchase } from "./CryptoPurchase";

export function Layout() {
  const location = useLocation();
  const [showConverter, setShowConverter] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: Sparkles },
    { path: "/invest", label: "Invest", icon: TrendingUp },
    { path: "/trading", label: "Trade", icon: ArrowLeftRight },
    { path: "/mint-earn", label: "Mint & Earn", icon: Coins },
    { path: "/learn", label: "Learn", icon: GraduationCap },
    { path: "/marketplace", label: "Market", icon: ShoppingBag },
    { path: "/gaming", label: "Gaming", icon: Gamepad2 },
    { path: "/kids-wallet", label: "Kids", icon: Baby },
    { path: "/chat", label: "Chat", icon: MessageSquare },
    { path: "/stats", label: "Stats", icon: BarChart3 },
    { path: "/transactions", label: "Transactions", icon: Receipt },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/agis-web", label: "AgisWeb", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wallet className="w-8 h-8 text-yellow-400" />
                <Sparkles className="w-4 h-4 text-pink-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-white">EcoSystem Pro</h1>
                <p className="text-xs text-purple-300">User-Owned Ecosystem • Your Future 🚀</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CryptoPurchase />
              <button
                onClick={() => setShowConverter(!showConverter)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-400/30 hover:bg-blue-500/30 transition-all"
              >
                <ArrowLeftRight className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Convert</span>
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-400/30" title="Triple Verified & Encrypted">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Verified Secure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 rounded-full border border-yellow-400/30">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-300">$12,847.52</span>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('ecosystem_auth');
                  window.location.reload();
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 rounded-full border border-red-400/30 hover:bg-red-500/30 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* System Health Monitor */}
      <SystemHealth />

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/10 backdrop-blur-lg sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Currency Converter Modal */}
      {showConverter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setShowConverter(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white flex items-center justify-center"
            >
              ✕
            </button>
            <CurrencyConverter />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Customer Support Widget */}
      <CustomerSupport />
      
      {/* Chat Avatar Helper */}
      <ChatAvatar />

      {/* Daily Notification Bot */}
      <DailyNotificationBot />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
             <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
               <Activity className="w-6 h-6 text-green-400 mx-auto mb-2" />
               <div className="text-2xl font-bold text-white">1,284,593</div>
               <div className="text-xs text-white/50 uppercase">Active Users</div>
             </div>
             <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
               <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
               <div className="text-2xl font-bold text-white">489k</div>
               <div className="text-xs text-white/50 uppercase">Trans. Today</div>
             </div>
             <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
               <Download className="w-6 h-6 text-blue-400 mx-auto mb-2" />
               <div className="text-2xl font-bold text-white">2.8M</div>
               <div className="text-xs text-white/50 uppercase">App Downloads</div>
             </div>
             <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
               <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
               <div className="text-2xl font-bold text-white">192</div>
               <div className="text-xs text-white/50 uppercase">Countries Live</div>
             </div>
          </div>
          <div className="text-center text-white/60 text-sm">
            <p>🌐 Global • 🔒 Encrypted • ⚡ Zero Fees • 🤖 AI Powered • 💎 Quantum Resistant</p>
            <p className="mt-2">User Owned • Auto Tax Compliant • 24/7 Earnings • Max Profits 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
