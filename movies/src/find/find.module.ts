import { Module } from '@nestjs/common';
import { FindController } from './find.controller';
import { FindService } from './find.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from '../entity/movie.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MovieEntity] })],
  controllers: [FindController],
  providers: [FindService],
})
export class FindModule {}
