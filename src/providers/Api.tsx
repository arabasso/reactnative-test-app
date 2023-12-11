import { AuthContext } from "@contexts/Auth";
import { ApiContext } from "@contexts/Api";
import { AuthService } from "@services/Auth";
import { PostService } from "@services/Post";
import { UserService } from "@services/User";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

const baseUrl = "https://dummyjson.com/";

export function ApiProvider({ children }: any) {
    const [authService] = useState(new AuthService(axios.create({ baseURL: baseUrl })));
    const [postService] = useState(new PostService(axios.create({ baseURL: baseUrl })));
    const [userService] = useState(new UserService(axios.create({ baseURL: baseUrl })));
    const [bearerUserService, setBearerUserService] = useState<UserService>();

    const { login } = useContext(AuthContext);

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
