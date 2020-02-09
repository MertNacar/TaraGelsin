import db from "../connection"
import Sequelize from "sequelize"

const Countries = db.define(
  "tblCountries",
  {
    countryID: {
      primaryKey: true,
      type: Sequelize.SMALLINT,
    },

    countryName: {
      type: Sequelize.CHAR(2),
      allowNull: false
    },
    countryPhoneCode: {
      type: Sequelize.STRING(5),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default Countries