import db from "../connection"
import Sequelize from "sequelize"

const Sections = db.define(
  "Sections",
  {
    sectionID: {
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
    tableName: "tblSections"
  }
);

export default Sections