import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import * as Joi from "@hapi/joi"

const validate = (value: string) => {
  Joi.assert(
    value,
    Joi.string(),
    new TypeError(`Value is not string: ${value}`)
  )
  Joi.assert(
    value,
    [
      Joi.string().regex(
        /^(?:ISBN(?:-10)?:? *((?=\d{1,5}([ -]?)\d{1,7}\2?\d{1,6}\2?\d)(?:\d\2*){9}[\dX]))$/i
      ),
      Joi.string().regex(
        /^(?:ISBN(?:-13)?:? *(97(?:8|9)([ -]?)(?=\d{1,5}\2?\d{1,7}\2?\d{1,6}\2?\d)(?:\d\2*){9}\d))$/i
      )
    ],
    new TypeError(`Value is not a valid ISBN number: ${value}`)
  )
  return value
}

export const ISBNScalar = `scalar ISBN`

export const ISBN = new GraphQLScalarType({
  name: `ISBN`,

  description: `A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as ISBN numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
