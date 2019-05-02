import { ApolloServer } from "apollo-server"
import { makeExecutableSchema } from "graphql-tools"
import CustomScalars from "../pkg"
import { types } from "./types"
import { resolvers } from "./resolvers"
import { defaultQuery } from "./defaultQuery"

const endpoint = {
  host: `localhost`,
  port: 4000
}

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [...types, ...CustomScalars.keys()],
    resolvers: {
      ...resolvers,
      ...CustomScalars.values()
    }
  }),
  playground: {
    tabs: [
      {
        endpoint: `${endpoint.host}:${endpoint.port}`,
        query: defaultQuery
      }
    ]
  }
})

/* eslint-disable */
server.listen(endpoint).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
