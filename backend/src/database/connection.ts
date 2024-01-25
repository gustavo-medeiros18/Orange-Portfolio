import { createConnection } from "mysql2";

export const connection = createConnection({
  host: "localhost",
  user: "app_user",
  password: "app_password",
  database: "app_database",
  port: 3306,
});
