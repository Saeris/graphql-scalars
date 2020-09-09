import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .matches(
      new RegExp(
        `^(?:(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])(?:\\/(?:\\d|[1-2]\\d|3[0-2]))?)$`
      ),
      `Value is not a valid IPv4 address: ${value}`
    )
    .validateSync(value)

export const IPv4Scalar = `scalar IPv4`

export const IPv4 = new GraphQLScalarType({
  name: `IPv4`,

  description: `A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as IPv4 addresses but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
