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
    .positive(`Value is not a positive number: ${parsed}`)
    .min(0, `Value is not a non-negative number: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const UnsignedIntScalar = `scalar UnsignedInt`

export const UnsignedInt = new GraphQLScalarType({
  name: `UnsignedInt`,

  description: `Integers that will have a value of 0 or more.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as non-negative integers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
