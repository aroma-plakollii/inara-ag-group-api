"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientGetBySearchTerm = exports.ClientGetByEmail = exports.ClientDelete = exports.ClientUpdate = exports.ClientCreate = exports.ClientGetByPassportId = exports.ClientGetByNationalId = exports.ClientGetAllPaged = exports.ClientGetAll = exports.ClientGetByPrimaryKey = void 0;
const typeorm_1 = require("typeorm");
const appDataSource_1 = require("../../db/appDataSource");
const Client_1 = require("../Entity/Client");
const ClientGetByPrimaryKey = async (idClient) => {
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    return await clientRepository.findOne({ where: { idClient }, relations: ['idUser'] });
};
exports.ClientGetByPrimaryKey = ClientGetByPrimaryKey;
const ClientGetAll = async () => {
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    return await clientRepository.find({ order: { idClient: 'DESC' } });
};
exports.ClientGetAll = ClientGetAll;
const ClientGetAllPaged = async (page) => {
    const perPage = 20;
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    const offset = (page - 1) * perPage;
    const clients = await clientRepository.find({
        relations: ['idUser'],
        order: { idClient: 'DESC' },
        take: perPage,
        skip: offset
    });
    const totalCount = await clientRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);
    return { clients, totalPages };
};
exports.ClientGetAllPaged = ClientGetAllPaged;
const ClientGetByNationalId = async (nationalId) => {
    const orderRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    return await orderRepository.findOne({
        where: { nationalId }
    });
};
exports.ClientGetByNationalId = ClientGetByNationalId;
const ClientGetByPassportId = async (passportId) => {
    const orderRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    return await orderRepository.findOne({
        where: { passportId }
    });
};
exports.ClientGetByPassportId = ClientGetByPassportId;
const ClientCreate = async (clientData) => {
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    clientData.createdAt = new Date();
    clientData.updatedAt = null;
    const client = clientRepository.create(clientData);
    return await clientRepository.save(client);
};
exports.ClientCreate = ClientCreate;
const ClientUpdate = async (idClient, clientData) => {
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    clientData.updatedAt = new Date();
    const client = await clientRepository.findOneBy({ idClient });
    if (client) {
        client.firstName = clientData.firstName;
        client.lastName = clientData.lastName;
        client.email = clientData.email;
        client.phone = clientData.phone;
        client.dateOfBirth = clientData.dateOfBirth;
        client.nationalId = clientData.nationalId;
        client.passportId = clientData.passportId;
        client.country = clientData.country;
        return await clientRepository.save(client);
    }
};
exports.ClientUpdate = ClientUpdate;
const ClientDelete = async (idClient) => {
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    const client = await clientRepository.findOneBy({ idClient });
    if (client) {
        return await clientRepository.remove(client);
    }
};
exports.ClientDelete = ClientDelete;
const ClientGetByEmail = (email) => {
    return ['get client by email'];
};
exports.ClientGetByEmail = ClientGetByEmail;
const ClientGetBySearchTerm = async (searchTerm) => {
    const clientRepository = appDataSource_1.AppDataSource.getRepository(Client_1.Client);
    return await clientRepository.find({
        where: [
            { firstName: (0, typeorm_1.Like)(`%${searchTerm}%`) },
            { lastName: (0, typeorm_1.Like)(`%${searchTerm}%`) },
            { nationalId: (0, typeorm_1.Like)(`%${searchTerm}%`) },
        ]
    });
};
exports.ClientGetBySearchTerm = ClientGetBySearchTerm;
//# sourceMappingURL=ClientDAL.js.map