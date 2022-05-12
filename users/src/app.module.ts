import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { InsertModule } from './insert/insert.module';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { GetModule } from './get/get.module';
import { UpdateModule } from './update/update.module';
import { DeleteModule } from './delete/delete.module';
@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entity/*.entity.js'],
      entitiesTs: ['./dist/entity/*.entity.ts'],
      type: 'mongo',
      dbName: 'movie',
      allowGlobalContext: true,
      metadataProvider: TsMorphMetadataProvider,
    }),
    InsertModule,
    GetModule,
    UpdateModule,
    DeleteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
