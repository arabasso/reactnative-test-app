import { BackendService } from "@services/BackendService";
import { PostService } from "@services/PostService";
import { UserService } from "@services/UserService";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthService } from "@services/AuthService";

type Backend = {
    backendService: BackendService;
    authService: AuthService;
    postService: PostService;
    userService: UserService;
    bearerUserService: UserService | undefined;
}

export const BackendContext = createContext<Backend>({} as Backend);

export function BackendProvider({children}: any) {
    const [ backendService ] = useState(new BackendService("https://dummyjson.com/"));
    const [ authService ] = useState(new AuthService(backendService));
    const [ postService ] = useState(new PostService(backendService));
    const [ userService ] = useState(new UserService(backendService));
    const [ bearerUserService, setBearerUserService ] = useState<UserService>();

    const { login } = useContext(AuthContext);

    useEffect(() =>{
        setBearerUserService(login === null ? undefined : new UserService(backendService, login?.token));
    }, [login])

    return (
        <BackendContext.Provider children={children} value={{ backendService: backendService, authService, postService, userService, bearerUserService }} />
    )
}
