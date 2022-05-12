import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Body,
} from '@nestjs/common';
import { IResponse, IMovie } from '@enthous/movie';
import { UpdateService } from './update.service';

@Controller('movie')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}
  @Post('config/update')
  @HttpCode(HttpStatus.OK)
  public updateMovie(
    @Query('id') id: string,
    @Body() data: IMovie,
  ): Promise<IResponse> {
    return this.updateService.updateMovie(id, data);
  }
}
