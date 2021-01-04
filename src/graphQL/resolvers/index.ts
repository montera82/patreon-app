import { GraphQLScalarType, Kind } from "graphql";
import UserService from '../services/User'
import PatreonService from '../services/Patreon'
import { MutationResponseInterface, PatreonInterface, SignupArgsInterface, UserInterface } from "../interfaces";

export default {
  Query: {
    users: async(_: any, __: any) => {
      return UserService.getUsers()
    },
    patreons: async(_: any, __: any) => {
      return PatreonService.getPatreons()      
    } 
  },

  User: {
    patreonEmail(parent: UserInterface){
      return parent.patreon_email
    },
    patreonPassword(parent: UserInterface){
      return parent.patreon_password
    },
    patreonLastScrap(parent: UserInterface){
      return parent.patreon_last_scrap
    },
    patreon: async(parent: UserInterface) => {
      return PatreonService.getUserPatreons(parent.id)
    }
  },

  Patreon: {
    perMonth(parent: PatreonInterface){
      return parent.per_month
    },
    userId(parent: PatreonInterface){
      return parent.user_id
    }
  },

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

  Mutation: {
    signup: async(_: any, args:SignupArgsInterface) => {
      return UserService.createUser(args.input)
    }
  },

  MutationResponse: {
    __resolveType(mutationResponse: MutationResponseInterface){
      if(mutationResponse.user){
        return 'SignupResponse'
      }
      return null
    }
  }
}