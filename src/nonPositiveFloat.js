import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.any().invalid(Infinity, -Infinity), new TypeError(`Value is not a finite number: ${value}`))
  Joi.assert(value, Joi.number().required(), new TypeError(`Value is not a number: ${value}`))
  const parsed = parseFloat(value)
  Joi.assert(parsed, Joi.number().max(0), new TypeError(`Value is not a non-positive number: ${parsed}`))
  Joi.assert(parsed, Joi.number().negative().allow(0), new TypeError(`Value is not a negative number: ${parsed}`))
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

  parseLiteral({ kind, value }) {
    if (kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as non-positive floating point numbers but got a: ${kind}`
      )
    }

    return validate(value)
  }
})
