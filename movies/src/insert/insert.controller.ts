import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { InsertService } from './insert.service';
import { IResponse } from '@enthous/movie';
import { MovieDto } from '../dto/movie.dto';

@Controller('movie')
export class InsertController {
  constructor(private readonly movieService: InsertService) {}

  @Post('insert')
  @HttpCode(HttpStatus.OK)
  public async insert(@Body() data: MovieDto): Promise<IResponse> {
    return this.movieService.insertMovie(data);
  }
}
