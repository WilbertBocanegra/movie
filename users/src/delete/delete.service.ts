import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InsertRepository } from '../repository/insert.repository';
import { IResponse } from '@enthous/movie';
import { IUser } from '@enthous/movie/interfaces';
import { idSchema } from '@enthous/movie/helpers';
@Injectable()
export class DeleteService {
  constructor(private readonly userRepository: InsertRepository) {}

  public async deleteUser(id: string): Promise<IResponse> {
    try {
      await idSchema.validate({ id });

      const user = await this.userRepository.findOneOrFail(
        { id },
        {
          failHandler: (_, where: IUser) =>
            new UnauthorizedException(
              `El usuario con el id ${where.id} no existe`,
            ),
        },
      );

      await this.userRepository.removeAndFlush(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario eliminado con exito',
        info: 'Sucessfully Request',
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
}
