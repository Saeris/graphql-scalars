import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .matches(
      /^(?:[0-9A-Fa-f]{2}([:-]?)[0-9A-Fa-f]{2})(?:(?:\1|\.)(?:[0-9A-Fa-f]{2}([:-]?)[0-9A-Fa-f]{2})){2}$/,
      `Value is not a valid MAC address: ${value}`
    )
    .validateSync(value)

export const MACScalar = `scalar MAC`

export const MAC = new GraphQLScalarType({
  name: `MAC`,

  description: `A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as MAC addresses but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
