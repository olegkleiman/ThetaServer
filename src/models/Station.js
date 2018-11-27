// class Station {

//     constructor(id,  StationNumber, role, group) {

//         this.id = id;
//         this.StationNumber = StationNumber;
//         this.role = role;
//         this.group = group;

//     }

//   };

// export default Station;

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Station", {
    stationNumber: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    role: { type: Sequelize.STRING, allowNull: false }
  });
};
