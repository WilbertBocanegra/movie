import { string, object, SchemaOf, boolean } from "yup";
export interface IId {
  id?: string;
}

export const idSchema: SchemaOf<IId> = object({
  requireId: boolean().default(true),
  id: string().when("requireId", {
    is: true,
    then: (schema) => schema.required("El id es requerido"),
  }),
});
