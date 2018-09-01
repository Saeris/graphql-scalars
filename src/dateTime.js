import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import Joi from "joi"

const validate = value => {
  Joi.assert(value, Joi.date().iso(), new TypeError(`Value is not a valid Date: ${value}`))
  return value
}

export const DateTimeScalar = `scalar DateTime`

export const DateTime = new GraphQLScalarType({
  name: `DateTime`,

  description: `Use JavaScript Date object for date/time fields.`,

  serialize(value) {
    const date = (typeof value === `string`) ? new Date(Date.parse(value)) : value

    validate(date)

    return date.toJSON()
  },

  parseValue(value) {
    const date = new Date(value)

    return validate(date)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only parse strings to dates but got a: ${kind}`)
    }

    const date = new Date(value)

    if (value !== date.toJSON()) {
      throw new GraphQLError(`Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${value}`)
    }

    return validate(date)
  }
})
