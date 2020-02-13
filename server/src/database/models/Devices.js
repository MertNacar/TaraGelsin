import db from "../connection"
import Sequelize from "sequelize"

const Devices = db.define(
  "tblDevices",
  {
    deviceID: {
      primaryKey: true,
      type: Sequelize.STRING,
    },

    loginDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
  }
);

export default Devices