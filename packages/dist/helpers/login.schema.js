"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const yup_1 = require("yup");
exports.loginSchema = (0, yup_1.object)({
    email: (0, yup_1.string)()
        .email("Violacion de segmento, el formato del correo es invalido")
        .required("El correo es requerido"),
    password: (0, yup_1.string)()
        .min(8, "El minimo de caracteres es de 8 para la contraseña")
        .required("La contraseña es requerida"),
});
