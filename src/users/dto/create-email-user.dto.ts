import { ApiProperty } from "@nestjs/swagger";
import { Provider } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { truncate } from "fs/promises";

export class CreateEmailUserDto {
  

  @ApiProperty({
    name: 'Unique Email Address for each user..', 
    example : 'testing01@gmail.com',
    
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'First Name', 
    example : 'Micheal',
    
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;


  @ApiProperty({
    name: 'Last Name', 
    example : 'Scoffield',
    
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;



  @ApiProperty({
    name: 'My Password', 
    example : 'very strong password',
    
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  
  

 
  
 

}
