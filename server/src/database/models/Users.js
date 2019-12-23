import db from "../connection"
import Sequelize from "sequelize"

const Users = db.define(
  "tblUsers",
  {
    userID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: Sequelize.STRING,

    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },

    birthday: Sequelize.DATE,

    gender: {
      type: Sequelize.CHAR,
      defaultValue: "u"
    },

    taraPoint: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },
  }
);

export default Users