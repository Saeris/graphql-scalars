import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"
import { parse } from "uri-js"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .test(
      `uri`,
      `Value is not a valid URL: ${value}`,
      val => !!parse(val as string).scheme
    )
    .validateSync(value)

export const URLScalar = `scalar URL`

export const URL = new GraphQLScalarType({
  name: `URL`,

  description: `A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
