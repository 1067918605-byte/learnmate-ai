import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseClient } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Check,
  X,
  Trophy,
  RotateCcw,
  Lightbulb,
} from "lucide-react";

interface IdiomGameProps {
  onBack: () => void;
}

// 成语库
const idioms = [
  { idiom: "一心一意", pinyin: "yī xīn yī yì", meaning: "心思、意念专一" },
  { idiom: "画龙点睛", pinyin: "huà lóng diǎn jīng", meaning: "比喻写文章或讲话时，在关键处用几句话点明实质" },
  { idiom: "守株待兔", pinyin: "shǒu zhū dài tù", meaning: "比喻不主动地努力，而存万一的侥幸心理" },
  { idiom: "亡羊补牢", pinyin: "wáng yáng bǔ láo", meaning: "丢失了羊再去修补羊圈，还来得及" },
  { idiom: "狐假虎威", pinyin: "hú jiǎ hǔ wēi", meaning: "比喻倚仗别人的势力来欺压或吓唬人" },
  { idiom: "井底之蛙", pinyin: "jǐng dǐ zhī wā", meaning: "比喻见识短浅的人" },
  { idiom: "刻舟求剑", pinyin: "kè zhōu qiú jiàn", meaning: "比喻拘泥固执，不知变通" },
  { idiom: "掩耳盗铃", pinyin: "yǎn ěr dào líng", meaning: "比喻自己欺骗自己" },
  { idiom: "对牛弹琴", pinyin: "duì niú tán qín", meaning: "比喻对不懂道理的人讲道理" },
  { idiom: "画蛇添足", pinyin: "huà shé tiān zú", meaning: "比喻做了多余的事，反而适得其反" },
  { idiom: "杯弓蛇影", pinyin: "bēi gōng shé yǐng", meaning: "比喻疑神疑鬼，自相惊扰" },
  { idiom: "班门弄斧", pinyin: "bān mén nòng fǔ", meaning: "比喻在行家面前卖弄本领" },
  { idiom: "半途而废", pinyin: "bàn tú ér fèi", meaning: "比喻工作做了一半就停止，不能坚持到底" },
  { idiom: "闻鸡起舞", pinyin: "wén jī qǐ wǔ", meaning: "比喻有志报国的人即时奋起" },
  { idiom: "自相矛盾", pinyin: "zì xiāng máo dùn", meaning: "比喻自己说话做事前后抵触" },
  { idiom: "叶公好龙", pinyin: "yè gōng hào lóng", meaning: "比喻口头上说喜欢某事物，实际上并不真喜欢" },
  { idiom: "望梅止渴", pinyin: "wàng méi zhǐ kě", meaning: "比喻愿望无法实现，用空想安慰自己" },
  { idiom: "愚公移山", pinyin: "yú gōng yí shān", meaning: "比喻坚持不懈地改造自然和坚定不移地进行斗争" },
  { idiom: "精卫填海", pinyin: "jīng wèi tián hǎi", meaning: "比喻按既定目标坚持奋斗" },
  { idiom: "三顾茅庐", pinyin: "sān gù máo lú", meaning: "比喻真心诚意，一再邀请" },
];

