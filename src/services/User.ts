import { BackendService } from "./Backend";

export class UserService {
    constructor(private backend: BackendService, private token: string | undefined = undefined) { }

    public async get(id: number): Promise<User> {
        if (this.token) {
            return await this.backend.getJson<User>("auth/users/" + id, { headers: { Authorization: "Bearer " + this.token}});
        }
        
        return await this.backend.getJson<User>("users/" + id);
    }

    public async list(skip: number, limit: number): Promise<UserResult> {
        if (this.token) {
            return await this.backend.getJson<UserResult>(`auth/users?skip=${skip}&limit=${limit}`, { headers: { Authorization: "Bearer " + this.token}});
        }
        
        return await this.backend.getJson<UserResult>(`users?skip=${skip}&limit=${limit}`);
    }
}
