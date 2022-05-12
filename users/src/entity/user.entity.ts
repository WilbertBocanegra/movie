import {
  Entity,
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
  Enum,
  EntityRepositoryType,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { InsertRepository } from '../repository/insert.repository';
import { IUser } from '@enthous/movie/interfaces';
import { GenderEnum, RolEnum, StatusEnum } from '@enthous/movie/enums';
import { hashSync } from 'bcryptjs';

@Entity({ tableName: 'users', customRepository: () => InsertRepository })
export class UserEntity implements IUser {
  constructor(password: string, email: string, name: string, lastName: string) {
    this.password = hashSync(password, 10);
    this.email = email.toLowerCase();
    this.name = name.toLowerCase();
    this.lastName = lastName.toLowerCase();
  }
  [EntityRepositoryType]?: InsertRepository;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property({ onUpdate: (entity: IUser) => entity.name.toLowerCase() })
  name: string;

  @Property({ onUpdate: (entity: IUser) => entity.lastName.toLowerCase() })
  lastName: string;

  @Property({ onUpdate: (entity: IUser) => entity.email.toLowerCase() })
  email: string;

  @Property({ onUpdate: (entity: IUser) => hashSync(entity.password, 10) })
  password: string;

  @Enum(() => GenderEnum)
  gender: GenderEnum;

  @Enum({ default: [RolEnum.USER] })
  rol = [RolEnum.USER];

  @Property({ default: [] })
  movies? = [];

  @Enum({ default: StatusEnum.ACTIVE })
  status = StatusEnum.ACTIVE;
}
