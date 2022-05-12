import { IUser } from "./index";
export interface IMovie {
    id?: string;
    name: string;
    author: IUser;
    slug: string;
    description: string;
    cast?: IUser[];
}
//# sourceMappingURL=movie.interface.d.ts.map