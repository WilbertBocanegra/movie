import { object, SchemaOf, string } from "yup";
import { ILogin } from "../interfaces";

export const loginSchema: SchemaOf<ILogin> = object({
  email: string()
    .email("Violacion de segmento, el formato del correo es invalido")
    .required("El correo es requerido"),
  password: string()
    .min(8, "El minimo de caracteres es de 8 para la contraseña")
    .required("La contraseña es requerida"),
});
