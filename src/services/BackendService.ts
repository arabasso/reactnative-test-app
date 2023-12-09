export class BackendService {
  constructor(private baseUrl: string) { }

  private adjustRequestInit(
    method: string,
    init: RequestInit | undefined = undefined
  ): RequestInit | undefined {
    return init ? { ...init, method: method } : init = undefined;
  }

  public async get(
    url: string,
    init: RequestInit | undefined
  ): Promise<Response> {
    return fetch(this.baseUrl + url, this.adjustRequestInit("GET", init)).then(res => !res.ok ? res.json().then(Promise.reject.bind(Promise)) : res);
  }

  public async getJson<T>(
    url: string,
    init: RequestInit | undefined = undefined,
  ): Promise<T> {
    const clone = { ...init };

    clone.headers = {
      ...clone.headers,
      "Content-Type": "application/json",
    };

    return this.get(url, clone).then(res => res.json());
  }

  public async post(
    url: string,
    init: RequestInit | undefined = undefined
  ): Promise<Response> {
    return await fetch(this.baseUrl + url, this.adjustRequestInit("POST", init)).then(res => !res.ok ? res.json().then(Promise.reject.bind(Promise)) : res)
  }

  public async postJson<T>(
    url: string,
    init: RequestInit | undefined = undefined
  ): Promise<T> {
    const clone = { ...init };

    clone.headers = {
      ...clone.headers,
      "Content-Type": "application/json",
    };

    return this.post(url, clone).then(res => res.json());

  }
}

