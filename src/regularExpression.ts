import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import * as Joi from "@hapi/joi"

export const RegularExpressionFactory = (name: string, regex: RegExp) => {
  const validate = (value: string) => {
    Joi.assert(
      value,
      Joi.string(),
      new TypeError(`Value is not string: ${value}`)
    )
    Joi.assert(
      value,
      Joi.string().regex(new RegExp(regex), { name }),
      new TypeError(
        `Value does not match the regular expression ${regex}: ${value}`
      )
    )
    return value
  }

  return {
    scalar: `scalar ${name}`,
    resolver: new GraphQLScalarType({
      name,

      description: `A field whose value matches the provided regular expression ${regex}.`,

      serialize(value) {
        return validate(value)
      },

      parseValue(value) {
        return validate(value)
      },

      parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
          throw new GraphQLError(
            `Can only validate strings as regular expressions but got a: ${ast.kind}`
          )
        }

        return validate(ast.value)
      }
    })
  }
}
