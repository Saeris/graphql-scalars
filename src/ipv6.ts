import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { string as yupString } from "yup"

const decOctect = `(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])`
const ipv4address = `(?:${decOctect}\\.){3}${decOctect}`
const hexDigit = `\\dA-Fa-f`
const hexDigitOnly = `[${hexDigit}]`
const h16 = `${hexDigitOnly}{1,4}`
const ls32 = `(?:${h16}:${h16}|${ipv4address})`
const IPv6SixHex = `(?:${h16}:){6}${ls32}`
const IPv6FiveHex = `::(?:${h16}:){5}${ls32}`
const IPv6FourHex = `(?:${h16})?::(?:${h16}:){4}${ls32}`
const IPv6ThreeHex = `(?:(?:${h16}:){0,1}${h16})?::(?:${h16}:){3}${ls32}`
const IPv6TwoHex = `(?:(?:${h16}:){0,2}${h16})?::(?:${h16}:){2}${ls32}`
const IPv6OneHex = `(?:(?:${h16}:){0,3}${h16})?::${h16}:${ls32}`
const IPv6NoneHex = `(?:(?:${h16}:){0,4}${h16})?::${ls32}`
const IPv6NoneHex2 = `(?:(?:${h16}:){0,5}${h16})?::${h16}`
const IPv6NoneHex3 = `(?:(?:${h16}:){0,6}${h16})?::`
const ipv6address = `(?:${IPv6SixHex}|${IPv6FiveHex}|${IPv6FourHex}|${IPv6ThreeHex}|${IPv6TwoHex}|${IPv6OneHex}|${IPv6NoneHex}|${IPv6NoneHex2}|${IPv6NoneHex3})`

const validate = (value: string) =>
  yupString()
    .strict(true)
    .typeError(`Value is not string: ${value}`)
    .matches(
      new RegExp(
        `^(?:${ipv6address}(?:\\/(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8]))?)$`
      ),
      `Value is not a valid IPv6 address: ${value}`
    )
    .validateSync(value)

export const IPv6Scalar = `scalar IPv6`

export const IPv6 = new GraphQLScalarType({
  name: `IPv6`,

  description: `A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as IPv6 addresses but got a: ${ast.kind}`
      )
    }

    return validate(ast.value)
  }
})
