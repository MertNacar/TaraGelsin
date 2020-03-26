import db from "../connection"
import Sequelize from "sequelize"
import Countries from './Countries'

const Cities = db.define(
  "Cities",
  {
    cityID: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    zipCode: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
  },
  {
    tableName: "tblCities"
  }
);

Countries.hasMany(Cities, { foreignKey: 'countryID', allowNull: false });
Cities.belongsTo(Countries, { foreignKey: 'countryID', allowNull: false });

export default Cities