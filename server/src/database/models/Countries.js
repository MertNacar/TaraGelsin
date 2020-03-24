import db from "../connection"
import Sequelize from "sequelize"

const Countries = db.define(
  "tblCountries",
  {
    countryID: {
      primaryKey: true,
      type: Sequelize.SMALLINT,
    },

    name: {
      type: Sequelize.CHAR(2),
      allowNull: false
    },
    
    language: {
      type: Sequelize.STRING(2),
      allowNull: false
    },

    phoneCode: {
      type: Sequelize.STRING(5),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default Countries