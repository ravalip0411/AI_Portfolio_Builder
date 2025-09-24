import { SignUpForm } from "@/components/Auth/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Get started today</h1>
          <p className="text-muted-foreground mt-2">Create your account and build your first portfolio in minutes</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
