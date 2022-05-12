import { IUser } from "./user.interface";

export interface ILoginResponse extends IUser {
  access_token: string;
}
