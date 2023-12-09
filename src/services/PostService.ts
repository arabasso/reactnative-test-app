import { BackendService } from "./BackendService";

export class PostService {
    constructor(private backend: BackendService) { }

    public async get(id: number): Promise<Post> {
        return await this.backend.getJson<Post>("posts/" + id);
    }

    public async list(skip: number, limit: number): Promise<PostResult> {
        return await this.backend.getJson<PostResult>(`posts?skip=${skip}&limit=${limit}`);
    }
}