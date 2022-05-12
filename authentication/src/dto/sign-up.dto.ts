import { IUser, GenderEnum } from '@enthous/movie';

export class SignUpDto implements IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  gender: GenderEnum;
}
