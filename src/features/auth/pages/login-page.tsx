import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircleIcon,
  Coffee,
  EyeIcon,
  EyeOffIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import useLoginMutation from "../queries/use-login-mutation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/get-error-message";

const highlights = [
  "Track orders and product availability in one place.",
  "Review daily prep priorities before the morning rush.",
  "Access a calm, focused workspace built for staff sign-in.",
];

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be between 6 and 100 characters"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleLogin = async (payload: { email: string; password: string }) => {
    try {
      const res = await loginMutation.mutateAsync(payload);
      localStorage.setItem("auth_token", res.token);

      if (res.user.role === "user") {
        navigate("/menu");
        return;
      }

      if (res.user.role === "cashier") {
        navigate("/cashier/pos");
        return;
      }

      navigate("/admin/dashboard");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(185,140,44,0.22),_transparent_30%),linear-gradient(135deg,_rgba(250,246,238,1)_0%,_rgba(243,234,220,1)_45%,_rgba(232,220,203,1)_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div className="relative">
          <div className="absolute -left-8 top-6 hidden size-24 rounded-full border border-foreground/10 bg-background/40 blur-sm lg:block" />
          <div className="relative max-w-xl space-y-8">
            <div className="inline-flex items-center gap-3 border border-foreground/10 bg-background/70 px-4 py-2 backdrop-blur-sm">
              <Coffee className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Cassava Cafe Portal
              </span>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                Staff access
              </p>
              <h1 className="font-heading text-5xl leading-none font-semibold tracking-[0.08em] text-foreground sm:text-6xl">
                Sign in for today&apos;s service.
              </h1>
              <p className="max-w-lg text-base leading-8 text-foreground/75 sm:text-lg">
                Enter your email and password to open the cafe workspace. The
                experience stays intentionally simple so the path to access is
                immediate.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="border border-foreground/10 bg-background/65 p-4 backdrop-blur-sm"
                >
                  <Sparkles className="mb-4 size-4 text-primary" />
                  <p className="text-sm leading-6 text-foreground/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="border border-foreground/10 bg-background/88 py-0 shadow-2xl shadow-black/8 backdrop-blur-sm">
          <CardHeader className="border-b border-foreground/10 px-8 py-8">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-2xl tracking-[0.18em]">Login</CardTitle>
            <CardDescription className="max-w-sm text-sm leading-7">
              Use your team credentials to continue to the internal cafe portal.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 py-8">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="barista@cassavacafe.com"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  <Button
                    onClick={() => setShowPassword((prev) => !prev)}
                    variant="ghost"
                    className="absolute inset-y-0 right-0 px-3"
                    type="button"
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {loginMutation.isError && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Login failed</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Button
                loading={loginMutation.isPending}
                className="w-full"
                size="lg"
                type="submit"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
