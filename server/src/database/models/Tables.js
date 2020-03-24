import db from "../connection"
import Sequelize from "sequelize"

const Tables = db.define(
  "tblTables",
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
    timestamps: false
  }
);

export default Tables
