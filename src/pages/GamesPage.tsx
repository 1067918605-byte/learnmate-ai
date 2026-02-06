import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MathGame } from "@/components/games/MathGame";
import { IdiomGame } from "@/components/games/IdiomGame";
import { WordGame } from "@/components/games/WordGame";
import { useAuth } from "@/hooks/useAuth";
import { getSupabaseClient } from "@/integrations/supabase/client";
import {
  Gamepad2,
  Brain,
  Calculator,
  Languages,
  Trophy,
  Star,
  Zap,
  Clock,
  Users,
  Play,
  Lock,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface GamesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

type ActiveGame = "math" | "idiom" | "word" | null;

const gameCategories = [
  { id: "all", label: "全部", icon: Gamepad2 },
  { id: "math", label: "数学", icon: Calculator },
  { id: "chinese", label: "语文", icon: Languages },
  { id: "english", label: "英语", icon: Languages },
  { id: "logic", label: "思维", icon: Brain },
];

const games = [
  {
    id: "math",
    title: "口算大冒险",
    description: "限时口算挑战，提升计算速度",
    category: "math",
    difficulty: "简单",
    players: "1234",
    duration: "5分钟",
    stars: 4.8,
    unlocked: true,
    thumbnail: "🧮",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "idiom",
    title: "成语接龙王",
    description: "趣味成语接龙，积累成语词汇",
    category: "chinese",
    difficulty: "中等",
    players: "892",
    duration: "10分钟",
    stars: 4.9,
    unlocked: true,
    thumbnail: "📚",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "word",
    title: "单词消消乐",
    description: "记忆单词拼写，趣味闯关模式",
    category: "english",
    difficulty: "简单",
    players: "2156",
    duration: "8分钟",
    stars: 4.7,
    unlocked: true,
    thumbnail: "🔤",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "logic",
    title: "逻辑推理站",
    description: "培养逻辑思维能力的益智游戏",
    category: "logic",
    difficulty: "困难",
    players: "567",
    duration: "15分钟",
    stars: 4.6,
    unlocked: false,
    thumbnail: "🧩",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "fraction",
    title: "分数大作战",
    description: "通过游戏掌握分数加减乘除",
    category: "math",
    difficulty: "中等",
    players: "756",
    duration: "10分钟",
    stars: 4.5,
    unlocked: false,
    thumbnail: "➗",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "poetry",
    title: "诗词飞花令",
    description: "古诗词知识竞赛，挑战诗词储备",
    category: "chinese",
    difficulty: "困难",
    players: "432",
    duration: "12分钟",
    stars: 4.8,
    unlocked: false,
    thumbnail: "🏮",
    color: "from-red-500 to-rose-500",
  },
];

interface DailyChallenge {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  icon: string;
}

export function GamesPage({ onNavigate }: GamesPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([
    { id: "daily-math", title: "每日口算", reward: 50, completed: false, icon: "🎯" },
    { id: "daily-idiom", title: "成语接龙", reward: 30, completed: false, icon: "📖" },
    { id: "daily-word", title: "单词记忆", reward: 40, completed: false, icon: "🔤" },
  ]);
  const [userStats, setUserStats] = useState({ points: 0, level: 1, achievements: 0 });
  const { user } = useAuth();

  useEffect(() => {
    loadUserStats();
    loadDailyChallenges();
  }, [user]);

  const loadUserStats = async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !user) return;

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("points, level")
        .eq("user_id", user.id)
        .maybeSingle() as any;

      if (profile) {
        setUserStats({
          points: profile.points || 0,
          level: profile.level || 1,
          achievements: 12, // Mock for now
        });
      }
    } catch (error) {
      console.error("Error loading user stats:", error);
    }
  };

  const loadDailyChallenges = async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from("daily_challenges")
        .select("challenge_id")
        .eq("user_id", user.id)
        .eq("completed_date", today) as any;

      if (data) {
        const completedIds = data.map((d: any) => d.challenge_id);
        setDailyChallenges(prev => 
          prev.map(c => ({
            ...c,
            completed: completedIds.includes(c.id)
          }))
        );
      }
    } catch (error) {
      console.error("Error loading daily challenges:", error);
    }
  };

  const filteredGames =
    activeCategory === "all"
      ? games
      : games.filter((g) => g.category === activeCategory);

  const handlePlayGame = (gameId: string) => {
    if (gameId === "math" || gameId === "idiom" || gameId === "word") {
      setActiveGame(gameId);
    }
  };

  const handleBackFromGame = () => {
    setActiveGame(null);
    loadUserStats(); // Refresh stats after playing
    loadDailyChallenges();
  };

  // Render active game
  if (activeGame === "math") {
    return <MathGame onBack={handleBackFromGame} />;
  }
  if (activeGame === "idiom") {
    return <IdiomGame onBack={handleBackFromGame} />;
  }
  if (activeGame === "word") {
    return <WordGame onBack={handleBackFromGame} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">学习乐园</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">边玩边学，快乐成长</h2>
          <p className="opacity-90 text-sm max-w-md">
            通过趣味小游戏巩固知识点，让学习变得更有趣！完成挑战还能获得积分奖励哦~
          </p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
          <Gamepad2 className="h-32 w-32" />
        </div>
      </motion.div>

      {/* Daily Challenges */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          每日挑战
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {dailyChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  challenge.completed
                    ? "bg-muted/50 border-green-500/30"
                    : "hover:border-primary/50"
                }`}
                onClick={() => {
                  if (!challenge.completed) {
                    const gameId = challenge.id.replace("daily-", "");
                    handlePlayGame(gameId);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  {challenge.completed ? (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      已完成
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                      +{challenge.reward}积分
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold text-foreground">{challenge.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {challenge.completed ? "太棒了，明天继续加油！" : "点击开始挑战"}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-muted p-1 h-auto flex-wrap gap-1 w-full justify-start overflow-x-auto">
          {gameCategories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    !game.unlocked ? "opacity-70" : ""
                  }`}
                  onClick={() => game.unlocked && handlePlayGame(game.id)}
                >
                  {/* Thumbnail */}
                  <div
                    className={`h-28 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}
                  >
                    <span className="text-5xl">{game.thumbnail}</span>
                    {!game.unlocked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <Badge
                      className="absolute top-2 right-2 bg-black/30 text-white border-0"
                    >
                      {game.difficulty}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-bold text-foreground mb-1">{game.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {game.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {game.players}人在玩
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {game.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-sm">{game.stars}</span>
                      </div>
                      <Button
                        size="sm"
                        className="h-8"
                        disabled={!game.unlocked}
                      >
                        {game.unlocked ? (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            开始
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3 mr-1" />
                            解锁
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-20 md:pb-0"
      >
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">成就系统</h3>
                <p className="text-sm text-muted-foreground">
                  已解锁 {userStats.achievements}/50 个成就 · 获得 {userStats.points.toLocaleString()} 积分
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">Lv.{userStats.level}</p>
                <p className="text-xs text-muted-foreground">距离下一级还需 320 积分</p>
              </div>
              <Button variant="outline">查看成就</Button>
            </div>
          </div>
          <Progress value={68} className="mt-4 h-2" />
        </Card>
      </motion.div>
    </div>
  );
}
