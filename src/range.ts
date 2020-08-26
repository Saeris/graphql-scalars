import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import * as Joi from "@hapi/joi"

interface Config {
	name: string;
	start: number;
	end: number;
	float?: boolean;
}

export const rangeFactory = ({ name, start, end, float = false }: Config) => {
	const validate = (value: string) => {
	  Joi.assert(
	    value,
	    Joi.any().invalid(Infinity, -Infinity),
	    new TypeError(`Value is not a finite number: ${value}`)
	  )
	  Joi.assert(
	    value,
	    Joi.number().required(),
	    new TypeError(`Value is not a number: ${value}`)
	  )
		if (!float) {
			Joi.assert(
		    value,
		    Joi.number().integer(),
		    new TypeError(`Value is not an integer: ${value}`)
		  )
		}
	  const parsed = float ? parseFloat(value) : parseInt(value, 10)
		Joi.assert(
	    parsed,
	    Joi.number().min(start),
	    new TypeError(`Value is less than limit: ${start}: ${parsed}`)
	  )
	  Joi.assert(
	    parsed,
	    Joi.number().max(end),
	    new TypeError(`Value is greater than limit: ${end}: ${parsed}`)
	  )
	  return parsed
	}

  return {
    scalar: `scalar ${name}`,
    resolver: new GraphQLScalarType({
      name,

      description: `A${float ? ` Float` : `n Integer`} with a value between ${start} and ${end} (inclusive).`,

			serialize(value) {
		    return validate(value)
		  },

		  parseValue(value) {
		    return validate(value)
		  },

		  parseLiteral(ast) {
		    if (ast.kind !== (float ? Kind.FLOAT : Kind.INT)) {
		      throw new GraphQLError(
		        `Can only validate ${float ? `Floats` : `Integers`} but got a: ${ast.kind}`
		      )
		    }

		    return validate(ast.value)
		  }
    })
  }
}
