import { object, string, SchemaOf, array, mixed, boolean } from "yup";

interface IMovie {
  id?: string;
  name: string;
  author: string;
  slug: string;
  description: string;
  cast?: any;
}

export const movieSchema: SchemaOf<IMovie> = object({
  requireId: boolean().default(false),
  id: string().when("requireId", {
    is: true,
    then: (schema) => schema.required("El id es requerido"),
  }),
  name: string().required("El nombre de la pelicula es requerida"),
  author: string().required("El autor de la pelicula es requerida"),
  slug: string().required("El nombre para buscar la pelicula es requerida"),
  description: string().required("La descripcion de la pelicula es requerida"),
  cast: array().compact().of(string()).label("Violacion de segmento de array"),
});
