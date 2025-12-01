import { Coins, Sparkles, TrendingUp, Gift, Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

export function MintingEarning() {
  const earningOpportunities = [
    {
      title: "Complete Daily Tasks",
      reward: "$5-15",
      time: "15 min",
      icon: "✅",
      difficulty: "Easy",
    },
    {
      title: "Refer a Friend",
      reward: "$50",
      time: "Instant",
      icon: "👥",
      difficulty: "Easy",
    },
    {
      title: "Watch Educational Videos",
      reward: "$2-5",
      time: "10 min",
      icon: "📺",
      difficulty: "Easy",
    },
    {
      title: "Trade $100+ Volume",
      reward: "$10-25",
      time: "Varies",
      icon: "💹",
      difficulty: "Medium",
    },
    {
      title: "Create & Sell NFT",
      reward: "$50-1000+",
      time: "Varies",
      icon: "🎨",
      difficulty: "Medium",
    },
    {
      title: "Complete Advanced Course",
      reward: "$100",
      time: "2 hours",
      icon: "🎓",
      difficulty: "Hard",
    },
  ];

  const recentMints = [
    { name: "Cool Dragon #847", owner: "You", price: "0.5 ETH", status: "Listed" },
    { name: "Cyber Punk #234", owner: "CryptoKing", price: "1.2 ETH", status: "Sold" },
    { name: "Space Explorer #091", owner: "Emma (12)", price: "0.3 ETH", status: "Listed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Minting & Earning Hub</h2>
          <p className="text-white/60">Create NFTs and earn rewards instantly 🎨💰</p>
        </div>
      </div>

      {/* Earning Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-white/60 text-sm">Total Earned Today</p>
            <p className="text-white text-2xl mt-1">$127.43</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30">
          <CardContent className="pt-6">
            <Coins className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-white/60 text-sm">NFTs Minted</p>
            <p className="text-white text-2xl mt-1">23</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
          <CardContent className="pt-6">
            <Gift className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-white/60 text-sm">Tasks Completed</p>
            <p className="text-white text-2xl mt-1">847</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/30">
          <CardContent className="pt-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-white/60 text-sm">Referral Earnings</p>
            <p className="text-white text-2xl mt-1">$2,450</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earn" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/20">
          <TabsTrigger value="earn" className="data-[state=active]:bg-purple-500">Earn Rewards</TabsTrigger>
          <TabsTrigger value="mint" className="data-[state=active]:bg-purple-500">Mint NFTs</TabsTrigger>
        </TabsList>

        {/* Earning Opportunities */}
        <TabsContent value="earn" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Active Earning Opportunities
              </CardTitle>
              <CardDescription className="text-white/60">Multiple ways to earn every day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earningOpportunities.map((opp) => (
                  <div
                    key={opp.title}
                    className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{opp.icon}</div>
                      <Badge
                        className={`${
                          opp.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400 border-green-400/30"
                            : opp.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
                            : "bg-red-500/20 text-red-400 border-red-400/30"
                        }`}
                      >
                        {opp.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-white mb-2">{opp.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-green-400">{opp.reward}</p>
                        <p className="text-white/60 text-sm">{opp.time}</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
                      Start Earning
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral Program */}
          <Card className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2">Invite Friends, Earn $50 Each!</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Share your referral link. When your friend signs up and makes their first $10, you both get $50 instantly!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://ecosystem.pro/ref/CRYPTOKING"
                      readOnly
                      className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white"
                    />
                    <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NFT Minting */}
        <TabsContent value="mint" className="space-y-4 mt-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Create Your NFT
              </CardTitle>
              <CardDescription className="text-white/60">Mint and list instantly on our global marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-purple-400/50 transition-all cursor-pointer bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                  <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <h4 className="text-white mb-2">Upload Your Artwork</h4>
                  <p className="text-white/60 text-sm mb-4">PNG, JPG, GIF, MP4 up to 100MB</p>
                  <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
                    Choose File
                  </button>
                </div>

                {/* NFT Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">NFT Name</label>
                    <input
                      type="text"
                      placeholder="Cool Dragon #847"
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                    />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your NFT..."
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Rarity</label>
                      <select className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50">
                        <option>Common</option>
                        <option>Uncommon</option>
                        <option>Rare</option>
                        <option>Epic</option>
                        <option>Legendary</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Starting Price (ETH)</label>
                      <input
                        type="number"
                        placeholder="0.5"
                        step="0.01"
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <ImageIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div className="text-sm text-white/70">
                      <p className="text-white mb-1">Zero Gas Fees!</p>
                      <p>All minting fees are covered. You keep 100% of your sale profits.</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Mint & List NFT
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Mints */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Mints</CardTitle>
              <CardDescription className="text-white/60">Latest NFTs created on our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMints.map((nft) => (
                  <div
                    key={nft.name}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                        🎨
                      </div>
                      <div>
                        <h4 className="text-white">{nft.name}</h4>
                        <p className="text-white/60 text-sm">{nft.owner}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{nft.price}</p>
                      <Badge
                        className={`text-xs ${
                          nft.status === "Sold"
                            ? "bg-green-500/20 text-green-400 border-green-400/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-400/30"
                        }`}
                      >
                        {nft.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
