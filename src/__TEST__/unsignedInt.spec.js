/* global describe, test, expect */
import { Kind } from "graphql/language"
import { UnsignedInt } from "../"

describe(`UnsignedInt`, () => {
  describe(`valid`, () => {
    describe(`greater than zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(UnsignedInt.serialize(123)).toBe(123)
        })

        it(`parseValue`, () => {
          expect(UnsignedInt.parseValue(123)).toBe(123)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedInt.parseLiteral({ value: 123, kind: Kind.INT })).toBe(123)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(UnsignedInt.serialize(`123`)).toBe(123)
        })

        it(`parseValue`, () => {
          expect(UnsignedInt.parseValue(`123`)).toBe(123)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedInt.parseLiteral({ value: `123`, kind: Kind.INT })).toBe(123)
        })
      })
    })

    describe(`zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(UnsignedInt.serialize(0)).toBe(0)
        })

        it(`parseValue`, () => {
          expect(UnsignedInt.parseValue(0)).toBe(0)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedInt.parseLiteral({ value: 0, kind: Kind.INT })).toBe(0)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(UnsignedInt.serialize(`0`)).toBe(0)
        })

        it(`parseValue`, () => {
          expect(UnsignedInt.parseValue(`0`)).toBe(0)
        })

        it(`parseLiteral`, () => {
          expect(UnsignedInt.parseLiteral({ value: `0`, kind: Kind.INT })).toBe(0)
        })
      })
    })
  })

  describe(`invalid`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedInt.serialize(null)).toThrow(/Value is not a number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedInt.parseValue(null)).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        expect(() => UnsignedInt.parseLiteral({ value: null, kind: Kind.INT })).toThrow(/Value is not a number/)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedInt.serialize(undefined)).toThrow(/Value is not a number/) // eslint-disable-line
      })

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // it('parseValue', () => {
      //   expect(() => UnsignedInt.parseValue(undefined)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      it(`parseLiteral`, () => {
        expect(() => UnsignedInt.parseLiteral({ value: undefined, kind: Kind.INT })).toThrow(/Value is not a number/) // eslint-disable-line
      })
    })

    describe(`unsafe integer`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedInt.serialize(2 ** 53)).toThrow(/Value is not a safe integer/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedInt.parseValue(2 ** 53)).toThrow(/Value is not a safe integer/)
      })

      it(`parseLiteral`, () => {
        expect(() => UnsignedInt.parseLiteral({ value: 2 ** 53, kind: Kind.INT })).toThrow(
          /Value is not a safe integer/
        )
      })
    })

    describe(`less than zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => UnsignedInt.serialize(-1)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseValue`, () => {
          expect(() => UnsignedInt.parseValue(-1)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseLiteral`, () => {
          expect(() => UnsignedInt.parseLiteral({ value: -1, kind: Kind.INT })).toThrow(
            /Value is not a non-negative number/
          )
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => UnsignedInt.serialize(`-1`)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseValue`, () => {
          expect(() => UnsignedInt.parseValue(`-1`)).toThrow(/Value is not a non-negative number/)
        })

        it(`parseLiteral`, () => {
          expect(() => UnsignedInt.parseLiteral({ value: `-1`, kind: Kind.INT })).toThrow(
            /Value is not a non-negative number/
          )
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedInt.serialize(Number.POSITIVE_INFINITY)).toThrow(/Value is not a finite number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedInt.parseValue(Number.POSITIVE_INFINITY)).toThrow(/Value is not a finite number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          UnsignedInt.parseLiteral({
            value: Number.POSITIVE_INFINITY,
            kind: Kind.INT
          })).toThrow(/Value is not a finite number/)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedInt.serialize(`not a number`)).toThrow(/Value is not a number/)
      })

      it(`parseValue`, () => {
        expect(() => UnsignedInt.parseValue(`not a number`)).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          UnsignedInt.parseLiteral({
            value: `not a number`,
            kind: Kind.STRING
          })).toThrow(/Can only validate integers as non-negative integers but got a/)
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => UnsignedInt.serialize(Number.NaN)).toThrow(/Value is not a number/)
      })

      // FIXME: Does nothing. No throw. Call doesn't even seem to get to the parseValue() function.
      // it('parseValue', () => {
      //   expect(() => UnsignedInt.parseValue(Number.NaN)).toThrow(
      //     /Value is not a number/,
      //   );
      // });

      it(`parseLiteral`, () => {
        expect(() => UnsignedInt.parseLiteral({ value: Number.NaN, kind: Kind.STRING })).toThrow(
          /Can only validate integers as non-negative integers but got a/
        )
      })
    })
  })
})
