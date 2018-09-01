import { GraphQLScalarType } from "graphql"
import { GraphQLError } from "graphql/error"
import { Kind } from "graphql/language"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.any().invalid(Infinity, -Infinity), new TypeError(`Value is not a finite number: ${value}`))
  Joi.assert(value, Joi.number().required(), new TypeError(`Value is not a number: ${value}`))
  const parsed = parseInt(value, 10)
  Joi.assert(parsed, Joi.number().integer(), new TypeError(`Value is not a safe integer: ${parsed}`))
  Joi.assert(parsed, Joi.number().integer(), new TypeError(`Value is not an integer: ${parsed}`))
  Joi.assert(parsed, Joi.number().negative(), new TypeError(`Value is not a negative number: ${parsed}`))
  Joi.assert(parsed, Joi.number().less(0), new TypeError(`Value is not less than 0: ${parsed}`))
  return parsed
}

export const NegativeIntScalar = `scalar NegativeInt`

export const NegativeInt = new GraphQLScalarType({
  name: `NegativeInt`,

  description: `Integers that will have a value less than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as negative integers but got a: ${kind}`)
    }

    return validate(value)
  }
})
