export interface AuthLoginInput {
  email: string;
  password: string;
}

export interface AuthSignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface AuthSignUpResponse extends AuthTokens {}
