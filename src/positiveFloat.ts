import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import * as Joi from "@hapi/joi"

const validate = (value: string) => {
  Joi.assert(
    value,
    Joi.any().invalid(Infinity, -Infinity),
    new TypeError(`Value is not a finite number: ${value}`)
  )
  Joi.assert(
    value,
    Joi.number().required(),
    new TypeError(`Value is not a number: ${value}`)
  )
  const parsed = parseFloat(value)
  Joi.assert(
    parsed,
    Joi.number().positive(),
    new TypeError(`Value is not a positive number: ${parsed}`)
  )
  Joi.assert(
    parsed,
    Joi.number().greater(0),
    new TypeError(`Value is not greater than 0: ${parsed}`)
  )
  return parsed
}

export const PositiveFloatScalar = `scalar PositiveFloat`

export const PositiveFloat = new GraphQLScalarType({
  name: `PositiveFloat`,

  description: `Floats that will have a value greater than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as positive floating point numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
