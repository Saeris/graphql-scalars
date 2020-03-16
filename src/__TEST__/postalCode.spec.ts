import { Kind } from "graphql/language"
import { PostalCode } from "../"

describe(`PostalCode`, () => {
  describe(`valid`, () => {
    describe(`United States`, () => {
      describe(`basic`, () => {
        it(`serialize`, () => {
          expect(PostalCode.serialize(`60031`)).toBe(`60031`)
        })

        it(`parseValue`, () => {
          expect(PostalCode.parseValue(`60031`)).toBe(`60031`)
        })

        it(`parseLiteral`, () => {
          expect(
            PostalCode.parseLiteral({ value: `60031`, kind: Kind.STRING }, {})
          ).toBe(`60031`)
        })
      })
      describe(`plus 4`, () => {
        it(`serialize`, () => {
          expect(PostalCode.serialize(`60031-1234`)).toBe(`60031-1234`)
        })

        it(`parseValue`, () => {
          expect(PostalCode.parseValue(`60031-1234`)).toBe(`60031-1234`)
        })

        it(`parseLiteral`, () => {
          expect(
            PostalCode.parseLiteral(
              { value: `60031-1234`, kind: Kind.STRING },
              {}
            )
          ).toBe(`60031-1234`)
        })
      })
    })

    // TODO: the rest of the countries
    describe(`United Kingdom`, () => {
      // Hi Paul, John, George and Ringo
      it(`serialize`, () => {
        expect(PostalCode.serialize(`NW8 9AY`)).toBe(`NW8 9AY`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`NW8 9AY`)).toBe(`NW8 9AY`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `NW8 9AY`, kind: Kind.STRING }, {})
        ).toBe(`NW8 9AY`)
      })
    })

    describe(`Germany`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`10318`)).toBe(`10318`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`10318`)).toBe(`10318`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `10318`, kind: Kind.STRING }, {})
        ).toBe(`10318`)
      })
    })

    describe(`Canada`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`M5T 1G2`)).toBe(`M5T 1G2`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`M5T 1G2`)).toBe(`M5T 1G2`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `M5T 1G2`, kind: Kind.STRING }, {})
        ).toBe(`M5T 1G2`)
      })
    })

    describe(`France`, () => {
      // Hi Xavier!
      it(`serialize`, () => {
        expect(PostalCode.serialize(`34000`)).toBe(`34000`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`34000`)).toBe(`34000`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `34000`, kind: Kind.STRING }, {})
        ).toBe(`34000`)
      })
    })

    describe(`Italy`, () => {
      // Ahhh...Venice!
      it(`serialize`, () => {
        expect(PostalCode.serialize(`30123`)).toBe(`30123`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`30123`)).toBe(`30123`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `30123`, kind: Kind.STRING }, {})
        ).toBe(`30123`)
      })
    })

    describe(`Australia`, () => {
      // Charles says, "Hi Mom."
      it(`serialize`, () => {
        expect(PostalCode.serialize(`4217`)).toBe(`4217`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`4217`)).toBe(`4217`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `4217`, kind: Kind.STRING }, {})
        ).toBe(`4217`)
      })
    })

    describe(`Netherlands`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`1011 AC`)).toBe(`1011 AC`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`1011 AC`)).toBe(`1011 AC`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `1011 AC`, kind: Kind.STRING }, {})
        ).toBe(`1011 AC`)
      })
    })

    describe(`Spain`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`28009`)).toBe(`28009`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`28009`)).toBe(`28009`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `28009`, kind: Kind.STRING }, {})
        ).toBe(`28009`)
      })
    })

    describe(`Denmark`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`2100`)).toBe(`2100`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`2100`)).toBe(`2100`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `2100`, kind: Kind.STRING }, {})
        ).toBe(`2100`)
      })
    })

    describe(`Sweden`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`114 55`)).toBe(`114 55`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`114 55`)).toBe(`114 55`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `114 55`, kind: Kind.STRING }, {})
        ).toBe(`114 55`)
      })
    })

    describe(`Belgium`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`1043`)).toBe(`1043`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`1043`)).toBe(`1043`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `1043`, kind: Kind.STRING }, {})
        ).toBe(`1043`)
      })
    })

    describe(`India`, () => {
      it(`serialize`, () => {
        expect(PostalCode.serialize(`110003`)).toBe(`110003`)
      })

      it(`parseValue`, () => {
        expect(PostalCode.parseValue(`110003`)).toBe(`110003`)
      })

      it(`parseLiteral`, () => {
        expect(
          PostalCode.parseLiteral({ value: `110003`, kind: Kind.STRING }, {})
        ).toBe(`110003`)
      })
    })
  })

  describe(`invalid`, () => {
    describe(`not a phone number`, () => {
      it(`serialize`, () => {
        expect(() =>
          PostalCode.serialize(`this is not a phone number`)
        ).toThrow(/^Value is not a valid postal code/)
      })

      it(`parseValue`, () => {
        expect(() =>
          PostalCode.parseValue(`this is not a phone number`)
        ).toThrow(/^Value is not a valid postal code/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          PostalCode.parseLiteral(
            { value: `this is not a phone number`, kind: Kind.STRING },
            {}
          )
        ).toThrow(/^Value is not a valid postal code/)
      })
    })

    describe(`not a string`, () => {
      it(`serialize`, () => {
        expect(() => PostalCode.serialize(123)).toThrow(/Value is not string/)
      })

      it(`parseValue`, () => {
        expect(() => PostalCode.parseValue(123)).toThrow(/Value is not string/)
      })

      it(`parseLiteral`, () => {
        expect(() =>
          // @ts-ignore
          PostalCode.parseLiteral({ value: 123, kind: Kind.INT }, {})
        ).toThrow(/Can only validate strings as phone numbers but got a/)
      })
    })
  })
})
