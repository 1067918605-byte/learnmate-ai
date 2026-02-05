 import { Bell, Menu, User, Search } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
 } from "@/components/ui/sheet";
 import { Input } from "@/components/ui/input";
 import { NavItem } from "@/components/ui/NavItem";
 import {
   Home,
   BookOpen,
   FileText,
   RotateCcw,
   MessageCircle,
   Settings,
   GraduationCap,
   Gamepad2,
   Library,
 } from "lucide-react";
 
 interface MobileHeaderProps {
   title: string;
   currentPage: string;
   onNavigate: (page: string) => void;
 }
 
 const navItems = [
   { id: "home", label: "首页", icon: Home },
   { id: "textbook", label: "课本学习", icon: Library },
   { id: "courses", label: "视频课程", icon: BookOpen },
   { id: "games", label: "学习游戏", icon: Gamepad2 },
   { id: "exams", label: "模拟考试", icon: FileText },
   { id: "mistakes", label: "错题本", icon: RotateCcw, badge: 12 },
   { id: "ai", label: "AI助教", icon: MessageCircle },
   { id: "settings", label: "设置", icon: Settings },
 ];
 
 export function MobileHeader({ title, currentPage, onNavigate }: MobileHeaderProps) {
   return (
     <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border safe-area-top">
       <div className="flex items-center justify-between px-4 py-3">
         {/* Menu Button */}
         <Sheet>
           <SheetTrigger asChild>
             <Button variant="ghost" size="icon" className="shrink-0">
               <Menu className="h-5 w-5" />
             </Button>
           </SheetTrigger>
           <SheetContent side="left" className="w-72 p-0">
             <SheetHeader className="p-4 border-b border-border">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                   <GraduationCap className="h-6 w-6 text-primary-foreground" />
                 </div>
                 <SheetTitle className="text-lg">智慧学堂</SheetTitle>
               </div>
             </SheetHeader>
             <nav className="p-3 space-y-1">
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
           </SheetContent>
         </Sheet>
 
         {/* Title */}
         <h1 className="text-lg font-bold text-foreground truncate">{title}</h1>
 
         {/* Actions */}
         <div className="flex items-center gap-1">
           <Button variant="ghost" size="icon" className="relative">
             <Bell className="h-5 w-5" />
             <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
           </Button>
           <Button variant="ghost" size="icon">
             <User className="h-5 w-5" />
           </Button>
         </div>
       </div>
     </header>
   );
 }