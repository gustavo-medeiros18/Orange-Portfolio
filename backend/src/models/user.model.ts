export interface User {
  id?: string;
  name: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  iconUrl: string;
  isGoogleLogin: boolean;
  createdAt?: string;
  updatedAt?: string;
}
