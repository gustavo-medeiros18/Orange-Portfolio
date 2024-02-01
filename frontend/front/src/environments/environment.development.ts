export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  apiLoginGoogle: "loginGoogle",
  getApiUserId: (id: string) => `users/${id}`,
  getApiProjectId: (id: string) => `projects/${id}`,
  getApiProjectUserId: (id: string) => `projects/user/${id}`,
  getApiUpdatePassword: (id: string) => `users/updatePassword/${id}`,
  apiKey: 'orangeportfolio',
};
