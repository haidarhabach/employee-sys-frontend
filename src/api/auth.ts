import api from "."
import { type ResetDetails, type SignupDetails } from "../schema/auth"

export default {
  login: async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password })

    return res.data
  },
  signup: async (signupDetails: SignupDetails) => {
    const res = await api.post(`/auth/signup?token=${signupDetails.token}`, {
      username: signupDetails.username,
      password: signupDetails.password,
    })

    return res.data
  },
  forgotPassword: async (username: string) => {
    const res = await api.post(`auth/forgot-password/${username}`)

    return res.data
  },
  resetPassword: async (resetDetails: ResetDetails) => {
    const res = await api.post("auth/reset-password", resetDetails)

    return res.data
  },
}