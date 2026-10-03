import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {jwtDecode} from "jwt-decode"
import {tokenSchema} from "../schema/auth"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function validateToken(token: string){
    if(!token || typeof token !== "string"){ 
        return {valid: false, reason: "Token is empty or not a string"}
    }
    try{
        const decoded = jwtDecode(token)
        const validatedToken = tokenSchema.parse(decoded)
        const now = Math.floor(Date.now() / 1000)
        if(validatedToken.exp < now){
            return {valid: false, reason: "Token is expired"}
        }

        return {valid: true, payload: validatedToken}
    } catch(err){
        console.log("err:", err)
        return {valid: false, reason: "Token is invalid"}
    }
}