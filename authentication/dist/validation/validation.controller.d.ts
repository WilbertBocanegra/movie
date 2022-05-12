import { IResponse } from '@enthous/movie';
import { ValidationService } from './validation.service';
export declare class ValidationController {
    private readonly validationService;
    constructor(validationService: ValidationService);
    validation(access_token: string): Promise<IResponse<any>>;
}
