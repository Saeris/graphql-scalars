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
    Joi.string().hex(),
    new TypeError(`Value is not a valid hexadecimal value: ${value}`)
  )
  return value
}

export const HexadecimalScalar = `scalar Hexadecimal`

export const Hexadecimal = new GraphQLScalarType({
  name: `Hexadecimal`,

  description: `A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as a hexadecimal but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
