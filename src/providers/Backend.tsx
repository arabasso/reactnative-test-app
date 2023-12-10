import { AuthContext } from "@contexts/Auth";
import { BackendContext } from "@contexts/Backend";
import { AuthService } from "@services/Auth";
import { BackendService } from "@services/Backend";
import { PostService } from "@services/Post";
import { UserService } from "@services/User";
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
