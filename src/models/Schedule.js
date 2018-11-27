// class Schedule {

//     constructor(id,  date, employee, station, in, out) {

//         this.id = id;
//         this.date = date;
//         this.employee = employee;
//         this.station = station;
//         this.in = in;
//         this.out = out;

//     }

//   };

// export default Schedule;

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Schedule", {
    in: { type: Sequelize.TIME, allowNull: true },
    out: { type: Sequelize.TIME, allowNull: true }
  });
};
