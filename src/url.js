import { GraphQLScalarType } from "graphql"
import { GraphQLError } from "graphql/error"
import { Kind } from "graphql/language"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.string(), new TypeError(`Value is not string: ${value}`))
  Joi.assert(value, [Joi.string().uri(), Joi.string().dataUri()], new TypeError(`Value is not a valid URL: ${value}`))
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

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as URLs but got a: ${kind}`)
    }

    return validate(value)
  }
})
