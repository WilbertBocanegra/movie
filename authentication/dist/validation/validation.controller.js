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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationController = void 0;
const common_1 = require("@nestjs/common");
const validation_service_1 = require("./validation.service");
let ValidationController = class ValidationController {
    constructor(validationService) {
        this.validationService = validationService;
    }
    validation(access_token) {
        return this.validationService.validation(access_token);
    }
};
__decorate([
    (0, common_1.Get)('access'),
    __param(0, (0, common_1.Query)('access_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ValidationController.prototype, "validation", null);
ValidationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [validation_service_1.ValidationService])
], ValidationController);
exports.ValidationController = ValidationController;
//# sourceMappingURL=validation.controller.js.map