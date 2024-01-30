export const environment = {
  production: false,
  baseUrl: "https://hackathon-orange.onrender.com/",
  apiAuthenticate: "login",
  apiUsers: "users",
  apiProjects: "projects",
  apiLoginGoogle: "loginGoogle",
  getApiUserId: (id: number) => `users/${id}`,
  getApiProjectId: (id: number) => `projects/${id}`,
  getApiProjectUserId: (id:number) => `projects/user/${id}`,
  apiKey: 'orangeportfolio',
};
