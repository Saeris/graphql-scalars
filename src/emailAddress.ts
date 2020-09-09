import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .email(`Value is not a valid email address: ${value}`)
    .validateSync(value)

export const EmailAddressScalar = `scalar EmailAddress`

export const EmailAddress = new GraphQLScalarType({
  name: `EmailAddress`,

  description: `A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email addresses but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
