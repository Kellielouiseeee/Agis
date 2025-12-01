import { Receipt, ArrowUpRight, ArrowDownLeft, Gift, ShoppingBag, TrendingUp, Download, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Transactions() {
  const transactions = [
    {
      id: "TXN-2025-001847",
      type: "profit",
      description: "Auto-Swarm Profit (BTC Alpha)",
      amount: "+$127.43",
      status: "completed",
      date: "Nov 28, 2025, 10:23 AM",
      icon: TrendingUp,
    },
    {
      id: "TXN-2025-001846",
      type: "purchase",
      description: "NFT Purchase: Cool Dragon #847",
      amount: "-$340.00",
      status: "completed",
      date: "Nov 28, 2025, 09:15 AM",
      icon: ShoppingBag,
    },
    {
      id: "TXN-2025-001845",
      type: "receive",
      description: "Learning Reward: Course Completion",
      amount: "+$50.00",
      status: "completed",
      date: "Nov 28, 2025, 08:47 AM",
      icon: Gift,
    },
    {
      id: "TXN-2025-001844",
      type: "send",
      description: "Instant Transfer to PayPal",
      amount: "-$500.00",
      status: "completed",
      date: "Nov 27, 2025, 06:32 PM",
      icon: ArrowUpRight,
    },
    {
      id: "TXN-2025-001843",
      type: "receive",
      description: "NFT Sale: Space Explorer #091",
      amount: "+$890.50",
      status: "completed",
      date: "Nov 27, 2025, 03:21 PM",
      icon: ShoppingBag,
    },
    {
      id: "TXN-2025-001842",
      type: "profit",
      description: "Gaming Returns (Locked 6mo)",
      amount: "+$47.25",
      status: "locked",
      date: "Nov 27, 2025, 02:14 PM",
      icon: TrendingUp,
    },
  ];

  const pendingTransactions = [
    {
      id: "TXN-2025-PEND-01",
      description: "Withdrawal to Bank Account",
      amount: "$1,000.00",
      status: "processing",
      eta: "Completes in 2-3 hours",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Transaction History</h2>
          <p className="text-white/60">All your transactions, instantly accessible 📊</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
          <Download className="w-4 h-4" />
          Export (Tax Report)
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="pt-6">
            <ArrowDownLeft className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-white/60 text-sm">Total Received</p>
            <p className="text-white text-2xl mt-1">$18,473.50</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg border-red-400/30">
          <CardContent className="pt-6">
            <ArrowUpRight className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-white/60 text-sm">Total Sent</p>
            <p className="text-white text-2xl mt-1">$5,626.00</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30">
          <CardContent className="pt-6">
            <Receipt className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-white/60 text-sm">Total Transactions</p>
            <p className="text-white text-2xl mt-1">2,847</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-white/60 text-sm">Net Profit</p>
            <p className="text-white text-2xl mt-1">+$12,847.50</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Transactions */}
      {pendingTransactions.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-white text-sm">Pending Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white mb-1">{txn.description}</h4>
                  <p className="text-white/60 text-sm">{txn.eta}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">{txn.amount}</p>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 text-xs mt-1">
                    Processing
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Search & Filter */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50"
              />
            </div>
            <select className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50">
              <option>All Types</option>
              <option>Received</option>
              <option>Sent</option>
              <option>Profits</option>
              <option>Purchases</option>
            </select>
            <select className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50">
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-purple-400" />
            Recent Transactions
          </CardTitle>
          <CardDescription className="text-white/60">All transactions are instant and encrypted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((txn) => {
              const Icon = txn.icon;
              const isPositive = txn.amount.startsWith("+");

              return (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isPositive
                          ? "bg-green-500/20"
                          : txn.status === "locked"
                          ? "bg-yellow-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isPositive
                            ? "text-green-400"
                            : txn.status === "locked"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">{txn.description}</h4>
                      <p className="text-white/60 text-sm">{txn.date}</p>
                      <p className="text-white/40 text-xs font-mono">{txn.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl mb-1 ${
                        isPositive
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      {txn.amount}
                    </p>
                    <Badge
                      className={`text-xs ${
                        txn.status === "completed"
                          ? "bg-green-500/20 text-green-400 border-green-400/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
                      }`}
                    >
                      {txn.status === "completed" ? "✓ Completed" : "🔒 Locked"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all">
            Load More Transactions
          </button>
        </CardContent>
      </Card>

      {/* Instant Transfer */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowUpRight className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Need an Instant Transfer?</h3>
              <p className="text-white/70 text-sm mb-4">
                Send funds to any wallet, bank account, PayPal, or PayID instantly. Zero lag, zero wait.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
                Start Instant Transfer
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
