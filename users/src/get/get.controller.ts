import { Controller, Post, Res, Body, Get, Param, Query } from '@nestjs/common';
import { IResponse, IUser } from '@enthous/movie/interfaces';
import { GetService } from './get.service';

@Controller('find')
export class GetController {
  constructor(private readonly getUserService: GetService) {}

  @Get('users')
  public findAll(): Promise<IResponse<IUser[]>> {
    return this.getUserService.findAll();
  }

  @Get('user')
  public findOne(
    @Query() query: { email: string; id: string },
  ): Promise<IResponse<IUser>> {
    return this.getUserService.findOne(query);
  }
}
