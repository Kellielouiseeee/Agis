import { ShoppingBag, TrendingUp, Sparkles, Filter, Crown, Zap, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

export function Marketplace() {
  const featuredNFTs = [
    {
      name: "Cyber Punk #2847",
      creator: "Artist_XYZ",
      price: "$1,250",
      rarity: "Legendary",
      bids: 24,
      icon: "🤖",
      royalties: "5% to Creator",
      dayOne: true
    },
    {
      name: "Space Voyager #091",
      creator: "Emma (Age 12)",
      price: "$340",
      rarity: "Epic",
      bids: 7,
      icon: "🚀",
      royalties: "10% to Kids Fund",
      dayOne: false
    },
    {
      name: "Crystal Dragon #445",
      creator: "Dragon_Master",
      price: "$890",
      rarity: "Rare",
      bids: 15,
      icon: "🐉",
      royalties: "5% to Creator",
      dayOne: true
    },
  ];

  const adultCollection = [
    { name: "High Roller Yacht Club", floor: "12.5 ETH", vol: "450 ETH", icon: "🛥️", royalties: "2% Shared" },
    { name: "Crypto Punks VIP", floor: "45 ETH", vol: "1.2k ETH", icon: "🧟", royalties: "5% Creator" },
    { name: "Bored Ape Alpha", floor: "32 ETH", vol: "900 ETH", icon: "🦍", royalties: "2.5% DAO" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Global Marketplace</h2>
          <p className="text-white/60">Buy, sell, trade NFTs & meme coins worldwide 🌍</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2 border border-white/10">
            <Zap className="w-4 h-4 text-yellow-400" />
            Auto-Collector: ON
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Mint Your NFT
          </button>
        </div>
      </div>

      {/* Auto-Collection Bot Banner */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <RefreshCw className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-bold flex items-center gap-2">
                Agis Auto-Collector Bot Active
                <Badge className="bg-purple-500 text-white border-none">Level 5</Badge>
              </h3>
              <p className="text-white/60 text-sm">
                Scanning for underpriced assets and high-yield royalties. Auto-investing profits into stable growth.
              </p>
            </div>
          </div>
          <Switch defaultChecked />
        </CardContent>
      </Card>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <p className="text-white/60 text-sm mb-1">24h Volume</p>
            <p className="text-white text-2xl">$2.4M</p>
            <p className="text-green-400 text-sm mt-1">+18.5%</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <p className="text-white/60 text-sm mb-1">Royalties Paid</p>
            <p className="text-white text-2xl">$142k</p>
            <p className="text-white/60 text-sm mt-1">To creators & supporters</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <p className="text-white/60 text-sm mb-1">Active Users</p>
            <p className="text-white text-2xl">12,847</p>
            <p className="text-green-400 text-sm mt-1">847 online now</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-white/10">
          <CardContent className="pt-6">
            <p className="text-white/60 text-sm mb-1">Kids Created</p>
            <p className="text-white text-2xl">1,234</p>
            <p className="text-white/60 text-sm mt-1">Safe & protected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nfts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/20">
          <TabsTrigger value="nfts" className="data-[state=active]:bg-purple-500">All NFTs</TabsTrigger>
          <TabsTrigger value="adult" className="data-[state=active]:bg-purple-500">Premium Collections (18+)</TabsTrigger>
          <TabsTrigger value="meme" className="data-[state=active]:bg-purple-500">Meme Coins</TabsTrigger>
        </TabsList>

        <TabsContent value="nfts" className="space-y-4 mt-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNFTs.map((nft) => (
              <Card
                key={nft.name}
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-purple-400/50 transition-all cursor-pointer group overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform relative">
                  {nft.icon}
                  {nft.dayOne && (
                     <Badge className="absolute top-2 right-2 bg-yellow-400 text-black font-bold">Day 1 Supporter</Badge>
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white">{nft.name}</h3>
                      <p className="text-white/60 text-sm">{nft.creator}</p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">{nft.rarity}</Badge>
                  </div>
                  
                  <div className="my-3 p-2 bg-black/20 rounded border border-white/5 text-xs text-white/50 flex items-center justify-between">
                    <span>Royalty: {nft.royalties}</span>
                    <Crown className="w-3 h-3 text-yellow-500" />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-white/60 text-sm">Current Price</p>
                      <p className="text-white font-bold">{nft.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">{nft.bids} bids</p>
                      <button className="mt-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-all">
                        Place Bid
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="adult" className="space-y-4 mt-6">
           <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg mb-4 flex items-start gap-3">
             <Crown className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
             <div>
               <h3 className="text-white font-bold">Premium High-Value Collections</h3>
               <p className="text-white/70 text-sm">
                 Exclusive access to blue-chip NFTs and high-stakes bidding. 
                 Identity verification required for bids over $10k.
               </p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {adultCollection.map((col) => (
               <Card key={col.name} className="bg-black/40 border-white/10 hover:border-yellow-400/50 transition-all">
                 <CardHeader className="pb-2">
                   <div className="text-5xl mb-4">{col.icon}</div>
                   <CardTitle className="text-white text-lg">{col.name}</CardTitle>
                   <CardDescription className="text-white/50">Royalty: {col.royalties}</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <div className="flex justify-between text-sm mb-2">
                     <span className="text-white/60">Floor Price</span>
                     <span className="text-white font-bold">{col.floor}</span>
                   </div>
                   <div className="flex justify-between text-sm mb-4">
                     <span className="text-white/60">Volume</span>
                     <span className="text-green-400">{col.vol}</span>
                   </div>
                   <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded border border-white/10 transition-all">
                     View Collection
                   </button>
                 </CardContent>
               </Card>
             ))}
           </div>
        </TabsContent>

        <TabsContent value="meme" className="space-y-4 mt-6">
           {/* Standard meme coin list would go here */}
           <div className="p-12 text-center text-white/40 border border-dashed border-white/10 rounded-lg">
              Meme Coin Exchange Loading...
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
