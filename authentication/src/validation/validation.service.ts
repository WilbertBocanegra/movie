import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { IResponse } from '@enthous/movie';

@Injectable()
export class ValidationService {
  constructor(private readonly jwtService: JwtService) {}
  public async validation(access_token: string): Promise<IResponse<any>> {
    try {
      const data = await this.jwtService.verify(access_token);

      return {
        statusCode: HttpStatus.OK,
        data,
        info: 'Successfully Request',
      };
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Credenciales de acceso invalido',
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
            info: 'Internal Error Server',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
