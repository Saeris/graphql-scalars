import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.string(), new TypeError(`Value is not string: ${value}`))
  Joi.assert(value, Joi.string().regex(/^\+\d{11,15}$/), new TypeError(`Value is not a valid phone number of the form +17895551234 (10-15 digits): ${value}`))
  return value
}

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

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as phone numbers but got a: ${kind}`)
    }

    return validate(value)
  }
})
