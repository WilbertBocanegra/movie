import { ConfigService } from '@nestjs/config';
import { SignUpDto } from '../dto/sign-up.dto';
import { IResponse } from '@enthous/movie/interfaces';
export declare class SignUpService {
    private readonly configService;
    constructor(configService: ConfigService);
    signUp(data: SignUpDto): Promise<IResponse>;
}
