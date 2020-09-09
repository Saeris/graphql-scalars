import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { number as yupNumber } from "yup"

const validate = (value: string) => {
  yupNumber()
    .typeError(`Value is not a number: ${value}`)
    .notOneOf([Infinity, -Infinity], `Value is not a finite number: ${value}`)
    .test(
      `integer`,
      `Value is not a number: ${value}`,
      val => typeof val === `number` && !isNaN(val)
    )
    .validateSync(value)
  const parsed = parseInt(value, 10)
  yupNumber()
    .strict(true)
    .required(`Value is not a number: ${value}`)
    .test(
      `port`,
      `Value is not a valid TCP port: ${parsed}`,
      val => !!val && Number.isSafeInteger(val) && val >= 0 && val <= 65535
    )
    .validateSync(parsed)
  return parsed
}

export const PortScalar = `scalar Port`

export const Port = new GraphQLScalarType({
  name: `Port`,

  description: `A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Can only validate integers as TCP ports but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
