import { Injectable } from '@nestjs/common';
import DatabaseFilesRepository from './database-files.repository';

@Injectable()
export class DatabaseFilesService {
  constructor(private databaseFilesRepository: DatabaseFilesRepository) {}
  async uploadDatabaseFiles(data: Buffer, fileName: string) {
    return await this.databaseFilesRepository.uploadDatabaseFile(
      data,
      fileName,
    );
  }

  async getDatabaseFileById(id: number) {
    return await this.databaseFilesRepository.getDatabaseFileById(id);
  }
}
