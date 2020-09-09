import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

interface Config {
  name: string
  regex: RegExp
}

export const regularExpressionFactory = ({ name, regex }: Config) => {
  const validate = (value: string) =>
    yupString()
      .strict(true)
      .typeError(`Value is not string: ${value}`)
      .matches(
        new RegExp(regex),
        `Value does not match the regular expression ${regex}: ${value}`
      )
      .validateSync(value)

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
