import { gql } from "apollo-server"

const Query = gql`
  type Query {
    getPerson: Person
  }
`

const Person = gql`
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
`

export const types = [Query, Person]
