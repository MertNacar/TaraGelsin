import db from "../connection"
import Sequelize from "sequelize"
import Countries from './Countries'

const Cities = db.define(
  "tblCities",
  {
    cityID: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    cityName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cityZipCode: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
  },
  {
    timestamps: false
  }
);

Countries.hasMany(Cities, { foreignKey: 'countryID', allowNull: false });
Cities.belongsTo(Countries, { foreignKey: 'countryID', allowNull: false });

export default Cities