import { createConnection } from "mysql2";

export const connection = createConnection({
  host: "app_host",
  user: "app_user",
  password: "app_password",
  database: "app_database",
  port: 3306,
});
