import { useState, useEffect } from "react";
import { X, TrendingUp, Award, Zap, Bell, ChevronRight } from "lucide-react";

export function DailyNotificationBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Show notification bot after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const notifications = [
    {
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-500/20",
      title: "Your swarms earned $127.43 overnight!",
      action: "View Earnings",
    },
    {
      icon: Award,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      title: "New course available: Advanced DeFi",
      action: "Start Learning",
    },
    {
      icon: Zap,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      title: "BTC predicted to rise 8% in 24h",
      action: "View Prediction",
    },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-40 w-96">
      {isExpanded ? (
        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">Good Morning! ☀️</h3>
                <p className="text-xs text-white/60">Daily Updates • Nov 28, 2025</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <p className="text-white text-sm mb-2">
                <strong>🎉 Daily Summary</strong>
              </p>
              <ul className="text-white/70 text-xs space-y-1">
                <li>• Portfolio up 3.2% ($412.23)</li>
                <li>• 3 new NFT bids received</li>
                <li>• 12-day learning streak! 🔥</li>
                <li>• All systems optimal ✓</li>
              </ul>
            </div>

            {notifications.map((notif, idx) => {
              const Icon = notif.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${notif.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${notif.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm mb-2">{notif.title}</p>
                      <button className="text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1">
                        {notif.action}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10">
              <p className="text-white/80 text-xs text-center">
                🤖 <strong>Auto-Bot Active:</strong> Monitoring markets, optimizing swarms, and keeping you updated 24/7
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10 bg-black/20">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full py-2 text-white/60 hover:text-white text-sm transition-all"
            >
              Dismiss for today
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 relative"
        >
          <Bell className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
            <span className="text-white text-xs">3</span>
          </div>
        </button>
      )}
    </div>
  );
}
