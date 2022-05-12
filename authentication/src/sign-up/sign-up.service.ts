import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from '../dto/sign-up.dto';
import { IResponse } from '@enthous/movie/interfaces';
import fetch, { Response } from 'node-fetch';

@Injectable()
export class SignUpService {
  constructor(private readonly configService: ConfigService) {}
  public async signUp(data: SignUpDto): Promise<IResponse> {
    try {
      const res: Response = await fetch(
        `${this.configService.get<string>('S_USER')}/user/insert`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const user: IResponse = await res.json();

      return {
        statusCode: HttpStatus.OK,
        info: 'Successfully Request',
        message: user.message,
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
