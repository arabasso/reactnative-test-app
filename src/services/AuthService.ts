import { BackendService } from "./BackendService";

export class AuthService {
  constructor(private backendService: BackendService) {}

  public async login(username: string, password: string): Promise<Login> {
    const init = {
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    };

    return await this.backendService.postJson<Login>("auth/login", init);
  }
}
