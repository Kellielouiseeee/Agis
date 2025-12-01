import { BarChart3, TrendingUp, DollarSign, Users, Award, Zap, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export function Stats() {
  const performanceData = [
    { month: "Jun", profit: 847, investment: 5000 },
    { month: "Jul", profit: 1234, investment: 6000 },
    { month: "Aug", profit: 1876, investment: 7500 },
    { month: "Sep", profit: 2341, investment: 9000 },
    { month: "Oct", profit: 3124, investment: 11000 },
    { month: "Nov", profit: 4267, investment: 12847 },
  ];

  const portfolioBreakdown = [
    { asset: "Bitcoin", percentage: 35, value: "$4,496.63", color: "bg-orange-500" },
    { asset: "Ethereum", percentage: 25, value: "$3,211.88", color: "bg-blue-500" },
    { asset: "Altcoins", percentage: 20, value: "$2,569.50", color: "bg-purple-500" },
    { asset: "Meme Coins", percentage: 15, value: "$1,927.13", color: "bg-pink-500" },
    { asset: "Stablecoins", percentage: 5, value: "$642.38", color: "bg-green-500" },
  ];

  const earningsSources = [
    { source: "Auto-Swarm Profits", amount: "$3,847.23", percentage: "42%" },
    { source: "Learning Rewards", amount: "$487.50", percentage: "5%" },
    { source: "NFT Sales", amount: "$2,134.89", percentage: "23%" },
    { source: "Gaming Returns", amount: "$1,234.75", percentage: "14%" },
    { source: "Trading Profits", amount: "$1,443.15", percentage: "16%" },
  ];

  const milestones = [
    { title: "First $1,000", achieved: true, date: "Aug 15, 2025" },
    { title: "First $5,000", achieved: true, date: "Oct 22, 2025" },
    { title: "First $10,000", achieved: true, date: "Nov 20, 2025" },
    { title: "First $25,000", achieved: false, date: "Target: Dec 2025" },
    { title: "First $50,000", achieved: false, date: "Target: Feb 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Your Statistics & Analytics</h2>
          <p className="text-white/60">Comprehensive insights into your wealth journey 📊</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-400" />
              <span className="text-sm text-green-400">+47.3%</span>
            </div>
            <p className="text-white/60 text-sm">Total Profit (All Time)</p>
            <p className="text-white text-2xl mt-1">$9,147.50</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-blue-400">This Month</span>
            </div>
            <p className="text-white/60 text-sm">Monthly Growth</p>
            <p className="text-white text-2xl mt-1">+36.5%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-purple-400" />
              <span className="text-sm text-purple-400">24/7</span>
            </div>
            <p className="text-white/60 text-sm">Active Swarms</p>
            <p className="text-white text-2xl mt-1">15</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-400" />
              <span className="text-sm text-yellow-400">Top 5%</span>
            </div>
            <p className="text-white/60 text-sm">Global Rank</p>
            <p className="text-white text-2xl mt-1">#1,847</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            6-Month Performance
          </CardTitle>
          <CardDescription className="text-white/60">Investment growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((data) => {
              const returnPercent = ((data.profit / data.investment) * 100).toFixed(1);
              return (
                <div key={data.month} className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{data.month} 2025</span>
                    <div className="text-right">
                      <span className="text-green-400">+${data.profit.toLocaleString()}</span>
                      <span className="text-white/60 text-sm ml-2">({returnPercent}%)</span>
                    </div>
                  </div>
                  <Progress value={parseFloat(returnPercent)} className="h-2" />
                  <p className="text-white/40 text-xs mt-1">Portfolio Value: ${data.investment.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Breakdown */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Allocation</CardTitle>
            <CardDescription className="text-white/60">Current asset distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioBreakdown.map((item) => (
                <div key={item.asset}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-white">{item.asset}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white">{item.value}</span>
                      <span className="text-white/60 text-sm ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Earnings Sources */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Earnings Breakdown</CardTitle>
            <CardDescription className="text-white/60">Where your profits come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsSources.map((item) => (
                <div key={item.source} className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{item.source}</span>
                    <span className="text-white/60 text-sm">{item.percentage}</span>
                  </div>
                  <p className="text-green-400 text-xl">{item.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            Wealth Milestones
          </CardTitle>
          <CardDescription className="text-white/60">Track your journey to financial freedom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.title}
                className={`p-4 rounded-xl text-center ${
                  milestone.achieved
                    ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30"
                    : "bg-black/20 border border-white/10"
                }`}
              >
                <div className="text-3xl mb-2">{milestone.achieved ? "✅" : "🎯"}</div>
                <h4 className="text-white mb-1">{milestone.title}</h4>
                <p className="text-xs text-white/60">{milestone.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-purple-400 mb-3" />
            <p className="text-white/60 text-sm">Total Transactions</p>
            <p className="text-white text-2xl mt-1">2,847</p>
            <p className="text-green-400 text-sm mt-2">+234 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <Award className="w-8 h-8 text-blue-400 mb-3" />
            <p className="text-white/60 text-sm">Courses Completed</p>
            <p className="text-white text-2xl mt-1">12</p>
            <p className="text-blue-400 text-sm mt-2">8 certificates earned</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="text-white/60 text-sm">Days Active</p>
            <p className="text-white text-2xl mt-1">127</p>
            <p className="text-yellow-400 text-sm mt-2">🔥 12-day streak</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
