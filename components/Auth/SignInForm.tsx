// //components/Auth/SignInForm.tsx
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react"
// import { signIn } from "@/lib/mockAuth"
// import { useToast } from "@/hooks/use-toast"
// import Link from "next/link"

// const signInSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(1, "Password is required"),
// })

// type SignInFormData = z.infer<typeof signInSchema>

// export function SignInForm() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()
//   const { toast } = useToast()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData>({
//     resolver: zodResolver(signInSchema),
//   })

//   const onSubmit = async (data: SignInFormData) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       const result = await signIn(data.email, data.password)

//       if (result.error) {
//         setError(result.error)
//       } else {
//         toast({
//           title: "Welcome back!",
//           description: "You have been signed in successfully.",
//         })
//         router.push("/dashboard")
//       }
//     } catch (err) {
//       setError("An unexpected error occurred. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
//         <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
//       </CardHeader>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="email" className="flex items-center gap-2">
//               <Mail className="h-4 w-4" />
//               Email
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               {...register("email")}
//               className={errors.email ? "border-destructive" : ""}
//             />
//             {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password" className="flex items-center gap-2">
//               <Lock className="h-4 w-4" />
//               Password
//             </Label>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 {...register("password")}
//                 className={errors.password ? "border-destructive pr-10" : "pr-10"}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
//               </Button>
//             </div>
//             {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
//           </div>

//           {/* Demo credentials hint */}
//           <div className="p-3 bg-muted rounded-lg">
//             <p className="text-sm font-medium mb-2">Demo Credentials:</p>
//             <div className="text-xs text-muted-foreground space-y-1">
//               <p>Email: alexa@demo.com</p>
//               <p>Password: Demo@1234</p>
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="flex flex-col space-y-4">
//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Sign in
//           </Button>

//           <p className="text-sm text-center text-muted-foreground">
//             Don't have an account?{" "}
//             <Link href="/signup" className="font-medium text-primary hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }



// components/Auth/SignInForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { signIn } from "@/lib/mockAuth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signIn(data.email, data.password)
      if (result.error) {
        setError(result.error)
      } else {
        toast({ title: "Welcome back!", description: "You have been signed in successfully." })
        router.push("/dashboard")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>

      {/* Enable browser password manager */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              placeholder="you@example.com"
              autoComplete="email"              // ✅ helps managers
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"  // ✅ sign-in form
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Demo credentials hint */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Email: alexa@demo.com</p>
              <p>Password: Demo@1234</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
