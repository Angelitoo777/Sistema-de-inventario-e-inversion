import { sequelize } from "../utils/mysql.database.js";
import { DataTypes } from "sequelize";

export const detailsSales = sequelize.define("detailsSales", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price_unitary: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cost_unitary: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

}, { timestamps: true });