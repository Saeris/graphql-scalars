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
    Joi.string().guid(),
    new TypeError(`Value is not a valid GUID: ${value}`)
  )
  return value
}

export const GUIDScalar = `scalar GUID`

export const GUID = new GraphQLScalarType({
  name: `GUID`,

  description: `A field whose value is a generic Globally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as GUIDs but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})