import { IResponse, ILoginResponse } from '@enthous/movie/interfaces';
import { Controller, Get, Query } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  public login(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<IResponse<ILoginResponse>> {
    return this.loginService.login(email, password);
  }
}
