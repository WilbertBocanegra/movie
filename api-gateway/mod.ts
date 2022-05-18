import {
  Application,
  Router,
  Context,
  Request,
} from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { applyGraphQL } from "https://deno.land/x/oak_graphql@0.6.3/mod.ts";
import resolvers from "./src/schema/resolvers.ts";
import typeDefs from "./src/schema/typeDefs.ts";

const app = new Application();

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs,
  resolvers,
  settings: {},
  /*context: async ({ request }) => {
    const tokenRegex = /Bearer \w/g;

    const header = request.headers.get("authorization") || null;

    if (!header || !tokenRegex.test(header))
      throw new Error("Violacion de segmento token");

    const token = header.replace("Bearer ", "");

    const res = await fetch(
      `http://localhost:3000/auth/access?access_token=${token}`
    );
    const data = await res.json();

    if (data.statusCode === 401 || data.statusCode === 500)
      throw new Error(data.message);

    return { data: data.data.id };
  },*/
});
app.use(oakCors()); // Enable CORS for All Routes

app.use(GraphQLService.routes());

console.log("Server start at http://localhost:3005");

console.log("hola")

await app.listen({ port: 3005 });
