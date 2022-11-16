import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  exports: [JwtAuthService,JwtModule],
  providers: [JwtAuthStrategy,JwtAuthService,UsersService],
  imports: [
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
    UsersModule
  ],
})
export class JwtAuthModule {}
