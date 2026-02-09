import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIStudyCompanion } from "@/components/ai/AIStudyCompanion";
import { curriculum, findGrade, findSchoolLevel } from "@/data/curriculum";
import type { Chapter } from "@/data/curriculum";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Play,
  CheckCircle2,
  Circle,
  Video,
  PenTool,
  GraduationCap,
  Library,
  Award,
} from "lucide-react";

interface TextbookPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function TextbookPage({ onNavigate }: TextbookPageProps) {
  const [selectedLevel, setSelectedLevel] = useState("elementary");
  const [selectedGradeId, setSelectedGradeId] = useState("grade5");
  const [selectedSubjectId, setSelectedSubjectId] = useState("math");
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [showAICompanion, setShowAICompanion] = useState(false);

  const currentLevel = curriculum.find((l) => l.id === selectedLevel);
  const currentGrade = findGrade(selectedGradeId);
  const currentSubject = currentGrade?.subjects.find(
    (s) => s.id === selectedSubjectId
  );
  const chapters = currentSubject?.chapters || [];

  // When level changes, auto-select first grade & subject
  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId);
    const level = curriculum.find((l) => l.id === levelId);
    if (level && level.grades.length > 0) {
      setSelectedGradeId(level.grades[0].id);
      if (level.grades[0].subjects.length > 0) {
        setSelectedSubjectId(level.grades[0].subjects[0].id);
      }
    }
    setExpandedChapter(1);
  };

  const handleGradeChange = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    const grade = findGrade(gradeId);
    if (grade && grade.subjects.length > 0) {
      // Try to keep same subject, fallback to first
      const sameSubject = grade.subjects.find((s) => s.id === selectedSubjectId);
      setSelectedSubjectId(sameSubject ? sameSubject.id : grade.subjects[0].id);
    }
    setExpandedChapter(1);
  };

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessons = chapters.reduce(
    (acc, ch) => acc + ch.lessons.filter((l) => l.completed).length,
    0
  );
  const overallProgress = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  const levelIcons: Record<string, typeof BookOpen> = {
    elementary: BookOpen,
    middle: GraduationCap,
    high: Award,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[calc(100vh-140px)] pb-20 md:pb-0">
      {/* AI Study Companion - Left Side */}
      <AnimatePresence>
        {showAICompanion && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full lg:w-80 shrink-0"
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
              <Button variant="outline" size="sm" onClick={() => setShowAICompanion(true)}>
                🤖 AI助教
              </Button>
            )}
          </div>

          {/* School Level Selection */}
          <div className="flex flex-col gap-3">
            <Tabs value={selectedLevel} onValueChange={handleLevelChange}>
              <TabsList className="bg-muted h-10 w-full sm:w-auto">
                {curriculum.map((level) => {
                  const Icon = levelIcons[level.id] || BookOpen;
                  return (
                    <TabsTrigger
                      key={level.id}
                      value={level.id}
                      className="text-sm px-4 gap-1.5"
                    >
                      <Icon className="h-4 w-4" />
                      {level.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Grade Selection */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {currentLevel?.grades.map((grade) => (
                <Button
                  key={grade.id}
                  variant={selectedGradeId === grade.id ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 text-xs"
                  onClick={() => handleGradeChange(grade.id)}
                >
                  {grade.shortLabel}
                </Button>
              ))}
            </div>

            {/* Subject Selection */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {currentGrade?.subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubjectId === subject.id ? "secondary" : "ghost"}
                  size="sm"
                  className="shrink-0 text-xs gap-1"
                  onClick={() => {
                    setSelectedSubjectId(subject.id);
                    setExpandedChapter(1);
                  }}
                >
                  <span>{subject.icon}</span>
                  {subject.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                {currentSubject?.icon || "📚"}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {currentSubject?.label} · {currentGrade?.label}上册
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
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                isExpanded={expandedChapter === chapter.id}
                onToggle={() =>
                  setExpandedChapter(
                    expandedChapter === chapter.id ? null : chapter.id
                  )
                }
                onLessonClick={(lesson) =>
                  onNavigate("video", {
                    id: lesson.id,
                    title: lesson.title,
                  })
                }
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// Extracted chapter card component
function ChapterCard({
  chapter,
  isExpanded,
  onToggle,
  onLessonClick,
}: {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onLessonClick: (lesson: Chapter["lessons"][0]) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <button
        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
        onClick={onToggle}
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
          <Progress value={chapter.progress} className="w-24 h-1.5 hidden sm:block" />
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="p-2">
              {chapter.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => onLessonClick(lesson)}
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
                    ) : lesson.type === "reading" ? (
                      <BookOpen className="h-4 w-4 text-blue-500" />
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
  );
}
