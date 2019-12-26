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
    }
  },
  {
    timestamps: false
  }
);

export default Countries