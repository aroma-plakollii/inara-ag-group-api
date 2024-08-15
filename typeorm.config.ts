// typeorm.config.ts
import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  entities: [__dirname + '/entity/*.ts'], // Path to your entity files
  synchronize: true, // Automatically creates database schema based on entities
  logging: true, // Enable logging (optional)
  cache: false,
};

export default connectionOptions;
