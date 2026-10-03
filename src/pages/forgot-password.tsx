"use client"
import { type ChangeEvent, type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useSearchParams } from "react-router"
import { useForgotPassword, useResetPassword } from "../features/auth"

export default function ForgotPassword() {
  const forgotPasswordMutation = useForgotPassword()
  const resetPasswordMutation = useResetPassword()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  // Check if token exists in URL
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") || ""
  const isResetMode = !!token

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await forgotPasswordMutation.mutateAsync(
        formData.username
      )

      if (response.status === "success") {
        setMessage({
          type: "success",
          text: "Password reset email sent! Please check your inbox.",
        })
        setFormData((prev) => ({ ...prev, username: "" }))
      } else {
        const error = await response.json()
        setMessage({
          type: "error",
          text:
            error.message || "Failed to send reset email. Please try again.",
        })
      }
    } catch (error) {
      console.error("error:", error)
      setMessage({
        type: "error",
        text: "Network error. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match.",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPasswordMutation.mutateAsync({
        token: token,
        newPassword: formData.password,
      })

      if (response.status === "success") {
        setMessage({
          type: "success",
          text: "Password reset successfully! You can now log in with your new password.",
        })
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }))
      } else {
        const error = await response.json()
        setMessage({
          type: "error",
          text: error.message || "Failed to reset password. Please try again.",
        })
      }
    } catch (error) {
      console.error("error:", error)
      setMessage({
        type: "error",
        text: "Network error. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            {isResetMode ? "Reset Password" : "Forgot Password"}
          </CardTitle>
          <CardDescription className='text-center'>
            {isResetMode
              ? "Enter your new password below"
              : "Enter your username and we'll send you a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
            >
              {message.type === "success" ? (
                <CheckCircle className='h-4 w-4' />
              ) : (
                <AlertCircle className='h-4 w-4' />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {!isResetMode ? (
            <form onSubmit={handleSendEmail} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='username'>Username or Email</Label>
                <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Enter your username or email'
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                disabled={isLoading || !formData.username.trim()}
              >
                {isLoading ? "Sending..." : "Send Reset Email"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter your new password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm your new password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                disabled={
                  isLoading || !formData.password || !formData.confirmPassword
                }
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          <div className='text-center'>
            <a
              href='/login'
              className='text-sm text-blue-600 hover:text-blue-500 underline'
            >
              Back to Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}