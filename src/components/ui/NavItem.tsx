import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

export function NavItem({ icon: Icon, label, active, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-button"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-bold",
            active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-destructive text-destructive-foreground"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}