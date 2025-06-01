import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './entities.index';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'xproject',
  entities,
  synchronize: true, // ⚠️ usar apenas em desenvolvimento
};
