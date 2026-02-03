import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  getSupabaseClient,
  getSupabaseConfigStatus,
} from "@/integrations/supabase/client";
import { isAdmin } from "@/lib/authz";

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);

  const isLoggedIn = useMemo(() => Boolean(sessionEmail), [sessionEmail]);

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;

      setSessionEmail(session?.user.email ?? null);
      setAdmin(await isAdmin());
    };

    init();

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSessionEmail(session?.user.email ?? null);
      setAdmin(await isAdmin());
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const status = getSupabaseConfigStatus();
      const supabase = getSupabaseClient();
      if (!status.ok || !supabase) {
        throw new Error("Supabase is not configured");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast({
        title: "注册成功",
        description: "如果开启了邮箱验证，请去邮箱完成验证后再登录。",
      });
    } catch (e) {
      toast({
        title: "注册失败",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const status = getSupabaseConfigStatus();
      const supabase = getSupabaseClient();
      if (!status.ok || !supabase) {
        throw new Error("Supabase is not configured");
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast({ title: "登录成功" });
    } catch (e) {
      toast({
        title: "登录失败",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "已退出登录" });
      onNavigate("home");
    } catch (e) {
      toast({
        title: "退出失败",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">账号</h2>
          <p className="text-sm text-muted-foreground">
            {isLoggedIn ? `已登录：${sessionEmail}` : "未登录"}
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="至少 6 位（由 Supabase 配置决定）"
                autoComplete="current-password"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSignIn} disabled={loading || !email || !password}>
                登录
              </Button>
              <Button
                variant="outline"
                onClick={handleSignUp}
                disabled={loading || !email || !password}
              >
                注册
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-3">
            <Button variant="outline" onClick={handleSignOut} disabled={loading}>
              退出登录
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">权限</h2>
          <p className="text-sm text-muted-foreground">
            当前角色：{admin ? "admin" : "student"}
          </p>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => onNavigate("admin")}
            disabled={!isLoggedIn || !admin}
          >
            进入后台管理
          </Button>
          {!admin && (
            <p className="mt-2 text-sm text-muted-foreground">
              需要在数据库里为当前用户分配 admin 角色后才能进入。
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

