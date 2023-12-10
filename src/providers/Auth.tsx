import { AuthContext } from "@contexts/Auth";
import { useStorage } from "@hooks/Storage";
import { useState, useEffect } from "react";

export function AuthProvider({children}: any) {
    const [login, setLogin] = useState<Login | null>(null);
    const [isLogged, setIsLogged] = useState(false);
    const { secureStorageService } = useStorage();

    useEffect(() => {
        if (isLogged && !login) {
            secureStorageService.removeItem("auth.login");
        } else if (login) {
            secureStorageService.setItem("auth.login", login);
        }

        setIsLogged(!!login);
    },
    [login]);
    useEffect(() => {
        secureStorageService.getItem<Login>("auth.login").then(setLogin);
    }, []);
    
    return (
        <AuthContext.Provider children={children} value={{ isLogged, login, setLogin }} />
    )
}