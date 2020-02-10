import db from "../connection"
import Sequelize from "sequelize"
import Countries from './Countries'
import Cities from './Cities'
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

    email: Sequelize.STRING,

    phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true
    },

    deviceID: {
      type: Sequelize.STRING,
      allowNull: false
    },

    taraPoint: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },
  }
);

Countries.hasMany(Users, { foreignKey: 'countryID', allowNull: false });
Users.belongsTo(Countries, { foreignKey: 'countryID', allowNull: false });

Cities.hasMany(Users, { foreignKey: 'cityID' });
Users.belongsTo(Cities, { foreignKey: 'cityID' });

export default Users