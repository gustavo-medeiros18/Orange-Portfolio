export interface IUserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  dtoUser: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    country: string | undefined;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
