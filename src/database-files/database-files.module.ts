import { Global, Module } from '@nestjs/common';
import { DatabaseFilesService } from './database-files.service';
import { DatabaseFilesController } from './database-files.controller';
import DatabaseFilesRepository from './database-files.repository';


@Global()
@Module({
  controllers: [DatabaseFilesController],
  providers: [DatabaseFilesService, DatabaseFilesRepository],
  exports: [DatabaseFilesService],
})
export class DatabaseFilesModule {}
