import { IResponse, ILoginResponse } from '@enthous/movie/interfaces';
import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(email: string, password: string): Promise<IResponse<ILoginResponse>>;
}
