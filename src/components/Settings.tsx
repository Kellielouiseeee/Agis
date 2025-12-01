import { Settings as SettingsIcon, Shield, Bell, User, Lock, Globe, CreditCard, Smartphone, Heart, Sprout, Users, Scale, ShieldCheck, Gavel, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white">Agis Control Center</h2>
        <p className="text-white/60">Fully customize your ecosystem, security, and impact 🔧</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/20 overflow-x-auto">
          <TabsTrigger value="account" className="data-[state=active]:bg-purple-500">Account</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-500">Security</TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-purple-500">Wallet & Pay</TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:bg-purple-500">Eco & Impact</TabsTrigger>
          <TabsTrigger value="legal" className="data-[state=active]:bg-purple-500">Ownership</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Profile & Legacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Display Name (Alias)</label>
                <input
                  type="text"
                  defaultValue="CryptoKing"
                  className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                />
                <p className="text-xs text-white/40 mt-1">Using an alias keeps your real identity untraceable.</p>
              </div>
              
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/30 mt-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white mb-1">Generational Wealth Protocol</h4>
                    <p className="text-white/70 text-sm mb-2">
                      Designate a beneficiary. If your account is inactive for 5 years, assets are auto-transferred to your next of kin.
                    </p>
                    <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all">
                      Configure Beneficiary
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                Maximum Security & Insurance
              </CardTitle>
              <CardDescription className="text-white/60">Your assets are protected by our 100% Hack Policy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                       <h4 className="text-white mb-1">Civil Liability & Hack Coverage</h4>
                       <Badge className="bg-green-400 text-black hover:bg-green-500">Active</Badge>
                    </div>
                    <p className="text-white/70 text-sm">
                      You are fully covered against platform hacks, civil claims, and unauthorized access. 
                      Our DAO reserve fund guarantees 100% asset restoration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white mb-1">Quantum Encryption (Layer 1)</h4>
                  <p className="text-white/60 text-sm">Unbreakable cryptographic protection</p>
                </div>
                <Switch defaultChecked disabled />
              </div>
              
               <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white mb-1">Auto-Swarm Defense</h4>
                  <p className="text-white/60 text-sm">Active AI bots that block threats in real-time</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet & Payments */}
        <TabsContent value="wallet" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                Global Wallet Integrations
              </CardTitle>
              <CardDescription className="text-white/60">Connect any wallet, anywhere. Untraceable options available.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                  { name: "PayPal", connected: true, icon: "💳", desc: "For games & rewards" },
                  { name: "Metamask", connected: true, icon: "🦊", desc: "Web3 connection" },
                  { name: "TrustWallet", connected: true, icon: "🛡️", desc: "Mobile assets" },
                  { name: "Phantom", connected: false, icon: "👻", desc: "Solana chain" },
                  { name: "Bank Account", connected: true, icon: "🏛️", desc: "Direct withdrawals" },
                  { name: "Cash App", connected: false, icon: "💲", desc: "Instant transfers" },
                ].map((method) => (
                  <div key={method.name} className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h4 className="text-white text-sm font-bold">{method.name}</h4>
                        <p className="text-white/50 text-xs">{method.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={method.connected} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Eco & Impact */}
        <TabsContent value="impact" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sprout className="w-5 h-5 text-green-400" />
                Real World Impact
              </CardTitle>
              <CardDescription className="text-white/60">How your wealth is healing the planet 🌍</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                 <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                   <div className="text-3xl mb-2">🌳</div>
                   <div className="text-2xl font-bold text-white">124</div>
                   <div className="text-xs text-green-300">Trees Planted</div>
                 </div>
                 <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                   <div className="text-3xl mb-2">💧</div>
                   <div className="text-2xl font-bold text-white">5,000L</div>
                   <div className="text-xs text-blue-300">Water Cleaned</div>
                 </div>
                 <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                   <div className="text-3xl mb-2">☀️</div>
                   <div className="text-2xl font-bold text-white">1.2 MWh</div>
                   <div className="text-xs text-yellow-300">Clean Energy Funded</div>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-sm text-white/80">
                   <span>Carbon Neutral Goal</span>
                   <span>85% Complete</span>
                 </div>
                 <Progress value={85} className="h-2 bg-white/10" />
                 <p className="text-xs text-white/50">Your auto-swarms prioritize eco-friendly validators and green mining pools.</p>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ownership & Legal */}
        <TabsContent value="legal" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-yellow-400" />
                User Ownership & Rights
              </CardTitle>
              <CardDescription className="text-white/60">You don't just use Agis. You own it.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <Gavel className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white mb-1">DAO Voting Power: Level 4</h4>
                    <p className="text-white/70 text-sm">
                      As a token holder, you have voting rights on platform fees, new features, and charitable donations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white mb-1">Data Sovereignty</h4>
                  <p className="text-white/60 text-sm">You own your data. We cannot sell it.</p>
                </div>
                <div className="text-green-400 text-sm font-bold">Guaranteed</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                <div>
                  <h4 className="text-white mb-1">Profit Sharing</h4>
                  <p className="text-white/60 text-sm">Receive dividends from platform transaction fees</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
