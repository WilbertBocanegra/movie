import { Controller, Delete, Query } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { IResponse } from '@enthous/movie';

@Controller('user')
export class DeleteController {
  constructor(private readonly deleteService: DeleteService) {}

  @Delete('config/delete')
  public deleteUser(@Query('id') id: string): Promise<IResponse> {
    return this.deleteService.deleteUser(id);
  }
}
