import { Module } from '@nestjs/common';
import { FindBySlugService } from './find-by-slug.service';
import { FindBySlugController } from './find-by-slug.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from '../entity/movie.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MovieEntity] })],
  providers: [FindBySlugService],
  controllers: [FindBySlugController],
})
export class FindBySlugModule {}
