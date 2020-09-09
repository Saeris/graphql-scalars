import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"
import postalCodes from "postal-codes-js"

const countries = [
  `US`,
  `GB`,
  `DE`,
  `CA`,
  `FR`,
  `IT`,
  `AU`,
  `NL`,
  `ES`,
  `DK`,
  `SE`,
  `BE`,
  `IN`
]

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .test(`postal code`, `Value is not a valid postal code: ${value}`, val =>
      countries.some(
        country => postalCodes.validate(country, val as string) === true
      )
    )
    .validateSync(value)

export const PostalCodeScalar = `scalar PostalCode`

export const PostalCode = new GraphQLScalarType({
  name: `PostalCode`,

  description: `A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium or India.`,

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
