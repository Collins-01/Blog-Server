import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import  UsersService  from 'src/users/users.service';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  exports: [JwtAuthService,JwtModule],
  providers: [UsersService,JwtAuthStrategy,JwtAuthService],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRES_IN'),
            
          },
        };
      },
      inject: [ConfigService],
    }),
   
  ],
})
export class JwtAuthModule {}
