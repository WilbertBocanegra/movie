import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { IMovie, IResponse, idSchema, ValidationError } from '@enthous/movie';

import { MovieRepository } from '../repository/movie.repository';

@Injectable()
export class DeleteService {
  constructor(private readonly movieRepository: MovieRepository) {}
  public async deleteMovie(id: string): Promise<IResponse> {
    try {
      await idSchema.validate({ id });

      const movie = await this.movieRepository.findOneOrFail(
        { id },
        {
          failHandler: (_, where: IMovie) =>
            new UnauthorizedException(
              `La pelicula con el id ${where.id} no existe`,
            ),
        },
      );

      await this.movieRepository.removeAndFlush(movie);

      return {
        statusCode: HttpStatus.OK,
        message: 'Pelicula fue eliminada con exito',
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

      if (err instanceof ValidationError) {
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
}
