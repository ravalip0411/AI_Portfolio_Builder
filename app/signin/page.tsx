import { SignInForm } from "@/components/Auth/SignInForm"

export default function SignInPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue building your portfolio</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
