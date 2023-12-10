import { BackendService } from "@services/BackendService";
import { PostService } from "@services/PostService";
import { UserService } from "@services/UserService";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { AuthService } from "@services/AuthService";

type Backend = {
    backendService: BackendService;
    authService: AuthService;
    postService: PostService;
    userService: UserService;
    bearerUserService: UserService | undefined;
}

export const BackendContext = createContext<Backend>({} as Backend);
