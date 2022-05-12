import { IMovie, IResponse } from '@enthous/movie';
import { Controller, Get, Query } from '@nestjs/common';
import { FindService } from './find.service';

@Controller('find')
export class FindController {
  constructor(private readonly findService: FindService) {}

  @Get('movie')
  public findOne(
    @Query() query: { id: string; slug: string },
  ): Promise<IResponse<IMovie>> {
    return this.findService.findOne(query);
  }

  @Get('movies')
  public findAll(): Promise<IResponse<IMovie[]>> {
    return this.findService.findAll();
  }
}
