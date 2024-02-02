export const environment = {
  production: false,
  baseUrl: "http://localhost:3000",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  getApiUserId: (id: string) => `users/${id}`,
  getApiProjectId: (id: string) => `projects/${id}`,
  getApiProjectUserId: (id: string) => `projects/user/${id}`,
  getApiUpdatePassword: (id: string) => `users/${id}/password`,
  getApiIsGoogleLogin: (id:string) => `users/${id}/google`,
  apiKey: "orangeportfolio",
};
