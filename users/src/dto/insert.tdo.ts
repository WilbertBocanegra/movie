import { IUser, IMovie } from '@enthous/movie/interfaces';
import { RolEnum, GenderEnum, StatusEnum } from '@enthous/movie/enums';

export class InsertDto implements IUser {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  rol?: RolEnum[];
  gender: GenderEnum;
  movies?: IMovie[];
  status?: StatusEnum;
}
