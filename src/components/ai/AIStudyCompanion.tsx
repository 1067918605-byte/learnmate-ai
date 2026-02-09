import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { getSupabaseClient } from "@/integrations/supabase/client";
import {
  Send,
  Mic,
  MicOff,
  X,
  Sparkles,
  Heart,
  Star,
  MessageCircle,
  Loader2,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIStudyCompanionProps {
  subject?: string;
  onClose: () => void;
}

// Cute AI avatar expressions
const avatarExpressions = {
  happy: "😊",
  thinking: "🤔",
  excited: "🎉",
  encouraging: "💪",
  listening: "👂",
  speaking: "🗣️",
};

export function AIStudyCompanion({ subject, onClose }: AIStudyCompanionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `你好呀！我是小智，你的AI学习小伙伴！🌟\n\n今天我们一起学习${subject || "知识"}吧！有任何不懂的问题都可以问我哦~\n\n我会陪着你，一起加油！💪`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [avatarMood, setAvatarMood] = useState<keyof typeof avatarExpressions>("happy");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const supabase = getSupabaseClient();
    const session = supabase ? (await supabase.auth.getSession()).data.session : null;

    if (!session?.access_token) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant" as const, content: "请先登录后再使用AI助教功能。" },
      ]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setAvatarMood("thinking");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            systemPrompt: `你是"小智"，一个可爱、友善、充满活力的AI学习伙伴。你正在陪伴一个${subject ? `学习${subject}的` : ""}小朋友。
            
你的特点：
- 说话要亲切可爱，像一个热心的好朋友
- 适当使用表情符号让对话更生动 😊🌟💡
- 对学生的进步要及时鼓励和表扬
- 解释问题时要简单易懂，可以举生活中的例子
- 如果学生遇到困难，要耐心引导，不要直接给答案
- 偶尔可以开一些小玩笑，让学习更轻松

记住：你是学生的朋友和学习伙伴，不是严肃的老师！`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setAvatarMood("speaking");

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: assistantContent }
                      : m
                  )
                );
              }
            } catch {}
          }
        }
      }

      setAvatarMood("happy");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "哎呀，我好像遇到了一点小问题 😅 能再问我一次吗？",
        },
      ]);
      setAvatarMood("happy");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setAvatarMood(isRecording ? "happy" : "listening");
  };

  const quickQuestions = [
    "这道题怎么做？",
    "能举个例子吗？",
    "帮我复习一下",
    "有没有简单的方法？",
  ];

  return (
    <Card className="h-80 lg:h-full flex flex-col bg-gradient-to-b from-card to-card/95 border-primary/20">
      {/* Header with Avatar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Animated Avatar */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: avatarMood === "excited" ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg">
                <span className="text-2xl">{avatarExpressions[avatarMood]}</span>
              </div>
              {/* Status indicator */}
              <div
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${
                  isLoading
                    ? "bg-amber-500 animate-pulse"
                    : isRecording
                    ? "bg-red-500 animate-pulse"
                    : "bg-green-500"
                }`}
              />
            </motion.div>
            <div>
              <h3 className="font-bold text-foreground flex items-center gap-1">
                小智
                <Sparkles className="h-4 w-4 text-amber-500" />
              </h3>
              <p className="text-xs text-muted-foreground">
                {isLoading
                  ? "思考中..."
                  : isRecording
                  ? "正在听你说话..."
                  : "随时为你解答"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mood indicators */}
        <div className="flex gap-1">
          {[Heart, Star, MessageCircle].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            >
              <Icon
                className={`h-4 w-4 ${
                  i === 0
                    ? "text-red-400"
                    : i === 1
                    ? "text-amber-400"
                    : "text-primary"
                }`}
                fill="currentColor"
              />
            </motion.div>
          ))}
          <span className="text-xs text-muted-foreground ml-1">亲密度 Lv.8</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.role === "assistant" && (
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <span className="text-sm">😊</span>
                </div>
              )}
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm">🤔</span>
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md p-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      <div className="px-3 py-2 border-t border-border">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickQuestions.map((q, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              className="shrink-0 text-xs h-7 rounded-full"
              onClick={() => sendMessage(q)}
              disabled={isLoading}
            >
              {q}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className="shrink-0 h-9 w-9"
            onClick={toggleRecording}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="有问题就问我吧..."
              className="pr-9 h-9 rounded-full text-sm"
              disabled={isRecording}
            />
            <Button
              size="icon"
              className="absolute right-1 top-1 h-7 w-7 rounded-full"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || isRecording}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
