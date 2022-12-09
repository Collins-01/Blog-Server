import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import DatabaseFileModel from './models/database-file.model';

@Injectable()
export default class DatabaseFilesRepository {
  constructor(private databaseService: DatabaseService) {}
  private table = 'DatabaseFiles';

  async uploadDatabaseFile(data: Buffer, fileName: string) {
    try {
      const response = await this.databaseService.runQuery(
        `
              INSERT INTO  ${this.table}
              
              (
                  data,
                  file_name
              )
              VALUES ( 
                  $1,
                  $2
              )
      
              RETURNING *
          `,
        [data, fileName],
      );
      if (!response.rows[0]) {
        throw new BadRequestException('');
      }
      return new DatabaseFileModel(response.rows[0]);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDatabaseFileById(id: number) {
    const response = await this.databaseService.runQuery(
      `
    SELECT *  FROM ${this.table}
    WHERE id = $1
    `,
      [id],
    );
    if (!response.rows[0]) {
      throw new NotFoundException();
    }
    return new DatabaseFileModel(response.rows[0]);
  }
}
