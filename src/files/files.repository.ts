import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';

@Injectable()
export default class FilesRepository {
  constructor(private databaseService: DatabaseService) {}

  async createFile() {}

  async deleteFile() {}
}
