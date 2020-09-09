import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .matches(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/i,
      `Value is not a valid HexColorCode: ${value}`
    )
    .validateSync(value)

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

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as hex color codes but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
