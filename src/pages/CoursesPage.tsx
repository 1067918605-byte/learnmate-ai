import { useState } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/ui/CourseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calculator, Languages, Beaker, Globe, Palette } from "lucide-react";

const subjects = [
  { id: "all", label: "全部", icon: BookOpen },
  { id: "math", label: "数学", icon: Calculator },
  { id: "chinese", label: "语文", icon: Languages },
  { id: "english", label: "英语", icon: Globe },
  { id: "science", label: "科学", icon: Beaker },
  { id: "art", label: "综合", icon: Palette },
];

const courses = [
  {
    id: 1,
    title: "人教版数学五年级上册 - 小数乘法",
    subject: "数学",
    duration: "45分钟",
    lessons: 12,
    progress: 65,
    category: "math",
  },
  {
    id: 2,
    title: "语文古诗词鉴赏 - 唐诗三百首精选",
    subject: "语文",
    duration: "30分钟",
    lessons: 20,
    progress: 30,
    category: "chinese",
  },
  {
    id: 3,
    title: "英语口语提升 - 日常对话练习",
    subject: "英语",
    duration: "25分钟",
    lessons: 15,
    progress: 80,
    category: "english",
  },
  {
    id: 4,
    title: "初中物理 - 力学基础入门",
    subject: "物理",
    duration: "50分钟",
    lessons: 18,
    progress: 0,
    category: "science",
  },
  {
    id: 5,
    title: "高中化学 - 元素周期表详解",
    subject: "化学",
    duration: "40分钟",
    lessons: 10,
    progress: 45,
    category: "science",
  },
  {
    id: 6,
    title: "小学语文 - 作文写作技巧",
    subject: "语文",
    duration: "35分钟",
    lessons: 8,
    progress: 100,
    category: "chinese",
  },
];

interface CoursesPageProps {
  onNavigate: (page: string) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = activeTab === "all" 
    ? courses 
    : courses.filter(c => c.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Subject Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted p-1 h-auto flex-wrap gap-1">
          {subjects.map((subject) => (
            <TabsTrigger
              key={subject.id}
              value={subject.id}
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <subject.icon className="h-4 w-4" />
              {subject.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard
                  {...course}
                  onClick={() => onNavigate("video")}
                />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">暂无该科目课程</p>
        </div>
      )}
    </div>
  );
}