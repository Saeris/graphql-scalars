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
    .positive(`Value is not a non-negative number: ${parsed}`)
    .min(0, `Value is not a non-negative number: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const UnsignedFloatScalar = `scalar UnsignedFloat`

export const UnsignedFloat = new GraphQLScalarType({
  name: `UnsignedFloat`,

  description: `Floats that will have a value of 0 or more.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as non-negative floating point numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
