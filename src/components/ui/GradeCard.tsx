import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GradeCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: "primary" | "junior" | "senior";
  grades: string[];
  onClick?: () => void;
}

const colorClasses = {
  primary: {
    bg: "bg-gradient-to-br from-primary/10 to-primary/5",
    border: "border-primary/20 hover:border-primary/40",
    icon: "bg-primary text-primary-foreground",
    text: "text-primary",
  },
  junior: {
    bg: "bg-gradient-to-br from-accent/10 to-accent/5",
    border: "border-accent/20 hover:border-accent/40",
    icon: "bg-accent text-accent-foreground",
    text: "text-accent",
  },
  senior: {
    bg: "bg-gradient-to-br from-secondary/10 to-secondary/5",
    border: "border-secondary/20 hover:border-secondary/40",
    icon: "bg-secondary text-secondary-foreground",
    text: "text-secondary",
  },
};

export function GradeCard({ title, subtitle, icon: Icon, color, grades, onClick }: GradeCardProps) {
  const classes = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300",
        classes.bg,
        classes.border
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("rounded-xl p-3 shadow-medium", classes.icon)}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className={cn("text-xl font-bold", classes.text)}>{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {grades.map((grade) => (
          <span
            key={grade}
            className="px-3 py-1 rounded-full text-xs font-medium bg-card border border-border"
          >
            {grade}
          </span>
        ))}
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-10">
        <Icon className="h-32 w-32" />
      </div>
    </motion.div>
  );
}