import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockVideos = [
  {
    id: 1,
    title: "数学五年级上册 - 小数乘法",
    subject: "数学",
    grade: "五年级",
    status: "published",
    views: 1234,
  },
  {
    id: 2,
    title: "语文古诗词鉴赏",
    subject: "语文",
    grade: "六年级",
    status: "draft",
    views: 0,
  },
];

export function AdminPage() {
  const [videos, setVideos] = useState(mockVideos);
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "上传成功",
      description: "视频已成功上传，正在处理中...",
    });
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
                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    拖拽视频文件到这里
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    支持 MP4, MOV, AVI 格式，最大 2GB
                  </p>
                  <Button>选择文件</Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>视频标题</Label>
                    <Input placeholder="输入视频标题" />
                  </div>
                  <div className="space-y-2">
                    <Label>科目</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择科目" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">数学</SelectItem>
                        <SelectItem value="chinese">语文</SelectItem>
                        <SelectItem value="english">英语</SelectItem>
                        <SelectItem value="physics">物理</SelectItem>
                        <SelectItem value="chemistry">化学</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>年级</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择年级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g1">一年级</SelectItem>
                        <SelectItem value="g2">二年级</SelectItem>
                        <SelectItem value="g3">三年级</SelectItem>
                        <SelectItem value="g4">四年级</SelectItem>
                        <SelectItem value="g5">五年级</SelectItem>
                        <SelectItem value="g6">六年级</SelectItem>
                        <SelectItem value="g7">七年级</SelectItem>
                        <SelectItem value="g8">八年级</SelectItem>
                        <SelectItem value="g9">九年级</SelectItem>
                        <SelectItem value="g10">高一</SelectItem>
                        <SelectItem value="g11">高二</SelectItem>
                        <SelectItem value="g12">高三</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>时长（分钟）</Label>
                    <Input type="number" placeholder="45" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>视频描述</Label>
                  <Textarea
                    placeholder="描述视频内容和学习目标..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button size="lg" onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" />
                    上传并发布
                  </Button>
                  <Button variant="outline" size="lg">
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加视频
                </Button>
              </div>

              <div className="divide-y divide-border">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-16 w-28 rounded-lg bg-muted flex items-center justify-center">
                      <Video className="h-6 w-6 text-muted-foreground" />
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
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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