"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
let ValidationService = class ValidationService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async validation(access_token) {
        try {
            const data = await this.jwtService.verify(access_token);
            return {
                statusCode: common_1.HttpStatus.OK,
                data,
                info: 'Successfully Request',
            };
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Credenciales de acceso invalido',
                    info: 'Unauthorized',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            if (err instanceof Error) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err.message,
                    info: 'Internal Error Server',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
        }
    }
};
ValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ValidationService);
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map