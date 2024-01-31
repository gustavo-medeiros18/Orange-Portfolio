export interface IUserLogin {
  email: string;
  senha: string;
}

export interface LoginResponse {
  message: string;
  dtoUser: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    country: string | null;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
