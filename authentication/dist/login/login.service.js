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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
const helpers_1 = require("@enthous/movie/helpers");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let LoginService = class LoginService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        try {
            await helpers_1.loginSchema.validate({ email, password });
            const res = await (0, node_fetch_1.default)(`${this.configService.get('S_USER')}/find/user?email=${email}`);
            const user = await res.json();
            if (user.statusCode === 401)
                throw new common_1.HttpException(user, res.status);
            const passwordCompare = await (0, bcryptjs_1.compare)(password, user.data.password);
            if (!passwordCompare)
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Contraseña incorrecta',
                    info: 'Bad Request',
                }, common_1.HttpStatus.UNAUTHORIZED);
            const token = this.jwtService.sign(user.data);
            return {
                statusCode: user.statusCode,
                data: Object.assign({ access_token: token }, user.data),
                info: user.info,
            };
        }
        catch (err) {
            if (err instanceof helpers_1.ValidationError) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: err.message,
                    info: 'Bad Request',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (err instanceof common_1.HttpException) {
                throw new common_1.HttpException(err.getResponse(), err.getStatus());
            }
            if (err instanceof Error) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err.message,
                    info: 'Internal Error Server',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map