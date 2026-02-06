import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseClient } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Clock,
  Trophy,
  Star,
  Check,
  X,
  RotateCcw,
  Volume2,
} from "lucide-react";

interface WordGameProps {
  onBack: () => void;
}

// 单词库
const wordList = [
  { word: "apple", meaning: "苹果", options: ["苹果", "香蕉", "橙子", "葡萄"] },
  { word: "book", meaning: "书本", options: ["书本", "笔记", "桌子", "椅子"] },
  { word: "cat", meaning: "猫", options: ["狗", "猫", "鸟", "鱼"] },
  { word: "dog", meaning: "狗", options: ["猫", "狗", "兔子", "老鼠"] },
  { word: "elephant", meaning: "大象", options: ["狮子", "老虎", "大象", "猴子"] },
  { word: "flower", meaning: "花", options: ["树", "草", "花", "叶子"] },
  { word: "green", meaning: "绿色", options: ["红色", "蓝色", "绿色", "黄色"] },
  { word: "happy", meaning: "开心的", options: ["伤心的", "开心的", "生气的", "害怕的"] },
  { word: "ice cream", meaning: "冰淇淋", options: ["蛋糕", "饼干", "冰淇淋", "糖果"] },
  { word: "juice", meaning: "果汁", options: ["牛奶", "果汁", "水", "可乐"] },
  { word: "king", meaning: "国王", options: ["女王", "王子", "公主", "国王"] },
  { word: "lion", meaning: "狮子", options: ["狮子", "老虎", "豹子", "熊"] },
  { word: "mother", meaning: "妈妈", options: ["爸爸", "妈妈", "哥哥", "姐姐"] },
  { word: "night", meaning: "夜晚", options: ["早晨", "中午", "下午", "夜晚"] },
  { word: "orange", meaning: "橙子/橙色", options: ["苹果", "橙子/橙色", "香蕉", "西瓜"] },
  { word: "panda", meaning: "熊猫", options: ["老虎", "狮子", "熊猫", "大象"] },
  { word: "queen", meaning: "女王", options: ["国王", "王子", "女王", "公主"] },
  { word: "rabbit", meaning: "兔子", options: ["老鼠", "兔子", "松鼠", "仓鼠"] },
  { word: "sun", meaning: "太阳", options: ["月亮", "星星", "太阳", "云朵"] },
  { word: "teacher", meaning: "老师", options: ["学生", "老师", "医生", "警察"] },
];

export function WordGame({ onBack }: WordGameProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "result">("menu");
  const [questions, setQuestions] = useState<typeof wordList>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [feedback, setFeedback] = useState<{ correct: boolean; answer: string } | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const totalQuestions = 10;

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    const shuffledWords = shuffleArray(wordList).slice(0, totalQuestions);
    setQuestions(shuffledWords.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    })));
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(120);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("result");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const selectAnswer = (answer: string) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.meaning;

    setFeedback({ correct: isCorrect, answer: currentQuestion.meaning });

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 >= totalQuestions) {
        setGameState("result");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 800);
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const saveScore = async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !user) return;

    try {
      await supabase.from("game_scores").insert({
        user_id: user.id,
        game_id: "word-match",
        score,
        correct_count: correctCount,
        total_count: totalQuestions,
        duration_seconds: 120 - timeLeft,
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
            <div className="text-6xl mb-4">🔤</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">单词消消乐</h1>
            <p className="text-muted-foreground mb-8">看单词选中文意思，记忆单词更轻松</p>

            <Card className="p-6 mb-6 bg-muted/50">
              <h3 className="font-semibold mb-3">游戏规则</h3>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li>• 系统展示英文单词</li>
                <li>• 从4个选项中选择正确的中文意思</li>
                <li>• 答对得10分</li>
                <li>• 共10题，限时2分钟</li>
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
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        {/* Header */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary">
                <Star className="h-5 w-5 fill-primary" />
                <span className="font-bold">{score}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>{correctCount}/{currentIndex + 1}</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${timeLeft <= 20 ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>
              <Clock className="h-5 w-5" />
              <span className="font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            第 {currentIndex + 1} / {totalQuestions} 题
          </p>
        </div>

        {/* Question */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
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
                    feedback.correct ? "bg-green-500/90" : "bg-destructive/90"
                  }`}
                >
                  <div className="text-white text-center">
                    {feedback.correct ? (
                      <Check className="h-16 w-16 mx-auto" />
                    ) : (
                      <>
                        <X className="h-12 w-12 mx-auto mb-2" />
                        <p>正确答案: {feedback.answer}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="text-4xl font-bold text-foreground">{currentQuestion.word}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => speakWord(currentQuestion.word)}
                  className="h-8 w-8"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">选择正确的中文意思</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="h-14 text-lg"
                  onClick={() => selectAnswer(option)}
                  disabled={!!feedback}
                >
                  {option}
                </Button>
              ))}
            </div>
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
            {correctCount >= totalQuestions * 0.8 ? "🏆" : correctCount >= totalQuestions * 0.5 ? "⭐" : "📚"}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {correctCount >= totalQuestions * 0.8 ? "太棒了！" : correctCount >= totalQuestions * 0.5 ? "不错哦！" : "继续加油！"}
          </h2>
          <p className="text-muted-foreground mb-6">
            答对 {correctCount}/{totalQuestions} 题
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <p className="text-3xl font-bold text-primary">{score}</p>
              <p className="text-sm text-muted-foreground">获得积分</p>
            </div>
            <div className="p-4 bg-muted rounded-2xl">
              <p className="text-3xl font-bold text-foreground">{Math.round((correctCount / totalQuestions) * 100)}%</p>
              <p className="text-sm text-muted-foreground">正确率</p>
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
