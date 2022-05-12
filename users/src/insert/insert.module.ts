import { Module } from '@nestjs/common';
import { InsertController } from './insert.controller';
import { InsertService } from './insert.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  controllers: [InsertController],
  providers: [InsertService],
})
export class InsertModule {}
