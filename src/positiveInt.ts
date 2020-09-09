import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

const validate = (value: string) => {
  yupNumber()
    .typeError(`Value is not a number: ${value}`)
    .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
    .required(`Value is not a number: ${value}`)
    .positive(`Value is not a positive number: ${value}`)
    .test(`unsafeInt`, `Value is not a number: ${value}`, val =>
      Number.isSafeInteger(val)
    )
    .validateSync(value)
  const parsed = parseInt(value, 10)
  yupNumber()
    .strict(true)
    .integer(`Value is not an integer: ${parsed}`)
    .moreThan(0, `Value is not greater than 0: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const PositiveIntScalar = `scalar PositiveInt`

export const PositiveInt = new GraphQLScalarType({
  name: `PositiveInt`,

  description: `Integers that will have a value greater than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as positive integers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
