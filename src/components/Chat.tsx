import { useState } from "react";
import { MessageSquare, Send, Users, Globe, Shield, Lock, Check, Ghost } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Chat() {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("channels");

  const channels = [
    { name: "General", members: 8473, icon: "💬", active: true },
    { name: "Trading Tips", members: 3421, icon: "📈", active: false },
    { name: "NFT Creators", members: 1847, icon: "🎨", active: false },
    { name: "Gaming", members: 2134, icon: "🎮", active: false },
    { name: "Kids Corner", members: 847, icon: "🧒", active: false },
  ];

  const messages = [
    {
      user: "CryptoKing",
      avatar: "👑",
      message: "Just made 15% profit with my auto-swarm! 🚀",
      time: "2m ago",
      verified: true,
    },
    {
      user: "Emma (12)",
      avatar: "🎨",
      message: "My new NFT just got 5 bids! So excited!",
      time: "5m ago",
      verified: false,
    },
    {
      user: "TraderPro",
      avatar: "💎",
      message: "Anyone watching BTC? Looking bullish today",
      time: "8m ago",
      verified: true,
    },
    {
      user: "MemeQueen",
      avatar: "🐕",
      message: "DOGE to the moon! 🌙",
      time: "12m ago",
      verified: false,
    },
  ];

  const privateChats = [
    { user: "Support Agent 007", lastMsg: "Your ticket #8492 is resolved.", time: "1m", online: true, verified: true },
    { user: "TraderPro", lastMsg: "Thanks for the alpha! 🚀", time: "15m", online: true, verified: true },
    { user: "CryptoMom", lastMsg: "How do I set up a kids wallet?", time: "2h", online: false, verified: false },
  ];

  const onlineUsers = [
    { name: "CryptoKing", avatar: "👑", status: "online" },
    { name: "ArtistXYZ", avatar: "🎨", status: "online" },
    { name: "TraderPro", avatar: "💎", status: "online" },
    { name: "MemeQueen", avatar: "🐕", status: "away" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Community Chat</h2>
          <p className="text-white/60">Connect with traders, creators & learners worldwide 🌍</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
            <Users className="w-3 h-3 mr-1" />
            847 Online
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">
            <Lock className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
        </div>
      </div>

      {/* Safety Banner */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white text-sm mb-1">Safe & Moderated Community</h3>
              <p className="text-white/70 text-xs">
                AI-powered moderation keeps our community safe. Kids channels are extra protected. No spam, no scams, no hate. 💙
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="channels" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-white/5 border border-white/10 mb-4">
           <TabsTrigger value="channels" className="flex-1">Public Channels</TabsTrigger>
           <TabsTrigger value="private" className="flex-1">Private Messages (Encrypted)</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-0">
          {/* Channels Sidebar */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white text-sm">Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel.name}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      channel.active
                        ? "bg-purple-600 text-white"
                        : "bg-black/20 text-white/70 hover:bg-black/30 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{channel.icon}</span>
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    <p className="text-xs opacity-70">{channel.members.toLocaleString()} members</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Chat */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    💬 General
                  </CardTitle>
                  <CardDescription className="text-white/60">8,473 members • 847 online</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm">{msg.user}</span>
                        {msg.verified && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30 text-xs px-1 py-0">
                            ✓ Verified
                          </Badge>
                        )}
                        <span className="text-white/40 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-white/80 text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Online Users Sidebar */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-400" />
                Online Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
                        {user.avatar}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                          user.status === "online" ? "bg-green-400" : "bg-yellow-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm">{user.name}</p>
                      <p className="text-white/40 text-xs capitalize">{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="private" className="mt-0">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="bg-white/5 backdrop-blur-lg border-white/10 col-span-1">
               <CardHeader>
                 <CardTitle className="text-white text-sm">Recent Chats</CardTitle>
               </CardHeader>
               <CardContent className="p-2">
                  {privateChats.map((chat, i) => (
                    <div key={i} className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-all flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                          {chat.user[0]}
                        </div>
                        {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-medium flex items-center gap-1">
                             {chat.user}
                             {chat.verified && <Check className="w-3 h-3 text-blue-400" />}
                          </span>
                          <span className="text-white/30 text-xs">{chat.time}</span>
                        </div>
                        <p className="text-white/50 text-xs truncate">{chat.lastMsg}</p>
                      </div>
                    </div>
                  ))}
               </CardContent>
             </Card>
             <Card className="bg-white/5 backdrop-blur-lg border-white/10 col-span-2 flex flex-col h-[500px]">
               <CardHeader className="border-b border-white/10">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">S</div>
                   <div>
                     <CardTitle className="text-white text-sm">Support Agent 007</CardTitle>
                     <div className="flex items-center gap-1 text-green-400 text-xs">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       Online • Triple Verified
                     </div>
                   </div>
                   <Badge variant="outline" className="ml-auto text-purple-400 border-purple-400/30 flex items-center gap-1">
                     <Ghost className="w-3 h-3" /> Ghost Protocol Active
                   </Badge>
                 </div>
               </CardHeader>
               <CardContent className="flex-1 flex flex-col p-4">
                 <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                    <div className="flex justify-center">
                      <div className="bg-yellow-500/10 text-yellow-200 text-xs px-3 py-1 rounded-full border border-yellow-500/20">
                        Messages are end-to-end encrypted. No one else can read them.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs">S</div>
                      <div className="bg-white/10 p-3 rounded-r-lg rounded-bl-lg max-w-[80%]">
                        <p className="text-white text-sm">Hello! How can I help you today? I see you had a question about your ticket #8492.</p>
                        <span className="text-white/30 text-xs mt-1 block">10:42 AM</span>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs">Me</div>
                      <div className="bg-purple-600/20 p-3 rounded-l-lg rounded-br-lg max-w-[80%]">
                        <p className="text-white text-sm">Yes, thanks! I just wanted to confirm the withdrawal limits for the new quantum wallet.</p>
                         <span className="text-white/30 text-xs mt-1 block">10:45 AM</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs">S</div>
                      <div className="bg-white/10 p-3 rounded-r-lg rounded-bl-lg max-w-[80%]">
                        <p className="text-white text-sm">The new quantum wallet has zero withdrawal limits and instant processing! Your ticket #8492 is resolved. Enjoy!</p>
                        <span className="text-white/30 text-xs mt-1 block">10:46 AM</span>
                      </div>
                    </div>
                 </div>
                 <div className="flex gap-2 mt-auto pt-2 border-t border-white/10">
                    <input
                      type="text"
                      placeholder="Send a secure message..."
                      className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50"
                    />
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all">
                      <Send className="w-4 h-4" />
                    </button>
                 </div>
               </CardContent>
             </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
