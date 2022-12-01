import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import  UsersService  from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtService,UsersService],
  imports:[
    JwtAuthModule,
    PassportModule.register({ defaultStrategy: ['jwt', 'google'] }),
    UsersModule,
    
  ]
})
export class AuthModule {}
