import db from "../connection"
import Sequelize from "sequelize"
import Countries from './Countries'
import Cities from './Cities'
import Devices from './Devices'

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
  }
);

Countries.hasMany(Users, { foreignKey: 'countryID', allowNull: false });
Users.belongsTo(Countries, { foreignKey: 'countryID', allowNull: false });

Cities.hasMany(Users, { foreignKey: 'cityID' });
Users.belongsTo(Cities, { foreignKey: 'cityID' });

Devices.hasMany(Users, { foreignKey: 'deviceID' });
Users.belongsTo(Devices, { foreignKey: 'deviceID' });

export default Users