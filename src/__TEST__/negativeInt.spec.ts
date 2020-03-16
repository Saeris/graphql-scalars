import { Kind } from "graphql/language"
import { NegativeInt } from "../"

describe(`NegativeInt`, () => {
  describe(`valid`, () => {
    describe(`as int`, () => {
      it(`serialize`, () => {
        expect(NegativeInt.serialize(-123)).toBe(-123)
      })

      it(`parseValue`, () => {
        expect(NegativeInt.parseValue(-123)).toBe(-123)
      })

      it(`parseLiteral`, () => {
        expect(
          // @ts-ignore
          NegativeInt.parseLiteral({ value: -123, kind: Kind.INT }, {})
        ).toBe(-123)
      })
    })

    describe(`as string`, () => {
      it(`serialize`, () => {
        expect(NegativeInt.serialize(`-123`)).toBe(-123)
      })

      it(`parseValue`, () => {
        expect(NegativeInt.parseValue(`-123`)).toBe(-123)
      })

      it(`parseLiteral`, () => {
        expect(
          NegativeInt.parseLiteral({ value: `-123`, kind: Kind.INT }, {})
        ).toBe(-123)
      })
    })
  })

  describe(`invalid`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => NegativeInt.serialize(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NegativeInt.parseValue(null)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NegativeInt.parseLiteral({ value: null, kind: Kind.INT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        // @ts-ignore
        expect(() => NegativeInt.serialize()).toThrow(/Value is not a number/) // eslint-disable-line
      })

      it(`parseValue`, () => {
        // @ts-ignore
        expect(() => NegativeInt.parseValue()).toThrow(/Value is not a number/)
      })

      it(`parseLiteral`, () => {
        // @ts-ignore
        expect(() => NegativeInt.parseLiteral({ kind: Kind.INT }, {})).toThrow(
          /Value is not a number/
        )
      })
    })

    describe(`unsafe integer`, () => {
      it(`serialize`, () => {
        expect(() => NegativeInt.serialize(2 ** 53)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NegativeInt.parseValue(2 ** 53)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          NegativeInt.parseLiteral({ value: 2 ** 53, kind: Kind.INT }, {})
        ).toThrow(/Value is not a number/)
      })
    })

    describe(`zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => NegativeInt.serialize(0)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NegativeInt.parseValue(0)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            NegativeInt.parseLiteral({ value: 0, kind: Kind.INT }, {})
          ).toThrow(/Value is not a negative number/)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => NegativeInt.serialize(`0`)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NegativeInt.parseValue(`0`)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            NegativeInt.parseLiteral({ value: `0`, kind: Kind.INT }, {})
          ).toThrow(/Value is not a negative number/)
        })
      })
    })

    describe(`less than zero`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => NegativeInt.serialize(1)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NegativeInt.parseValue(1)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            NegativeInt.parseLiteral({ value: 1, kind: Kind.INT }, {})
          ).toThrow(/Value is not a negative number/)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => NegativeInt.serialize(`1`)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseValue`, () => {
          expect(() => NegativeInt.parseValue(`1`)).toThrow(
            /Value is not a negative number/
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            NegativeInt.parseLiteral({ value: `1`, kind: Kind.INT }, {})
          ).toThrow(/Value is not a negative number/)
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() => NegativeInt.serialize(Number.NEGATIVE_INFINITY)).toThrow(
          /Value is not a finite number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NegativeInt.parseValue(Number.NEGATIVE_INFINITY)).toThrow(
          /Value is not a finite number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NegativeInt.parseLiteral(
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
        expect(() => NegativeInt.serialize(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NegativeInt.parseValue(`not a number`)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          NegativeInt.parseLiteral(
            {
              value: `not a number`,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(/Can only validate integers as negative integers but got a/)
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => NegativeInt.serialize(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseValue`, () => {
        expect(() => NegativeInt.parseValue(Number.NaN)).toThrow(
          /Value is not a number/
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          NegativeInt.parseLiteral({ value: Number.NaN, kind: Kind.STRING }, {})
        ).toThrow(/Can only validate integers as negative integers but got a/)
      })
    })
  })
})
