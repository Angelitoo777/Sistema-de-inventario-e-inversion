import { sequelize } from "../utils/mysql.database.js";
import { DataTypes } from "sequelize";

export const Clients = sequelize.define("clients", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: true });