import { Users } from "../models/associations.js";

export class UserRepository {
    static async createUser(userData) {
        try {
            return await Users.create(userData);
        } catch (error) {
            throw new Error("Error al crear el usuario: " + error.message);
        }
    }
    static async findByUsername(username) {
        try {
            return await Users.findOne({ where: { username } });
        } catch (error) {
            throw new Error("Error al buscar el usuario: " + error.message);
        }
    }
}