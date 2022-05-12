import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IResponse, IUser } from '@enthous/movie';
import { ConfigService } from '@nestjs/config';
import fetch, { Response } from 'node-fetch';
import { movieSchema, ValidationError } from '@enthous/movie/helpers';
import { MovieRepository } from '../repository/movie.repository';
import { MovieDto } from '../dto/movie.dto';

@Injectable()
export class InsertService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly configService: ConfigService,
  ) {}
  public async insertMovie(data: MovieDto): Promise<IResponse> {
    try {
      await movieSchema.validate(data);

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

      const movie = this.movieRepository.create(data);

      await this.movieRepository.persistAndFlush(movie);

      await fetch(
        `${this.configService.get<string>('S_USER')}/user/config/update?id=${
          user.data.id
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...user.data,
            movies: [...user.data.movies, movie],
          }),
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Pelicula creada con exito',
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
          HttpStatus.BAD_REQUEST,
        );
      }
      if (err instanceof UnauthorizedException) {
        throw new HttpException(err.getResponse(), HttpStatus.UNAUTHORIZED);
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
