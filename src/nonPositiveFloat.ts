import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

const validate = (value: string) => {
  yupNumber()
    .typeError(`Value is not a number: ${value}`)
    .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
    .required(`Value is not a number: ${value}`)
    .validateSync(value)
  const parsed = parseFloat(value)
  yupNumber()
    .strict(true)
    .negative(`Value is not a negative number: ${parsed}`)
    .max(0, `Value is not a non-positive number: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const NonPositiveFloatScalar = `scalar NonPositiveFloat`

export const NonPositiveFloat = new GraphQLScalarType({
  name: `NonPositiveFloat`,

  description: `Floats that will have a value of 0 or less.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as non-positive floating point numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
