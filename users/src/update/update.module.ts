import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
