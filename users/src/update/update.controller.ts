import {
  Controller,
  Post,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UpdateService } from './update.service';
import { UserDto } from '../dto/user.dto';
import { IResponse } from '@enthous/movie/interfaces';

@Controller('user/config')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Post('update')
  @HttpCode(HttpStatus.OK)
  public update(
    @Query('id') id: string,
    @Body() data: UserDto,
  ): Promise<IResponse> {
    return this.updateService.update(id, data);
  }
}