export function IdiomGame({ onBack }: IdiomGameProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "result">("menu");
  const [chain, setChain] = useState<string[]>([]);
  const [currentIdiom, setCurrentIdiom] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const getRandomIdiom = () => {
    return idioms[Math.floor(Math.random() * idioms.length)].idiom;
  };

  const startGame = () => {
    const startIdiom = getRandomIdiom();
    setCurrentIdiom(startIdiom);
    setChain([startIdiom]);
    setScore(0);
    setLives(3);
    setUserInput("");
    setGameState("playing");
  };

  const getLastChar = (idiom: string) => {
    return idiom[idiom.length - 1];
  };

  const isValidIdiom = (input: string) => {
    // Check if it's 4 characters
    if (input.length !== 4) return false;
    // Check if it starts with the last character of current idiom
    if (input[0] !== getLastChar(currentIdiom)) return false;
    // Check if it's a valid idiom in our database
    return idioms.some(i => i.idiom === input);
  };

  const getHint = () => {
    const lastChar = getLastChar(currentIdiom);
    const validIdioms = idioms.filter(i => i.idiom[0] === lastChar && !chain.includes(i.idiom));
    if (validIdioms.length > 0) {
      const hint = validIdioms[0];
      return `提示: ${hint.idiom[0]}${hint.idiom[1]}__`;
    }
    return "没有找到可用的成语，可以试试谐音字";
  };

  const submitAnswer = () => {
    if (userInput.length !== 4) {
      setFeedback({ type: "wrong", message: "成语必须是4个字哦" });
      setTimeout(() => setFeedback(null), 1500);
      return;
    }

    if (userInput[0] !== getLastChar(currentIdiom)) {
      setFeedback({ type: "wrong", message: `需要以"${getLastChar(currentIdiom)}"开头的成语` });
      setLives(prev => prev - 1);
      setTimeout(() => {
        setFeedback(null);
        if (lives <= 1) {
          setGameState("result");
        }
      }, 1500);
      return;
    }

    // Check if already used
    if (chain.includes(userInput)) {
      setFeedback({ type: "wrong", message: "这个成语已经用过了" });
      setTimeout(() => setFeedback(null), 1500);
      return;
    }

    // For demo purposes, we'll be lenient and accept any 4-character input starting with correct character
    setFeedback({ type: "correct", message: "太棒了！" });
    setScore(prev => prev + 10);
    setChain(prev => [...prev, userInput]);
    setCurrentIdiom(userInput);
    setShowHint(false);

    setTimeout(() => {
      setFeedback(null);
      setUserInput("");
    }, 800);
  };

  const saveScore = async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !user) return;

    try {
      await supabase.from("game_scores").insert({
        user_id: user.id,
        game_id: "idiom-chain",
        score,
        correct_count: chain.length - 1,
        total_count: chain.length - 1 + (3 - lives),
      } as any);

      const { data: profile } = await supabase
        .from("profiles")
        .select("points")
        .eq("user_id", user.id)
        .maybeSingle() as any;

      if (profile) {
        await supabase
          .from("profiles")
          .update({ points: (profile.points || 0) + score } as any)
          .eq("user_id", user.id);
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  useEffect(() => {
    if (gameState === "result") {
      saveScore();
    }
  }, [gameState]);

  // Menu
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>

        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">成语接龙王</h1>
            <p className="text-muted-foreground mb-8">用上一个成语的最后一个字，接下一个成语</p>

            <Card className="p-6 mb-6 bg-muted/50">
              <h3 className="font-semibold mb-3">游戏规则</h3>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li>• 系统给出一个成语</li>
                <li>• 用最后一个字开头，接一个新成语</li>
                <li>• 接龙成功得10分</li>
                <li>• 有3次生命，答错会扣除生命</li>
              </ul>
            </Card>

            <Button size="lg" className="w-full" onClick={startGame}>
              开始游戏
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Playing
  if (gameState === "playing") {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        {/* Header */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setGameState("result")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              结束
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-primary">
                <Trophy className="h-4 w-4" />
                <span className="font-bold">{score}</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={i < lives ? "" : "opacity-30"}>❤️</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chain display */}
        <div className="max-w-md mx-auto mb-6">
          <Card className="p-4">
            <p className="text-xs text-muted-foreground mb-2">接龙记录 ({chain.length}个)</p>
            <div className="flex flex-wrap gap-2">
              {chain.slice(-5).map((idiom, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded text-sm ${
                    i === chain.slice(-5).length - 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {idiom}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Current idiom */}
        <motion.div
          key={currentIdiom}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-8 text-center relative overflow-hidden">
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 flex items-center justify-center z-10 ${
                    feedback.type === "correct" ? "bg-green-500/90" : "bg-destructive/90"
                  }`}
                >
                  <div className="text-white text-center">
                    {feedback.type === "correct" ? (
                      <Check className="h-12 w-12 mx-auto mb-2" />
                    ) : (
                      <X className="h-12 w-12 mx-auto mb-2" />
                    )}
                    <p className="text-lg font-semibold">{feedback.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-sm text-muted-foreground mb-2">当前成语</p>
            <p className="text-4xl font-bold text-foreground mb-4">{currentIdiom}</p>
            <p className="text-lg text-primary mb-6">
              请接 "<span className="font-bold text-2xl">{getLastChar(currentIdiom)}</span>" 开头的成语
            </p>

            {showHint && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-amber-600 mb-4"
              >
                {getHint()}
              </motion.p>
            )}

            <div className="flex gap-3 justify-center mb-4">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                placeholder="输入四字成语"
                className="text-center text-xl max-w-[180px]"
                maxLength={4}
              />
              <Button onClick={submitAnswer}>确定</Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(true)}
              className="text-muted-foreground"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              需要提示
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Result
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">
            {chain.length >= 10 ? "🏆" : chain.length >= 5 ? "⭐" : "📚"}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">游戏结束</h2>
          <p className="text-muted-foreground mb-6">
            成功接龙 {chain.length - 1} 个成语
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <p className="text-3xl font-bold text-primary">{score}</p>
              <p className="text-sm text-muted-foreground">获得积分</p>
            </div>
            <div className="p-4 bg-muted rounded-2xl">
              <p className="text-3xl font-bold text-foreground">{chain.length}</p>
              <p className="text-sm text-muted-foreground">成语数量</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={startGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              再玩一次
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={onBack}>
              返回游戏大厅
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
