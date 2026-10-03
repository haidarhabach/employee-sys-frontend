import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
})

export type LoginCredentials = z.infer<typeof loginSchema>

export type LoginErrors = {
  [K in keyof LoginCredentials]?: string[]
}

export const tokenSchema = z.object({
  iat: z.number(),
  exp: z.number(),
  role: z.string(),
  userId: z.string(),
})

export type Token = z.infer<typeof tokenSchema>

export const signupSchema = z.object({
  token: z.string({ message: "Account creation token is missing" }),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
})

export type SignupDetails = z.infer<typeof signupSchema>
export type ResetDetails = {
  token: string
  newPassword: string
}