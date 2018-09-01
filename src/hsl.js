import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.string(), new TypeError(`Value is not string: ${value}`))
  Joi.assert(value, Joi.string().regex(/^hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)$/),
    new TypeError(`Value is not a valid HSL color: ${value}`))
  return value
}

export const HSLScalar = `scalar HSL`

export const HSL = new GraphQLScalarType({
  name: `HSL`,

  description: `A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla().`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as HSL colors but got a: ${kind}`)
    }

    return validate(value)
  }
})
