import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .uuid(`Value is not a valid GUID: ${value}`)
    .validateSync(value)

export const GUIDScalar = `scalar GUID`

export const GUID = new GraphQLScalarType({
  name: `GUID`,

  description: `A field whose value is a generic Globally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as GUIDs but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
