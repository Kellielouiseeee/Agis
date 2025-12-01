import { Baby, Lock, ShoppingBag, TrendingUp, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export function KidsWallet() {
  const childProfiles = [
    {
      name: "Emma",
      age: 12,
      unlockAge: 18,
      balance: "$2,847.50",
      nftsOwned: 23,
      marketListings: 12,
      totalSales: "$1,234.00",
      yearsUntilUnlock: 6,
    },
    {
      name: "Jack",
      age: 8,
      unlockAge: 18,
      balance: "$1,234.75",
      nftsOwned: 15,
      marketListings: 8,
      totalSales: "$487.50",
      yearsUntilUnlock: 10,
    },
  ];

  const kidNFTs = [
    { name: "Cool Dragon #847", rarity: "Rare", listed: true, bids: 3, highestBid: "$125" },
    { name: "Space Explorer #234", rarity: "Epic", listed: true, bids: 7, highestBid: "$340" },
    { name: "Rainbow Unicorn #091", rarity: "Common", listed: false, bids: 0, highestBid: "-" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Kids Safe Wallet</h2>
          <p className="text-white/60">Protected until 18. Earning while they grow 🌱</p>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white mb-2">How Kids Wallets Work 🎓</h3>
              <p className="text-white/70 text-sm mb-3">
                Kids can create & mint NFTs, but can't access funds until 18. While locked, their NFTs are automatically listed on our global marketplace. When they sell, funds accumulate. On their 18th birthday, the wallet unlocks with all accumulated earnings!
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                  <Lock className="w-3 h-3 mr-1" />
                  100% Secure
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Auto-Listed Globally
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Earns While Locked
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Child Profiles */}
      {childProfiles.map((child) => {
        const progressToUnlock = ((18 - child.yearsUntilUnlock) / 18) * 100;
        
        return (
          <Card key={child.name} className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{child.name}'s Wallet</CardTitle>
                    <CardDescription className="text-white/60">Age {child.age} • Unlocks at {child.unlockAge}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                  <Lock className="w-3 h-3 mr-1" />
                  {child.yearsUntilUnlock} years until unlock
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Unlock Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/60 text-sm">Time Until Unlock</span>
                    <span className="text-white text-sm">{Math.round(progressToUnlock)}% Complete</span>
                  </div>
                  <Progress value={progressToUnlock} className="h-3 mb-1" />
                  <p className="text-white/40 text-xs">Unlocks automatically on 18th birthday 🎂</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Locked Balance</p>
                    <p className="text-white text-xl">{child.balance}</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <p className="text-white/60 text-sm mb-1">NFTs Owned</p>
                    <p className="text-white text-xl">{child.nftsOwned}</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Market Listings</p>
                    <p className="text-white text-xl">{child.marketListings}</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <p className="text-white/60 text-sm mb-1">Total Sales</p>
                    <p className="text-green-400 text-xl">{child.totalSales}</p>
                  </div>
                </div>

                {/* NFT Gallery Preview */}
                <div>
                  <h4 className="text-white mb-3 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                    Active Marketplace Listings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {kidNFTs.map((nft) => (
                      <div
                        key={nft.name}
                        className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-white/10"
                      >
                        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3 flex items-center justify-center text-4xl">
                          🎨
                        </div>
                        <h5 className="text-white text-sm mb-1">{nft.name}</h5>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`text-xs ${
                            nft.rarity === "Epic" ? "bg-purple-500/20 text-purple-400 border-purple-400/30" :
                            nft.rarity === "Rare" ? "bg-blue-500/20 text-blue-400 border-blue-400/30" :
                            "bg-gray-500/20 text-gray-400 border-gray-400/30"
                          }`}>
                            {nft.rarity}
                          </Badge>
                          {nft.listed && (
                            <span className="text-xs text-green-400">Listed ✓</span>
                          )}
                        </div>
                        {nft.listed && (
                          <div className="text-xs text-white/60">
                            <p>{nft.bids} active bids</p>
                            <p className="text-white">Highest: {nft.highestBid}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Auto-Sale Info */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm mb-1">Auto-Sale on Unlock</p>
                    <p className="text-white/70 text-xs">
                      When {child.name} turns 18, all pending sales will automatically complete. Funds from accepted bids will be available immediately in the unlocked wallet.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Add Child Button */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border-white/10 hover:border-purple-400/50 transition-all cursor-pointer">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">➕</div>
            <h3 className="text-white mb-2">Add Another Child Wallet</h3>
            <p className="text-white/60 text-sm mb-4">Secure their future, let them earn while they learn</p>
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
              Create Kids Wallet
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
