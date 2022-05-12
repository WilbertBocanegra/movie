import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch, { Response } from 'node-fetch';
import { loginSchema, ValidationError } from '@enthous/movie/helpers';
import { IUser, IResponse, ILoginResponse } from '@enthous/movie/interfaces';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  public async login(
    email: string,
    password: string,
  ): Promise<IResponse<ILoginResponse>> {
    try {
      await loginSchema.validate({ email, password });

      const res: Response = await fetch(
        `${this.configService.get<string>('S_USER')}/find/user?email=${email}`,
      );

      const user: IResponse<IUser> = await res.json();

      if (user.statusCode === 401) throw new HttpException(user, res.status);

      const passwordCompare: Boolean = await compare(
        password,
        user.data.password,
      );

      if (!passwordCompare)
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Contraseña incorrecta',
            info: 'Bad Request',
          },
          HttpStatus.UNAUTHORIZED,
        );

      const token: string = this.jwtService.sign(user.data);

      return {
        statusCode: user.statusCode,
        data: {
          access_token: token,
          ...user.data,
        },
        info: user.info,
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

      if (err instanceof HttpException) {
        throw new HttpException(err.getResponse(), err.getStatus());
      }

      if (err instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            info: 'Internal Error Server',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
