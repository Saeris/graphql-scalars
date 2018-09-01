/* global describe, test, expect */
import { Kind } from "graphql/language"
import { UnsignedFloat } from "../"

describe(`UnsignedFloat`, () => {
  describe(`valid`, () => {
    describe(`greater than zero`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(UnsignedFloat.serialize(123.45)).toBe(123.45)
        })

        it(`parseValue`, () => {
          expect(UnsignedFloat.parseValue(123.45)).toBe(123.45)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedFloat.parseLiteral({ value: 123.45, kind: Kind.FLOAT })).toBe(123.45)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(UnsignedFloat.serialize(`123.45`)).toBe(123.45)
        })

        it(`parseValue`, () => {
          expect(UnsignedFloat.parseValue(`123.45`)).toBe(123.45)
        })

        it(`parseLiteral`, () => {
          expect(
            UnsignedFloat.parseLiteral({
              value: `123.45`,
              kind: Kind.FLOAT
            })
          ).toBe(123.45)
        })
      })
    })

    describe(`zero`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(UnsignedFloat.serialize(0.0)).toBe(0.0)
        })

        it(`parseValue`, () => {
          expect(UnsignedFloat.parseValue(0.0)).toBe(0.0)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedFloat.parseLiteral({ value: 0.0, kind: Kind.FLOAT })).toBe(0.0)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(UnsignedFloat.serialize(`0.0`)).toBe(0.0)
        })

        it(`parseValue`, () => {
          expect(UnsignedFloat.parseValue(`0.0`)).toBe(0.0)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedFloat.parseLiteral({ value: `0.0`, kind: Kind.FLOAT })).toBe(0.0)
        })
      })
    })
  })

  describe(`invalid`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedFloat.serialize(null)).toThrow(/Value is not a number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedFloat.parseValue(null)).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        expect(() => UnsignedFloat.parseLiteral({ value: null, kind: Kind.FLOAT })).toThrow(/Value is not a number/)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedFloat.serialize(undefined)).toThrow(/Value is not a number/) // eslint-disable-line
      })

      it(`parseValue`, () => {
        expect(() => UnsignedFloat.parseValue(undefined)).toThrow(/Value is not a number/) // eslint-disable-line
      })

      it(`parseLiteral`, () => {
        expect(() => UnsignedFloat.parseLiteral({ value: undefined, kind: Kind.FLOAT })).toThrow( // eslint-disable-line
          /Value is not a number/
        )
      })
    })

    describe(`less than zero`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(() => UnsignedFloat.serialize(-1.0)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseValue`, () => {
          expect(() => UnsignedFloat.parseValue(-1.0)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseLiteral`, () => {
          expect(() => UnsignedFloat.parseLiteral({ value: -1.0, kind: Kind.FLOAT })).toThrow(
            /Value is not a non-negative number/
          )
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => UnsignedFloat.serialize(`-1.0`)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseValue`, () => {
          expect(() => UnsignedFloat.parseValue(`-1.0`)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseLiteral`, () => {
          expect(() => UnsignedFloat.parseLiteral({ value: `-1.0`, kind: Kind.FLOAT })).toThrow(
            /Value is not a non-negative number/
          )
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedFloat.serialize(Number.POSITIVE_INFINITY)).toThrow(/Value is not a finite number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedFloat.parseValue(Number.POSITIVE_INFINITY)).toThrow(/Value is not a finite number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          UnsignedFloat.parseLiteral({
            value: Number.POSITIVE_INFINITY,
            kind: Kind.FLOAT
          })).toThrow(/Value is not a finite number/)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedFloat.serialize(`not a number`)).toThrow(/Value is not a number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedFloat.parseValue(`not a number`)).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          UnsignedFloat.parseLiteral({
            value: `not a number`,
            kind: Kind.STRING
          })).toThrow(/Can only validate floating point numbers as non-negative floating point numbers but got a/)
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedFloat.serialize(Number.NaN)).toThrow(/Value is not a number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedFloat.parseValue(Number.NaN)).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          UnsignedFloat.parseLiteral({
            value: Number.NaN,
            kind: Kind.STRING
          })).toThrow(/Can only validate floating point numbers as non-negative floating point numbers but got a/)
      })
    })
  })
})
