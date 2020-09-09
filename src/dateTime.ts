import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { date as yupDate } from "yup"

const validate = (value: Date) =>
  yupDate().typeError(`Value is not a valid Date: ${value}`).validateSync(value)

export const DateTimeScalar = `scalar DateTime`

export const DateTime = new GraphQLScalarType({
  name: `DateTime`,

  description: `Use JavaScript Date object for date/time fields.`,

  serialize(value) {
    const date = typeof value === `string` ? new Date(Date.parse(value)) : value

    validate(date)

    return date.toJSON()
  },

  parseValue(value) {
    const date = new Date(value)

    return validate(date)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only parse strings to dates but got a: ${ast.kind}`
      )
    }

    const date = new Date(ast.value)

    if (ast.value !== date.toJSON()) {
      throw new GraphQLError(
        `Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${ast.value}`
      )
    }

    return validate(date)
  }
})
