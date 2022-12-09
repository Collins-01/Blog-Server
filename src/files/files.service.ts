import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import FilesRepository from './files.repository';

@Injectable()
export class FilesService {
  constructor(
    private config: ConfigService,
    private filesRepository: FilesRepository,
  ) {}

  async uploadPublicFile(data: Buffer, fileName: string) {
    const s3 = new S3();
    const result = await s3
      .upload({
        Bucket: '',
        Key: `${uuid()}-${fileName}`,
        Body: data,
      })
      .promise();

    await this.filesRepository.createFile(result.Key, result.Location);

    return {
      key: result.Key,
      url: result.Location,
    };
  }
}
