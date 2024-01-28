import { createPool } from "mysql2/promise";

const connection = createPool({
  host: "orange-database-mysql-orange-database.a.aivencloud.com",
  port: 22848,
  user: "avnadmin",
  password: "AVNS_gnQyWkWNso2JtIqU0m9",
  database: "defaultdb", 
});

export default connection;
