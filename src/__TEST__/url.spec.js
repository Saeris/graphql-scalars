import { Kind } from "graphql/language"
import { URL } from "../"

describe(`URL`, () => {
  describe(`valid`, () => {
    describe(`standard url`, () => {
      it(`serialize`, () => {
        expect(URL.serialize(`https://test.com`)).toBe(`https://test.com`)
      })

      it(`parseValue`, () => {
        expect(URL.parseValue(`https://test.com`)).toBe(`https://test.com`)
      })

      it(`parseLiteral`, () => {
        expect(URL.parseLiteral({ value: `https://test.com`, kind: Kind.STRING })).toBe(`https://test.com`)
      })
    })

    describe(`localhost`, () => {
      it(`serialize`, () => {
        expect(URL.serialize(`https://localhost:8000`)).toBe(`https://localhost:8000`)
      })

      it(`parseValue`, () => {
        expect(URL.parseValue(`https://localhost:8000`)).toBe(`https://localhost:8000`)
      })

      it(`parseLiteral`, () => {
        expect(URL.parseLiteral({ value: `https://localhost:8000`, kind: Kind.STRING })).toBe(`https://localhost:8000`)
      })
    })

    describe(`host:port`, () => {
      it(`serialize`, () => {
        expect(URL.serialize(`https://127.0.0.1:8000`)).toBe(`https://127.0.0.1:8000`)
      })

      it(`parseValue`, () => {
        expect(URL.parseValue(`https://127.0.0.1:8000`)).toBe(`https://127.0.0.1:8000`)
      })

      it(`parseLiteral`, () => {
        expect(URL.parseLiteral({ value: `https://127.0.0.1:8000`, kind: Kind.STRING })).toBe(`https://127.0.0.1:8000`)
      })
    })

    describe(`data uri`, () => {
      it(`serialize`, () => {
        expect(URL.serialize(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAABJRU5ErkJggg==`)).toBe(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAABJRU5ErkJggg==`)
      })

      it(`parseValue`, () => {
        expect(URL.parseValue(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAABJRU5ErkJggg==`)).toBe(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAABJRU5ErkJggg==`)
      })

      it(`parseLiteral`, () => {
        expect(URL.parseLiteral({ value: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAABJRU5ErkJggg==`, kind: Kind.STRING })).toBe(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAABJRU5ErkJggg==`)
      })
    })
  })

  describe(`invalid`, () => {
    describe(`not a URL`, () => {
      it(`serialize`, () => {
        expect(() => URL.serialize(`this is not a URL`)).toThrow(/Value is not a valid URL/)
      })

      it(`parseValue`, () => {
        expect(() => URL.parseValue(`this is not a URL`)).toThrow(/Value is not a valid URL/)
      })

      it(`parseLiteral`, () => {
        expect(() => URL.parseLiteral({ value: `this is not a URL`, kind: Kind.STRING })).toThrow(
          /Value is not a valid URL/
        )
      })
    })

    describe(`not a string`, () => {
      it(`serialize`, () => {
        expect(() => URL.serialize(123)).toThrow(/Value is not string/)
      })

      it(`parseValue`, () => {
        expect(() => URL.parseValue(123)).toThrow(/Value is not string/)
      })

      it(`parseLiteral`, () => {
        expect(() => URL.parseLiteral({ value: 123, kind: Kind.INT })).toThrow(
          /Can only validate strings as URLs but got a/
        )
      })
    })
  })
})
