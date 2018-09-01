import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.string(), new TypeError(`Value is not string: ${value}`))
  Joi.assert(value, Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/), new TypeError(`Value is not a valid HexColorCode: ${value}`))
  return value
}

export const HexColorCodeScalar = `scalar HexColorCode`

export const HexColorCode = new GraphQLScalarType({
  name: `HexColorCode`,

  description: `A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as hex color codes but got a: ${kind}`)
    }

    return validate(value)
  }
})
