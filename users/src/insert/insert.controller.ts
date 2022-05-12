import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InsertService } from './insert.service';
import { InsertDto } from '../dto/insert.tdo';
import { IResponse } from '@enthous/movie/interfaces';

@Controller('user')
export class InsertController {
  constructor(private readonly InsertService: InsertService) {}

  @Post('insert')
  @HttpCode(HttpStatus.OK)
  public insert(@Body() data: InsertDto): Promise<IResponse> {
    return this.InsertService.insert(data);
  }
}
