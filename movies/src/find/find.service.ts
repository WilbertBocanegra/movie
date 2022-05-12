import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { IMovie, IResponse } from '@enthous/movie';
import { MovieRepository } from '../repository/movie.repository';

@Injectable()
export class FindService {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async findOne(query: {
    id: string;
    slug: string;
  }): Promise<IResponse<IMovie>> {
    try {
      const movie = await this.movieRepository.findOneOrFail(
        query.id ? { id: query.id } : { slug: query.slug },
        {
          failHandler: (_, where: IMovie) =>
            new UnauthorizedException(
              `La pelicula con el ${query.id ? 'id' : 'slug'} ${
                where.slug || where.id
              } no existe`,
            ),
          populate: ['author', 'author.movies', 'cast', 'author.movies.cast'],
        },
      );

      return {
        statusCode: 200,
        data: movie,
        info: 'Successfully Request',
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: err.message,
            info: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (err instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            info: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  public async findAll(): Promise<IResponse<IMovie[]>> {
    try {
      const movies = await this.movieRepository.findAll({
        populate: ['cast', 'cast.movies', 'cast.movies.cast', 'author'],
      });

      return {
        statusCode: HttpStatus.OK,
        data: movies,
        info: 'Successfully Request',
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            info: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
