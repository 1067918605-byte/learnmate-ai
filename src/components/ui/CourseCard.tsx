import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Play, Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  subject: string;
  thumbnail?: string;
  duration: string;
  lessons: number;
  progress?: number;
  onClick?: () => void;
}

export function CourseCard({
  title,
  subject,
  thumbnail,
  duration,
  lessons,
  progress = 0,
  onClick,
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card cursor-pointer transition-all duration-300 hover:shadow-medium"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <BookOpen className="h-12 w-12 text-primary/40" />
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300">
          <div className="h-14 w-14 rounded-full bg-primary shadow-button flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="h-6 w-6 text-primary-foreground ml-1" />
          </div>
        </div>

        {/* Subject badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-card/90 backdrop-blur-sm border border-border">
          {subject}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} 课时</span>
          </div>
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">学习进度</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}