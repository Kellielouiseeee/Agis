import { useState, useEffect } from "react";
import { Trophy, RefreshCw, Lock, Shield, Wallet, Coins, AlertTriangle, PartyPopper, Flame, ArrowUpRight, Banknote, ShoppingBag, CheckCircle2, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export function Pokies() {
  const [balance, setBalance] = useState(500);
  const [lockedSavings, setLockedSavings] = useState(1250);
  const [isSpinning, setIsSpinning] = useState(false);
  const [slots, setSlots] = useState(["🍒", "🍋", "🍇"]);
  const [message, setMessage] = useState("Ready to spin! Losses are saved, not lost.");
  const [winType, setWinType] = useState<"none" | "win" | "save">("none");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const symbols = ["🍒", "🍋", "🍇", "💎", "7️⃣", "🍊"];

  const spin = () => {
    if (balance < 10) return;
    
    setIsSpinning(true);
    setBalance(prev => prev - 10);
    setMessage("Spinning...");
    setWinType("none");

    // Mock spin animation
    let count = 0;
    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        finalizeSpin();
      }
    }, 100);
  };

  const finalizeSpin = () => {
    setIsSpinning(false);
    const outcome = Math.random();
    
    if (outcome > 0.7) {
      // WIN
      const prize = Math.floor(Math.random() * 50) + 20;
      setBalance(prev => prev + prize);
      setMessage(`🎉 WINNER! +$${prize} added to balance!`);
      setWinType("win");
    } else {
      // "LOSS" -> Savings
      setLockedSavings(prev => prev + 10);
      setMessage("🛡️ No match. $10 moved to Locked Investment Vault (6 months).");
      setWinType("save");
    }
  };

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      const amount = parseFloat(withdrawAmount);
      if (amount > 0 && amount <= balance) {
        setBalance(prev => prev - amount);
        setIsWithdrawing(false);
        setWithdrawAmount("");
        alert(`Success! $${amount} sent instantly to your linked account.`);
      } else {
        setIsWithdrawing(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Stats & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-purple-500/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Play Balance</p>
              <p className="text-2xl text-white font-bold">${balance.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                   <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                     <Banknote className="w-4 h-4 mr-1" /> Withdraw
                   </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Instant Quantum Withdrawal</DialogTitle>
                    <DialogDescription className="text-white/60">
                      Funds are transferred instantly via Osko/PayID or Crypto. Zero fees.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm">Amount to Withdraw</label>
                      <Input 
                        type="number" 
                        value={withdrawAmount} 
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-black/40 border-white/10 text-white"
                        placeholder={`Max: $${balance.toFixed(2)}`}
                      />
                    </div>
                    <Tabs defaultValue="fiat" className="w-full">
                      <TabsList className="bg-black/40 w-full">
                        <TabsTrigger value="fiat" className="flex-1">Bank/Cash (Instant)</TabsTrigger>
                        <TabsTrigger value="crypto" className="flex-1">Crypto Wallet</TabsTrigger>
                      </TabsList>
                      <TabsContent value="fiat" className="mt-4">
                         <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-300 flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4" /> Verified Bank Account Linked
                         </div>
                      </TabsContent>
                       <TabsContent value="crypto" className="mt-4">
                         <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-300 flex items-center gap-2">
                           <Wallet className="w-4 h-4" /> Verified Agis Wallet Linked
                         </div>
                      </TabsContent>
                    </Tabs>
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600" 
                      onClick={handleWithdraw}
                      disabled={isWithdrawing || !withdrawAmount}
                    >
                      {isWithdrawing ? "Processing..." : "Confirm Withdraw"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10" title="List Assets">
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-green-200/60 text-sm">Locked Investment (6mo)</p>
              <p className="text-2xl text-green-400 font-bold">${lockedSavings.toFixed(2)}</p>
            </div>
            <Lock className="text-green-400 w-8 h-8" />
          </CardContent>
        </Card>

        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-blue-200/60 text-sm">Metaverse Connected</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <p className="text-sm text-blue-400 font-bold">VR Ready</p>
              </div>
            </div>
            <Globe className="text-blue-400 w-8 h-8 animate-pulse" />
          </CardContent>
        </Card>
      </div>

      {/* Slot Machine */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-purple-900 to-black border-4 border-yellow-500/50 p-8 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
        {/* Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-400 text-xs font-bold mb-2 uppercase tracking-widest">
             <Shield className="w-3 h-3" /> Triple Verified Fair
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 uppercase tracking-widest drop-shadow-lg">
            Quantum Slots
          </h2>
          <p className="text-yellow-200 text-sm mt-2">The only game where you literally can't lose money.</p>
        </div>

        {/* Slots Window */}
        <div className="flex justify-center gap-4 mb-8 relative z-10">
          {slots.map((symbol, i) => (
            <div key={i} className="w-24 h-32 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg border-4 border-black flex items-center justify-center text-5xl shadow-inner transform transition-transform">
              {symbol}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className={`h-12 flex items-center justify-center px-6 rounded-full border ${
            winType === 'win' ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' :
            winType === 'save' ? 'bg-green-500/20 border-green-400 text-green-400' :
            'bg-black/40 border-white/10 text-white/60'
          }`}>
            {message}
          </div>

          <Button 
            onClick={spin} 
            disabled={isSpinning || balance < 10}
            className="w-64 h-16 text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 border-b-4 border-red-800 transform active:scale-95 transition-all rounded-full shadow-[0_0_30px_rgba(239,68,68,0.6)]"
          >
            {isSpinning ? <RefreshCw className="animate-spin mr-2" /> : "SPIN ($10)"}
          </Button>
          
          <p className="text-xs text-white/30">
            *Fair Play Certified • 98% RTP • 100% Loss-Back Guarantee (Locked)
          </p>
        </div>
      </div>

      {/* Meta Trends Integration */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flame className="text-orange-500" /> Meta Trends Bonus
          </CardTitle>
          <CardDescription className="text-white/60">
            Your gameplay generates data that feeds our predictive AI swarms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-white/80">
              <span>Swarms Fed</span>
              <span>12/50 Spins</span>
            </div>
            <Progress value={24} className="h-2 bg-white/10" />
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 flex gap-3 items-start">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-blue-200">
                <strong>Safe Play Protocol:</strong> Even if you "lose" on the slots, the $10 is automatically transferred to your 6-month locked high-yield savings vault. It's compulsory saving gamified.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
