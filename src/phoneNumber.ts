import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .matches(
      /^\+\d{11,15}$/i,
      `Value is not a valid phone number of the form +17895551234 (10-15 digits): ${value}`
    )
    .validateSync(value)

export const PhoneNumberScalar = `scalar PhoneNumber`

export const PhoneNumber = new GraphQLScalarType({
  name: `PhoneNumber`,

  description: `A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as phone numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
