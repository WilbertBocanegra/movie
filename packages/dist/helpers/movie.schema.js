"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const yup_1 = require("yup");
exports.movieSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().required("El nombre de la pelicula es requerida"),
    author: (0, yup_1.string)().required("El autor de la pelicula es requerida"),
    slug: (0, yup_1.string)().required("El nombre para buscar la pelicula es requerida"),
    description: (0, yup_1.string)().required("La descripcion de la pelicula es requerida"),
    cast: (0, yup_1.array)().compact().of((0, yup_1.string)()).label("Violacion de segmento de array"),
});
