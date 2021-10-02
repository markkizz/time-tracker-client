export interface ILoginResponse {
  accessToken: string
}

export interface IUser {
  personId: string;
  organizationId: string;
  accessToken: string;
  personAccessToken: string;
  refreshToken: string;
  iat: number;
  exp: number;
}