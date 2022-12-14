import { Global, Module } from '@nestjs/common';
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from './database.module-definition';

import { Pool } from 'pg';
import DatabaseService from './database.service';
import DatabaseOptions from './database-options';

@Global()
@Module({
  exports: [DatabaseService],
  providers: [
    DatabaseService,
    //* Creating Pool as a provider for the Database Module. 
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
        });
      },
    },
  ],
})
export default class DatabaseModule extends ConfigurableDatabaseModule {}

