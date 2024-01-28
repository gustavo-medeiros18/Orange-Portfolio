export const environment = {
  production: false,
  baseUrl: "",
  apiRegister: "register",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  getApiUserId: (id: string) => `users/${id}`,
  getApiProjectId: (id: string) => `projects/${id}`
};
