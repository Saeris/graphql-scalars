import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import BaseJoi from "joi"
import joiPostalCode from "joi-postalcode"

const Joi = BaseJoi.extend(joiPostalCode)

const countries = [`US`, `GB`, `DE`, `CA`, `FR`, `IT`, `AU`, `NL`, `ES`, `DK`, `SE`, `BE`, `IN`]

const validate = value => {
  Joi.assert(value, Joi.string(), new TypeError(`Value is not string: ${value}`))
  Joi.assert(value, [...countries.map(country => Joi.string().postalCode(country))], new TypeError(`Value is not a valid postal code: ${value}`))
  return value
}

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

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as phone numbers but got a: ${kind}`)
    }

    return validate(value)
  }
})
