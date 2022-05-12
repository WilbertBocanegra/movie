import { JwtService } from '@nestjs/jwt';
import { IResponse } from '@enthous/movie';
export declare class ValidationService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    validation(access_token: string): Promise<IResponse<any>>;
}
