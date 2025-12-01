import { useState } from "react";
import { TrendingUp, Plus, Settings, Sparkles, Target, Shield, Sprout, Globe, Heart, TreeDeciduous } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";

export function Invest() {
  const [riskLevel, setRiskLevel] = useState([50]);
  
  const portfolios = [
    { name: "Conservative", risk: "Low", return: "3-8%", icon: "🛡️", desc: "Stable growth, minimal risk" },
    { name: "Balanced", risk: "Medium", return: "8-15%", icon: "⚖️", desc: "Mix of stability and growth" },
    { name: "Aggressive", risk: "High", return: "15-40%", icon: "🚀", desc: "High risk, high reward" },
    { name: "Meme Master", risk: "Ultra", return: "40-500%", icon: "🐕", desc: "Wild west volatility" },
    { name: "Eco-Warrior", risk: "Low-Med", return: "5-12%", icon: "🌱", desc: "Green projects & carbon credits" },
  ];

  const liveMarkets = [
    { asset: "Bitcoin (BTC)", price: "$43,847.23", change: "+5.4%", trend: "up" },
    { asset: "Ethereum (ETH)", price: "$2,283.45", change: "+3.2%", trend: "up" },
    { asset: "Dogecoin (DOGE)", price: "$0.0847", change: "+12.8%", trend: "up" },
    { asset: "Pepe Coin (PEPE)", price: "$0.00012", change: "-2.1%", trend: "down" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Smart Investment Hub</h2>
          <p className="text-white/60">Auto-swarms working 24/7 for maximum returns & global impact 🚀</p>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Deploy New Swarm
        </Button>
      </div>

      {/* Impact Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="bg-green-900/20 border-green-500/30">
           <CardContent className="p-4 flex items-center gap-4">
             <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
               <TreeDeciduous className="w-6 h-6 text-green-400" />
             </div>
             <div>
               <p className="text-white/60 text-xs uppercase tracking-widest">Nature Saved</p>
               <p className="text-white font-bold">1,284 Trees</p>
               <p className="text-green-400 text-xs">Planted via profits</p>
             </div>
           </CardContent>
         </Card>
         <Card className="bg-blue-900/20 border-blue-500/30">
           <CardContent className="p-4 flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
               <Globe className="w-6 h-6 text-blue-400" />
             </div>
             <div>
               <p className="text-white/60 text-xs uppercase tracking-widest">Global Aid</p>
               <p className="text-white font-bold">$12,450</p>
               <p className="text-blue-400 text-xs">Donated to causes</p>
             </div>
           </CardContent>
         </Card>
         <Card className="bg-yellow-900/20 border-yellow-500/30">
           <CardContent className="p-4 flex items-center gap-4">
             <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
               <Heart className="w-6 h-6 text-yellow-400" />
             </div>
             <div>
               <p className="text-white/60 text-xs uppercase tracking-widest">Lives Impacted</p>
               <p className="text-white font-bold">847</p>
               <p className="text-yellow-400 text-xs">People helped</p>
             </div>
           </CardContent>
         </Card>
      </div>

      {/* Live Markets */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Live Market Data
          </CardTitle>
          <CardDescription className="text-white/60">Real-time pricing from global exchanges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveMarkets.map((market) => (
              <div key={market.asset} className="p-4 bg-black/20 rounded-lg border border-white/10">
                <p className="text-white/60 text-sm mb-1">{market.asset}</p>
                <p className="text-white text-xl mb-2">{market.price}</p>
                <span className={`text-sm ${market.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {market.change}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Builder */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Build Your Auto-Swarm
          </CardTitle>
          <CardDescription className="text-white/60">Customize your investment strategy & impact</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preset" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/20">
              <TabsTrigger value="preset" className="data-[state=active]:bg-purple-500">Preset Strategies</TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-purple-500">Custom Build</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preset" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolios.map((portfolio) => (
                  <div key={portfolio.name} className={`p-6 rounded-xl border hover:border-purple-400/50 transition-all cursor-pointer group relative overflow-hidden ${
                    portfolio.name === 'Eco-Warrior' 
                      ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30' 
                      : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10'
                  }`}>
                    {portfolio.name === 'Eco-Warrior' && (
                       <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
                         Recommended 🌍
                       </div>
                    )}
                    <div className="text-4xl mb-3">{portfolio.icon}</div>
                    <h3 className="text-white mb-1">{portfolio.name}</h3>
                    <p className="text-white/50 text-xs mb-3 h-8">{portfolio.desc}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white/60">Risk:</span>
                      <span className={`text-sm ${
                        portfolio.risk.includes('High') || portfolio.risk.includes('Ultra') ? 'text-red-400' : 'text-green-400'
                      }`}>{portfolio.risk}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-white/60">Exp. Return:</span>
                      <span className="text-sm text-green-400 font-bold">{portfolio.return}</span>
                    </div>
                    <Button className={`w-full ${
                      portfolio.name === 'Eco-Warrior' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}>
                      Deploy Strategy
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6 mt-6">
              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <label className="text-white mb-4 block">Risk Tolerance</label>
                <Slider
                  value={riskLevel}
                  onValueChange={setRiskLevel}
                  max={100}
                  step={1}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
              </div>

              <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-white mb-4">Asset Allocation</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Bitcoin</span>
                      <span className="text-white">40%</span>
                    </div>
                    <Slider defaultValue={[40]} max={100} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Ethereum</span>
                      <span className="text-white">30%</span>
                    </div>
                    <Slider defaultValue={[30]} max={100} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Green Projects (Eco)</span>
                      <span className="text-white">20%</span>
                    </div>
                    <Slider defaultValue={[20]} max={100} className="text-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Meme Coins</span>
                      <span className="text-white">10%</span>
                    </div>
                    <Slider defaultValue={[10]} max={100} />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Deploy Custom Swarm
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="pt-6">
            <Shield className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-white mb-2">Hack Compensation</h3>
            <p className="text-sm text-white/70">100% protected. If hacked, you get compensated instantly.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-white mb-2">Auto-Optimization</h3>
            <p className="text-sm text-white/70">AI adjusts your portfolio based on live market data 24/7.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30">
          <CardContent className="pt-6">
            <Settings className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white mb-2">Zero Fees</h3>
            <p className="text-sm text-white/70">All gas fees returned to you. Maximum profits guaranteed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
