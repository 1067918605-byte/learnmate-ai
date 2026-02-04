import { useState } from "react";
import { getSupabaseClient } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const supabase = getSupabaseClient();

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface CourseData {
  title: string;
  subject: string;
  grade: string;
  description?: string;
  duration?: number;
  status: "draft" | "published";
}

export function useVideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const { toast } = useToast();

  const uploadVideo = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("course-videos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("course-videos")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Video upload error:", error);
      throw error;
    }
  };

  const uploadThumbnail = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("thumbnails")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("thumbnails")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      throw error;
    }
  };

  const createCourse = async (
    courseData: CourseData,
    videoFile?: File,
    thumbnailFile?: File
  ) => {
    setUploading(true);
    setProgress({ loaded: 0, total: 100, percentage: 0 });

    try {
      let videoUrl: string | null = null;
      let thumbnailUrl: string | null = null;

      // Upload video if provided
      if (videoFile) {
        setProgress({ loaded: 10, total: 100, percentage: 10 });
        videoUrl = await uploadVideo(videoFile);
        setProgress({ loaded: 60, total: 100, percentage: 60 });
      }

      // Upload thumbnail if provided
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
        setProgress({ loaded: 80, total: 100, percentage: 80 });
      }

      // Create course record
      const { data, error } = await supabase.from("courses").insert({
        title: courseData.title,
        subject: courseData.subject,
        grade: courseData.grade,
        description: courseData.description,
        duration: courseData.duration || 0,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        status: courseData.status,
      }).select().single();

      if (error) throw error;

      setProgress({ loaded: 100, total: 100, percentage: 100 });

      toast({
        title: "上传成功",
        description: courseData.status === "published" 
          ? "课程已发布" 
          : "课程已保存为草稿",
      });

      return data;
    } catch (error: any) {
      console.error("Create course error:", error);
      toast({
        title: "上传失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
      setProgress(null);
    }
  };

  const fetchCourses = async (status?: string) => {
    try {
      let query = supabase.from("courses").select("*").order("created_at", { ascending: false });
      
      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Fetch courses error:", error);
      return [];
    }
  };

  const updateCourseStatus = async (courseId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("courses")
        .update({ status })
        .eq("id", courseId);

      if (error) throw error;

      toast({
        title: "更新成功",
        description: status === "published" ? "课程已发布" : "课程已设为草稿",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "更新失败",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      const { error } = await supabase.from("courses").delete().eq("id", courseId);
      if (error) throw error;

      toast({
        title: "删除成功",
        description: "课程已删除",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "删除失败",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploading,
    progress,
    createCourse,
    fetchCourses,
    updateCourseStatus,
    deleteCourse,
  };
}
