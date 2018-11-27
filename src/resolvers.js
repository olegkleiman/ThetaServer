import { ApolloError, PubSub } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  Day,
  Report,
  Schedule,
  Group,
  Employee,
  Station
} = require("./connection");

export let resolvers = {
  Query: {
    employee: (_, {id}) => {
      return Employee.findById(id);
    },
    employees: (_) => {

      return Employee.findAll();

      // const db = new Database();
      // return db.getEmployees();
    },
    group: (_, {id}) => {
      return Group.findById(id);
    },
    groups: () => {
      return Group.findAll();
    },
    station: (_, {id}) => {
      return Station.findById(id);
    },
    stations: () => {
      return Station.findAll();
    },
    day: (_, {id}) => {
      return Day.findById(id);
    },
    days: () => {
      return Day.findAll();
    },
    report: (_, {id}) => {
      return Report.findById(id);
    },
    reports: () => {
      return Report.findAll();
    },
    schedule: (_, {id}) => {
      return Schedule.findById(id);
    },
    schedules: (_, {groupSymbol}) => {
      // const db = new Database();
      // return db.getSchedules(groupSymbol);
      return Schedule.findById(groupSymbol);
    },

  },

  Employee: {
    schedules: (employee, args) => {
      return Schedule.findAll({
        where: {
          date: {
            [Op.between]: [args.from, args.till]
          },
          employeeId: employee.id
        }
      });
    },
    reports: (employee, args) => {
      return Report.findAll({
        where: {
          date: {
            [Op.between]: [args.from, args.till]
          },
          employeeId: employee.id
        }
      });
    }
  },

  Station: {
    group: station => {
      return Group.findById(station.groupSymbol);
    }
  },

  Day: {
    schedules: (day, args) => {
      let query = [];
      if (args.employees) {
        args.employees.forEach(element => {
          query.push({ employeeId: element });
        });
      }
      if (args.stations) {
        args.stations.forEach(element => {
          query.push({ stationNumber: element });
        });
      }
      return Schedule.findAll({
        where: {
          date: day.display,
          [Op.or]: query
        }
      });
    },
    reports: (day, args) => {
      let query = [];
      if (args.employees) {
        args.employees.forEach(element => {
          query.push({ employeeId: element });
        });
      }
      if (args.stations) {
        args.stations.forEach(element => {
          query.push({ stationNumber: element });
        });
      }
      return Report.findAll({
        where: {
          date: day.display,
          [Op.or]: query
        }
      });
    }
  },

  Schedule: {
    date: schedule => {
      return Day.findById(moment(schedule.date).format("YYYY-MM-DD"));
    },
    employee: schedule => {
      return Employee.findById(schedule.employeeId);
    },
    station: schedule => {
      return Station.findById(schedule.stationNumber);
    }
  },

  Report: {
    date: report => {
      return Day.findById(moment(report.date).format("YYYY-MM-DD"));
    },
    employee: report => {
      return Employee.findById(report.employeeId);
    },
    station: report => {
      return Station.findById(report.stationNumber);
    }
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return moment(value);
    },
    serialize(value) {
      return value.format("YYYY-MM-DD"); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return value; // ast value is always in string format
      }
      return null;
    }
  })

}
