import { cn } from "@/lib/utils";
import { NavItem } from "@/components/ui/NavItem";
import { getSupabaseClient } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  BookOpen,
  FileText,
  RotateCcw,
  MessageCircle,
  Settings,
  LogOut,
  GraduationCap,
  Gamepad2,
  Library,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "首页", icon: Home },
  { id: "textbook", label: "课本学习", icon: Library },
  { id: "courses", label: "视频课程", icon: BookOpen },
  { id: "games", label: "学习游戏", icon: Gamepad2, badge: "新" },
  { id: "exams", label: "模拟考试", icon: FileText },
  { id: "mistakes", label: "错题本", icon: RotateCcw, badge: 12 },
  { id: "ai", label: "AI助教", icon: MessageCircle },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { toast } = useToast();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-button">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">智慧学堂</h1>
            <p className="text-xs text-muted-foreground">让学习更轻松</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={currentPage === item.id}
            badge={item.badge}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <NavItem
          icon={Settings}
          label="设置"
          active={currentPage === "settings"}
          onClick={() => onNavigate("settings")}
        />
        <NavItem
          icon={LogOut}
          label="退出登录"
          onClick={async () => {
            const supabase = getSupabaseClient();
            if (!supabase) {
              toast({
                title: "未配置 Supabase",
                description: "请先在 .env.local 配置 VITE_SUPABASE_URL 等变量。",
                variant: "destructive",
              });
              return;
            }

            const { error } = await supabase.auth.signOut();
            if (error) {
              toast({
                title: "退出失败",
                description: error.message,
                variant: "destructive",
              });
              return;
            }
            toast({ title: "已退出登录" });
            onNavigate("home");
          }}
        />
      </div>
    </aside>
  );
}