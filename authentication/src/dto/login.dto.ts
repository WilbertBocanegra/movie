import { ILogin } from '@enthous/movie/interfaces';

export class LoginDto implements ILogin {
  email: string;
  password: string;
}
