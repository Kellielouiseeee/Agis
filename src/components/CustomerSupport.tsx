import { Settings as SettingsIcon, Shield, Bell, User, Lock, Globe, CreditCard, Smartphone, Heart, Sprout, Users, Scale, ShieldCheck, Gavel, RefreshCw, Zap, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function CustomerSupport() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="group relative">
        <div className="absolute bottom-full right-0 mb-4 w-80 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Agis Auto-Feedback Swarm</h4>
              <p className="text-white/60 text-xs">Always listening. Always improving.</p>
            </div>
          </div>
          <p className="text-white/80 text-sm mb-3">
            Have an idea? Found a bug? Want to complain? I'm analyzing feedback in real-time to upgrade the ecosystem instantly.
          </p>
          <div className="space-y-2">
            <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 justify-start text-white">
              <Zap className="w-3 h-3 mr-2 text-yellow-400" /> Submit Idea
            </Button>
            <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 justify-start text-white">
               <Shield className="w-3 h-3 mr-2 text-red-400" /> Report Issue
            </Button>
          </div>
        </div>
        
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-purple-500/50 flex items-center justify-center text-white transition-all hover:scale-110">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
