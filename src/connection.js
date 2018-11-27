const Sequelize = require("sequelize");
const DayModel = require("./models/Day");
const GroupModel = require("./models/Group");
const ReportModel = require("./models/Report");
const ScheduleModel = require("./models/Schedule");
const EmployeeModel = require("./models/Employee");
const StationModel = require("./models/Station");
var fs = require("fs");

const sequelize = new Sequelize("test", "test@dbmysqlersver", "q1w2e3r4T%Y^", {
  host: "dbmysqlersver.mysql.database.azure.com",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 1000000
    }
});

const Day = DayModel(sequelize, Sequelize);
const Report = ReportModel(sequelize, Sequelize);
const Group = GroupModel(sequelize, Sequelize);
const Schedule = ScheduleModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const Station = StationModel(sequelize, Sequelize);
let database = JSON.parse(fs.readFileSync("./database.json", "utf8"));
Schedule.belongsTo(Day, { foreignKey: "date" });
Schedule.belongsTo(Employee, { foreignKey: "employeeId" });
Schedule.belongsTo(Station, { foreignKey: "stationNumber" });

Report.belongsTo(Day, { foreignKey: "date" });
Report.belongsTo(Employee, { foreignKey: "employeeId" });
Report.belongsTo(Station, { foreignKey: "stationNumber" });

Station.belongsTo(Group, { foreignKey: "groupSymbol" });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database sync`);
    Day.bulkCreate(database.Days).then(() => {
    Employee.bulkCreate(database.Employees).then(() => {
      // Group.bulkCreate(database.Groups).then(() => {
        Station.bulkCreate(database.Stations).then(() => {
          let length = database.Schedules.length;
          let i = 0;
          while (length >= 0) {
            let arr = [];
            for (let index = 0; index < 1000; index++) {
              if (length >= 0) {
                arr.push(database.Schedules[i])
                length--;
                i++;
              }
            }
            Schedule.bulkCreate(arr).then(() => {
              console.log("Done with Schedule");
            })
          }


          length = database.Reports.length;
          i = 0;
          while (length >= 0) {
            let arr = [];
            for (let index = 0; index < 1000; index++) {
              if (length >= 0) {
                arr.push(database.Reports[i])
                length--;
                i++;
              }
            }
            Report.bulkCreate(arr).then(() => {
              console.log("Done with Report");
            })
          }
        })
      })
    // })
  })
});

module.exports = {
  Day,
  Report,
  Schedule,
  Group,
  Employee,
  Station
};

export default sequelize;
