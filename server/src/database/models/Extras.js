import db from "../connection"
import Sequelize from "sequelize"

const Extras = db.define(
  "Extras",
  {
    extraID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cost: {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: false
    },
  },
  {
    tableName: "tblExtras"
  }
);

export default Extras