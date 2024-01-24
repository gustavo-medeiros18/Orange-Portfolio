import { createPool } from 'mysql2/promise';

const connection = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'typeDB',
});

export default connection;