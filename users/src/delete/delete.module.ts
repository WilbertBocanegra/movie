import { Module } from '@nestjs/common';
import { DeleteController } from './delete.controller';
import { DeleteService } from './delete.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  controllers: [DeleteController],
  providers: [DeleteService],
})
export class DeleteModule {}
