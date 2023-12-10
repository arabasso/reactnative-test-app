import { Dispatch, createContext } from "react";

type Auth = {
    isLogged: boolean;
    login: Login | null;
    setLogin: Dispatch<Login | null>;
}

export const AuthContext = createContext<Auth>({} as Auth);
