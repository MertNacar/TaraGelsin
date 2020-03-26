import db from "../connection"
import Sequelize from "sequelize"

const Countries = db.define(
  "Countries",
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
    tableName: "tblCountries"
  }
);

export default Countries