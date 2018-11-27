const Sequelize = require("sequelize");
const DayModel = require("./models/Day");
const GroupModel = require("./models/Group");
const ReportModel = require("./models/Report");
const ScheduleModel = require("./models/Schedule");
const EmployeeModel = require("./models/Employee");
const StationModel = require("./models/Station");
// var fs = require("fs");
// let database = JSON.parse(fs.readFileSync("./tempDatabase.js", "utf8"));

const sequelize = new Sequelize("test", "test@dbmysqlersver", "q1w2e3r4T%Y^", {
  host: "dbmysqlersver.mysql.database.azure.com",
  dialect: "mysql",
  operatorsAliases: false
});

const Day = DayModel(sequelize, Sequelize);
const Report = ReportModel(sequelize, Sequelize);
const Group = GroupModel(sequelize, Sequelize);
const Schedule = ScheduleModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const Station = StationModel(sequelize, Sequelize);

Schedule.belongsTo(Day, { foreignKey: "date" });
Schedule.belongsTo(Employee, { foreignKey: "employeeId" });
Schedule.belongsTo(Station, { foreignKey: "stationNumber" });

Report.belongsTo(Day, { foreignKey: "date" });
Report.belongsTo(Employee, { foreignKey: "employeeId" });
Report.belongsTo(Station, { foreignKey: "stationNumber" });

Station.belongsTo(Group, { foreignKey: "groupSymbol" });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database sync`);
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
