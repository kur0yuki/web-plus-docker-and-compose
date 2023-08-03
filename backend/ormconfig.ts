import { DataSource } from 'typeorm';
require('dotenv').config({path: '.env'});

const { DATABASE_URL, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_SCHEMA } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATABASE_URL,
  port: +DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  schema: DATABASE_SCHEMA,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
