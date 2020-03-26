import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'
import Cities from './Cities'

const Branches = db.define(
  "Branches",
  {
    branchID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    pin: {
      type: Sequelize.STRING,
      allowNull: false
    },

    point: {
      type: Sequelize.DECIMAL(2,1),
      defaultValue: null
    },

    discount: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },

    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps:true,
    tableName: "tblBranches"
  }
);

Cities.hasMany(Branches, { foreignKey: 'cityID' });
Branches.belongsTo(Cities, { foreignKey: 'cityID' });

export default Branches