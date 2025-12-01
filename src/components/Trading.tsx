import { ArrowLeftRight, TrendingUp, TrendingDown, Gift, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function Trading() {
  const topCryptos = [
    { symbol: "BTC", name: "Bitcoin", price: "$43,847.23", change: "+5.4%", trend: "up", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", price: "$2,283.45", change: "+3.2%", trend: "up", icon: "Ξ" },
    { symbol: "BNB", name: "Binance Coin", price: "$312.67", change: "+2.1%", trend: "up", icon: "💎" },
    { symbol: "SOL", name: "Solana", price: "$98.34", change: "-1.3%", trend: "down", icon: "◎" },
    { symbol: "ADA", name: "Cardano", price: "$0.52", change: "+4.7%", trend: "up", icon: "₳" },
    { symbol: "DOGE", name: "Dogecoin", price: "$0.0847", change: "+12.8%", trend: "up", icon: "🐕" },
  ];

  const yourHoldings = [
    { asset: "Bitcoin", amount: "0.1034", value: "$4,533.84", profit: "+$847.23" },
    { asset: "Ethereum", amount: "1.4567", value: "$3,326.10", profit: "+$423.45" },
    { asset: "Dogecoin", amount: "12847", value: "$1,087.94", profit: "+$234.12" },
  ];

  const recentTrades = [
    { type: "Buy", asset: "BTC", amount: "0.01", price: "$438.47", time: "2 min ago" },
    { type: "Sell", asset: "DOGE", amount: "500", price: "$42.35", time: "15 min ago" },
    { type: "Buy", asset: "ETH", amount: "0.2", price: "$456.69", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Trading & Gifting</h2>
          <p className="text-white/60">Trade crypto instantly or gift to friends 🎁</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-white/60 text-sm">Trading Profits</p>
            <p className="text-white text-2xl mt-1">+$1,504.80</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30">
          <CardContent className="pt-6">
            <BarChart3 className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-white/60 text-sm">Total Trades</p>
            <p className="text-white text-2xl mt-1">847</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
          <CardContent className="pt-6">
            <Zap className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-white/60 text-sm">Success Rate</p>
            <p className="text-white text-2xl mt-1">87.3%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30">
          <CardContent className="pt-6">
            <Gift className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-white/60 text-sm">Gifts Sent</p>
            <p className="text-white text-2xl mt-1">23</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trade" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/20">
          <TabsTrigger value="trade" className="data-[state=active]:bg-purple-500">Trade</TabsTrigger>
          <TabsTrigger value="gift" className="data-[state=active]:bg-purple-500">Gift</TabsTrigger>
          <TabsTrigger value="holdings" className="data-[state=active]:bg-purple-500">Holdings</TabsTrigger>
        </TabsList>

        {/* Trading */}
        <TabsContent value="trade" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trading Interface */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5 text-purple-400" />
                  Instant Trade
                </CardTitle>
                <CardDescription className="text-white/60">Buy and sell crypto with zero lag</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* You Pay */}
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">You Pay</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="0.00"
                        className="flex-1 px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white text-xl focus:outline-none focus:border-purple-400/50"
                      />
                      <select className="px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50">
                        <option>USD 💵</option>
                        <option>BTC ₿</option>
                        <option>ETH Ξ</option>
                        <option>DOGE 🐕</option>
                      </select>
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-all">
                      <ArrowLeftRight className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* You Receive */}
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">You Receive</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="0.00"
                        readOnly
                        className="flex-1 px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white text-xl"
                      />
                      <select className="px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50">
                        <option>BTC ₿</option>
                        <option>ETH Ξ</option>
                        <option>DOGE 🐕</option>
                        <option>USD 💵</option>
                      </select>
                    </div>
                  </div>

                  {/* Trade Info */}
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">Exchange Rate:</span>
                      <span className="text-white">1 BTC = $43,847.23</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">Gas Fees:</span>
                      <span className="text-green-400">$0.00 (Returned to you!)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Processing:</span>
                      <span className="text-white">Instant</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
                    <Zap className="w-4 h-4 inline mr-2" />
                    Execute Instant Trade
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Market Watch */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-sm">Live Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCryptos.map((crypto) => (
                    <button
                      key={crypto.symbol}
                      className="w-full text-left p-3 bg-black/20 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{crypto.icon}</span>
                          <span className="text-white">{crypto.symbol}</span>
                        </div>
                        <span
                          className={`text-sm ${
                            crypto.trend === "up" ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {crypto.change}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{crypto.price}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Trades */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Your Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrades.map((trade, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        className={`${
                          trade.type === "Buy"
                            ? "bg-green-500/20 text-green-400 border-green-400/30"
                            : "bg-red-500/20 text-red-400 border-red-400/30"
                        }`}
                      >
                        {trade.type}
                      </Badge>
                      <div>
                        <h4 className="text-white">
                          {trade.amount} {trade.asset}
                        </h4>
                        <p className="text-white/60 text-sm">{trade.time}</p>
                      </div>
                    </div>
                    <p className="text-white">{trade.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gifting */}
        <TabsContent value="gift" className="space-y-4 mt-6">
          <Card className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white mb-2">Send Crypto as a Gift! 🎁</h3>
                  <p className="text-white/70 text-sm">
                    Surprise friends and family with crypto gifts. Instant transfer, no fees, pure joy!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Send a Gift</CardTitle>
              <CardDescription className="text-white/60">Spread wealth, spread joy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Recipient</label>
                  <input
                    type="text"
                    placeholder="Username, email, or wallet address"
                    className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Asset</label>
                    <select className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50">
                      <option>BTC ₿</option>
                      <option>ETH Ξ</option>
                      <option>DOGE 🐕</option>
                      <option>USD 💵</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">Gift Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Add a personal message..."
                    className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                  />
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
                  <Gift className="w-4 h-4 inline mr-2" />
                  Send Gift Instantly
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Holdings */}
        <TabsContent value="holdings" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Your Crypto Holdings</CardTitle>
              <CardDescription className="text-white/60">Total portfolio value: $8,947.88</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yourHoldings.map((holding) => (
                  <div
                    key={holding.asset}
                    className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white mb-1">{holding.asset}</h3>
                        <p className="text-white/60 text-sm">{holding.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xl">{holding.value}</p>
                        <p className="text-green-400 text-sm">{holding.profit}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-all">
                        Buy More
                      </button>
                      <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-all">
                        Sell
                      </button>
                      <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all">
                        Gift
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
