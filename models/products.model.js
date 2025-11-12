import { sequelize } from '../utils/mysql.database.js'
import { DataTypes } from 'sequelize'

export const Products = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  selling_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cost_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, { timestamps: true })
