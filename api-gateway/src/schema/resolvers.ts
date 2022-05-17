import Mutation from "../mutation/index.ts";
import Query from "../query/index.ts";

const resolvers = {
  RolEnum: {
    USER: 0,
    ADMIN: 1,
  },
  GenderEnum: {
    WOMEN: 0,
    MEN: 1,
  },
  StatusEnum: {
    DISABLED: 0,
    ACTIVE: 1,
  },
  Query,
  Mutation,
};

export default resolvers;
