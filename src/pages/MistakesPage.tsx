import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Filter,
} from "lucide-react";

const mockMistakes = [
  {
    id: 1,
    subject: "数学",
    question: "计算: 3.5 × 2.4 = ?",
    yourAnswer: "7.4",
    correctAnswer: "8.4",
    explanation:
      "小数乘法：先按整数乘法计算3.5 × 2.4 = 35 × 24 ÷ 100 = 840 ÷ 100 = 8.4。注意小数点位置要向左移动两位。",
    date: "2024-01-15",
    reviewed: false,
  },
  {
    id: 2,
    subject: "语文",
    question: "\"落霞与孤鹜齐飞\"的下一句是什么？",
    yourAnswer: "长河落日圆",
    correctAnswer: "秋水共长天一色",
    explanation:
      "这句诗出自王勃的《滕王阁序》，\"落霞与孤鹜齐飞，秋水共长天一色\"描绘了傍晚时分滕王阁的壮丽景色。",
    date: "2024-01-14",
    reviewed: true,
  },
  {
    id: 3,
    subject: "英语",
    question: "Choose the correct form: She ___ to school every day.",
    yourAnswer: "go",
    correctAnswer: "goes",
    explanation:
      "主语是第三人称单数 'She'，所以动词要加 's'。一般现在时中，当主语是 he/she/it 时，动词要变成第三人称单数形式。",
    date: "2024-01-13",
    reviewed: false,
  },
];

interface MistakesPageProps {
  onNavigate: (page: string) => void;
}

export function MistakesPage({ onNavigate }: MistakesPageProps) {
  const [mistakes, setMistakes] = useState(mockMistakes);
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed">("all");

  const filteredMistakes = mistakes.filter((m) => {
    if (filter === "pending") return !m.reviewed;
    if (filter === "reviewed") return m.reviewed;
    return true;
  });

  const markAsReviewed = (id: number) => {
    setMistakes(
      mistakes.map((m) => (m.id === id ? { ...m, reviewed: true } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <span className="text-2xl font-bold">{mistakes.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">总错题数</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-2xl font-bold">
              {mistakes.filter((m) => !m.reviewed).length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">待复习</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold">
              {mistakes.filter((m) => m.reviewed).length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">已掌握</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          全部
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
        >
          待复习
        </Button>
        <Button
          variant={filter === "reviewed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("reviewed")}
        >
          已掌握
        </Button>
      </div>

      {/* Mistakes List */}
      <Accordion type="single" collapsible className="space-y-3">
        {filteredMistakes.map((mistake, index) => (
          <motion.div
            key={mistake.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AccordionItem
              value={mistake.id.toString()}
              className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 text-left flex-1">
                  <Badge
                    variant={mistake.reviewed ? "secondary" : "destructive"}
                    className="shrink-0"
                  >
                    {mistake.subject}
                  </Badge>
                  <span className="font-medium line-clamp-1">
                    {mistake.question}
                  </span>
                  {mistake.reviewed && (
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 ml-auto" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-muted-foreground mb-1">你的答案</p>
                      <p className="font-medium text-destructive">
                        {mistake.yourAnswer}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                      <p className="text-sm text-muted-foreground mb-1">正确答案</p>
                      <p className="font-medium text-green-600">
                        {mistake.correctAnswer}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">解析</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mistake.explanation}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {!mistake.reviewed && (
                      <Button
                        className="flex-1"
                        onClick={() => markAsReviewed(mistake.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        标记为已掌握
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">
                      <BookOpen className="mr-2 h-4 w-4" />
                      查看相关课程
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>

      {filteredMistakes.length === 0 && (
        <div className="text-center py-16">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500/50 mb-4" />
          <p className="text-muted-foreground">暂无错题记录</p>
        </div>
      )}
    </div>
  );
}