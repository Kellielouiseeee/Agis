import { useState, useEffect } from "react";
import { Zap, Shield, Smartphone, CreditCard, Check, Lock, Globe, WifiOff, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

export function CryptoPurchase() {
  const [amount, setAmount] = useState("100");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleBuy = () => {
    setIsProcessing(true);
    // Mock transaction
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold shadow-lg shadow-orange-500/20"
      >
        <Zap className="w-4 h-4 mr-2" />
        Buy Agis Coin
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-white/10 rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">A</span>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">Buy Agis Coin</h3>
              <p className="text-white/60 text-xs">Instant • Zero Fees • Quantum Secure</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsOpen(false);
              setIsComplete(false);
            }}
            className="text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isComplete ? (
            <div className="space-y-4">
              <Tabs defaultValue="instant" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/40">
                  <TabsTrigger value="instant">Instant (Osko/PayID)</TabsTrigger>
                  <TabsTrigger value="card">Card / Apple Pay</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instant" className="space-y-4 mt-4">
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-2">
                    <Zap className="text-green-400 w-5 h-5 flex-shrink-0" />
                    <p className="text-xs text-green-200">Quantum-Speed enabled. Funds arrive in 0.002s.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                      <Input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-black/40 border-white/10 pl-7 text-lg text-white" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-white/60">You receive:</span>
                       <span className="text-yellow-400 font-bold">{(parseFloat(amount) * 12.5).toFixed(2)} AGIS</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-white/60">Network Fee:</span>
                       <span className="text-green-400">FREE (VIP)</span>
                     </div>
                  </div>
                </TabsContent>

                <TabsContent value="card" className="mt-4 text-center py-8">
                   <p className="text-white/60">Secure Credit/Debit gateway active.</p>
                   <Button variant="outline" className="mt-4 border-white/20 text-white">Add New Card</Button>
                </TabsContent>
              </Tabs>

              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold h-12 text-lg mt-2"
                onClick={handleBuy}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing Quantum Payment..." : "Confirm Instant Buy"}
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-xs text-white/40 mt-2">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 256-bit Encrypted</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Global Access</span>
                <span className="flex items-center gap-1"><WifiOff className="w-3 h-3" /> Works Offline</span>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl text-white font-bold">Purchase Successful!</h3>
              <p className="text-white/60">
                {parseFloat(amount) * 12.5} AGIS has been added to your wallet.
              </p>
              <p className="text-yellow-400 text-sm">
                +50 Rare Drop XP Gained!
              </p>
              <Button 
                onClick={() => {
                  setIsComplete(false);
                  setIsOpen(false);
                }}
                className="bg-white/10 hover:bg-white/20 text-white w-full"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}