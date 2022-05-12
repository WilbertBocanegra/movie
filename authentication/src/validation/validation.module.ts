import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'enthous',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [ValidationController],
  providers: [ValidationService],
})
export class ValidationModule {}
