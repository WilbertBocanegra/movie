import { IUser } from "./index";

export interface IMovie {
  id?: string;
  name: string;
  author: IUser;
  slug: string;
  description: string;
  cast?: IUser[];
}

let user: IMovie;
