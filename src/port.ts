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
  const parsed = parseInt(value, 10)
  Joi.assert(
    parsed,
    Joi.number().port(),
    new TypeError(`Value is not a valid TCP port: ${parsed}`)
  )
  return parsed
}

export const PortScalar = `scalar Port`

export const Port = new GraphQLScalarType({
  name: `Port`,

  description: `A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as TCP ports but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
