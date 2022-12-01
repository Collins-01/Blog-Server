import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class EmailScheduleDto {
  @IsEmail()
  recipients: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  date: string;
}
