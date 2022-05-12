import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { IResponse } from '@enthous/movie/interfaces';
import { InsertRepository } from '../repository/insert.repository';
import { IUser } from '@enthous/movie';

@Injectable()
export class GetService {
  constructor(private readonly userRepository: InsertRepository) {}

  public async findAll(): Promise<IResponse<IUser[]>> {
    try {
      const users = await this.userRepository.findAll();

      return {
        statusCode: HttpStatus.OK,
        data: users,
        info: 'Sucessfully Request',
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

  public async findOne(query: {
    email: string;
    id: string;
  }): Promise<IResponse<IUser>> {
    try {
      const user = await this.userRepository.findOneOrFail(
        query.id ? { id: query.id } : { email: query.email },
        {
          failHandler: (_, where: IUser) =>
            new UnauthorizedException(
              `El usuario con el ${query.id ? 'id' : 'correo'} ${
                where.email || where.id
              } no existe`,
            ),
        },
      );

      return {
        statusCode: HttpStatus.OK,
        data: user,
        info: 'Sucessfully Request',
      };
    } catch (err) {
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
