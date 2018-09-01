import { DateTimeScalar, DateTime } from "./dateTime"
import { EmailAddressScalar, EmailAddress } from "./emailAddress"
import { NegativeFloatScalar, NegativeFloat } from "./negativeFloat"
import { NegativeIntScalar, NegativeInt } from "./negativeInt"
import { NonPositiveFloatScalar, NonPositiveFloat } from "./nonPositiveFloat"
import { NonPositiveIntScalar, NonPositiveInt } from "./nonPositiveInt"
import { PhoneNumberScalar, PhoneNumber } from "./phoneNumber"
import { PositiveFloatScalar, PositiveFloat } from "./positiveFloat"
import { PositiveIntScalar, PositiveInt } from "./positiveInt"
import { PostalCodeScalar, PostalCode } from "./postalCode"
import { UnsignedFloatScalar, UnsignedFloat } from "./unsignedFloat"
import { UnsignedIntScalar, UnsignedInt } from "./unsignedInt"
import { URLScalar, URL } from "./url"

export { RegularExpressionFactory } from "./regularExpression"

export {
  DateTimeScalar,
  DateTime,
  EmailAddressScalar,
  EmailAddress,
  NegativeFloatScalar,
  NegativeFloat,
  NegativeIntScalar,
  NegativeInt,
  NonPositiveFloatScalar,
  NonPositiveFloat,
  NonPositiveIntScalar,
  NonPositiveInt,
  PhoneNumberScalar,
  PhoneNumber,
  PositiveFloatScalar,
  PositiveFloat,
  PositiveIntScalar,
  PositiveInt,
  PostalCodeScalar,
  PostalCode,
  UnsignedFloatScalar,
  UnsignedFloat,
  UnsignedIntScalar,
  UnsignedInt,
  URLScalar,
  URL
}

export default new Map([
  [DateTimeScalar, DateTime],
  [EmailAddressScalar, EmailAddress],
  [NegativeFloatScalar, NegativeFloat],
  [NegativeIntScalar, NegativeInt],
  [NonPositiveFloatScalar, NonPositiveFloat],
  [NonPositiveIntScalar, NonPositiveInt],
  [PhoneNumberScalar, PhoneNumber],
  [PositiveFloatScalar, PositiveFloat],
  [PositiveIntScalar, PositiveInt],
  [PostalCodeScalar, PostalCode],
  [UnsignedFloatScalar, UnsignedFloat],
  [UnsignedIntScalar, UnsignedInt],
  [URLScalar, URL]
])
