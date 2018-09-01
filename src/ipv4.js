import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.string(), new TypeError(`Value is not string: ${value}`))
  Joi.assert(value, Joi.string().ip({ version: `ipv4` }), new TypeError(`Value is not a valid IPv4 address: ${value}`))
  return value
}

export const IPv4Scalar = `scalar IPv4`

export const IPv4 = new GraphQLScalarType({
  name: `IPv4`,

  description: `A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as IPv4 addresses but got a: ${kind}`)
    }

    return validate(value)
  }
})
