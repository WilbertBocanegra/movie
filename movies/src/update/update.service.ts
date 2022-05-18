import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch, { Response } from 'node-fetch';
import {
  IResponse,
  IMovie,
  movieSchema,
  ValidationError,
  IUser,
} from '@enthous/movie';

import { MovieRepository } from '../repository/movie.repository';

@Injectable()
export class UpdateService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly configService: ConfigService,
  ) {}

  public async updateMovie(id: string, data: IMovie): Promise<IResponse> {
    try {
      await movieSchema.validate({ requireId: true, ...data, id });

      const findUser: Response = await fetch(
        `${this.configService.get<string>('S_USER')}/find/user?id=${
          data.author
        }`,
      );

      const user: IResponse<IUser> = await findUser.json();

      if (user.statusCode === HttpStatus.UNAUTHORIZED)
        throw new UnauthorizedException({
          statusCode: user.statusCode,
          message: 'El author no existe',
          info: user.info,
        });

      const movie = await this.movieRepository.findOneOrFail(
        { id },
        {
          failHandler: (_, where: IMovie) =>
            new UnauthorizedException(
              `La pelicula con el id ${where.id} no existe`,
            ),
        },
      );

      const movieUpdate = this.movieRepository.assign(movie, data);

      console.log(movieUpdate);

      await this.movieRepository.persistAndFlush(movieUpdate);

      return {
        statusCode: HttpStatus.OK,
        message: 'La pelicula se actualizo con exito',
        info: 'Successfully Request',
      };
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: err.message,
            info: 'Bad Request',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (err instanceof UnauthorizedException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: err.message,
            info: 'Unauthorized Request',
          },
          HttpStatus.UNAUTHORIZED,
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
