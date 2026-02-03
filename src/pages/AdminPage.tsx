import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Video,
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Image,
  X,
} from "lucide-react";
import { isAdmin } from "@/lib/authz";
import { useVideoUpload } from "@/hooks/useVideoUpload";

interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description?: string;
  video_url?: string;
  thumbnail_url?: string;
  duration: number;
  status: string;
  views: number;
  created_at: string;
}

export function AdminPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    isAdmin().then((ok) => {
      if (mounted) setAllowed(ok);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (allowed === null) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-card rounded-2xl border border-border shadow-card p-6">
            <p className="text-muted-foreground">正在校验权限...</p>
          </div>
        </div>
      </div>
    );
  }

  if (allowed === false) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-card rounded-2xl border border-border shadow-card p-6">
            <h1 className="text-2xl font-bold text-foreground">无权限</h1>
            <p className="text-muted-foreground mt-2">
              当前账号没有后台管理权限。请在“设置”里登录管理员账号，或在数据库为该用户分配 admin 角色。
            </p>
          </div>
        </div>
      </div>
    );
  }
  const [videos, setVideos] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const { uploading, progress, createCourse, fetchCourses, updateCourseStatus, deleteCourse } =
    useVideoUpload();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const courses = await fetchCourses();
    setVideos(courses || []);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const clearVideoSelection = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const clearThumbnailSelection = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handleUpload = async (status: "draft" | "published") => {
    if (!title || !subject || !grade) {
      return;
    }

    const result = await createCourse(
      {
        title,
        subject,
        grade,
        description,
        duration: parseInt(duration) || 0,
        status,
      },
      videoFile || undefined,
      thumbnailFile || undefined
    );

    if (result) {
      // Reset form
      setTitle("");
      setSubject("");
      setGrade("");
      setDescription("");
      setDuration("");
      clearVideoSelection();
      clearThumbnailSelection();
      loadCourses();
    }
  };

  const handleDelete = async (courseId: string) => {
    const success = await deleteCourse(courseId);
    if (success) {
      loadCourses();
    }
  };

  const handleStatusToggle = async (course: Course) => {
    const newStatus = course.status === "published" ? "draft" : "published";
    const success = await updateCourseStatus(course.id, newStatus);
    if (success) {
      loadCourses();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">后台管理</h1>
          <p className="text-muted-foreground mt-1">管理课程视频和学习资料</p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              上传视频
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              视频管理
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              教材资料
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6">上传新视频</h2>

              <div className="space-y-6">
                {/* Video Upload Area */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">视频文件</Label>
                    {videoPreview ? (
                      <div className="relative border-2 border-primary/50 rounded-2xl p-4 bg-primary/5">
                        <video
                          src={videoPreview}
                          className="w-full aspect-video rounded-lg object-cover"
                          controls
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={clearVideoSelection}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2 truncate">
                          {videoFile?.name}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => videoInputRef.current?.click()}
                      >
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          点击上传视频
                        </p>
                        <p className="text-xs text-muted-foreground">
                          支持 MP4, MOV, AVI，最大 2GB
                        </p>
                      </div>
                    )}
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoSelect}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">封面图片（可选）</Label>
                    {thumbnailPreview ? (
                      <div className="relative border-2 border-primary/50 rounded-2xl p-4 bg-primary/5">
                        <img
                          src={thumbnailPreview}
                          className="w-full aspect-video rounded-lg object-cover"
                          alt="Thumbnail preview"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={clearThumbnailSelection}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2 truncate">
                          {thumbnailFile?.name}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => thumbnailInputRef.current?.click()}
                      >
                        <Image className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          点击上传封面
                        </p>
                        <p className="text-xs text-muted-foreground">
                          支持 PNG, JPG，最大 10MB
                        </p>
                      </div>
                    )}
                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailSelect}
                    />
                  </div>
                </div>

                {/* Upload Progress */}
                {uploading && progress && (
                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">上传中...</span>
                      <span className="text-sm text-muted-foreground">
                        {progress.percentage}%
                      </span>
                    </div>
                    <Progress value={progress.percentage} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>视频标题 *</Label>
                    <Input
                      placeholder="输入视频标题"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>科目 *</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择科目" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="数学">数学</SelectItem>
                        <SelectItem value="语文">语文</SelectItem>
                        <SelectItem value="英语">英语</SelectItem>
                        <SelectItem value="物理">物理</SelectItem>
                        <SelectItem value="化学">化学</SelectItem>
                        <SelectItem value="生物">生物</SelectItem>
                        <SelectItem value="历史">历史</SelectItem>
                        <SelectItem value="地理">地理</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>年级 *</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择年级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="一年级">一年级</SelectItem>
                        <SelectItem value="二年级">二年级</SelectItem>
                        <SelectItem value="三年级">三年级</SelectItem>
                        <SelectItem value="四年级">四年级</SelectItem>
                        <SelectItem value="五年级">五年级</SelectItem>
                        <SelectItem value="六年级">六年级</SelectItem>
                        <SelectItem value="七年级">七年级</SelectItem>
                        <SelectItem value="八年级">八年级</SelectItem>
                        <SelectItem value="九年级">九年级</SelectItem>
                        <SelectItem value="高一">高一</SelectItem>
                        <SelectItem value="高二">高二</SelectItem>
                        <SelectItem value="高三">高三</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>时长（分钟）</Label>
                    <Input
                      type="number"
                      placeholder="45"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>视频描述</Label>
                  <Textarea
                    placeholder="描述视频内容和学习目标..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    onClick={() => handleUpload("published")}
                    disabled={uploading || !title || !subject || !grade}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    上传并发布
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleUpload("draft")}
                    disabled={uploading || !title || !subject || !grade}
                  >
                    保存草稿
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="manage">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-semibold">视频列表</h2>
                <Button onClick={loadCourses}>
                  <Plus className="mr-2 h-4 w-4" />
                  刷新列表
                </Button>
              </div>

              <div className="divide-y divide-border">
                {videos.length === 0 ? (
                  <div className="p-12 text-center">
                    <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">暂无视频，请先上传</p>
                  </div>
                ) : (
                  videos.map((video) => (
                    <div
                      key={video.id}
                      className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-16 w-28 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        {video.thumbnail_url ? (
                          <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Video className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {video.subject} · {video.grade} · {video.views} 次观看
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {video.status === "published" ? (
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            已发布
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            草稿
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {video.video_url && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(video.video_url, "_blank")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusToggle(video)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(video.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="materials">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6">教材资料管理</h2>
              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  上传课本和学习资料
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  支持 PDF, DOC, PPT 格式
                </p>
                <Button>选择文件</Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
