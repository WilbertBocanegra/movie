"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = void 0;
const yup_1 = require("yup");
exports.idSchema = (0, yup_1.object)({
    requireId: (0, yup_1.boolean)().default(true),
    id: (0, yup_1.string)().when("requireId", {
        is: true,
        then: (schema) => schema.required("El id es requerido"),
    }),
});
