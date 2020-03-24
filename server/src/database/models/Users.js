import db from "../connection"
import Sequelize from "sequelize"
import Countries from './Countries'

const Users = db.define(
  "tblUsers",
  {
    userID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true
    },

    deviceID: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    taraPoint: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },
  }
);

Countries.hasMany(Users, { foreignKey: 'countryID', allowNull: false });
Users.belongsTo(Countries, { foreignKey: 'countryID', allowNull: false });

export default Users