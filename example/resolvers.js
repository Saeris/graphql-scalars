export const resolvers = {
  Query: {
    getPerson: () => ({
      birthDate: new Date(),
      ageInYears: 21,
      heightInInches: 70.5,
      minimumHourlyRate: 11.50,
      currentlyActiveProjects: 30,
      email: `test@example.com`,
      homePage: `https://www.example.com`,
      phoneNumber: `+17895551234`,
      homePostalCode: 60031
    })
  }
}
