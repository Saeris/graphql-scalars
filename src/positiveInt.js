import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import * as Joi from "@hapi/joi"

const validate = value => {
  Joi.assert(value, Joi.any().invalid(Infinity, -Infinity), new TypeError(`Value is not a finite number: ${value}`))
  Joi.assert(value, Joi.number().required(), new TypeError(`Value is not a number: ${value}`))
  const parsed = parseInt(value, 10)
  Joi.assert(parsed, Joi.number().integer(), new TypeError(`Value is not an integer: ${parsed}`))
  Joi.assert(parsed, Joi.number().positive(), new TypeError(`Value is not a positive number: ${parsed}`))
  Joi.assert(parsed, Joi.number().greater(0), new TypeError(`Value is not greater than 0: ${parsed}`))
  return parsed
}

export const PositiveIntScalar = `scalar PositiveInt`

export const PositiveInt = new GraphQLScalarType({
  name: `PositiveInt`,

  description: `Integers that will have a value greater than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as positive integers but got a: ${kind}`)
    }

    return validate(value)
  }
})
