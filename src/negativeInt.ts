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
    .negative(`Value is not a negative number: ${value}`)
    .validateSync(value)
  const parsed = parseInt(value, 10)
  yupNumber()
    .strict(true)
    .integer(`Value is not an integer: ${value}`)
    .lessThan(0, `Value is not less than 0: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const NegativeIntScalar = `scalar NegativeInt`

export const NegativeInt = new GraphQLScalarType({
  name: `NegativeInt`,

  description: `Integers that will have a value less than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as negative integers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
