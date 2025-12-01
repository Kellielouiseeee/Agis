import { useState, useEffect } from "react";
import { Bot, X, HelpCircle, Zap, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function ChatAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMindfulness, setShowMindfulness] = useState(false);

  const messages = [
    "Welcome to Agis! I'm your quantum guide. 🤖",
    "Did you know? Our 'Pokies' actually save your money! 🎰",
    "Need to buy Agis Coin? It's instant & fee-free! 💎",
    "Your Auto-Swarms are currently replicating. 🐝",
    "Remember to breathe. Wealth takes patience. 🧘",
  ];

  const mindfulnessMemes = [
    { text: "Calm mind, growing wallet.", icon: "🧘‍♂️" },
    { text: "HODL your breath, release your stress.", icon: "🌬️" },
    { text: "Your swarms work so you can rest.", icon: "😴" },
    { text: "Quantum peace, infinite possibilities.", icon: "🌌" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleTutorial = () => {
    // In a real app, this would trigger a tour overlay
    alert("Starting interactive tutorial... (Mock)");
  };

  return (
    <div className="fixed bottom-24 left-6 z-40">
      {isOpen ? (
        <Card className="w-72 bg-gray-900/95 backdrop-blur-xl border-purple-500/50 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-full">
                <Bot className="text-white w-5 h-5" />
              </div>
              <span className="text-white font-bold text-sm">Agis Helper</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-4 space-y-4">
            <div className="bg-white/10 p-3 rounded-lg text-sm text-white/90 relative">
              <div className="absolute -left-2 top-4 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-white/10 border-b-[6px] border-b-transparent"></div>
              {showMindfulness ? (
                <div className="text-center">
                  <div className="text-3xl mb-2">{mindfulnessMemes[messageIndex % mindfulnessMemes.length].icon}</div>
                  <p>"{mindfulnessMemes[messageIndex % mindfulnessMemes.length].text}"</p>
                </div>
              ) : (
                <p>{messages[messageIndex]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-white border-white/20 hover:bg-white/10 bg-transparent"
                onClick={toggleTutorial}
              >
                <HelpCircle className="w-3 h-3 mr-2" />
                Start Tutorial
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-white border-white/20 hover:bg-white/10 bg-transparent"
                onClick={() => setShowMindfulness(!showMindfulness)}
              >
                <Heart className="w-3 h-3 mr-2" />
                Mindfulness Mode
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-green-400 border-green-400/20 hover:bg-green-400/10 bg-transparent"
              >
                <Zap className="w-3 h-3 mr-2" />
                Financial Aid Bonus
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all relative group"
        >
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div className="absolute left-full ml-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Need help?
          </div>
        </button>
      )}
    </div>
  );
}
