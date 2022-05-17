import { object, SchemaOf, string, array, mixed, boolean } from "yup";
import { GenderEnum, RolEnum, StatusEnum } from "../enums";
import { IUser } from "../interfaces";

export const userSchema: SchemaOf<IUser> = object({
  requireId: boolean().default(false),
  id: string().when("requireId", {
    is: true,
    then: (schema) => schema.required("El id es requerido"),
  }),
  name: string().required("El nombre es requerido"),
  lastName: string().required("El apellido es requerido"),
  requireEmail: boolean().default(true),
  email: string()
    .when("requireEmail", {
      is: true,
      then: (schema) =>
        schema
          .email("Formato de correo invalido")
          .required("El correo es requerido"),
    })
    .required("El correo es requerido"),
  password: string()
    .min(8, "El minimo de caracteres de contraseña es 8")
    .required("La contraseña es requerida"),
  rol: array()
    .of(mixed().oneOf(Object.values(RolEnum), "El rol seleccionado no existe"))
    .min(1, "Debe de tener minimo un rol"),
  gender: mixed()
    .oneOf(Object.values(GenderEnum), "El genero seleccionado no existe")
    .required("El genero es requerido"),
  movies: array(),
  status: mixed().oneOf(
    Object.values(StatusEnum),
    "El estatus seleccionado no existe"
  ),
});
