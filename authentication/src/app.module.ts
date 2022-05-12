import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { SignUpModule } from './sign-up/sign-up.module';
import { ValidationModule } from './validation/validation.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'enthous',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    ConfigModule.forRoot(),
    LoginModule,
    SignUpModule,
    ValidationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
