import { IMovie, IUser } from '@enthous/movie/interfaces';

export class MovieDto implements IMovie {
  name: string;
  author: IUser;
  slug: string;
  description: string;
  cast: IUser[];
}
