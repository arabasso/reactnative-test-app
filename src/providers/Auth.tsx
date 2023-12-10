import { AuthContext } from "@contexts/Auth";
import { useState, useEffect } from "react";

export function AuthProvider({children}: any) {
    const [login, setLogin] = useState(null as Login | null);
    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => setIsLogged(!!login), [login]);
    
    return (
        <AuthContext.Provider children={children} value={{ isLogged, login, setLogin }} />
    )
}