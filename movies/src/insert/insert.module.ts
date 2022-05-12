import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { InsertController } from './insert.controller';
import { InsertService } from './insert.service';
import { MovieEntity } from '../entity/movie.entity';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature({ entities: [MovieEntity] }),
  ],
  controllers: [InsertController],
  providers: [InsertService],
})
export class InsertModule {}
