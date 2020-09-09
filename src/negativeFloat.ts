import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

const validate = (value: string) => {
  yupNumber()
    .typeError(`Value is not a number: ${value}`)
    .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
    .required(`Value is not a number: ${value}`)
    .negative(`Value is not a negative number: ${value}`)
    .validateSync(value)
  const parsed = parseFloat(value)
  yupNumber()
    .strict(true)
    .lessThan(0, `Value is not less than 0: ${parsed}`)
    .validateSync(parsed)
  return parsed
}

export const NegativeFloatScalar = `scalar NegativeFloat`

export const NegativeFloat = new GraphQLScalarType({
  name: `NegativeFloat`,

  description: `Floats that will have a value less than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as negative floating point numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
