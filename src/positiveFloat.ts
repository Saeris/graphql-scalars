import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

const validate = (value: string) => {
  yupNumber()
    .typeError(`Value is not a number: ${value}`)
    .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
    .required(`Value is not a number: ${value}`)
    .positive(`Value is not a positive number: ${value}`)
    .validateSync(value)
  const parsed = parseFloat(value)
  yupNumber()
    .strict(true)
    .moreThan(0, `Value is not greater than 0: ${value}`)
    .validateSync(parsed)
  return parsed
}

export const PositiveFloatScalar = `scalar PositiveFloat`

export const PositiveFloat = new GraphQLScalarType({
  name: `PositiveFloat`,

  description: `Floats that will have a value greater than 0.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(
        `Can only validate floating point numbers as positive floating point numbers but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
