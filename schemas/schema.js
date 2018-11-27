const { gql } = require('apollo-server');
export let typeDefs = gql`

  interface INode  {
    id: ID!
  }

  scalar Date

  type Employee implements INode {
    id: ID!
    firstName: String!
    lastName: String!
    birthday: String!
    registrationString: String!
    phone: String!
    schedules(from: String!, till: String!): [Schedule]
    reports(from: String!, till: String!): [Report]
  }

  type Group implements INode {
    id: ID!

    description: String
    groupSymbol: Int!
    status: String
  }

 type Day implements INode {
    id: ID!
    year: Int!
    dayOfYear: Int!
    dayOfWeek: Int!
    display: String!
    display_he: String!
    isHoliday: Boolean!
    holidayName: String!
    schedules(employees: [Int], stations: [Int]): [Schedule]
    reports(employees: [Int], stations: [Int]): [Report]
  }


  type Station implements INode {
    id: ID!
    stationNumber: Int!
    role: String!
    group: Group
    schedules(from: String!, till: String!): [Schedule]
    reports(from: String!, till: String!): [Report]
  }

  type Schedule implements INode {
    id: ID!
    date: Day!
    employee: Employee!
    station: Station!
    in: String!
    out: String!
  }

  type Report implements INode {
    id: ID!
    date: Day!
    employee: Employee!
    station: Station!
    in: String
    out: String
  }

  type Query {
    employees: [Employee]
    employee(id: Int!): Employee
    group(symbole: Int!): Group
    groups: [Group]
    station(StationNumber: Int!): Station
    stations(group: Int): [Station]
    day(data: String!): Day
    days(from: String, till: String): [Day]
    report(data: String!): Report
    reports(from: String!, till: String!): [Report]
    schedule(data: Date!): Schedule
    schedules(from: String!, till: String!): [Schedule]
  }

`;
