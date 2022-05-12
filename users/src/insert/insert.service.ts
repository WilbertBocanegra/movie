import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IResponse } from '@enthous/movie/interfaces';
import { userSchema, ValidationError } from '@enthous/movie/helpers';
import { InsertRepository } from '../repository/insert.repository';
import { InsertDto } from '../dto/insert.tdo';

@Injectable()
export class InsertService {
  constructor(private readonly insertRepository: InsertRepository) {}
  public async insert(data: InsertDto): Promise<IResponse> {
    try {
      await userSchema.validate(data);

      const user = await this.insertRepository.create(data);

      await this.insertRepository.persistAndFlush(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario creado con exito',
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
