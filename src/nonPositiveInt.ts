import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

const validate = (value: string) => {
  yupNumber()
    .typeError(`Value is not a number: ${value}`)
    .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
    .required(`Value is not a number: ${value}`)
    .test(`unsafeInt`, `Value is not a number: ${value}`, val =>
      Number.isSafeInteger(val)
    )
    .validateSync(value)
  const parsed = parseInt(value, 10)
  yupNumber()
    .strict(true)
    .integer(`Value is not an integer: ${parsed}`)
    .negative(`Value is not a non-positive number: ${parsed}`)
    .max(0, `Value is not a non-positive number: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const NonPositiveIntScalar = `scalar NonPositiveInt`

export const NonPositiveInt = new GraphQLScalarType({
  name: `NonPositiveInt`,

  description: `Integers that will have a value of 0 or less.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as non-positive integers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
