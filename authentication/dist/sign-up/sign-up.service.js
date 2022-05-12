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
exports.SignUpService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_fetch_1 = require("node-fetch");
let SignUpService = class SignUpService {
    constructor(configService) {
        this.configService = configService;
    }
    async signUp(data) {
        try {
            const res = await (0, node_fetch_1.default)(`${this.configService.get('S_USER')}/user/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const user = await res.json();
            return {
                statusCode: common_1.HttpStatus.OK,
                info: 'Successfully Request',
                message: user.message,
            };
        }
        catch (err) {
            if (err instanceof Error) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err.message,
                    info: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
SignUpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SignUpService);
exports.SignUpService = SignUpService;
//# sourceMappingURL=sign-up.service.js.map