import { DataSource } from 'typeorm';
import { Lead } from './entities/Lead';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || 'password',
password: process.env.DB_PASSWORD || 'vergara123456',
//   database: process.env.DB_NAME || 'brighte_eats',
database: process.env.DB_NAME || 'postgres',
  synchronize: true, // Set to false in production
  logging: process.env.NODE_ENV === 'development',
  entities: [Lead],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});