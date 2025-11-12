import { sequelize } from '../utils/mysql.database.js'
import { DataTypes } from 'sequelize'

export const Inventory = sequelize.define('inventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: true })
