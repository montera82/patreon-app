import { gql } from "apollo-server-express"

export default  gql`
  scalar Date

  type User {
    id: ID
    name: String
    patreonEmail: String
    patreonPassword: String
    patreonLastScrap: Date
    patreon: [Patreon]
  }

  type Patreon {
    id: ID
    patrons: Int
    perMonth: Int
    userId: Int
  }

  type Query {
    users: [User]
    patreons: [Patreon]
  }

  input SignupInput {
    name: String!
    patreonEmail: String!
    patreonPassword: String!
  }

  type SignupResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    signup(input: SignupInput): MutationResponse
  }
`;