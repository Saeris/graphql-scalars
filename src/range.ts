import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

interface Config {
  name: string
  start: number
  end: number
  float?: boolean
}

export const rangeFactory = ({ name, start, end, float = false }: Config) => {
  const validate = (value: string) => {
    yupNumber()
      .typeError(`Value is not a number: ${value}`)
      .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
      .required(`Value is not a number: ${value}`)
      .min(0, `Value is not a positive number: ${value}`)
      .validateSync(value)
    if (!float) {
      yupNumber()
        .integer(`Value is not an integer: ${value}`)
        .test(`unsafeInt`, `Value is not a number: ${value}`, val =>
          Number.isSafeInteger(val)
        )
        .validateSync(value)
    }
    const parsed = float ? parseFloat(value) : parseInt(value, 10)
    yupNumber()
      .strict(true)
      .min(start, `Value is less than limit: ${start}: ${parsed}`)
      .max(end, `Value is greater than limit: ${end}: ${parsed}`)
      .validateSync(parsed)
    return parsed
  }

  return {
    scalar: `scalar ${name}`,
    resolver: new GraphQLScalarType({
      name,

      description: `A${
        float ? ` Float` : `n Integer`
      } with a value between ${start} and ${end} (inclusive).`,

      serialize(value) {
        return validate(value)
      },

      parseValue(value) {
        return validate(value)
      },

      parseLiteral(ast) {
        if (ast.kind !== (float ? Kind.FLOAT : Kind.INT)) {
          throw new GraphQLError(
            `Can only validate ${float ? `Floats` : `Integers`} but got a: ${
              ast.kind
            }`
          )
        }

        return validate(ast.value)
      }
    })
  }
}
