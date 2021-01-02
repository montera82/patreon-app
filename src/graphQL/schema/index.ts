import { gql } from "apollo-server-express"
import { GraphQLScalarType, Kind } from "graphql";

export const typeDefs =  gql`
  scalar Date

  type User {
    id: ID
    name: String
    patreon_email: String
    patreon_password: String
    patreon_last_scrap: Date
  }

  type Query {
    users: [User]
  }
`;

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
}