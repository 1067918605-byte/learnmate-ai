import { motion } from "framer-motion";
import { GradeCard } from "@/components/ui/GradeCard";
import { CourseCard } from "@/components/ui/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
} from "lucide-react";
import heroPattern from "@/assets/hero-pattern.jpg";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const recentCourses = [
  {
    id: 1,
    title: "人教版数学五年级上册 - 小数乘法",
    subject: "数学",
    duration: "45分钟",
    lessons: 12,
    progress: 65,
  },
  {
    id: 2,
    title: "语文古诗词鉴赏 - 唐诗三百首精选",
    subject: "语文",
    duration: "30分钟",
    lessons: 20,
    progress: 30,
  },
  {
    id: 3,
    title: "英语口语提升 - 日常对话练习",
    subject: "英语",
    duration: "25分钟",
    lessons: 15,
    progress: 80,
  },
];

const stats = [
  { label: "学习天数", value: "128", icon: Clock, color: "text-primary" },
  { label: "完成课程", value: "36", icon: BookOpen, color: "text-accent" },
  { label: "正确率", value: "87%", icon: Target, color: "text-secondary" },
  { label: "学习排名", value: "Top 5%", icon: Trophy, color: "text-primary" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 text-primary-foreground"
        style={{
          backgroundImage: `linear-gradient(135deg, hsla(175, 65%, 42%, 0.92) 0%, hsla(190, 70%, 50%, 0.88) 100%), url(${heroPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">今日推荐</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">继续你的学习之旅</h2>
          <p className="opacity-90 mb-6">
            你已经连续学习 7 天了，保持这个节奏！今天完成一节课程可以获得额外积分。
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-medium"
            onClick={() => onNavigate("courses")}
          >
            开始学习
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
          <GraduationCap className="h-48 w-48" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Grade Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">选择年级</h3>
          <Button variant="ghost" className="text-primary">
            查看全部 <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <GradeCard
            title="小学"
            subtitle="1-6年级课程"
            icon={BookOpen}
            color="primary"
            grades={["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"]}
            onClick={() => onNavigate("courses")}
          />
          <GradeCard
            title="初中"
            subtitle="7-9年级课程"
            icon={GraduationCap}
            color="junior"
            grades={["七年级", "八年级", "九年级"]}
            onClick={() => onNavigate("courses")}
          />
          <GradeCard
            title="高中"
            subtitle="10-12年级课程"
            icon={Trophy}
            color="senior"
            grades={["高一", "高二", "高三"]}
            onClick={() => onNavigate("courses")}
          />
        </div>
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">最近学习</h3>
          <Button variant="ghost" className="text-primary">
            查看全部 <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {recentCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onClick={() => onNavigate("courses")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}