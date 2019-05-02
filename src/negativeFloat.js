import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import * as Joi from "@hapi/joi"

const validate = value => {
  Joi.assert(value, Joi.any().invalid(Infinity, -Infinity), new TypeError(`Value is not a finite number: ${value}`))
  Joi.assert(value, Joi.number().required(), new TypeError(`Value is not a number: ${value}`))
  const parsed = parseFloat(value)
  Joi.assert(parsed, Joi.number().negative(), new TypeError(`Value is not a negative number: ${parsed}`))
  Joi.assert(parsed, Joi.number().less(0), new TypeError(`Value is not less than 0: ${parsed}`))
  return parsed
}

export const NegativeFloatScalar = `scalar NegativeFloat`

export const NegativeFloat = new GraphQLScalarType({
  name: `NegativeFloat`,

  description: `Floats that will have a value less than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as negative floating point numbers but got a: ${kind}`
      )
    }

    return validate(value)
  }
})
