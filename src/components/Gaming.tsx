import { useState } from "react";
import { Gamepad2, Lock, TrendingUp, DollarSign, Clock, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Pokies } from "./Gaming/Pokies";

export function Gaming() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(847.23);
  const [lockedAmount, setLockedAmount] = useState(245.67);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      title: "Crypto Slots 🎰",
      description: "Every bet auto-invests for 6 months",
      minBet: "$0.10",
      maxWin: "$10,000",
      rtp: "98.5%",
      icon: "🎰",
      id: "pokies"
    },
    {
      title: "Diamond Pokies 💎",
      description: "Progressive jackpot + auto-invest",
      minBet: "$0.25",
      maxWin: "$50,000",
      rtp: "97.8%",
      icon: "💎",
    },
    {
      title: "Bitcoin Bonanza 🪙",
      description: "Crypto-themed, instant withdraw",
      minBet: "$0.50",
      maxWin: "$25,000",
      rtp: "98.2%",
      icon: "🪙",
    },
    {
      title: "Rocket Rush 🚀",
      description: "Multiplier game, auto-compound",
      minBet: "$0.10",
      maxWin: "$100,000",
      rtp: "99.0%",
      icon: "🚀",
    },
  ];

  if (activeGame === "pokies") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setActiveGame(null)} className="text-white border-white/20">
             Back to Lobby
          </Button>
          <h2 className="text-white text-xl">Crypto Slots</h2>
        </div>
        <Pokies />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Gaming Hub (18+ Only)</h2>
          <p className="text-white/60">Play responsibly. Every bet becomes an investment 💰</p>
        </div>
      </div>

      {/* Age Verification Banner */}
      <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg border-red-400/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-white mb-1">Age Verified: 18+</h3>
              <p className="text-white/70 text-sm">
                This gaming section is for adults only. Play responsibly. Every dollar bet is auto-invested for 6 months. Winnings can be withdrawn instantly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Available Balance</p>
                <p className="text-white text-2xl">${balance.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Auto-Locked (Investing)</p>
                <p className="text-white text-2xl">${lockedAmount.toFixed(2)}</p>
              </div>
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Est. Value in 6mo</p>
                <p className="text-white text-2xl">${(lockedAmount * 1.15).toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">How Gaming Works 🎮</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎰</div>
              <h3 className="text-white mb-2">1. Play</h3>
              <p className="text-white/70 text-sm">
                Every bet you make goes into our gaming system. Have fun, play slots, try your luck!
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-white mb-2">2. Auto-Invest</h3>
              <p className="text-white/70 text-sm">
                Your bets aren't lost! They're auto-locked for 6 months and invested by our AI swarms.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-white mb-2">3. Win Big</h3>
              <p className="text-white/70 text-sm">
                Game winnings? Withdraw instantly. Invested funds unlock in 6mo with profits added!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-pink-400" />
            Available Games
          </CardTitle>
          <CardDescription className="text-white/60">Zero lag, instant play, provably fair</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((game) => (
              <div
                key={game.title}
                className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white mb-1">{game.title}</h3>
                    <p className="text-white/60 text-sm">{game.description}</p>
                  </div>
                  <div className="text-4xl">{game.icon}</div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Min Bet:</span>
                    <span className="text-white">{game.minBet}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Max Win:</span>
                    <span className="text-green-400">{game.maxWin}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">RTP:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">{game.rtp}</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => game.id === "pokies" && setActiveGame("pokies")}
                >
                  Play Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Responsible Gaming */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white mb-2">Responsible Gaming Features</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>✅ Daily loss limits automatically enforced</li>
                <li>✅ Session time tracking with break reminders</li>
                <li>✅ Self-exclusion options available 24/7</li>
                <li>✅ All bets auto-invest - never truly "lost"</li>
                <li>✅ Instant help & support for problem gambling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
