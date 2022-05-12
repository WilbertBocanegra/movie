import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from '../entity/movie.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MovieEntity] })],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
