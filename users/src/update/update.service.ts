import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { IResponse, IUser } from '@enthous/movie/interfaces';
import { userSchema, ValidationError } from '@enthous/movie/helpers';
import { InsertRepository } from '../repository/insert.repository';

@Injectable()
export class UpdateService {
  constructor(private readonly userRepository: InsertRepository) {}
  public async update(id: string, data): Promise<IResponse> {
    try {
      await userSchema.validate({
        requireEmail: false,
        requireId: true,
        ...data,
        id,
      });

      const user = await this.userRepository.findOneOrFail(
        { id },
        {
          failHandler: (_, where: IUser) =>
            new UnauthorizedException(
              `El usuario con el id ${where.id} no existe`,
            ),
        },
      );

      const userUpdate = this.userRepository.assign(user, {
        email: user.email,
        ...data,
      });

      await this.userRepository.persistAndFlush(userUpdate);

      return {
        statusCode: HttpStatus.OK,
        message: 'Actualizado con exito',
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
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: err.message,
            info: 'Unauthorized',
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
