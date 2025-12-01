import { TrendingUp, TrendingDown, Zap, Shield, Brain, Wallet, Award, Globe, RefreshCw, Bot, Package, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Dashboard() {
  const stats = [
    { label: "Total Value", value: "$12,847.52", change: "+18.5%", up: true, icon: Wallet },
    { label: "Auto Swarms Active", value: "7", change: "Optimizing", up: true, icon: Brain },
    { label: "Learning Progress", value: "68%", change: "2 Certs Ready", up: true, icon: Award },
    { label: "Global Rank", value: "#1,847", change: "↑ 234", up: true, icon: Globe },
  ];

  const swarms = [
    { name: "BTC Alpha Swarm", amount: "$2,847", profit: "+12.4%", status: "active", type: "invest" },
    { name: "ETH Growth Bot", amount: "$1,923", profit: "+8.7%", status: "active", type: "invest" },
    { name: "Meme Coin Hunter", amount: "$847", profit: "+45.2%", status: "active", type: "invest" },
    { name: "System Auto-Repair", amount: "Core", profit: "Optimized", status: "repairing", type: "system" },
    { name: "Bot Defense Swarm", amount: "Shield", profit: "Blocked 124", status: "defending", type: "security" },
  ];

  const predictions = [
    { asset: "BTC", prediction: "↑ Bullish", confidence: 87, timeframe: "24h" },
    { asset: "ETH", prediction: "↑ Strong Buy", confidence: 92, timeframe: "12h" },
    { asset: "DOGE", prediction: "→ Hold", confidence: 65, timeframe: "48h" },
  ];

  return (
    <div className="space-y-6">
      {/* Starter Pack Claim Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-1">
         <div className="bg-black/80 backdrop-blur-xl rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
               <Package className="w-8 h-8 text-white" />
             </div>
             <div>
               <h3 className="text-white text-xl font-bold">New User Starter Pack Available! 🎁</h3>
               <p className="text-white/70">Includes 50 AGIS Coins, NFT Badge, and Lvl 1 Investing Bot.</p>
             </div>
           </div>
           <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-xl">
             Claim Free Pack
           </Button>
         </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8">
        <div className="relative z-10">
          <h2 className="text-white mb-2">Welcome Back, Future Millionaire! 🎉</h2>
          <p className="text-white/90 mb-4">Your auto-swarms earned $127.43 while you slept. Keep learning, keep earning! 💎</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-white/90 transition-all">
              Start Learning 📚
            </button>
            <button className="px-4 py-2 bg-black/20 text-white rounded-lg hover:bg-black/30 transition-all backdrop-blur-sm border border-white/20">
              Deploy New Swarm 🤖
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
      </div>

      {/* System Health / Auto-Update Banner */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-white">🤖 Agis AI System Status: Self-Evolving</h3>
                 <Badge variant="outline" className="text-green-400 border-green-400/50 animate-pulse">Live & Adapting</Badge>
              </div>
              <p className="text-white/80 text-sm mb-3">
                Swarms are actively monitoring, repairing, and upgrading the ecosystem in real-time.
                Zero downtime. Zero lag. Maximum profit efficiency.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-400/30 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Risks Assessed
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs border border-purple-400/30 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Auto-Upgrading
                </span>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs border border-red-400/30 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Bots Blocked
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-400/30 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Gas Fees: $0.00
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/60">{stat.label}</p>
                    <p className="text-2xl text-white mt-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto Swarms */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-pink-400" />
              Active Swarm Network
            </CardTitle>
            <CardDescription className="text-white/60">Self-managing fleet deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {swarms.map((swarm) => (
                <div key={swarm.name} className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                         <p className="text-white">{swarm.name}</p>
                         {swarm.type === 'security' && <Shield className="w-3 h-3 text-red-400" />}
                         {swarm.type === 'system' && <RefreshCw className="w-3 h-3 text-blue-400" />}
                      </div>
                      <p className="text-sm text-white/60">{swarm.amount}</p>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 ${
                        swarm.type === 'security' ? 'text-red-400' : 
                        swarm.type === 'system' ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span>{swarm.profit}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                           swarm.status === 'repairing' ? 'bg-blue-400' : 
                           swarm.status === 'defending' ? 'bg-red-400' : 'bg-green-400'
                        }`} />
                        <span className="text-xs text-white/60 capitalize">{swarm.status}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={75} className={`h-1 ${
                     swarm.type === 'security' ? 'bg-red-900' : 'bg-gray-700'
                  }`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Predictions */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              AI Market Predictions
            </CardTitle>
            <CardDescription className="text-white/60">Real-time analysis & trend detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((pred) => (
                <div key={pred.asset} className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white">{pred.asset}</p>
                      <p className="text-sm text-white/60">{pred.timeframe} forecast</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400">{pred.prediction}</p>
                      <p className="text-sm text-white/60">{pred.confidence}% confident</p>
                    </div>
                  </div>
                  <Progress value={pred.confidence} className="h-2" />
                </div>
              ))}
              <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-400/30 flex items-start gap-2">
                <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200">
                  Anti-rogue detection active. All swarms monitored for anomalies. Auto-repair ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/10">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-center group">
              <div className="text-3xl mb-2">🎓</div>
              <p className="text-white text-sm">Complete a Course</p>
            </button>
            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-center group">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-white text-sm">Mint NFT</p>
            </button>
            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-center group">
              <div className="text-3xl mb-2">🎰</div>
              <p className="text-white text-sm">Play & Invest</p>
            </button>
            <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-center group">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-white text-sm">Join Community</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
