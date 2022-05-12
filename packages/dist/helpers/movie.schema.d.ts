import { SchemaOf } from "yup";
interface IMovie {
    name: string;
    author: string;
    slug: string;
    description: string;
    cast?: any;
}
export declare const movieSchema: SchemaOf<IMovie>;
export {};
//# sourceMappingURL=movie.schema.d.ts.map