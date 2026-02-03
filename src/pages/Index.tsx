import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/pages/HomePage";
import { CoursesPage } from "@/pages/CoursesPage";
import { ExamsPage } from "@/pages/ExamsPage";
import { MistakesPage } from "@/pages/MistakesPage";
import { AIPage } from "@/pages/AIPage";
import { AdminPage } from "@/pages/AdminPage";
import { VideoPlayerPage } from "@/pages/VideoPlayerPage";

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

  const config = pageConfig[currentPage] || pageConfig.home;

  const handleNavigate = (page: string, courseData?: any) => {
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