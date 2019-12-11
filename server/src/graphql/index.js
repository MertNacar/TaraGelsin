import { buildSchema } from "graphql";
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

export { root, schema }