import { Module } from '@nestjs/common';
import { DeleteController } from './delete.controller';
import { DeleteService } from './delete.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from '../entity/movie.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MovieEntity] })],
  controllers: [DeleteController],
  providers: [DeleteService],
})
export class DeleteModule {}
