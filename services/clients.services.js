import { ClientRepository } from "../repository/client.repository.js";

export class ClientService {
    static async createClient(data) {
        const existingClient = await ClientRepository.findByPhoneAndUser(data.phone, data.userId);

        if (existingClient) {
            throw new Error("Ya existe un cliente con este número de teléfono para el usuario dado.");
        }

        const newClient = await ClientRepository.createClient({
            name: data.name,
            phone: data.phone,
            userId: data.userId
        });

        return newClient
    }
}