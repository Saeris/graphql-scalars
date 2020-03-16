import { Kind } from "graphql/language"
import { EmailAddress } from "../"

describe(`EmailAddress`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      expect(EmailAddress.serialize(`test@test.com`)).toBe(`test@test.com`)
    })

    it(`parseValue`, () => {
      expect(EmailAddress.parseValue(`test@test.com`)).toBe(`test@test.com`)
    })

    it(`parseLiteral`, () => {
      expect(
        EmailAddress.parseLiteral({
          value: `test@test.com`,
          kind: Kind.STRING
        })
      ).toBe(`test@test.com`)
    })
  })

  describe(`invalid`, () => {
    describe(`not an email address`, () => {
      it(`serialize`, () => {
        expect(() => EmailAddress.serialize(`this is not an email address`)).toThrow(
          /Value is not a valid email address/
        )
      })

      it(`parseValue`, () => {
        expect(() => EmailAddress.parseValue(`this is not an email address`)).toThrow(
          /Value is not a valid email address/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          EmailAddress.parseLiteral({
            value: `this is not an email address`,
            kind: Kind.STRING
          })).toThrow(/Value is not a valid email address/)
      })
    })

    describe(`not a string`, () => {
      it(`serialize`, () => {
        expect(() => EmailAddress.serialize(123)).toThrow(/Value is not string/)
      })

      it(`parseValue`, () => {
        expect(() => EmailAddress.parseValue(123)).toThrow(/Value is not string/)
      })

      it(`parseLiteral`, () => {
        expect(() => EmailAddress.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(
          /Can only validate strings as email addresses but got a/
        )
      })
    })
  })
})
