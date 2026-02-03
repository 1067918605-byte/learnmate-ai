import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  MessageSquare,
  BookOpen,
  ChevronLeft,
  Clock,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerPageProps {
  onNavigate: (page: string) => void;
  courseId?: string;
  courseTitle?: string;
  videoUrl?: string;
}

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const mockChapters = [
  { id: 1, title: "课程介绍", time: 0 },
  { id: 2, title: "基础概念", time: 120 },
  { id: 3, title: "案例分析", time: 360 },
  { id: 4, title: "练习题讲解", time: 600 },
  { id: 5, title: "总结回顾", time: 900 },
];

export function VideoPlayerPage({
  onNavigate,
  courseTitle = "人教版数学五年级上册 - 小数乘法",
  videoUrl,
}: VideoPlayerPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [showChapters, setShowChapters] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value[0];
      setVolume(value[0]);
      setIsMuted(value[0] === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const jumpToChapter = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("courses")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">{courseTitle}</h1>
            <p className="text-sm text-muted-foreground">正在学习</p>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-foreground rounded-2xl overflow-hidden shadow-card"
          >
            <div className="relative aspect-video bg-black">
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-contain"
                  onClick={togglePlay}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <BookOpen className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg">暂无视频内容</p>
                    <p className="text-sm mt-2">请在后台上传课程视频</p>
                  </div>
                </div>
              )}

              {/* Play/Pause overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                {!isPlaying && videoUrl && (
                  <div className="h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center shadow-button">
                    <Play className="h-10 w-10 text-primary-foreground ml-1" />
                  </div>
                )}
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-card/95 backdrop-blur-sm px-6 py-4 space-y-3">
              {/* Progress Bar */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-12">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => skipTime(-10)}>
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-0.5" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => skipTime(10)}>
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute}>
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>

                  {/* Speed */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Settings className="h-4 w-4" />
                        {playbackSpeed}x
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {playbackSpeeds.map((speed) => (
                        <DropdownMenuItem
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={playbackSpeed === speed ? "bg-accent" : ""}
                        >
                          {speed}x 倍速
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Chapters */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowChapters(!showChapters)}
                    className={showChapters ? "bg-accent" : ""}
                  >
                    <List className="h-5 w-5" />
                  </Button>

                  {/* Notes */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNotes(!showNotes)}
                    className={showNotes ? "bg-accent" : ""}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>

                  {/* Fullscreen */}
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notes Section */}
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                学习笔记
              </h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="在这里记录学习笔记..."
                rows={6}
                className="resize-none"
              />
              <div className="mt-4 flex justify-end">
                <Button>保存笔记</Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chapters Sidebar */}
        {showChapters && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 bg-card border-l border-border p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              章节目录
            </h3>
            <div className="space-y-2">
              {mockChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => jumpToChapter(chapter.time)}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${
                    currentTime >= chapter.time &&
                    (index === mockChapters.length - 1 ||
                      currentTime < mockChapters[index + 1].time)
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {chapter.title}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(chapter.time)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
