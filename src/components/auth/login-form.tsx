"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/stores/auth.store"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const setUser = useAuthStore((state: any) => state.setUser)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ email: string; password: string }>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    setError(null)
    try {
      const result = await authService.login(data)
      setUser(result.user)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
    setLoading(false)
  }

  return (
    <div className={className} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {/* ...social login buttons... */}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <span className="text-destructive text-xs">{errors.email.message}</span>}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password", {
                      required: "Password is required"
                    })}
                  />
                  {errors.password && <span className="text-destructive text-xs">{errors.password.message}</span>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                {error && <div className="text-destructive text-sm text-center">{error}</div>}
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
