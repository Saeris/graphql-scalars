import { Kind } from "graphql/language"
import { PositiveInt } from "../"

describe(`PositiveInt`, () => {
  describe(`valid`, () => {
    describe(`as int`, () => {
      it(`serialize`, () => {
        expect(PositiveInt.serialize(123)).toBe(123)
      })

      it(`parseValue`, () => {
        expect(PositiveInt.parseValue(123)).toBe(123)
      })

      it(`parseLiteral`, () => {
        expect(
          // @ts-ignore
          PositiveInt.parseLiteral({ value: 123, kind: Kind.INT }, {})
        ).toBe(123)
      })
    })

    describe(`as string`, () => {
      it(`serialize`, () => {
        expect(PositiveInt.serialize(`123`)).toBe(123)
      })

      it(`parseValue`, () => {
        expect(PositiveInt.parseValue(`123`)).toBe(123)
      })

      it(`parseLiteral`, () => {
        expect(
          PositiveInt.parseLiteral({ value: `123`, kind: Kind.INT }, {})
        ).toBe(123)
      })
    })
  })

  describe(`invalid`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => PositiveInt.serialize(null)).toThrow(
          /Value is not a number: null/
        )
      })

      it(`parseValue`, () => {
        expect(() => PositiveInt.parseValue(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          PositiveInt.parseLiteral({ value: null, kind: Kind.INT }, {})
        ).toThrow(/Value is not a number: null/)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        // @ts-ignore
        expect(() => PositiveInt.serialize()).toThrow(
          /Value is not a number: undefined/
        )
      })

      it(`parseValue`, () => {
        // @ts-ignore
        expect(() => PositiveInt.parseValue()).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          PositiveInt.parseLiteral({ kind: Kind.INT }, {})
        ).toThrow(/Value is not a number: undefined/)
      })
    })

    describe(`unsafe integer`, () => {
      it(`serialize`, () => {
        expect(() => PositiveInt.serialize(2 ** 53)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => PositiveInt.parseValue(2 ** 53)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          PositiveInt.parseLiteral({ value: 2 ** 53, kind: Kind.INT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => PositiveInt.serialize(0)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => PositiveInt.parseValue(0)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            PositiveInt.parseLiteral({ value: 0, kind: Kind.INT }, {})
          ).toThrow(/Value is not a positive number/)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => PositiveInt.serialize(`0`)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => PositiveInt.parseValue(`0`)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            PositiveInt.parseLiteral({ value: `0`, kind: Kind.INT }, {})
          ).toThrow(/Value is not a positive number/)
        })
      })
    })

    describe(`less than zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => PositiveInt.serialize(-1)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => PositiveInt.parseValue(-1)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            PositiveInt.parseLiteral({ value: -1, kind: Kind.INT }, {})
          ).toThrow(/Value is not a positive number/)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => PositiveInt.serialize(`-1`)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseValue`, () => {
          expect(() => PositiveInt.parseValue(`-1`)).toThrow(
            /Value is not a positive number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            PositiveInt.parseLiteral({ value: `-1`, kind: Kind.INT }, {})
          ).toThrow(/Value is not a positive number/)
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() => PositiveInt.serialize(Number.POSITIVE_INFINITY)).toThrow(
          /Value is not a finite number/
        )
      })

      it(`parseValue`, () => {
        expect(() => PositiveInt.parseValue(Number.POSITIVE_INFINITY)).toThrow(
          /Value is not a finite number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          PositiveInt.parseLiteral(
            {
              // @ts-ignore
              value: Number.POSITIVE_INFINITY,
              kind: Kind.INT
            },
            {}
          )
        ).toThrow(/Value is not a finite number/)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => PositiveInt.serialize(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => PositiveInt.parseValue(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          PositiveInt.parseLiteral(
            {
              value: `not a number`,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(/Can only validate integers as positive integers but got a/)
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => PositiveInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => PositiveInt.parseValue(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          PositiveInt.parseLiteral({ value: Number.NaN, kind: Kind.STRING }, {})
        ).toThrow(/Can only validate integers as positive integers but got a/)
      })
    })
  })
})
