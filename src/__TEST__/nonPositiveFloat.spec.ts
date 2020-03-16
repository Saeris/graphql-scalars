import { Kind } from "graphql/language"
import { NonPositiveFloat } from "../"

describe(`NonPositiveFloat`, () => {
  describe(`valid`, () => {
    describe(`as float`, () => {
      it(`serialize`, () => {
        expect(NonPositiveFloat.serialize(-123.45)).toBe(-123.45)
      })

      it(`parseValue`, () => {
        expect(NonPositiveFloat.parseValue(-123.45)).toBe(-123.45)
      })

      it(`parseLiteral`, () => {
        expect(
          NonPositiveFloat.parseLiteral(
            // @ts-ignore
            { value: -123.45, kind: Kind.FLOAT },
            {}
          )
        ).toBe(-123.45)
      })
    })

    describe(`as string`, () => {
      it(`serialize`, () => {
        expect(NonPositiveFloat.serialize(`-123.45`)).toBe(-123.45)
      })

      it(`parseValue`, () => {
        expect(NonPositiveFloat.parseValue(`-123.45`)).toBe(-123.45)
      })

      it(`parseLiteral`, () => {
        expect(
          NonPositiveFloat.parseLiteral(
            { value: `-123.45`, kind: Kind.FLOAT },
            {}
          )
        ).toBe(-123.45)
      })
    })

    describe(`zero`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(NonPositiveFloat.serialize(0.0)).toBe(0.0)
        })

        it(`parseValue`, () => {
          expect(NonPositiveFloat.parseValue(0.0)).toBe(0.0)
        })

        it(`parseLiteral`, () => {
          expect(
            // @ts-ignore
            NonPositiveFloat.parseLiteral({ value: 0.0, kind: Kind.FLOAT }, {})
          ).toBe(0.0)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(NonPositiveFloat.serialize(`0.0`)).toBe(0.0)
        })

        it(`parseValue`, () => {
          expect(NonPositiveFloat.parseValue(`0.0`)).toBe(0.0)
        })

        it(`parseLiteral`, () => {
          expect(
            NonPositiveFloat.parseLiteral(
              { value: `0.0`, kind: Kind.FLOAT },
              {}
            )
          ).toBe(0.0)
        })
      })
    })
  })

  describe(`invalid`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveFloat.serialize(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveFloat.parseValue(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveFloat.parseLiteral({ value: null, kind: Kind.FLOAT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        // @ts-ignore
        expect(() => NonPositiveFloat.serialize()).toThrow(
          /Value is not a number/
        ) // eslint-disable-line
      })

      it(`parseValue`, () => {
        // @ts-ignore
        expect(() => NonPositiveFloat.parseValue()).toThrow(
          /Value is not a number/
        ) // eslint-disable-line
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          NonPositiveFloat.parseLiteral({ kind: Kind.FLOAT }, {})
        ).toThrow(
          // eslint-disable-line
          /Value is not a number/
        )
      })
    })

    describe(`more than zero`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(() => NonPositiveFloat.serialize(1.0)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NonPositiveFloat.parseValue(1.0)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            NonPositiveFloat.parseLiteral({ value: 1.0, kind: Kind.FLOAT }, {})
          ).toThrow(/Value is not a non-positive number/)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => NonPositiveFloat.serialize(`1.0`)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NonPositiveFloat.parseValue(`1.0`)).toThrow(
            /Value is not a non-positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            NonPositiveFloat.parseLiteral(
              { value: `1.0`, kind: Kind.FLOAT },
              {}
            )
          ).toThrow(/Value is not a non-positive number/)
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() =>
          NonPositiveFloat.serialize(Number.NEGATIVE_INFINITY)
        ).toThrow(/Value is not a finite number/)
      })

      it(`parseValue`, () => {
        expect(() =>
          NonPositiveFloat.parseValue(Number.NEGATIVE_INFINITY)
        ).toThrow(/Value is not a finite number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveFloat.parseLiteral(
            {
              // @ts-ignore
              value: Number.NEGATIVE_INFINITY,
              kind: Kind.FLOAT
            },
            {}
          )
        ).toThrow(/Value is not a finite number/)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveFloat.serialize(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveFloat.parseValue(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveFloat.parseLiteral(
            {
              value: `not a number`,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(
          /Can only validate floating point numbers as non-positive floating point numbers but got a/
        )
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => NonPositiveFloat.serialize(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NonPositiveFloat.parseValue(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NonPositiveFloat.parseLiteral(
            {
              // @ts-ignore
              value: Number.NaN,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(
          /Can only validate floating point numbers as non-positive floating point numbers but got a/
        )
      })
    })
  })
})
