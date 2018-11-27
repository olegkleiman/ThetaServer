// class Day {

//     constructor(id, year, dayOfYear, dayOfWeek, display, display_he, isHoliday, holidayName) {

//         this.id = id;
//         this.year = year;
//         this.dayOfYear = dayOfYear;
//         this.dayOfWeek = dayOfWeek;
//         this.display = display;
//         this.display_he = display_he;
//         this.isHoliday = isHoliday;
//         this.holidayName = holidayName;

//     }

//   };

// export default Day;
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Day", {
    year: { type: Sequelize.STRING, allowNull: false },
    dayOfYear: { type: Sequelize.INTEGER(3), allowNull: false },
    dayOfWeek: { type: Sequelize.INTEGER(1), allowNull: false },
    display: { type: Sequelize.DATEONLY, allowNull: false, primaryKey: true },
    display_he: { type: Sequelize.STRING, allowNull: false },
    isHoliday: { type: Sequelize.BOOLEAN, allowNull: false },
    holidayName: { type: Sequelize.STRING, allowNull: true }
  });
};
