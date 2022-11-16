import { Provider } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmailUserDto {
  @IsNotEmpty()
  @IsEmail()
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
