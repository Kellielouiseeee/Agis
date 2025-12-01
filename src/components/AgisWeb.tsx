import { Download, Shield, Globe, EyeOff, Wifi, Server, Layers } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export function AgisWeb() {
  return (
    <div className="min-h-screen bg-black p-6 pt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            v4.0.2 Live Release
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">AgisWeb</span> Browser
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The world's first decentralized, shadow-encrypted browser with built-in VPN, offline capabilities, and quantum protection.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-200">
              <Download className="mr-2 h-5 w-5" /> Download AgisWeb
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10">
              View Source Code
            </Button>
          </div>
          
          <p className="text-xs text-white/30 mt-4">
            Available for Windows, Mac, Linux, iOS, Android • 100% Open Source
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "Shadow Encryption",
              desc: "Military-grade deepweb encryption standards applied to standard browsing. Untraceable.",
              color: "text-blue-400"
            },
            {
              icon: Wifi,
              title: "True Offline Mode",
              desc: "Download the entire ecosystem core. Trade, play, and earn without an internet connection.",
              color: "text-green-400"
            },
            {
              icon: EyeOff,
              title: "Zero-Knowledge VPN",
              desc: "Built-in VPN that routes through decentralized nodes. No logs, no tracking, ever.",
              color: "text-purple-400"
            },
            {
              icon: Server,
              title: "Zero Storage Needed",
              desc: "Cloud-synced with local cache. Runs on any device regardless of storage capacity.",
              color: "text-yellow-400"
            },
            {
              icon: Layers,
              title: "Virus Proof",
              desc: "Sandboxed environment that predicts and blocks malware before it executes.",
              color: "text-red-400"
            },
            {
              icon: Globe,
              title: "Web3 Native",
              desc: "Seamless connection to all dApps, DeFi protocols, and chains without extensions.",
              color: "text-cyan-400"
            }
          ].map((feature, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                <h3 className="text-xl text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Threat Map Mock */}
        <div className="bg-gray-900 rounded-xl border border-white/10 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center opacity-10 bg-cover"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl text-white font-bold mb-8">Live Global Threat Neutralization</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full text-center">
              <div>
                <div className="text-3xl font-mono text-red-400">1,284</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Threats Blocked (Last hr)</div>
              </div>
              <div>
                <div className="text-3xl font-mono text-green-400">0ms</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">System Latency</div>
              </div>
              <div>
                <div className="text-3xl font-mono text-blue-400">142k</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Active Nodes</div>
              </div>
              <div>
                <div className="text-3xl font-mono text-purple-400">100%</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
