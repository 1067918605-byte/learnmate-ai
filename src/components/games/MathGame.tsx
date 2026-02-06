import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getSupabaseClient } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Clock,
  Trophy,
  Star,
  Zap,
  Check,
  X,
  Play,
  RotateCcw,
} from "lucide-react";

interface MathGameProps {
  onBack: () => void;
}

type Difficulty = "easy" | "medium" | "hard";

interface Question {
  num1: number;
  num2: number;
  operator: "+" | "-" | "×" | "÷";
  answer: number;
}

const generateQuestion = (difficulty: Difficulty): Question => {
  let num1: number, num2: number, operator: "+" | "-" | "×" | "÷", answer: number;

  const operators: ("+" | "-" | "×" | "÷")[] = 
    difficulty === "easy" ? ["+", "-"] : 
    difficulty === "medium" ? ["+", "-", "×"] : 
    ["+", "-", "×", "÷"];

  operator = operators[Math.floor(Math.random() * operators.length)];

  switch (difficulty) {
    case "easy":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
    case "medium":
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 30) + 1;
      break;
    case "hard":
      num1 = Math.floor(Math.random() * 100) + 20;
      num2 = Math.floor(Math.random() * 50) + 1;
      break;
  }

  // Ensure valid operations
  if (operator === "-" && num1 < num2) {
    [num1, num2] = [num2, num1];
  }
  if (operator === "÷") {
    // Make sure division is clean
    num2 = Math.floor(Math.random() * 9) + 2;
    num1 = num2 * (Math.floor(Math.random() * 10) + 1);
  }

  switch (operator) {
    case "+": answer = num1 + num2; break;
    case "-": answer = num1 - num2; break;
    case "×": answer = num1 * num2; break;
    case "÷": answer = num1 / num2; break;
  }

  return { num1, num2, operator, answer };
};

export function MathGame({ onBack }: MathGameProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "result">("menu");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const totalQuestions = 10;

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    const newQuestions = Array.from({ length: totalQuestions }, () => generateQuestion(diff));
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(diff === "easy" ? 90 : diff === "medium" ? 75 : 60);
    setGameState("playing");
    setUserAnswer("");
  }, []);

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

  const submitAnswer = useCallback(() => {
    if (!userAnswer.trim()) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;

    setShowFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      const points = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(null);
      setUserAnswer("");

      if (currentIndex + 1 >= totalQuestions) {
        setGameState("result");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 500);
  }, [userAnswer, questions, currentIndex, difficulty]);

  const saveScore = async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !user) return;

    try {
      await supabase.from("game_scores").insert({
        user_id: user.id,
        game_id: "math-adventure",
        score,
        correct_count: correctCount,
        total_count: totalQuestions,
        duration_seconds: (difficulty === "easy" ? 90 : difficulty === "medium" ? 75 : 60) - timeLeft,
      } as any);

      // Update user points
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

      toast({
        title: "成绩已保存",
        description: `获得 ${score} 积分`,
      });
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  useEffect(() => {
    if (gameState === "result") {
      saveScore();
    }
  }, [gameState]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitAnswer();
    }
  };

  // Menu State
  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">🧮</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">口算大冒险</h1>
            <p className="text-muted-foreground">限时挑战，提升计算速度</p>
          </motion.div>

          <div className="grid gap-4">
            {[
              { diff: "easy" as Difficulty, label: "简单", desc: "加减法，1-20", time: "90秒", color: "from-green-500 to-emerald-500" },
              { diff: "medium" as Difficulty, label: "中等", desc: "加减乘法，10-50", time: "75秒", color: "from-amber-500 to-orange-500" },
              { diff: "hard" as Difficulty, label: "困难", desc: "四则运算，20-100", time: "60秒", color: "from-red-500 to-rose-500" },
            ].map((item, index) => (
              <motion.div
                key={item.diff}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                  onClick={() => startGame(item.diff)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Playing State
  if (gameState === "playing") {
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
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
            <div className={`flex items-center gap-2 ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>
              <Clock className="h-5 w-5" />
              <span className="font-bold text-xl">{timeLeft}s</span>
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-8 text-center relative overflow-hidden">
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    showFeedback === "correct" ? "bg-green-500/90" : "bg-destructive/90"
                  }`}
                >
                  {showFeedback === "correct" ? (
                    <Check className="h-20 w-20 text-white" />
                  ) : (
                    <div className="text-center text-white">
                      <X className="h-16 w-16 mx-auto mb-2" />
                      <p className="text-lg">正确答案: {currentQuestion.answer}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-5xl sm:text-6xl font-bold text-foreground mb-8">
              {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2} = ?
            </div>

            <div className="flex gap-3 justify-center">
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入答案"
                className="text-center text-2xl h-14 max-w-[150px]"
                autoFocus
              />
              <Button size="lg" className="h-14 px-8" onClick={submitAnswer}>
                确定
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Result State
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">
            {correctCount >= totalQuestions * 0.8 ? "🏆" : correctCount >= totalQuestions * 0.5 ? "⭐" : "💪"}
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
            <Button className="w-full" size="lg" onClick={() => startGame(difficulty)}>
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
