import { login } from "../auth/index.ts";
import { findAll } from "../movie/find.movie.ts";
import { findAllUser } from "../user/findAllUser.ts";

const Query = {
  login,

  findAll,
  findAllUser,

};

export default Query;
