import db from "../connection"
import Sequelize from "sequelize"
import CredCards from './CredCards'
import Branches from './Branches'
import Sections from './Sections'
import Tables from './Tables'

const Orders = db.define(
  "tblOrders",
  {
    orderID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    status: {
      type: Sequelize.ENUM('-1', '0', '1', '2'), // 0 -> preparing 1 -> done -1 -> canceled  2-> commented
      defaultValue: '0'
    },

    cost: {
      type: Sequelize.DECIMAL(12, 4),
      allowNull: false
    },

    note: Sequelize.STRING(120),

    comment: Sequelize.STRING(120),

    point: Sequelize.DECIMAL(2, 1)
  }
);

CredCards.hasMany(Orders, { foreignKey: 'cardID', allowNull: false });
Orders.belongsTo(CredCards, { foreignKey: 'cardID', allowNull: false });

Branches.hasMany(Orders, { foreignKey: 'branchID', allowNull: false });
Orders.belongsTo(Branches, { foreignKey: 'branchID', allowNull: false });

Sections.hasMany(Orders, { foreignKey: 'sectionID', allowNull: false });
Orders.belongsTo(Sections, { foreignKey: 'sectionID', allowNull: false });

Tables.hasMany(Orders, { foreignKey: 'tableID', allowNull: false });
Orders.belongsTo(Tables, { foreignKey: 'tableID', allowNull: false });

export default Orders