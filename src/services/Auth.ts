import { AxiosInstance } from 'axios';

export class AuthService {
  private static expiresInMins = 3;

  constructor(private instance: AxiosInstance) { }

  public async login(username: string, password: string): Promise<Login> {
    return await this.instance<Login>({
      method: "post",
      url: "/auth/login",
      data: {
        username: username,
        password: password,
        expiresInMins: AuthService.expiresInMins,
      },
    }).then(response => {
      return { ...response.data, password: password };
    })
  }

  public async refreshToken(login: Login): Promise<string> {
    return await this.login(login.username, login.password).then(response => response.accessToken);
  }
}
