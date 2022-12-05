import { Module } from '@nestjs/common';
import FilesRepository from './files.repository';
import { FilesService } from './files.service';

@Module({
  exports: [FilesService],
  providers: [FilesService,FilesRepository],
})
export class FilesModule {}
