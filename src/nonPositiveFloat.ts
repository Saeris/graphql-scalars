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
    Joi.number().max(0),
    new TypeError(`Value is not a non-positive number: ${parsed}`)
  )
  Joi.assert(
    parsed,
    Joi.number()
      .negative()
      .allow(0),
    new TypeError(`Value is not a negative number: ${parsed}`)
  )
  return parsed
}

export const NonPositiveFloatScalar = `scalar NonPositiveFloat`

export const NonPositiveFloat = new GraphQLScalarType({
  name: `NonPositiveFloat`,

  description: `Floats that will have a value of 0 or less.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as non-positive floating point numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
