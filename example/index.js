import { ApolloServer } from "apollo-server"
import { makeExecutableSchema } from "graphql-tools"
import CustomScalars from "../pkg"
import { types } from "./types"
import { resolvers } from "./resolvers"
import { defaultQuery } from "./defaultQuery"

const host = process.env.HOSTNAME

const endpoint = host
  ? `https://${host.replace(`sse-sandbox-`, ``)}.sse.codesandbox.io`
  : `localhost:9000`

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
        endpoint,
        query: defaultQuery
      }
    ]
  }
})

/* eslint-disable */
server.listen({ host: `localhost`, port: 9000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
