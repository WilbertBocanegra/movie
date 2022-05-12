import { IResponse } from '@enthous/movie';
import { Controller, Get, Query } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Controller('auth')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get('access')
  public validation(
    @Query('access_token') access_token: string,
  ): Promise<IResponse<any>> {
    return this.validationService.validation(access_token);
  }
}
