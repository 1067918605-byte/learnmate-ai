import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/pages/HomePage";
import { CoursesPage } from "@/pages/CoursesPage";
import { ExamsPage } from "@/pages/ExamsPage";
import { MistakesPage } from "@/pages/MistakesPage";
import { AIPage } from "@/pages/AIPage";
import { AdminPage } from "@/pages/AdminPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { VideoPlayerPage } from "@/pages/VideoPlayerPage";
import {
  getSupabaseClient,
  getSupabaseConfigStatus,
} from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isAdmin } from "@/lib/authz";
import { Card } from "@/components/ui/card";

const pageConfig: Record<string, { title: string; subtitle?: string }> = {
  home: { title: "首页", subtitle: "欢迎回来，小明！" },
  courses: { title: "课程学习", subtitle: "选择你想学习的课程" },
  exams: { title: "模拟考试", subtitle: "检验你的学习成果" },
  mistakes: { title: "错题本", subtitle: "复习巩固薄弱知识点" },
  ai: { title: "AI智能助教", subtitle: "随时解答你的学习问题" },
  settings: { title: "设置", subtitle: "个性化你的学习体验" },
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState<{
    id?: string;
    title?: string;
    videoUrl?: string;
  } | null>(null);
  const { toast } = useToast();

  const supabaseConfig = getSupabaseConfigStatus();
  if (!supabaseConfig.ok) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-6 space-y-3">
          <h1 className="text-2xl font-bold text-foreground">缺少 Supabase 配置</h1>
          <p className="text-sm text-muted-foreground">
            你需要在项目根目录创建 <code className="font-mono">.env.local</code> 并设置以下环境变量：
          </p>
          <ul className="text-sm font-mono bg-muted rounded-lg p-3 space-y-1">
            {supabaseConfig.missing.map((k) => (
              <li key={k}>{k}=...</li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            可以参考 <code className="font-mono">.env.example</code>。保存后重启 dev server。
          </p>
        </Card>
      </div>
    );
  }

  const config = pageConfig[currentPage] || pageConfig.home;

  const handleNavigate = async (page: string, courseData?: any) => {
    if (page === "admin") {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "需要登录",
          description: "请先登录后再进入后台管理。",
          variant: "destructive",
        });
        setCurrentPage("home");
        return;
      }

      const admin = await isAdmin();
      if (!admin) {
        toast({
          title: "无权限",
          description: "当前账号没有后台管理权限。",
          variant: "destructive",
        });
        setCurrentPage("home");
        return;
      }
    }

    setCurrentPage(page);
    if (page === "video" && courseData) {
      setSelectedCourse(courseData);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "courses":
        return <CoursesPage onNavigate={handleNavigate} />;
      case "exams":
        return <ExamsPage onNavigate={handleNavigate} />;
      case "mistakes":
        return <MistakesPage onNavigate={handleNavigate} />;
      case "ai":
        return <AIPage onNavigate={handleNavigate} />;
      case "settings":
        return <SettingsPage onNavigate={handleNavigate} />;
      case "admin":
        return <AdminPage />;
      case "video":
        return (
          <VideoPlayerPage
            onNavigate={handleNavigate}
            courseId={selectedCourse?.id}
            courseTitle={selectedCourse?.title}
            videoUrl={selectedCourse?.videoUrl}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Admin and Video pages have their own layout
  if (currentPage === "admin" || currentPage === "video") {
    return renderPage();
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 ml-64">
        <Header title={config.title} subtitle={config.subtitle} />
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Index;