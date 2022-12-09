import { ApiProperty } from "@nestjs/swagger";
import { Provider } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { truncate } from "fs/promises";

export class CreateEmailUserDto {
  @IsNotEmpty()
  @IsEmail()

  @ApiProperty({
    name: 'Unique Email Address for each user..', 
    example : 'testing01@gmail.com',
    deprecated: true
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  
  

 
  
 

}
