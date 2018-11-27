// class Group {

//   constructor(id, symbol, name) {
//     this.id = id;
//     this.groupSymbol = symbol;
//     this.description = description;
//   }

// };

// export default Group;

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("elamayan_class", {
    groupSymbol: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true },
    description: { type: Sequelize.STRING(100), collate: 'utf8_unicode_ci', defaultValue: null },
    status: { type: Sequelize.INTEGER(11), defaultValue: null },
    price: { type: Sequelize.STRING(10), collate: 'utf8_unicode_ci', defaultValue: null },
    paymentInstallments: { type: Sequelize.INTEGER(11), allowNull: false }
  }, {
    freezeTableName: true,
    paranoid: false,
    timestamps: false
  });
};
