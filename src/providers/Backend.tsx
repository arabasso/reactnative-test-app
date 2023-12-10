import { AuthContext } from "@contexts/Auth";
import { BackendContext } from "@contexts/Backend";
import { AuthService } from "@services/AuthService";
import { BackendService } from "@services/BackendService";
import { PostService } from "@services/PostService";
import { UserService } from "@services/UserService";
import { useState, useContext, useEffect } from "react";

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