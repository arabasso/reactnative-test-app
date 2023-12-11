import { AxiosInstance } from "axios";

export class PostService {
    constructor(private axiosInstance: AxiosInstance) { }

    public async get(id: number): Promise<Post> {
        return await this.axiosInstance<Post>({ method: "GET", url: "/posts/" + id }).then(response => response.data);
    }

    public async list(skip: number, limit: number): Promise<PostResult> {
        return await this.axiosInstance<PostResult>({ method: "GET", url: "/posts", params: { skip: skip, limit: limit } }).then(response => response.data);
    }
}