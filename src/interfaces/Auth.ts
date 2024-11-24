export interface IApiAuthResponse {
  data: {
    token?: string;
  };
}

export interface IGoogleLoginResponse {
  access_token: string;
}

