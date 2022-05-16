import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import typeDefs from "./typeDefs.ts";
import resolvers from "./resolvers.ts";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export  default schema;
