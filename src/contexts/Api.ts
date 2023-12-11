import { PostService } from "@services/Post";
import { UserService } from "@services/User";
import { createContext } from "react";
import { AuthService } from "@services/Auth";

type Api = {
    authService: AuthService;
    postService: PostService;
    userService: UserService;
    bearerUserService: UserService | undefined;
}

export const ApiContext = createContext<Api>({} as Api);
