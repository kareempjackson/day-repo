export enum UserRole {
  ADMIN = 'ADMIN',
  BARISTA = 'BARISTA',
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  permissions?: string[];
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions?: string[];
}
