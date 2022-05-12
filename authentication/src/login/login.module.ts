import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'enthous',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    ConfigModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
