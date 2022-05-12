import { ConfigService } from '@nestjs/config';
import { IResponse, ILoginResponse } from '@enthous/movie/interfaces';
import { JwtService } from '@nestjs/jwt';
export declare class LoginService {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    login(email: string, password: string): Promise<IResponse<ILoginResponse>>;
}
