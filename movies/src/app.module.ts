import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ConfigModule } from '@nestjs/config';
import { InsertModule } from './insert/insert.module';
import { FindAllModule } from './find-all/find-all.module';
import { FindBySlugModule } from './find-by-slug/find-by-slug.module';
import { FindModule } from './find/find.module';
import { DeleteModule } from './delete/delete.module';
import { UpdateModule } from './update/update.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: ['./dist/entity/*.entity.js'],
      entitiesTs: ['./dist/entity/*.entity.ts'],
      type: 'mongo',
      dbName: 'movie',
      allowGlobalContext: true,
      metadataProvider: TsMorphMetadataProvider,
    }),
    InsertModule,
    FindAllModule,
    FindBySlugModule,
    FindModule,
    DeleteModule,
    UpdateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
