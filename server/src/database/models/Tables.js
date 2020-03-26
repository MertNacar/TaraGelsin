import db from "../connection"
import Sequelize from "sequelize"

const Tables = db.define(
  "Tables",
  {
    tableID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    name_en: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name_tr: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: "tblTables"
  }
);

export default Tables
