import { ApolloServer } from "apollo-server"
import { makeExecutableSchema } from "graphql-tools"
import CustomScalars from "@saeris/graphql-scalars"
import { types } from "./types"
import { resolvers } from "./resolvers"

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      ...types,
      ...CustomScalars.keys()
    ],
    resolvers: {
      ...resolvers,
      ...CustomScalars.values()
    }
  })
})

/* eslint-disable */
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
