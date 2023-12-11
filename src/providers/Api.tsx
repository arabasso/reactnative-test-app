import { useState, useEffect } from "react";
import axios from "axios";

import { ApiContext } from "@contexts/Api";
import { useAuth } from "@hooks/Auth";
import { AuthService } from "@services/Auth";
import { PostService } from "@services/Post";
import { UserService } from "@services/User";
import { useStorage } from "@hooks/Storage";

const baseUrl = "https://dummyjson.com/";

export function ApiProvider({ children }: any) {
    const [authService] = useState(new AuthService(axios.create({ baseURL: baseUrl })));
    const [postService] = useState(new PostService(axios.create({ baseURL: baseUrl })));
    const [userService] = useState(new UserService(axios.create({ baseURL: baseUrl })));
    const [bearerUserService, setBearerUserService] = useState<UserService>();

    const { login, setLogin } = useAuth();
    const { secureStorageService } = useStorage();

    useEffect(() => {
        const axiosInstance = axios.create({ baseURL: "https://dummyjson.com/auth" });

        axiosInstance.interceptors.request.use(async config => {
            config.headers.setAuthorization("Bearer " + login?.token, true);

            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axiosInstance.interceptors.response.use((response) => response, async function (error) {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                login!.token = await authService.refreshToken(login!);

                secureStorageService.setItem("auth.login", login);

                return axiosInstance(originalRequest);
            }

            return Promise.reject(error);
        });

        setBearerUserService(login === null ? undefined : new UserService(axiosInstance));
    }, [login])

    return (
        <ApiContext.Provider children={children} value={{ authService, postService, userService, bearerUserService }} />
    )
}
