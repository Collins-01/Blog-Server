import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import UserModel from './models/user.model';

@Injectable()
export default class UsersRepository {
  table = 'users';
  constructor(private readonly databaseService: DatabaseService) {}

  async createEmailUser(dto: CreateEmailUserDto) {
    const emailVerified: boolean = false;
    const social: boolean = false;
    const response = await this.databaseService.runQuery(
      `
    INSERT INTO  ${this.table} ( 
        email,
        hash,
        first_name,
        last_name,
        is_social_auth,
        is_email_verified
    )

    VALUES ($1, $2,$3, $4, $5, $6)

    RETURNING *
    `,
      [
        dto.email,
        dto.password,
        dto.firstName,
        dto.lastName,
        social,
        emailVerified,
      ],
    );

    return new UserModel(response.rows[0]);
  }

  async getUserByID(id: string) {
    const response = await this.databaseService.runQuery(
      `
     SELECT * FROM ${this.table} 
     WHERE  id = $1 
    `,
      [id],
    );
    if (!response.rows) {
      throw new NotFoundException();
    }
    return new UserModel(response.rows[0]);
  }
  async getUserByEmail(email: string) {
    const response = await this.databaseService.runQuery(
      `
     SELECT * FROM ${this.table} 
     WHERE  email = $1 
    `,
      [email],
    );
    if (!response.rows) {
      throw new NotFoundException();
    }
    return new UserModel(response.rows[0]);
  }
}
