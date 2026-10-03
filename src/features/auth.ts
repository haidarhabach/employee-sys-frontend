import { useContext } from "react"
import { useMutation } from "@tanstack/react-query"

import AuthService from "@/api/auth"
import { AuthContext } from "@/context/auth-provider"
import api from "@/api"
import { type ResetDetails, type SignupDetails } from "../schema/auth"

export function useLoginMutation() {
  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      return AuthService.login(username, password)
    },
  })
  return mutation
}

export function useCreateAccount() {
  const mutation = useMutation({
    mutationFn: (signupDetails: SignupDetails) => {
      return AuthService.signup(signupDetails)
    },
  })
  return mutation
}
export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: (username: string) => {
      return AuthService.forgotPassword(username)
    },
  })
  return mutation
}
export function useResetPassword() {
  const mutation = useMutation({
    mutationFn: (resetDetails: ResetDetails) => {
      return AuthService.resetPassword(resetDetails)
    },
  })
  return mutation
}

export function useInterceptToken() {
  const context = useContext(AuthContext)
  api.interceptors.request.use((config) => {
    const token = context?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}