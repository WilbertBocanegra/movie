import { EntityRepository } from '@mikro-orm/mongodb';
import { UserEntity } from '../entity/user.entity';

export class InsertRepository extends EntityRepository<UserEntity> {}
