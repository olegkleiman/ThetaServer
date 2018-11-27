var casual = require("casual");
var moment = require("moment");
var fs = require("fs");

let Days = JSON.parse(fs.readFileSync("./calendar.json", "utf8"));
let Groups = JSON.parse(fs.readFileSync("./groups.json", "utf8"));


let roles = ["רכז", "סייעת", "גננת", "מדריכה", "מנהלת"];

let Employees = [];
let employeeIds = {};

for (let index = 0; index < Groups.length * 5; index++) {
  let ei = casual.integer(111111111, 999999999).toString();
  if(! employeeIds[ei] ){
  Employees[index] = {
      id: ei ,
      firstName: casual.first_name,
      lastName: casual.last_name,
      birthday: casual.date("YYYY-MM-DD"),
      registrationDate: casual.date("YYYY-MM-DD"),
      phone: casual.phone
    };
  }
  else{
    index--
  }
  employeeIds[ei] = true;
}
let Stations = [];
let StationsNum = {};
for (let index = 0; index < Groups.length * roles.length; index++) {
  let sn = casual.integer(11111, 99999);
  if(! StationsNum[sn.toString()] ){
    Stations[index] = {
      stationNumber: sn,
      role: roles[casual.integer(0, roles.length - 1)],
      groupSymbol: parseInt(Groups[casual.integer(0, Groups.length - 1)].groupSymbol, 10)
    };
  }
  else{
    index--
  }
  StationsNum[sn.toString()] = true;
}
let Schedules = [];
for (let index = 0; index < Employees.length * 300; index++) {
  let _in = casual.time("HH:mm:ss");
  let _out = casual.time("HH:mm:ss");
  if (moment(_out, "HH:mm:ss").isBefore(_in, "HH:mm:ss")) {
    let temp = _in;
    _in = _out;
    _out = temp;
  }

  Schedules[index] = {
    date: Days[casual.integer(0, Days.length - 1)].display,
    employeeId: Employees[casual.integer(0, Employees.length - 1)].id,
    stationNumber:
      Stations[casual.integer(0, Groups.length * roles.length - 1)]
        .stationNumber,
    in: _in,
    out: _out
  };
}
let Reports = [];
for (let index = 0; index < Employees.length * 300; index++) {
  let _in = casual.time("HH:mm:ss");
  let _out = casual.time("HH:mm:ss");
  if (moment(_out, "HH:mm:ss").isBefore(_in, "HH:mm:ss")) {
    let temp = _in;
    _in = _out;
    _out = temp;
  }

  Reports[index] = {
    date: Days[casual.integer(0, Days.length - 1)].display,
    employeeId: Employees[casual.integer(0, Employees.length - 1)].id,
    stationNumber:
      Stations[casual.integer(0, Groups.length * roles.length - 1)]
        .stationNumber,
    in: _in,
    out: casual.coin_flip ? _out : null
  };
}

let database = {
  Days: Days,
  Employees: Employees,
  Groups: Groups,
  Stations: Stations,
  Schedules: Schedules,
  Reports: Reports
};

fs.writeFile("database.json", JSON.stringify(database), function(
  err
) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});


