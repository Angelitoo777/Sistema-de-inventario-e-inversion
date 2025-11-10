import { Clients } from "../models/associations.js";

export class ClientRepository {
    static async findClientById(clientId) {
        return await Clients.findByPk(clientId);
    }

    static async createClient(clientData) {
        return await Clients.create(clientData);
    }

    static async findByPhoneAndUser(phone, userId) {
        return await Clients.findOne({
            where: {
                phone: phone,
                userId: userId
            }
        });
    }
}