import { BackendService } from "@services/Backend";
import { PostService } from "@services/Post";
import { UserService } from "@services/User";
import { createContext } from "react";
import { AuthService } from "@services/Auth";

type Backend = {
    backendService: BackendService;
    authService: AuthService;
    postService: PostService;
    userService: UserService;
    bearerUserService: UserService | undefined;
}

export const BackendContext = createContext<Backend>({} as Backend);
