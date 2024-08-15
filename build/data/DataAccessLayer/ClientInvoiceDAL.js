"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInvoiceGetByInvoice = exports.ClientInvoiceGetByClient = exports.ClientInvoiceCreateAll = exports.ClientInvoiceDelete = exports.ClientInvoiceUpdate = exports.ClientInvoiceCreate = exports.ClientInvoiceGetAll = exports.ClientInvoiceGetByPrimaryKey = void 0;
const appDataSource_1 = require("../../db/appDataSource");
const ClientInvoice_1 = require("../Entity/ClientInvoice");
const typeorm_1 = require("typeorm");
const ClientInvoiceGetByPrimaryKey = async (idClientInvoice) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    return await clientInvoiceRepository.findOne({ where: { idClientInvoice }, relations: ['idClient', 'idInvoice'] });
};
exports.ClientInvoiceGetByPrimaryKey = ClientInvoiceGetByPrimaryKey;
const ClientInvoiceGetAll = async () => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    return await clientInvoiceRepository.find({ relations: ['idClient', 'idInvoice'] });
};
exports.ClientInvoiceGetAll = ClientInvoiceGetAll;
const ClientInvoiceCreate = async (clientInvoiceData) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    clientInvoiceData.createdAt = new Date();
    clientInvoiceData.updatedAt = null;
    const clientInvoice = clientInvoiceRepository.create(clientInvoiceData);
    return await clientInvoiceRepository.save(clientInvoice);
};
exports.ClientInvoiceCreate = ClientInvoiceCreate;
const ClientInvoiceUpdate = async (idClientInvoice, clientInvoiceData) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    clientInvoiceData.updatedAt = new Date();
    const clientInvoice = await clientInvoiceRepository.findOneBy({ idClientInvoice });
    if (clientInvoice) {
        clientInvoice.description = clientInvoiceData.description;
        clientInvoice.quantity = clientInvoiceData.quantity;
        clientInvoice.price = clientInvoiceData.price;
        clientInvoice.totalPrice = clientInvoiceData.totalPrice;
        clientInvoice.idClient = clientInvoiceData.idClient;
        clientInvoice.idInvoice = clientInvoiceData.idInvoice;
        return await clientInvoiceRepository.save(clientInvoice);
    }
};
exports.ClientInvoiceUpdate = ClientInvoiceUpdate;
const ClientInvoiceDelete = async (idClientInvoice) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    const clientInvoice = await clientInvoiceRepository.findOneBy({ idClientInvoice });
    if (clientInvoice) {
        return await clientInvoiceRepository.remove(clientInvoice);
    }
};
exports.ClientInvoiceDelete = ClientInvoiceDelete;
const ClientInvoiceCreateAll = async (clientInvoiceDataArray) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    const clientInvoices = clientInvoiceDataArray.map((data) => {
        const invoice = clientInvoiceRepository.create({
            ...data,
            createdAt: new Date(),
            updatedAt: null
        });
        return invoice;
    });
    return await clientInvoiceRepository.save(clientInvoices);
};
exports.ClientInvoiceCreateAll = ClientInvoiceCreateAll;
const ClientInvoiceGetByClient = async (idClient) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    return await clientInvoiceRepository.find({ where: { idClient: (0, typeorm_1.Equal)(Number(idClient)) }, relations: ['idClient', 'idInvoice'] });
};
exports.ClientInvoiceGetByClient = ClientInvoiceGetByClient;
const ClientInvoiceGetByInvoice = async (idInvoice) => {
    const clientInvoiceRepository = appDataSource_1.AppDataSource.getRepository(ClientInvoice_1.ClientInvoice);
    return await clientInvoiceRepository.find({ where: { idInvoice: (0, typeorm_1.Equal)(Number(idInvoice)) }, relations: ['idClient', 'idInvoice'] });
};
exports.ClientInvoiceGetByInvoice = ClientInvoiceGetByInvoice;
//# sourceMappingURL=ClientInvoiceDAL.js.map