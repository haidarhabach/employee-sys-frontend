import { createContext, type ReactNode, useState} from "react"

type AuthContext = {
    token: string | null
    updateToken: (token: string) => void
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({children}: {children: ReactNode}){
    const updateToken = (token: string)=>{
        setState((prevState) => ({
            ...prevState,
            token,
        }))
    }

    const [state, setState] = useState<AuthContext>({
        token: null,
        updateToken,
    })

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}