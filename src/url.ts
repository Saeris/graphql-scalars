import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import Joi from "@hapi/joi"

const validate = (value: string) => {
  Joi.assert(
    value,
    Joi.string(),
    new TypeError(`Value is not string: ${value}`)
  )
  Joi.assert(
    value,
    [Joi.string().uri(), Joi.string().dataUri()],
    new TypeError(`Value is not a valid URL: ${value}`)
  )
  return value
}

export const URLScalar = `scalar URL`

export const URL = new GraphQLScalarType({
  name: `URL`,

  description: `A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
