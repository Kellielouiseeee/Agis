import { GraduationCap, Award, Trophy, Star, Lock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export function Learn() {
  const courses = [
    {
      title: "Crypto Basics for Beginners",
      icon: "🎓",
      progress: 100,
      status: "completed",
      reward: "$25",
      certificate: true,
    },
    {
      title: "NFT Creation & Minting",
      icon: "🎨",
      progress: 68,
      status: "in-progress",
      reward: "$50",
      certificate: false,
    },
    {
      title: "DeFi Advanced Strategies",
      icon: "💰",
      progress: 0,
      status: "locked",
      reward: "$100",
      certificate: false,
    },
    {
      title: "Blockchain Development",
      icon: "⚙️",
      progress: 0,
      status: "locked",
      reward: "$200",
      certificate: false,
    },
  ];

  const achievements = [
    { title: "First Course", icon: "🥇", earned: true },
    { title: "Week Streak", icon: "🔥", earned: true },
    { title: "Quiz Master", icon: "🧠", earned: true },
    { title: "Fast Learner", icon: "⚡", earned: false },
    { title: "NFT Creator", icon: "🎨", earned: false },
    { title: "Blockchain Expert", icon: "🏆", earned: false },
  ];

  const certificates = [
    {
      title: "Cryptocurrency Fundamentals",
      date: "Nov 15, 2025",
      id: "CERT-2025-001847",
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white">Learn & Earn Academy</h2>
          <p className="text-white/60">Every lesson = Real earnings 💰 Real certificates 📜</p>
        </div>
        <div className="text-right">
          <p className="text-white/60 text-sm">Total Earned</p>
          <p className="text-white text-2xl">$487.50</p>
        </div>
      </div>

      {/* Progress Banner */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white mb-1">Level 7 Scholar</h3>
                <p className="text-white/60 text-sm">847 XP • 68% to Level 8</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl">🔥 12</p>
              <p className="text-white/60 text-sm">Day Streak</p>
            </div>
          </div>
          <Progress value={68} className="h-3" />
        </CardContent>
      </Card>

      {/* Courses */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            Learning Paths
          </CardTitle>
          <CardDescription className="text-white/60">Real-world ready certificates & instant rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.title}
                className={`p-6 rounded-xl border transition-all ${
                  course.status === "locked"
                    ? "bg-black/10 border-white/5 opacity-60"
                    : "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10 hover:border-purple-400/50 cursor-pointer"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div>
                      <h3 className="text-white mb-1">{course.title}</h3>
                      <div className="flex items-center gap-2">
                        {course.status === "completed" && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {course.status === "in-progress" && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                            In Progress
                          </Badge>
                        )}
                        {course.status === "locked" && (
                          <Badge className="bg-white/10 text-white/50 border-white/10">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                        {course.certificate && (
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                            <Award className="w-3 h-3 mr-1" />
                            Certificate Ready
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400">{course.reward}</p>
                    <p className="text-sm text-white/60">Reward</p>
                  </div>
                </div>
                {course.status !== "locked" && (
                  <div>
                    <div className="flex justify-between text-sm text-white/60 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Achievements
            </CardTitle>
            <CardDescription className="text-white/60">Unlock rewards as you learn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`p-4 rounded-xl text-center ${
                    achievement.earned
                      ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30"
                      : "bg-black/20 border border-white/10 opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-xs text-white/80">{achievement.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Your Certificates
            </CardTitle>
            <CardDescription className="text-white/60">Real-world recognized credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white mb-1">{cert.title}</h4>
                      <p className="text-sm text-white/60">{cert.date}</p>
                    </div>
                    {cert.verified && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/40 font-mono">{cert.id}</p>
                  <button className="mt-3 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all">
                    Download Certificate
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
