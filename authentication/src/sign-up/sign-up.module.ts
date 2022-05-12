import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';

@Module({
  imports: [ConfigModule],
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
