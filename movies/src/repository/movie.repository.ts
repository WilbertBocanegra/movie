import { EntityRepository } from '@mikro-orm/mongodb';
import { MovieEntity } from '../entity/movie.entity';

export class MovieRepository extends EntityRepository<MovieEntity> {}
