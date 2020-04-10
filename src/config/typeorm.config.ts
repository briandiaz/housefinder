require('dotenv/config');
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { RDS_PORT, RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME, SYNC_ORM } = process.env;

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: RDS_HOSTNAME,
  port: parseInt(RDS_PORT, 10) || 5432,
  username: RDS_USERNAME,
  password: RDS_PASSWORD,
  database: RDS_DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  subscribers: [__dirname + '/../**.module/*-subscriber.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: SYNC_ORM === 'true',
};
