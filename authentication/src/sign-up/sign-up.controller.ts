import { Controller, Body, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { IResponse } from '@enthous/movie/interfaces';

@Controller('auth')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('sign-up')
  public async signUp(@Body() data: SignUpDto): Promise<IResponse> {
    return this.signUpService.signUp(data);
  }
}
