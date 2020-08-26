import { Kind } from "graphql/language"
import { rangeFactory } from "../"

describe(`rangeFactory`, () => {
  const NOT_FINITE = /Value is not a finite number:/
  const NOT_NUMBER = /Value is not a number:/
  const NOT_INTEGER = /Value is not an integer:/
  const OUTSIDE_RANGE = /Value is (less|greater) than limit: [0-9]+/
  const CANNOT_VALIDATE = /Can only validate (Floats|Integers) but got a:/
  const { scalar: ExampleRangeScalar, resolver: ExampleRange } = rangeFactory({
    name: `ExampleRange`,
    start: 1,
    end: 5
  })

  describe(`scalar`, () => {
    it(`exports scalar`, () => {
      expect(ExampleRangeScalar).toBe(`scalar ExampleRange`)
    })
  })

  describe(`valid:integer`, () => {
    describe(`as int`, () => {
      it(`serialize`, () => {
        expect(ExampleRange.serialize(3)).toBe(3)
      })

      it(`parseValue`, () => {
        expect(ExampleRange.parseValue(3)).toBe(3)
      })

      it(`parseLiteral`, () => {
        expect(
          // @ts-ignore
          ExampleRange.parseLiteral({ value: 3, kind: Kind.INT }, {})
        ).toBe(3)
      })
    })

    describe(`as string`, () => {
      it(`serialize`, () => {
        expect(ExampleRange.serialize(`3`)).toBe(3)
      })

      it(`parseValue`, () => {
        expect(ExampleRange.parseValue(`3`)).toBe(3)
      })

      it(`parseLiteral`, () => {
        expect(
          ExampleRange.parseLiteral({ value: `3`, kind: Kind.INT }, {})
        ).toBe(3)
      })
    })
  })

  describe(`invalid:integer`, () => {
    describe(`float`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(() => ExampleRange.serialize(3.45)).toThrow(
            NOT_INTEGER
          )
        })

        it(`parseValue`, () => {
          expect(() => ExampleRange.parseValue(3.45)).toThrow(
            NOT_INTEGER
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            ExampleRange.parseLiteral({ value: 3.45, kind: Kind.FLOAT }, {})
          ).toThrow(CANNOT_VALIDATE)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => ExampleRange.serialize(`3.45`)).toThrow(
            NOT_INTEGER
          )
        })

        it(`parseValue`, () => {
          expect(() => ExampleRange.parseValue(`3.45`)).toThrow(
            NOT_INTEGER
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            ExampleRange.parseLiteral({ value: `3.45`, kind: Kind.FLOAT }, {})
          ).toThrow(CANNOT_VALIDATE)
        })
      })
    })

    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => ExampleRange.serialize(null)).toThrow(NOT_NUMBER)
      })

      it(`parseValue`, () => {
        expect(() => ExampleRange.parseValue(null)).toThrow(NOT_NUMBER)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleRange.parseLiteral({ value: null, kind: Kind.INT }, {})
        ).toThrow(NOT_NUMBER)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        // @ts-ignore
        expect(() => ExampleRange.serialize()).toThrow(NOT_NUMBER) // eslint-disable-line
      })

      it(`parseValue`, () => {
        // @ts-ignore
        expect(() => ExampleRange.parseValue()).toThrow(NOT_NUMBER)
      })

      it(`parseLiteral`, () => {
        // @ts-ignore
        expect(() => ExampleRange.parseLiteral({ kind: Kind.INT }, {})).toThrow(
          NOT_NUMBER
        )
      })
    })

    describe(`unsafe integer`, () => {
      it(`serialize`, () => {
        expect(() => ExampleRange.serialize(2 ** 53)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleRange.parseValue(2 ** 53)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          ExampleRange.parseLiteral({ value: 2 ** 53, kind: Kind.INT }, {})
        ).toThrow(NOT_NUMBER)
      })
    })

    describe(`outside range`, () => {
      describe(`as int`, () => {
        it(`serialize`, () => {
          expect(() => ExampleRange.serialize(6)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseValue`, () => {
          expect(() => ExampleRange.parseValue(6)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            ExampleRange.parseLiteral({ value: 6, kind: Kind.INT }, {})
          ).toThrow(OUTSIDE_RANGE)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => ExampleRange.serialize(`6`)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseValue`, () => {
          expect(() => ExampleRange.parseValue(`6`)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            ExampleRange.parseLiteral({ value: `6`, kind: Kind.INT }, {})
          ).toThrow(OUTSIDE_RANGE)
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() => ExampleRange.serialize(Number.NEGATIVE_INFINITY)).toThrow(
          NOT_FINITE
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleRange.parseValue(Number.NEGATIVE_INFINITY)).toThrow(
          NOT_FINITE
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleRange.parseLiteral(
            {
              // @ts-ignore
              value: Number.NEGATIVE_INFINITY,
              kind: Kind.INT
            },
            {}
          )
        ).toThrow(NOT_FINITE)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => ExampleRange.serialize(`not a number`)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleRange.parseValue(`not a number`)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleRange.parseLiteral(
            {
              value: `not a number`,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(CANNOT_VALIDATE)
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => ExampleRange.serialize(Number.NaN)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleRange.parseValue(Number.NaN)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          ExampleRange.parseLiteral({ value: Number.NaN, kind: Kind.STRING }, {})
        ).toThrow(CANNOT_VALIDATE)
      })
    })
  })

  const { resolver: ExampleFloatRange } = rangeFactory({
    name: `ExampleFloatRange`,
    start: 0.25,
    end: 5.5,
    float: true
  })

  describe(`valid:float`, () => {
    describe(`as float`, () => {
      it(`serialize`, () => {
        expect(ExampleFloatRange.serialize(3.45)).toBe(3.45)
      })

      it(`parseValue`, () => {
        expect(ExampleFloatRange.parseValue(3.45)).toBe(3.45)
      })

      it(`parseLiteral`, () => {
        expect(
          // @ts-ignore
          ExampleFloatRange.parseLiteral({ value: 3.45, kind: Kind.FLOAT }, {})
        ).toBe(3.45)
      })
    })

    describe(`as string`, () => {
      it(`serialize`, () => {
        expect(ExampleFloatRange.serialize(`3.45`)).toBe(3.45)
      })

      it(`parseValue`, () => {
        expect(ExampleFloatRange.parseValue(`3.45`)).toBe(3.45)
      })

      it(`parseLiteral`, () => {
        expect(
          ExampleFloatRange.parseLiteral({ value: `3.45`, kind: Kind.FLOAT }, {})
        ).toBe(3.45)
      })
    })
  })

  describe(`invalid:float`, () => {
    describe(`null`, () => {
      it(`serialize`, () => {
        expect(() => ExampleFloatRange.serialize(null)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleFloatRange.parseValue(null)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleFloatRange.parseLiteral({ value: null, kind: Kind.FLOAT }, {})
        ).toThrow(NOT_NUMBER)
      })
    })

    describe(`undefined`, () => {
      it(`serialize`, () => {
        // @ts-ignore
        expect(() => ExampleFloatRange.serialize()).toThrow(NOT_NUMBER)
      })

      it(`parseValue`, () => {
        // @ts-ignore
        expect(() => ExampleFloatRange.parseValue()).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleFloatRange.parseLiteral(
            // @ts-ignore
            { kind: Kind.FLOAT },
            {}
          )
        ).toThrow(NOT_NUMBER)
      })
    })

    describe(`outside range`, () => {
      describe(`as float`, () => {
        it(`serialize`, () => {
          expect(() => ExampleFloatRange.serialize(0.123)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseValue`, () => {
          expect(() => ExampleFloatRange.parseValue(0.123)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            // @ts-ignore
            ExampleFloatRange.parseLiteral({ value: 0.123, kind: Kind.FLOAT }, {})
          ).toThrow(OUTSIDE_RANGE)
        })
      })

      describe(`as string`, () => {
        it(`serialize`, () => {
          expect(() => ExampleFloatRange.serialize(`0.123`)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseValue`, () => {
          expect(() => ExampleFloatRange.parseValue(`0.123`)).toThrow(
            OUTSIDE_RANGE
          )
        })

        it(`parseLiteral`, () => {
          expect(() =>
            ExampleFloatRange.parseLiteral({ value: `0.123`, kind: Kind.FLOAT }, {})
          ).toThrow(OUTSIDE_RANGE)
        })
      })
    })

    describe(`infinity`, () => {
      it(`serialize`, () => {
        expect(() => ExampleFloatRange.serialize(Number.NEGATIVE_INFINITY)).toThrow(
          NOT_FINITE
        )
      })

      it(`parseValue`, () => {
        expect(() =>
          ExampleFloatRange.parseValue(Number.NEGATIVE_INFINITY)
        ).toThrow(NOT_FINITE)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleFloatRange.parseLiteral(
            {
              // @ts-ignore
              value: Number.NEGATIVE_INFINITY,
              kind: Kind.FLOAT
            },
            {}
          )
        ).toThrow(NOT_FINITE)
      })
    })

    describe(`not a number`, () => {
      it(`serialize`, () => {
        expect(() => ExampleFloatRange.serialize(`not a number`)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleFloatRange.parseValue(`not a number`)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleFloatRange.parseLiteral(
            {
              value: `not a number`,
              kind: Kind.STRING
            },
            {}
          )
        ).toThrow(
          CANNOT_VALIDATE
        )
      })
    })

    describe(`NaN`, () => {
      it(`serialize`, () => {
        expect(() => ExampleFloatRange.serialize(Number.NaN)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseValue`, () => {
        expect(() => ExampleFloatRange.parseValue(Number.NaN)).toThrow(
          NOT_NUMBER
        )
      })

      it(`parseLiteral`, () => {
        expect(() =>
          ExampleFloatRange.parseLiteral(
            // @ts-ignore
            { value: Number.NaN, kind: Kind.STRING },
            {}
          )
        ).toThrow(
          CANNOT_VALIDATE
        )
      })
    })
  })
})
