import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GetController } from './get.controller';
import { GetService } from './get.service';
import { UserEntity } from '../entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  controllers: [GetController],
  providers: [GetService],
})
export class GetModule {}
