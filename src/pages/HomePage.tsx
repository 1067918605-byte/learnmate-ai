import { motion } from "framer-motion";
import { GradeCard } from "@/components/ui/GradeCard";
import { CourseCard } from "@/components/ui/CourseCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
  Flame,
  Calendar,
  CheckCircle2,
  Circle,
  Gamepad2,
  FileText,
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

const todayTasks = [
  { id: 1, title: "完成数学第三单元课程", done: true, type: "textbook" },
  { id: 2, title: "语文古诗词背诵打卡", done: true, type: "textbook" },
  { id: 3, title: "英语单词听写练习", done: false, type: "textbook" },
  { id: 4, title: "口算大冒险 - 每日挑战", done: false, type: "games" },
  { id: 5, title: "完成模拟考试一套", done: false, type: "exams" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const completedTasks = todayTasks.filter((t) => t.done).length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-primary-foreground"
        style={{
          backgroundImage: `linear-gradient(135deg, hsla(175, 65%, 42%, 0.92) 0%, hsla(190, 70%, 50%, 0.88) 100%), url(${heroPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">今日推荐</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            继续你的学习之旅
          </h2>
          <p className="opacity-90 mb-6 text-sm sm:text-base">
            你已经连续学习 7 天了，保持这个节奏！今天完成一节课程可以获得额外积分。
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-medium"
              onClick={() => onNavigate("textbook")}
            >
              继续学习
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden sm:block">
          <GraduationCap className="h-48 w-48" />
        </div>
      </motion.div>

      {/* Today's Study Plan + Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-2"
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">今日学习计划</h3>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  {completedTasks}/{todayTasks.length} 已完成
                </span>
              </div>
            </div>
            <Progress
              value={(completedTasks / todayTasks.length) * 100}
              className="h-2 mb-4"
            />
            <div className="space-y-2">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                    task.done
                      ? "bg-green-50 dark:bg-green-900/10"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => onNavigate(task.type)}
                >
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                  )}
                  <span
                    className={`text-sm flex-1 ${
                      task.done
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </span>
                  {!task.done && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Stats Column */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {stats.slice(0, 4).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="p-4 flex items-center gap-3">
                <div className={`shrink-0 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "课本学习",
            icon: BookOpen,
            page: "textbook",
            color: "bg-primary/10 text-primary",
          },
          {
            label: "学习游戏",
            icon: Gamepad2,
            page: "games",
            color: "bg-amber-500/10 text-amber-600",
          },
          {
            label: "模拟考试",
            icon: FileText,
            page: "exams",
            color: "bg-blue-500/10 text-blue-600",
          },
          {
            label: "AI助教",
            icon: Sparkles,
            page: "ai",
            color: "bg-purple-500/10 text-purple-600",
          },
        ].map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <Card
              className="p-4 cursor-pointer hover:shadow-medium transition-all text-center group"
              onClick={() => onNavigate(action.page)}
            >
              <div
                className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
              >
                <action.icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-foreground">
                {action.label}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grade Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">选择年级</h3>
          <Button variant="ghost" className="text-primary" onClick={() => onNavigate("textbook")}>
            查看全部 <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <GradeCard
            title="小学"
            subtitle="1-6年级课程"
            icon={BookOpen}
            color="primary"
            grades={["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"]}
            onClick={() => onNavigate("textbook")}
          />
          <GradeCard
            title="初中"
            subtitle="7-9年级课程"
            icon={GraduationCap}
            color="junior"
            grades={["七年级", "八年级", "九年级"]}
            onClick={() => onNavigate("textbook")}
          />
          <GradeCard
            title="高中"
            subtitle="10-12年级课程"
            icon={Trophy}
            color="senior"
            grades={["高一", "高二", "高三"]}
            onClick={() => onNavigate("textbook")}
          />
        </div>
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">最近学习</h3>
          <Button variant="ghost" className="text-primary" onClick={() => onNavigate("courses")}>
            查看全部 <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 md:pb-0">
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
