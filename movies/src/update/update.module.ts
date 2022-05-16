import { Module } from '@nestjs/common';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MovieEntity } from '../entity/movie.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature({ entities: [MovieEntity] }),
  ],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
