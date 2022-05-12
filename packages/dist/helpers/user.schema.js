"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const yup_1 = require("yup");
const enums_1 = require("../enums");
exports.userSchema = (0, yup_1.object)({
    requireId: (0, yup_1.boolean)().default(false),
    id: (0, yup_1.string)().when("activeId", {
        is: true,
        then: (schema) => schema.required("El id es requerido"),
    }),
    name: (0, yup_1.string)().required("El nombre es requerido"),
    lastName: (0, yup_1.string)().required("El apellido es requerido"),
    requireEmail: (0, yup_1.boolean)().default(true),
    email: (0, yup_1.string)()
        .email("Formato de correo invalido")
        .when({
        is: true,
        then: (schema) => schema.required("El correo es requerido"),
    }),
    password: (0, yup_1.string)()
        .min(8, "El minimo de caracteres de contraseña es 8")
        .required("La contraseña es requerida"),
    rol: (0, yup_1.array)()
        .of((0, yup_1.mixed)().oneOf(Object.values(enums_1.RolEnum), "El rol seleccionado no existe"))
        .min(1, "Debe de tener minimo un rol"),
    gender: (0, yup_1.mixed)()
        .oneOf(Object.values(enums_1.GenderEnum), "El genero seleccionado no existe")
        .required("El genero es requerido"),
    movies: (0, yup_1.array)(),
    status: (0, yup_1.mixed)().oneOf(Object.values(enums_1.StatusEnum), "El estatus seleccionado no existe"),
});
