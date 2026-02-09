import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { examConfigs, getAllExamConfigs } from "@/data/examQuestions";
import type { ExamConfig, Question } from "@/data/examQuestions";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  XCircle,
  BookOpen,
  FileText,
  Trophy,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";

interface ExamsPageProps {
  onNavigate: (page: string) => void;
}

type ExamState = "select" | "exam" | "result";

export function ExamsPage({ onNavigate }: ExamsPageProps) {
  const [examState, setExamState] = useState<ExamState>("select");
  const [currentExam, setCurrentExam] = useState<ExamConfig | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showExplanation, setShowExplanation] = useState(false);

  const startExam = (exam: ExamConfig) => {
    setCurrentExam(exam);
    setExamState("exam");
    setCurrentQuestion(0);
    setAnswers({});
    setFlagged(new Set());
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    setExamState("result");
  };

  const resetExam = () => {
    setExamState("select");
    setCurrentExam(null);
    setCurrentQuestion(0);
    setAnswers({});
    setFlagged(new Set());
    setShowExplanation(false);
  };

  // Exam Selection Screen
  if (examState === "select") {
    return (
      <div className="space-y-6 pb-20 md:pb-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">模拟考试</h2>
          <p className="text-muted-foreground text-sm">
            选择科目和难度，检验你的学习成果
          </p>
        </div>

        {Object.entries(examConfigs).map(([level, configs]) => {
          const levelLabels: Record<string, string> = {
            elementary: "📚 小学",
            middle: "🏫 初中",
            high: "🎓 高中",
          };
          return (
            <div key={level}>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {levelLabels[level] || level}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {configs.map((exam, i) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className="p-5 cursor-pointer hover:shadow-medium transition-all group"
                      onClick={() => startExam(exam)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary">{exam.subject}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {exam.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {exam.duration}分钟
                        </span>
                        <span>{exam.questions.length}题</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (!currentExam) return null;
  const questions = currentExam.questions;

  // Result Screen
  if (examState === "result") {
    const correctCount = questions.filter(
      (q, i) => answers[i] === q.correct
    ).length;
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-0"
      >
        <Card className="p-8 text-center">
          <div
            className={`h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              score >= 80
                ? "bg-green-500/10"
                : score >= 60
                ? "bg-amber-500/10"
                : "bg-destructive/10"
            }`}
          >
            {score >= 80 ? (
              <Trophy className="h-12 w-12 text-green-500" />
            ) : score >= 60 ? (
              <CheckCircle className="h-12 w-12 text-amber-500" />
            ) : (
              <XCircle className="h-12 w-12 text-destructive" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {score >= 80 ? "太棒了！🎉" : score >= 60 ? "继续加油！💪" : "再接再厉！📚"}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            {currentExam.title}
          </p>
          <p className="text-4xl font-bold text-primary mb-6">{score}分</p>

          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center px-6 py-4 bg-green-50 dark:bg-green-900/10 rounded-2xl">
              <p className="text-2xl font-bold text-green-600">
                {correctCount}
              </p>
              <p className="text-sm text-green-600">正确</p>
            </div>
            <div className="text-center px-6 py-4 bg-red-50 dark:bg-red-900/10 rounded-2xl">
              <p className="text-2xl font-bold text-destructive">
                {questions.length - correctCount}
              </p>
              <p className="text-sm text-destructive">错误</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setShowExplanation(true);
                setExamState("exam");
                setCurrentQuestion(0);
              }}
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              查看答案解析
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => startExam(currentExam)}
            >
              重新考试
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              size="lg"
              onClick={resetExam}
            >
              返回试卷列表
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Exam Screen
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={resetExam}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              {currentExam.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{currentExam.duration}分钟</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            第 {currentQuestion + 1} / {questions.length} 题
          </span>
          <Progress value={progress} className="w-24 sm:w-32" />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-card"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {question.difficulty === "easy"
                ? "基础"
                : question.difficulty === "medium"
                ? "中等"
                : "困难"}
            </Badge>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              {question.question}
            </h3>
          </div>
          {!showExplanation && (
            <Button
              variant="ghost"
              size="icon"
              className={
                flagged.has(currentQuestion) ? "text-secondary" : ""
              }
              onClick={() => {
                const newFlagged = new Set(flagged);
                if (flagged.has(currentQuestion)) {
                  newFlagged.delete(currentQuestion);
                } else {
                  newFlagged.add(currentQuestion);
                }
                setFlagged(newFlagged);
              }}
            >
              <Flag className="h-5 w-5" />
            </Button>
          )}
        </div>

        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={(value) => {
            if (!showExplanation) {
              setAnswers({ ...answers, [currentQuestion]: parseInt(value) });
            }
          }}
          className="space-y-3"
        >
          {question.options.map((option, index) => {
            let borderClass = "border-border hover:border-primary/50";
            if (showExplanation) {
              if (index === question.correct) {
                borderClass = "border-green-500 bg-green-50 dark:bg-green-900/10";
              } else if (
                answers[currentQuestion] === index &&
                index !== question.correct
              ) {
                borderClass =
                  "border-destructive bg-red-50 dark:bg-red-900/10";
              }
            } else if (answers[currentQuestion] === index) {
              borderClass = "border-primary bg-primary/5";
            }

            return (
              <Label
                key={index}
                htmlFor={`option-${index}`}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${borderClass}`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showExplanation}
                />
                <span className="font-medium">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
                {showExplanation && index === question.correct && (
                  <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                )}
                {showExplanation &&
                  answers[currentQuestion] === index &&
                  index !== question.correct && (
                    <XCircle className="h-5 w-5 text-destructive ml-auto" />
                  )}
              </Label>
            );
          })}
        </RadioGroup>

        {/* Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">解析</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Question Navigation */}
      <div className="flex gap-2 flex-wrap">
        {questions.map((_, index) => {
          let extraClass = "";
          if (showExplanation) {
            if (answers[index] === questions[index].correct) {
              extraClass = "bg-green-100 border-green-300 text-green-700";
            } else if (answers[index] !== undefined) {
              extraClass = "bg-red-100 border-red-300 text-red-700";
            }
          } else if (
            answers[index] !== undefined &&
            currentQuestion !== index
          ) {
            extraClass = "bg-green-100 border-green-300 text-green-700";
          }

          return (
            <Button
              key={index}
              variant={currentQuestion === index ? "default" : "outline"}
              size="sm"
              className={`w-10 h-10 ${extraClass} ${
                flagged.has(index) ? "ring-2 ring-secondary" : ""
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="lg"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          上一题
        </Button>

        {showExplanation ? (
          currentQuestion === questions.length - 1 ? (
            <Button size="lg" onClick={resetExam}>
              返回列表
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              下一题
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )
        ) : currentQuestion === questions.length - 1 ? (
          <Button size="lg" onClick={handleSubmit}>
            提交试卷
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            下一题
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
