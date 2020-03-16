import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import Joi from "@hapi/joi"

const validate = (value: string) => {
  Joi.assert(
    value,
    Joi.string(),
    new TypeError(`Value is not string: ${value}`)
  )
  Joi.assert(
    value,
    Joi.string().email(),
    new TypeError(`Value is not a valid email address: ${value}`)
  )
  return value
}

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