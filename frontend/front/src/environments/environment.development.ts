export const environment = {
  production: false,
  baseUrl: "https://hackathon-orange.onrender.com/",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  apiLoginGoogle: "loginGoogle",
  getApiUserId: (id: string) => `users/${id}`,
  getApiProjectId: (id: string) => `projects/${id}`,
  getApiProjectUserId: (id: string) => `projects/user/${id}`,
  apiKey: 'orangeportfolio',
};
