export const environment = {
  production: false,
  baseUrl: "https://hackathon-orange-juice-2024-production.up.railway.app/",
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
