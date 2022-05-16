import Mutation from "../mutation/index.ts";
import Query from "../query/index.ts";

const resolvers = {
  RolEnum: {
    USER: 0,
    ADMIN: 1,
  },

  Query,
  Mutation,
};

export default resolvers;
