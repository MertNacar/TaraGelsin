import db from "../connection"
import Sequelize from "sequelize"

export default Extras = db.define(
  "tblExtras",
  {
    ExtraID: {
      primaryKey: true,
      type: Sequelize.UUIDV4
    },

    ExtraName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    ExtraCost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
  },
  {
    freezeTableName: true
  }
);