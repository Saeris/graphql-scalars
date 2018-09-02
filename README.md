<h1 align="center" style="text-align: center;">Graphql Scalars</h1>
<p align="center">
  <a href="https://www.npmjs.org/package/@saeris/graphql-scalars">
    <img src="https://img.shields.io/npm/v/@saeris/graphql-scalars.svg?style=flat" alt="npm">
  </a>
  <a href="https://travis-ci.org/Saeris/graphql-scalars">
    <img src="https://travis-ci.org/Saeris/graphql-scalars.svg?branch=master" alt="travis">
  </a>
  <a href="https://codecov.io/gh/Saeris/graphql-scalars">
    <img src="https://codecov.io/gh/Saeris/graphql-scalars/branch/master/graph/badge.svg" alt="codecov"/>
  </a>
  <a href="https://snyk.io/test/github/Saeris/graphql-scalars?targetFile=package.json">
    <img src="https://snyk.io/test/github/Saeris/graphql-scalars/badge.svg?targetFile=package.json" alt="Known Vulnerabilities">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/Saeris/graphql-scalars.svg" alt="Known Vulnerabilities" alt="greenkeeper">
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
      ...CustomScalars.keys(),
      // DateTimeScalar,
      MyRegexScalar
    ],
    resolvers: {
      ...CustomScalars.values(),
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

  minimumHourlyRate: UnsignedFloat

  currentlyActiveProjects: UnsignedInt

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

### EmailAddress

```js
import { EmailAddressScalar, EmailAddress } from "@saeris/graphql-scalars"
```

A field whose value conforms to the standard internet email address format as specified in
[RFC822](https://www.w3.org/Protocols/rfc822/).

### GUID
```js
import { GUIDScalar, GUID } from "@saeris/graphql-scalars"
```

A field whose value is a generic [Globally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier).

### Hexadecimal
```js
import { HexadecimalScalar, Hexadecimal } from "@saeris/graphql-scalars"
```

A field whose value is a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal).

### HexColorCode
```js
import { HexColorCodeScalar, HexColorCode } from "@saeris/graphql-scalars"
```

A field whose value is a [hex color code](https://en.wikipedia.org/wiki/Web_colors).

### HSL
```js
import { HSLScalar, HSL } from "@saeris/graphql-scalars"
```

A field whose value is a [CSS HSL color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla()).

### HSLA
```js
import { HSLAScalar, HSLA } from "@saeris/graphql-scalars"
```

A field whose value is a [CSS HSLA color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla()).

### IPv4
```js
import { IPv4Scalar, IPv4 } from "@saeris/graphql-scalars"
```

A field whose value is a [IPv4 address](https://en.wikipedia.org/wiki/IPv4).

### IPv6
```js
import { IPv6Scalar, IPv6 } from "@saeris/graphql-scalars"
```

A field whose value is a [IPv6 address](https://en.wikipedia.org/wiki/IPv6).

### ISBN
```js
import { ISBNScalar, ISBN } from "@saeris/graphql-scalars"
```

A field whose value is a [ISBN-10 or ISBN-13 number](https://en.wikipedia.org/wiki/International_Standard_Book_Number).

### MAC
```js
import { MACScalar, MAC } from "@saeris/graphql-scalars"
```

A field whose value is a IEEE 802 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address).

### NegativeFloat

```js
import { NegativeFloatScalar, NegativeFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value less than 0. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### NegativeInt

```js
import { NegativeIntScalar, NegativeInt } from "@saeris/graphql-scalars"
```

Integers that will have a value less than 0. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### NonPositiveFloat

```js
import { NonPositiveFloatScalar, NonPositiveFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value of 0 or less. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### NonPositiveInt

```js
import { NonPositiveIntScalar, NonPositiveInt } from "@saeris/graphql-scalars"
```

Integers that will have a value of 0 or less. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

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

### Port

```js
import { PortScalar, Port } from "@saeris/graphql-scalars"
```

A field whose value is a valid [TCP port](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports) within the range of 0 to 65535.

### PositiveFloat

```js
import { PositiveFloatScalar, PositiveFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value greater than 0. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### PositiveInt

```js
import { PositiveIntScalar, PositiveInt } from "@saeris/graphql-scalars"
```

Integers that will have a value greater than 0. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

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

### RGB
```js
import { RGBScalar, RGB } from "@saeris/graphql-scalars"
```

A field whose value is a [CSS RGB color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba()).

### RGBA
```js
import { RGBAScalar, RGBA } from "@saeris/graphql-scalars"
```

A field whose value is a [CSS RGBA color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba()).

### UnsignedFloat

```js
import { UnsignedFloatScalar, UnsignedFloat } from "@saeris/graphql-scalars"
```

Floats that will have a value of 0 or more. Uses [`parseFloat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat).

### UnsignedInt

```js
import { UnsignedIntScalar, UnsignedInt } from "@saeris/graphql-scalars"
```

Integers that will have a value of 0 or more. Uses [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt).

### URL

```js
import { URLScalar, URL } from "@saeris/graphql-scalars"
```

A field whose value conforms to the standard URL format as specified in
[RFC3986](https://www.ietf.org/rfc/rfc3986.txt).

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
