 import { cn } from "@/lib/utils";
 import {
   Home,
   BookOpen,
   FileText,
   RotateCcw,
   MessageCircle,
   Library,
   Gamepad2,
 } from "lucide-react";
 
 interface MobileNavProps {
   currentPage: string;
   onNavigate: (page: string) => void;
 }
 
 const navItems = [
   { id: "home", label: "首页", icon: Home },
   { id: "textbook", label: "课本", icon: Library },
   { id: "courses", label: "课程", icon: BookOpen },
   { id: "games", label: "游戏", icon: Gamepad2 },
   { id: "ai", label: "AI助教", icon: MessageCircle },
 ];
 
 export function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
   return (
     <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
       <div className="flex items-center justify-around py-2 px-2">
         {navItems.map((item) => {
           const Icon = item.icon;
           const isActive = currentPage === item.id;
           return (
             <button
               key={item.id}
               onClick={() => onNavigate(item.id)}
               className={cn(
                 "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]",
                 isActive
                   ? "text-primary bg-primary/10"
                   : "text-muted-foreground hover:text-foreground"
               )}
             >
               <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
               <span className="text-xs font-medium">{item.label}</span>
             </button>
           );
         })}
       </div>
     </nav>
   );
 }