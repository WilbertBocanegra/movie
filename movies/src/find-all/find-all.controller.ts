import { Controller, Get } from '@nestjs/common';
import { FindAllService } from './find-all.service';

@Controller('find-all')
export class FindAllController {
  constructor(private readonly findAllService: FindAllService) {}
  @Get()
  public findAll() {
    return this.findAllService.findAll();
  }
}
