<h1 align="center">Graphql Scalars</h1>
<p align="center">
  <a href="https://www.npmjs.org/package/@saeris/graphql-scalars">
    <img src="https://img.shields.io/npm/v/@saeris/graphql-scalars.svg?style=flat" alt="npm">
  </a>
  <a href="https://travis-ci.org/Saeris/graphql-scalars">
    <img src="https://travis-ci.org/Saeris/graphql-scalars.svg?branch=master" alt="travis">
  </a>
</p>
<p align="center">A library of custom <a href="http://graphql.org/learn/schema/#scalar-types">GraphQL scalar types</a> for creating precise type-safe GraphQL schemas, with validation powered by <a href="https://github.com/hapijs/joi">Joi</a>.</p>

---

## 🔧 Installation

```bash
npm install --save graphql @saeris/graphql-scalars
# or
yarn add graphql @saeris/graphql-scalars
```

## 📦 Usage

To use these scalars you'll need to add them in two places, your schema and your resolvers map. Here is an example of how to use them with [Apollo Server](https://github.com/apollographql/apollo-server):

```js
import { ApolloServer } from "apollo-server"
import { makeExecutableSchema } from "graphql-tools"
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars"
// Alternatively, import individual scalars and resolvers:
// import { DateTimeScalar, DateTime } from "@saeris/graphql-scalars"

const { scalar: MyRegexScalar, resolver: MyRegex } = RegularExpressionFactory(`MyRegex`, /^abc$/)

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      ...Object.keys(CustomScalars),
      // DateTimeScalar,
      MyRegexScalar
    ],
    resolvers: {
      ...Object.values(CustomScalars),
      // DateTime,
      MyRegex
    }
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
```

Now you can use them in your schema just like you would any other Type/Scalar:

```graphql
type Person {
  birthDate: DateTime
  ageInYears: PositiveInt

  heightInInches: PositiveFloat

  minimumHourlyRate: NonNegativeFloat

  currentlyActiveProjects: NonNegativeInt

  email: EmailAddress
  homePage: URL

  phoneNumber: PhoneNumber
  homePostalCode: PostalCode
}
```

## 📐 Scalars

### DateTime

```js
import { DateTimeScalar, DateTime } from "@saeris/graphql-scalars"
```

Use real JavaScript Dates for GraphQL fields. Currently you can use a String or an Int (e.g., a
timestamp in milliseconds) to represent a date/time. This scalar makes it easy to be explicit about
the type and have a real JavaScript Date returned that the client can use _without_ doing the
inevitable parsing or conversion themselves.

### UnsignedInt

```js
import { UnsignedIntScalar, UnsignedInt } from "@saeris/graphql-scalars"
```

Integers that will have a value of 0 or more. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### NonPositiveInt

```js
import { NonPositiveIntScalar, NonPositiveInt } from "@saeris/graphql-scalars"
```

Integers that will have a value of 0 or less. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### PositiveInt

```js
import { PositiveIntScalar, PositiveInt } from "@saeris/graphql-scalars"
```

Integers that will have a value greater than 0. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### NegativeInt

```js
import { NegativeIntScalar, NegativeInt } from "@saeris/graphql-scalars"
```

Integers that will have a value less than 0. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### UnsignedFloat

```js
import { UnsignedFloatScalar, UnsignedFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value of 0 or more. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### NonPositiveFloat

```js
import { NonPositiveFloatScalar, NonPositiveFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value of 0 or less. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### PositiveFloat

```js
import { PositiveFloatScalar, PositiveFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value greater than 0. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### NegativeFloat

```js
import { NegativeFloatScalar, NegativeFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value less than 0. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### EmailAddress

```js
import { EmailAddressScalar, EmailAddress } from "@saeris/graphql-scalars"
```

A field whose value conforms to the standard internet email address format as specified in
[RFC822](https://www.w3.org/Protocols/rfc822/).

### URL

```js
import { URLScalar, URL } from "@saeris/graphql-scalars"
```

A field whose value conforms to the standard URL format as specified in
[RFC3986](https://www.ietf.org/rfc/rfc3986.txt).

### PhoneNumber

```js
import { PhoneNumberScalar, PhoneNumber } from "@saeris/graphql-scalars"
```

A field whose value conforms to the standard E.164 format as specified in
[E.164 specification](https://en.wikipedia.org/wiki/E.164). Basically this is `+17895551234`.
The very powerful
[`libphonenumber` library](https://github.com/googlei18n/libphonenumber) is available to take
_that_ format, parse and display it in whatever display format you want. It can also be used to
parse user input and _get_ the E.164 format to pass _into_ a schema.

### PostalCode

```js
import { PostalCodeScalar, PostalCode } from "@saeris/graphql-scalars"
```

A field whose value conforms to the standard Portal Code format of any of the following countries:

* US - United States
* GB - United Kingdom
* DE - Germany
* CA - Canada
* FR - France
* IT - Italy
* AU - Australia
* NL - Netherlands
* ES - Spain
* DK - Denmark
* SE - Sweden
* BE - Belgium
* IN - India

Uses [`joi-postalcode`](https://github.com/abythell/joi-postalcode) for validation, which uses [`postal-codes-js`](https://github.com/Cimpress-MCP/postal-codes-js) under the hood.

## 🏭 Factories

### RegularExpressionFactory

```js
import { RegularExpressionFactory } from "@saeris/graphql-scalars"
```

A `GraphQLScalarType` factory that takes two arguments:

* `name` - The name of your custom type
* `regex` - The regex to be used to check against any values for fields with this new type

```js
const { scalar: MyRegexScalar, resolver: MyRegexResolver } = new RegularExpressionFactory('MyRegex', /^ABC$/);
```

## 📣 Acknowledgements

This library was forked from [@okgrow/graphql-scalars](https://github.com/okgrow/graphql-scalars) and uses [Joi](https://github.com/hapijs/joi) for validation.

## 🥂 License

Released under the [MIT license](https://github.com/Saeris/graphql-scalars/blob/master/LICENSE.md).
