import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import * as Joi from "@hapi/joi"

const validate = (value: string) => {
  Joi.assert(
    value,
    Joi.string(),
    new TypeError(`Value is not string: ${value}`)
  )
  Joi.assert(
    value,
    Joi.string().regex(
      /^hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)$/
    ),
    new TypeError(`Value is not a valid HSLA color: ${value}`)
  )
  return value
}

export const HSLAScalar = `scalar HSLA`

export const HSLA = new GraphQLScalarType({
  name: `HSLA`,

  description: `A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla().`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as HSLA colors but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
