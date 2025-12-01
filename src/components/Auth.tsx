import { useState } from "react";
import { Shield, Lock, Eye, Sparkles, Chrome, Apple as AppleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Auth({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would redirect to OAuth provider
    console.log(`Logging in with ${provider}`);
    onLogin();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const socialProviders = [
    { name: "Google", icon: Chrome, color: "from-red-500 to-yellow-500" },
    { name: "Apple", icon: AppleIcon, color: "from-gray-700 to-gray-900" },
    { name: "Microsoft", icon: "🪟", color: "from-blue-500 to-cyan-500" },
    { name: "Facebook", icon: "👤", color: "from-blue-600 to-blue-800" },
    { name: "Twitter/X", icon: "𝕏", color: "from-gray-800 to-black" },
    { name: "Discord", icon: "💬", color: "from-indigo-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-purple-900 flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-white text-4xl mb-3">Welcome to EcoSystem Pro</h1>
          <p className="text-white/70 text-lg mb-2">
            The Future of Wealth, Learning & Earning 🚀
          </p>
          <p className="text-white/60 text-sm">
            100% User-Owned • Quantum Encrypted • Decentralized • Privacy-First
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Security Features */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Unhackable Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: "🔒", text: "Quantum-resistant encryption" },
                  { icon: "🛡️", text: "Decentralized architecture - no single point of failure" },
                  { icon: "🔐", text: "Zero-knowledge proof authentication" },
                  { icon: "🌐", text: "Multi-layer blockchain security" },
                  { icon: "💎", text: "Your keys, your crypto - non-custodial" },
                  { icon: "🚫", text: "No government or entity can take control" },
                  { icon: "👁️", text: "Complete privacy - your data is yours alone" },
                  { icon: "💰", text: "Hack compensation guarantee" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/10">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-white/80 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Join the Revolution</CardTitle>
              <CardDescription className="text-white/60">Sign up in seconds with instant access</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="social" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/20 mb-6">
                  <TabsTrigger value="social" className="data-[state=active]:bg-purple-500">
                    Social Login
                  </TabsTrigger>
                  <TabsTrigger value="email" className="data-[state=active]:bg-purple-500">
                    Email
                  </TabsTrigger>
                </TabsList>

                {/* Social Login */}
                <TabsContent value="social" className="space-y-3">
                  {socialProviders.map((provider) => {
                    const Icon = typeof provider.icon === "string" ? null : provider.icon;
                    return (
                      <button
                        key={provider.name}
                        onClick={() => handleSocialLogin(provider.name)}
                        className={`w-full p-4 bg-gradient-to-r ${provider.color} hover:opacity-90 rounded-lg text-white transition-all flex items-center justify-center gap-3`}
                      >
                        {Icon ? <Icon className="w-5 h-5" /> : <span className="text-xl">{provider.icon}</span>}
                        <span>Continue with {provider.name}</span>
                      </button>
                    );
                  })}
                  
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30 mt-4">
                    <p className="text-green-300 text-sm text-center">
                      🚀 Instant access! No email verification needed. Start earning in seconds.
                    </p>
                  </div>
                </TabsContent>

                {/* Email Login */}
                <TabsContent value="email">
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50"
                      />
                    </div>

                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all"
                    >
                      Create Account & Start Earning
                    </button>

                    <p className="text-white/40 text-xs text-center">
                      By signing up, you agree to our decentralized, privacy-first terms. Your data is never sold or shared.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🤖", title: "AI Swarms", desc: "24/7 auto-investing" },
            { icon: "🎓", title: "Learn & Earn", desc: "Get paid to learn" },
            { icon: "🎨", title: "NFT Market", desc: "Create & trade" },
            { icon: "🔒", title: "Kids Safe", desc: "Protected until 18" },
          ].map((feature) => (
            <Card key={feature.title} className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <h4 className="text-white mb-1">{feature.title}</h4>
                <p className="text-white/60 text-xs">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
