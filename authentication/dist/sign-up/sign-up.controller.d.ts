import { SignUpService } from './sign-up.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { IResponse } from '@enthous/movie/interfaces';
export declare class SignUpController {
    private readonly signUpService;
    constructor(signUpService: SignUpService);
    signUp(data: SignUpDto): Promise<IResponse>;
}
