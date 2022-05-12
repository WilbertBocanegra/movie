import {
  Entity,
  Property,
  Enum,
  PrimaryKey,
  SerializedPrimaryKey,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { GenderEnum, IUser } from '@enthous/movie';
import { MovieEntity } from './movie.entity';

@Entity({ tableName: 'users' })
export class UserEntity implements IUser {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Property()
  lastName: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Enum(() => GenderEnum)
  gender: GenderEnum;

  @ManyToMany(() => MovieEntity)
  movies = new Collection<MovieEntity, IUser>(this);
}
