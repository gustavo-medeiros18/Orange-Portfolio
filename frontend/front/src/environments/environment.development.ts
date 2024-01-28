export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/",
  apiRegister: "register",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  getApiUserId: (id: number) => `users/${id}`,
  getApiProjectId: (id: number) => `projects/${id}`
};
