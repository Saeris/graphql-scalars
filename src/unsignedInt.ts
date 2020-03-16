import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import Joi from "@hapi/joi"

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
  const parsed = parseInt(value, 10)
  Joi.assert(
    parsed,
    Joi.number().integer(),
    new TypeError(`Value is not an integer: ${parsed}`)
  )
  Joi.assert(
    parsed,
    Joi.number().min(0),
    new TypeError(`Value is not a non-negative number: ${parsed}`)
  )
  Joi.assert(
    parsed,
    Joi.number()
      .positive()
      .allow(0),
    new TypeError(`Value is not a positive number: ${parsed}`)
  )
  return parsed
}

export const UnsignedIntScalar = `scalar UnsignedInt`

export const UnsignedInt = new GraphQLScalarType({
  name: `UnsignedInt`,

  description: `Integers that will have a value of 0 or more.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as non-negative integers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
