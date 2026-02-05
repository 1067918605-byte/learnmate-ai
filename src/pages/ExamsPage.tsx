import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    question: "下列哪个选项是5的倍数？",
    options: ["12", "25", "33", "47"],
    correct: 1,
  },
  {
    id: 2,
    question: "\"春眠不觉晓\"出自哪首诗？",
    options: ["《静夜思》", "《春晓》", "《登鹳雀楼》", "《望庐山瀑布》"],
    correct: 1,
  },
  {
    id: 3,
    question: "What is the past tense of 'go'?",
    options: ["goed", "gone", "went", "going"],
    correct: 2,
  },
];

interface ExamsPageProps {
  onNavigate: (page: string) => void;
}

export function ExamsPage({ onNavigate }: ExamsPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  const question = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: parseInt(value) });
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const correctCount = mockQuestions.filter(
    (q, i) => answers[i] === q.correct
  ).length;

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-card rounded-3xl p-8 border border-border shadow-medium text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">考试完成！</h2>
          <p className="text-muted-foreground mb-8">
            你的成绩：{correctCount} / {mockQuestions.length} 正确
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <div className="text-center px-6 py-4 bg-green-50 rounded-2xl">
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-green-600">正确</p>
            </div>
            <div className="text-center px-6 py-4 bg-red-50 rounded-2xl">
              <p className="text-2xl font-bold text-red-500">
                {mockQuestions.length - correctCount}
              </p>
              <p className="text-sm text-red-500">错误</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => onNavigate("mistakes")}
            >
              查看错题解析
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => {
                setShowResult(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
            >
              重新考试
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">剩余时间: 25:00</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            第 {currentQuestion + 1} / {mockQuestions.length} 题
          </span>
          <Progress value={progress} className="w-24 sm:w-32" />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-3xl p-8 border border-border shadow-card"
      >
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">
            {question.question}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className={flagged.has(currentQuestion) ? "text-secondary" : ""}
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
        </div>

        <RadioGroup
          value={answers[currentQuestion]?.toString()}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <Label
              key={index}
              htmlFor={`option-${index}`}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                answers[currentQuestion] === index
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
              />
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
              <span>{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </motion.div>

      {/* Question Navigation */}
      <div className="flex gap-2 flex-wrap">
        {mockQuestions.map((_, index) => (
          <Button
            key={index}
            variant={currentQuestion === index ? "default" : "outline"}
            size="sm"
            className={`w-10 h-10 ${
              answers[index] !== undefined && currentQuestion !== index
                ? "bg-green-100 border-green-300 text-green-700"
                : ""
            } ${flagged.has(index) ? "ring-2 ring-secondary" : ""}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
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

        {currentQuestion === mockQuestions.length - 1 ? (
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