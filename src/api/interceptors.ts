import { type AxiosInstance } from "axios"
import { ServerError } from "./server-error"

export function setupInterceptors(api: AxiosInstance) {
    api.interceptors.request.use(
        (res) => res,
        (error)=>{
            if(error.response.status ===500){
                const serverError = new ServerError([
                    {message: "Server error occurred. Please try again later."}
                ])
                return Promise.reject(serverError)
            }
            if(error.response.status === 403){
                const serverError = new ServerError([
                    {message: "You are not authorized to perform this action."}
                ])
                return Promise.reject(serverError)
            }
            if(error.response.data.errors){
                const serverError = new ServerError(error.response.data.errors)
                return Promise.reject(serverError)
            }

            const serverError = new ServerError([
                {message: "An unknown error occurred. Please try again later."}
            ])
            return Promise.reject(serverError)
        }
    )
}