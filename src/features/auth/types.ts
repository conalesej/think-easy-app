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
