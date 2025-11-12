import { sequelize } from '../utils/mysql.database.js'
import { DataTypes } from 'sequelize'

export const Sales = sequelize.define('sales', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true })
