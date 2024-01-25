import { createPool } from "mysql2/promise";

const connection = createPool({
  host: "mysql-db",
  port: 3306,
  user: "app_user",
  password: "app_password",
  database: "app_database",
});

export default connection;
