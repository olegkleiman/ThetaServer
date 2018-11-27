
// class Employee {

//   constructor(id, firstName, lastName, birthday, phone, registrationDate) {
//     this.id = id;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.birthday = birthday;
//     this.registrationDate = registrationDate;
//     this.phone = phone;

//   }

// };

// export default Employee;

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Employee", {
    id: { type: Sequelize.STRING(9), primaryKey: true, allowNull: false},
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    birthday: { type: Sequelize.DATEONLY, allowNull: false },
    registrationDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    phone: { type: Sequelize.STRING, allowNull: false, unique: true }
  });
};
