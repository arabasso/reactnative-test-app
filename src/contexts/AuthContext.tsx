import { Dispatch, createContext, useEffect, useState } from "react";

type Auth = {
    isLogged: boolean;
    login: Login | null;
    setLogin: Dispatch<Login | null>;
}

export const AuthContext = createContext<Auth>({} as Auth);

export function AuthProvider({children}: any) {
    const [login, setLogin] = useState(null as Login | null);
    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => setIsLogged(!!login), [login]);
    
    return (
        <AuthContext.Provider children={children} value={{ isLogged, login, setLogin }} />
    )
}