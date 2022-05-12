import {
  Entity,
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
  EntityRepositoryType,
  ManyToOne,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserEntity } from './user.entity';
import { MovieRepository } from '../repository/movie.repository';

import { IMovie } from '@enthous/movie';

@Entity({ tableName: 'movies', customRepository: () => MovieRepository })
export class MovieEntity implements IMovie {
  [EntityRepositoryType]?: MovieRepository;
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Property()
  slug: string;

  @Property()
  description: string;

  @ManyToOne({ entity: () => UserEntity })
  author: UserEntity;

  @ManyToMany(() => UserEntity)
  cast? = new Collection<UserEntity, IMovie>(this);
}
