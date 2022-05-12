import { GenderEnum, RolEnum, StatusEnum } from "../enums";
import { IMovie } from "./index";
export interface IUser {
    id?: string;
    name: string;
    lastName: string;
    email?: string;
    password: string;
    rol?: RolEnum[];
    gender: GenderEnum;
    movies?: IMovie[];
    status?: StatusEnum;
}
//# sourceMappingURL=user.interface.d.ts.map