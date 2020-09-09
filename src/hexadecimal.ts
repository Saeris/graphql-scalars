import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .matches(/^[a-f0-9]+$/i, `Value is not a valid hexadecimal value: ${value}`)
    .validateSync(value)

export const HexadecimalScalar = `scalar Hexadecimal`

export const Hexadecimal = new GraphQLScalarType({
  name: `Hexadecimal`,

  description: `A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as a hexadecimal but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
