import { Module } from '@nestjs/common';
import { FindAllService } from './find-all.service';
import { FindAllController } from './find-all.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from '../entity/movie.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MovieEntity] })],
  providers: [FindAllService],
  controllers: [FindAllController],
})
export class FindAllModule {}
