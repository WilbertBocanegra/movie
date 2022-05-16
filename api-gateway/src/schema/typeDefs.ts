import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import { expandGlobSync } from "https://deno.land/std@0.136.0/fs/mod.ts";

const loadFiles = (path: string) => {
  const file = expandGlobSync(path);
  let typeDefs: any[] = [];

  Array.from(file, (file) => {
    const decoder = new TextDecoder("utf-8");

    const readFile = Deno.readFileSync(file.path);

    typeDefs = [
      ...typeDefs,
      gql`
        ${decoder.decode(readFile)}
      `,
    ];
  });

  return typeDefs;
};

const typeDefs = loadFiles("**/graphql/**/*.{graphql,gql}");

export default typeDefs;
