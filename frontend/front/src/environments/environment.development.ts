export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  getApiUserId: (id: number) => `users/${id}`,
  getApiProjectId: (id: number) => `projects/${id}`,
  getApiProjectUserId: (id:number) => `projects/user/${id}`
};
