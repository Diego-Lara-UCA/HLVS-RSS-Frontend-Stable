export interface IApiAuthResponse {
  data: {
    token?: string;
    email?: string;
  };
}

export interface IGoogleLoginResponse {
  access_token: string;
}

