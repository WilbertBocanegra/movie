import { createMovie, removeMovie, updateMovie } from "./movie.ts";
import { signUp } from "../auth/index.ts";

const Mutation = { signUp, createMovie, removeMovie, updateMovie };

export default Mutation;
