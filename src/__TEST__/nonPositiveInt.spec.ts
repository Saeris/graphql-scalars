import { Kind } from "graphql/language"
import { NonPositiveInt } from "../"

describe(`NonPositiveInt`, () => {
  describe(`valid`, () => {
    describe(`as int`, () => {
      it(`serialize`, () => {
        expect(NonPositiveInt.serialize(-123)).toBe(-123)
      })

      it(`parseValue`, () => {
        expect(NonPositiveInt.parseValue(-123)).toBe(-123)
      })

      it(`parseLiteral`, () => {
        expect(
          // @ts-ignore
          NonPositiveInt.parseLiteral({ value: -123, kind: Kind.INT }, {})
        ).toBe(-123)
      })
    })

    describe(`as string`, () => {
      it(`serialize`, () => {
        expect(NonPositiveInt.serialize(`-123`)).toBe(-123)
      })

      it(`parseValue`, () => {
        expect(NonPositiveInt.parseValue(`-123`)).toBe(-123)
      })

      it(`parseLiteral`, () => {
        expect(
          NonPositiveInt.parseLiteral({ value: `-123`, kind: Kind.INT }, {})
        ).toBe(-123)
      })
    })

    describe(`zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(NonPositiveInt.serialize(0)).toBe(0)
        })

        it(`parseValue`, () => {
          expect(NonPositiveInt.parseValue(0)).toBe(0)
        })

        it(`parseLiteral`, () => {
          expect(
            // @ts-ignore
            NonPositiveInt.parseLiteral({ value: 0, kind: Kind.INT }, {})
          ).toBe(0)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(NonPositiveInt.serialize(`0`)).toBe(0)
        })

        it(`parseValue`, () => {
          expect(NonPositiveInt.parseValue(`0`)).toBe(0)
        })

        it(`parseLiteral`, () => {
          expect(
            NonPositiveInt.parseLiteral({ value: `0`, kind: Kind.INT }, {})
          ).toBe(0)
        })
      })
    })
  })

  describe(`invalid`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveInt.serialize(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveInt.parseValue(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveInt.parseLiteral({ value: null, kind: Kind.INT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        // @ts-ignore
        expect(() => NonPositiveInt.serialize()).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        // @ts-ignore
        expect(() => NonPositiveInt.parseValue()).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          NonPositiveInt.parseLiteral({ kind: Kind.INT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`unsafe integer`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveInt.serialize(2 ** 53)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveInt.parseValue(2 ** 53)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          NonPositiveInt.parseLiteral({ value: 2 ** 53, kind: Kind.INT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`more than zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => NonPositiveInt.serialize(1)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NonPositiveInt.parseValue(1)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            NonPositiveInt.parseLiteral({ value: 1, kind: Kind.INT }, {})
          ).toThrow(/Value is not a non-positive number/)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => NonPositiveInt.serialize(`1`)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NonPositiveInt.parseValue(`1`)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            NonPositiveInt.parseLiteral({ value: `1`, kind: Kind.INT }, {})
          ).toThrow(/Value is not a non-positive number/)
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() =>
          NonPositiveInt.serialize(Number.NEGATIVE_INFINITY)
        ).toThrow(/Value is not a finite number/)
      })

      it(`parseValue`, () => {
        expect(() =>
          NonPositiveInt.parseValue(Number.NEGATIVE_INFINITY)
        ).toThrow(/Value is not a finite number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveInt.parseLiteral(
            {
              // @ts-ignore
              value: Number.NEGATIVE_INFINITY,
              kind: Kind.INT
            },
            {}
          )
        ).toThrow(/Value is not a finite number/)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveInt.serialize(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveInt.parseValue(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveInt.parseLiteral(
            {
              value: `not a number`,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(
          /Can only validate integers as non-positive integers but got a/
        )
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveInt.parseValue(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveInt.parseLiteral(
            // @ts-ignore
            { value: Number.NaN, kind: Kind.STRING },
            {}
          )
        ).toThrow(
          /Can only validate integers as non-positive integers but got a/
        )
      })
    })
  })
})
