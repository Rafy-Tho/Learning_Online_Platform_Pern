import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { GraduationCap, LogIn, AlertCircle } from "lucide-react";
import useLogin from "../hooks/auth/useLogin";
import { useToast } from "../components/ui/use-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("rafytho30@gmail.com");
  const [password, setPassword] = useState("Password123!");
  const { login: loginHook, isPending } = useLogin();
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginHook({ email, password });
      toast({
        title: "Success!",
        description: "Your action was completed successfully.",
      });
      login(res);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              LMS Admin
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your admin dashboard
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-xl shadow-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lms.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4 rounded-lg bg-muted/50 border border-border p-3">
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Demo Credentials
              </p>
              <p className="text-xs text-muted-foreground">
                Email:{" "}
                <span className="font-mono text-foreground">admin@lms.com</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Password:{" "}
                <span className="font-mono text-foreground">admin123</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
