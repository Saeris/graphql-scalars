/* global describe, test, expect */
import { GraphQLScalarType } from "graphql"
import { default as Scalars } from "../"

describe(`bulk export`, () => {
  it(`keys are scalar strings`, () => {
    for (const scalar of Object.keys(Scalars)) {
      expect(typeof scalar).toBe(`string`)
    }
  })

  it(`values are GraphQLScalar resolvers`, () => {
    for (const resolver of Object.values(Scalars)) {
      expect(resolver).toBeInstanceOf(GraphQLScalarType)
    }
  })
})
