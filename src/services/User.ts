import { AxiosInstance } from "axios";

export class UserService {
    constructor(private axiosInstance: AxiosInstance) { }

    public async get(id: number): Promise<User> {
        return await this.axiosInstance<User>({ method: "GET", url: "/users/" + id }).then(response => response.data);
    }

    public async list(skip: number, limit: number): Promise<UserResult> {
        return await this.axiosInstance<UserResult>({ method: "GET", url: "/users", params: { skip: skip, limit: limit } }).then(response => response.data);
    }
}
