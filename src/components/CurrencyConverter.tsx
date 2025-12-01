import { useState } from "react";
import { ArrowLeftRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BTC");

  // Mock live prices
  const prices = {
    BTC: 43847.23,
    ETH: 2283.45,
    DOGE: 0.0847,
    PEPE: 0.00012,
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
  };

  const currencies = [
    { code: "USD", name: "US Dollar", icon: "💵" },
    { code: "EUR", name: "Euro", icon: "💶" },
    { code: "GBP", name: "British Pound", icon: "💷" },
    { code: "BTC", name: "Bitcoin", icon: "₿" },
    { code: "ETH", name: "Ethereum", icon: "Ξ" },
    { code: "DOGE", name: "Dogecoin", icon: "🐕" },
    { code: "PEPE", name: "Pepe Coin", icon: "🐸" },
  ];

  const calculateConversion = () => {
    const amount = parseFloat(fromAmount) || 0;
    const fromPrice = prices[fromCurrency as keyof typeof prices] || 1;
    const toPrice = prices[toCurrency as keyof typeof prices] || 1;
    const result = (amount * fromPrice) / toPrice;
    return result.toFixed(toCurrency === "BTC" || toCurrency === "ETH" ? 8 : 2);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-purple-400" />
          Live Currency Converter
        </CardTitle>
        <CardDescription className="text-white/60">Real-time conversion based on global prices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* From */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                placeholder="Amount"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.icon} {curr.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
              className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-all"
            >
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">To</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={calculateConversion()}
                readOnly
                className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white"
              />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.icon} {curr.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Rates */}
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm">Live Exchange Rates</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>1 BTC =</span>
                <span className="text-white">${prices.BTC.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>1 ETH =</span>
                <span className="text-white">${prices.ETH.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>1 DOGE =</span>
                <span className="text-white">${prices.DOGE}</span>
              </div>
            </div>
          </div>

          {/* Instant Transfer Button */}
          <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
            Instant Transfer & Convert
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
