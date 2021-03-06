import express from 'express'
import routes from './api/index'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphQL/schema'
import resolvers from './graphQL/resolvers'

const PORT = process.env.PORT
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
})

server.applyMiddleware({app})

app.use(routes)

app.listen({port: PORT}, () => {
  console.log(`🚀 API Server ready at http://localhost:${PORT}`)
  console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})