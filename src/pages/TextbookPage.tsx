import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIStudyCompanion } from "@/components/ai/AIStudyCompanion";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Video,
  PenTool,
  Star,
  Lock,
} from "lucide-react";

interface TextbookPageProps {
  onNavigate: (page: string, data?: any) => void;
}

// 2026年人教版小学数学五年级上册真实课程章节
const mathGrade5Chapters = [
  {
    id: 1,
    title: "第一单元 小数乘法",
    lessons: [
      { id: "1-1", title: "1.1 小数乘整数", duration: "45分钟", completed: true, type: "video" },
      { id: "1-2", title: "1.2 小数乘小数", duration: "45分钟", completed: true, type: "video" },
      { id: "1-3", title: "1.3 积的近似数", duration: "40分钟", completed: false, type: "video" },
      { id: "1-4", title: "1.4 整数乘法运算定律推广到小数", duration: "40分钟", completed: false, type: "video" },
      { id: "1-5", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
    progress: 40,
  },
  {
    id: 2,
    title: "第二单元 位置",
    lessons: [
      { id: "2-1", title: "2.1 用数对确定位置", duration: "45分钟", completed: false, type: "video" },
      { id: "2-2", title: "2.2 在方格纸上用数对确定位置", duration: "40分钟", completed: false, type: "video" },
      { id: "2-3", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
  {
    id: 3,
    title: "第三单元 小数除法",
    lessons: [
      { id: "3-1", title: "3.1 小数除以整数", duration: "45分钟", completed: false, type: "video" },
      { id: "3-2", title: "3.2 一个数除以小数", duration: "45分钟", completed: false, type: "video" },
      { id: "3-3", title: "3.3 商的近似数", duration: "40分钟", completed: false, type: "video" },
      { id: "3-4", title: "3.4 循环小数", duration: "45分钟", completed: false, type: "video" },
      { id: "3-5", title: "3.5 用计算器探索规律", duration: "35分钟", completed: false, type: "video" },
      { id: "3-6", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
  {
    id: 4,
    title: "第四单元 可能性",
    lessons: [
      { id: "4-1", title: "4.1 可能性", duration: "40分钟", completed: false, type: "video" },
      { id: "4-2", title: "4.2 掷一掷", duration: "35分钟", completed: false, type: "video" },
      { id: "4-3", title: "单元练习", duration: "25分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
  {
    id: 5,
    title: "第五单元 简易方程",
    lessons: [
      { id: "5-1", title: "5.1 用字母表示数", duration: "45分钟", completed: false, type: "video" },
      { id: "5-2", title: "5.2 方程的意义", duration: "40分钟", completed: false, type: "video" },
      { id: "5-3", title: "5.3 等式的性质", duration: "45分钟", completed: false, type: "video" },
      { id: "5-4", title: "5.4 解方程", duration: "50分钟", completed: false, type: "video" },
      { id: "5-5", title: "5.5 实际问题与方程", duration: "45分钟", completed: false, type: "video" },
      { id: "5-6", title: "单元练习", duration: "35分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
  {
    id: 6,
    title: "第六单元 多边形的面积",
    lessons: [
      { id: "6-1", title: "6.1 平行四边形的面积", duration: "45分钟", completed: false, type: "video" },
      { id: "6-2", title: "6.2 三角形的面积", duration: "45分钟", completed: false, type: "video" },
      { id: "6-3", title: "6.3 梯形的面积", duration: "45分钟", completed: false, type: "video" },
      { id: "6-4", title: "6.4 组合图形的面积", duration: "40分钟", completed: false, type: "video" },
      { id: "6-5", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
  {
    id: 7,
    title: "第七单元 植树问题",
    lessons: [
      { id: "7-1", title: "7.1 植树问题（一）", duration: "45分钟", completed: false, type: "video" },
      { id: "7-2", title: "7.2 植树问题（二）", duration: "40分钟", completed: false, type: "video" },
      { id: "7-3", title: "单元练习", duration: "25分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
];

// 语文课程 - 五年级上册
const chineseGrade5Chapters = [
  {
    id: 1,
    title: "第一单元 万物有灵",
    lessons: [
      { id: "c1-1", title: "1 白鹭", duration: "45分钟", completed: true, type: "video" },
      { id: "c1-2", title: "2 落花生", duration: "40分钟", completed: true, type: "video" },
      { id: "c1-3", title: "3 桂花雨", duration: "45分钟", completed: false, type: "video" },
      { id: "c1-4", title: "4* 珍珠鸟", duration: "35分钟", completed: false, type: "video" },
      { id: "c1-5", title: "口语交际：制定班级公约", duration: "30分钟", completed: false, type: "exercise" },
      { id: "c1-6", title: "习作：我的心爱之物", duration: "40分钟", completed: false, type: "exercise" },
    ],
    progress: 33,
  },
  {
    id: 2,
    title: "第二单元 阅读策略",
    lessons: [
      { id: "c2-1", title: "5 搭石", duration: "45分钟", completed: false, type: "video" },
      { id: "c2-2", title: "6 将相和", duration: "50分钟", completed: false, type: "video" },
      { id: "c2-3", title: "7 什么比猎豹的速度更快", duration: "40分钟", completed: false, type: "video" },
      { id: "c2-4", title: "8* 冀中的地道战", duration: "45分钟", completed: false, type: "video" },
    ],
    progress: 0,
  },
  {
    id: 3,
    title: "第三单元 民间故事",
    lessons: [
      { id: "c3-1", title: "9 猎人海力布", duration: "45分钟", completed: false, type: "video" },
      { id: "c3-2", title: "10 牛郎织女（一）", duration: "45分钟", completed: false, type: "video" },
      { id: "c3-3", title: "11* 牛郎织女（二）", duration: "40分钟", completed: false, type: "video" },
      { id: "c3-4", title: "口语交际：讲民间故事", duration: "30分钟", completed: false, type: "exercise" },
    ],
    progress: 0,
  },
  {
    id: 4,
    title: "第四单元 家国情怀",
    lessons: [
      { id: "c4-1", title: "12 古诗三首", duration: "50分钟", completed: false, type: "video" },
      { id: "c4-2", title: "13 少年中国说（节选）", duration: "45分钟", completed: false, type: "video" },
      { id: "c4-3", title: "14 圆明园的毁灭", duration: "45分钟", completed: false, type: "video" },
      { id: "c4-4", title: "15* 木笛", duration: "40分钟", completed: false, type: "video" },
    ],
    progress: 0,
  },
];

// 英语课程
const englishGrade5Chapters = [
  {
    id: 1,
    title: "Unit 1 What's he like?",
    lessons: [
      { id: "e1-1", title: "Part A Let's talk", duration: "40分钟", completed: true, type: "video" },
      { id: "e1-2", title: "Part A Let's learn", duration: "35分钟", completed: true, type: "video" },
      { id: "e1-3", title: "Part B Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e1-4", title: "Part B Let's learn", duration: "35分钟", completed: false, type: "video" },
      { id: "e1-5", title: "Part B Read and write", duration: "45分钟", completed: false, type: "video" },
    ],
    progress: 40,
  },
  {
    id: 2,
    title: "Unit 2 My week",
    lessons: [
      { id: "e2-1", title: "Part A Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e2-2", title: "Part A Let's learn", duration: "35分钟", completed: false, type: "video" },
      { id: "e2-3", title: "Part B Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e2-4", title: "Part B Let's learn", duration: "35分钟", completed: false, type: "video" },
    ],
    progress: 0,
  },
  {
    id: 3,
    title: "Unit 3 What would you like?",
    lessons: [
      { id: "e3-1", title: "Part A Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e3-2", title: "Part A Let's learn", duration: "35分钟", completed: false, type: "video" },
      { id: "e3-3", title: "Part B Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e3-4", title: "Part B Let's learn", duration: "35分钟", completed: false, type: "video" },
    ],
    progress: 0,
  },
];

const subjects = [
  { id: "math", label: "数学", chapters: mathGrade5Chapters, icon: "📐" },
  { id: "chinese", label: "语文", chapters: chineseGrade5Chapters, icon: "📖" },
  { id: "english", label: "英语", chapters: englishGrade5Chapters, icon: "🔤" },
];

const grades = [
  { id: "grade3", label: "三年级" },
  { id: "grade4", label: "四年级" },
  { id: "grade5", label: "五年级" },
  { id: "grade6", label: "六年级" },
  { id: "grade7", label: "七年级" },
  { id: "grade8", label: "八年级" },
];

export function TextbookPage({ onNavigate }: TextbookPageProps) {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [selectedGrade, setSelectedGrade] = useState("grade5");
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [showAICompanion, setShowAICompanion] = useState(true);

  const currentSubject = subjects.find((s) => s.id === selectedSubject);
  const chapters = currentSubject?.chapters || [];

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessons = chapters.reduce(
    (acc, ch) => acc + ch.lessons.filter((l) => l.completed).length,
    0
  );
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="flex gap-4 h-[calc(100vh-140px)]">
      {/* AI Study Companion - Left Side */}
      <AnimatePresence>
        {showAICompanion && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-80 shrink-0"
          >
            <AIStudyCompanion
              subject={currentSubject?.label}
              onClose={() => setShowAICompanion(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">课本学习</h2>
              <p className="text-muted-foreground text-sm">
                2026年人教版教材 · 跟着课本一章一章学习
              </p>
            </div>
            {!showAICompanion && (
              <Button variant="outline" onClick={() => setShowAICompanion(true)}>
                显示AI助教
              </Button>
            )}
          </div>

          {/* Grade & Subject Selection */}
          <div className="flex gap-4">
            <Tabs value={selectedGrade} onValueChange={setSelectedGrade}>
              <TabsList className="bg-muted h-9">
                {grades.map((grade) => (
                  <TabsTrigger
                    key={grade.id}
                    value={grade.id}
                    className="text-xs px-3"
                  >
                    {grade.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
              <TabsList className="bg-muted h-9">
                {subjects.map((subject) => (
                  <TabsTrigger
                    key={subject.id}
                    value={subject.id}
                    className="text-xs px-3 gap-1"
                  >
                    <span>{subject.icon}</span>
                    {subject.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {currentSubject?.label} · 五年级上册
                </h3>
                <p className="text-xs text-muted-foreground">
                  已完成 {completedLessons}/{totalLessons} 课时
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{overallProgress}%</p>
              <p className="text-xs text-muted-foreground">总体进度</p>
            </div>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </Card>

        {/* Chapter List */}
        <ScrollArea className="flex-1">
          <div className="space-y-3 pr-4">
            {chapters.map((chapter) => (
              <Card key={chapter.id} className="overflow-hidden">
                {/* Chapter Header */}
                <button
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    setExpandedChapter(
                      expandedChapter === chapter.id ? null : chapter.id
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        chapter.progress === 100
                          ? "bg-green-500/10 text-green-600"
                          : chapter.progress > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {chapter.progress === 100 ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-bold">{chapter.id}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground text-sm">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {chapter.lessons.length} 课时 · 进度 {chapter.progress}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={chapter.progress} className="w-24 h-1.5" />
                    {expandedChapter === chapter.id ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Lessons */}
                <AnimatePresence>
                  {expandedChapter === chapter.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border overflow-hidden"
                    >
                      <div className="p-2">
                        {chapter.lessons.map((lesson, index) => (
                          <button
                            key={lesson.id}
                            className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-muted/50 transition-colors"
                            onClick={() =>
                              onNavigate("video", {
                                id: lesson.id,
                                title: lesson.title,
                              })
                            }
                          >
                            <div
                              className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                lesson.completed
                                  ? "bg-green-500 text-white"
                                  : "border-2 border-muted-foreground/30"
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Circle className="h-3 w-3 text-muted-foreground/50" />
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <p
                                className={`text-sm ${
                                  lesson.completed
                                    ? "text-muted-foreground"
                                    : "text-foreground"
                                }`}
                              >
                                {lesson.title}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.type === "video" ? (
                                <Video className="h-4 w-4 text-primary" />
                              ) : (
                                <PenTool className="h-4 w-4 text-amber-500" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                              <Play className="h-4 w-4 text-primary" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
