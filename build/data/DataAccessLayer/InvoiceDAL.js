"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceGetByClientPaged = exports.InvoiceGetByClient = exports.InvoiceGetLast = exports.InvoiceDelete = exports.InvoiceUpdate = exports.InvoiceCreate = exports.InvoiceGetAllPaged = exports.InvoiceGetAll = exports.InvoiceGetByPrimaryKey = void 0;
const appDataSource_1 = require("../../db/appDataSource");
const Invoice_1 = require("../Entity/Invoice");
const typeorm_1 = require("typeorm");
const InvoiceGetByPrimaryKey = async (idInvoice) => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    return await invoiceRepository.findOne({ where: { idInvoice }, relations: ['idClient'] });
};
exports.InvoiceGetByPrimaryKey = InvoiceGetByPrimaryKey;
const InvoiceGetAll = async () => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    return await invoiceRepository.find({ relations: ['idClient'] });
};
exports.InvoiceGetAll = InvoiceGetAll;
const InvoiceGetAllPaged = async (page) => {
    const perPage = 20;
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    const offset = (page - 1) * perPage;
    const invoices = await invoiceRepository.find({
        relations: ['idClient'],
        take: perPage,
        skip: offset
    });
    const totalCount = await invoiceRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);
    return { invoices, totalPages };
};
exports.InvoiceGetAllPaged = InvoiceGetAllPaged;
const InvoiceCreate = async (invoiceData) => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    invoiceData.createdAt = new Date();
    invoiceData.updatedAt = null;
    const invoice = invoiceRepository.create(invoiceData);
    return await invoiceRepository.save(invoice);
};
exports.InvoiceCreate = InvoiceCreate;
const InvoiceUpdate = async (idInvoice, invoiceData) => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    invoiceData.updatedAt = new Date();
    const invoice = await invoiceRepository.findOneBy({ idInvoice });
    if (invoice) {
        invoice.date = invoiceData.date;
        invoice.description = invoiceData.description;
        invoice.quantity = invoiceData.quantity;
        invoice.price = invoiceData.price;
        invoice.totalPrice = invoiceData.totalPrice;
        invoice.idClient = invoiceData.idClient;
        return await invoiceRepository.save(invoice);
    }
};
exports.InvoiceUpdate = InvoiceUpdate;
const InvoiceDelete = async (idInvoice) => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    const invoice = await invoiceRepository.findOneBy({ idInvoice });
    if (invoice) {
        return await invoiceRepository.remove(invoice);
    }
};
exports.InvoiceDelete = InvoiceDelete;
const InvoiceGetLast = async () => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    // Using find with options to ensure we get only one result, ordered correctly
    const invoices = await invoiceRepository.find({
        order: { createdAt: 'DESC' },
        take: 1
    });
    return invoices[0]; // Return the first and only invoice from the sorted list
};
exports.InvoiceGetLast = InvoiceGetLast;
const InvoiceGetByClient = async (idClient) => {
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    return await invoiceRepository.find({ where: { idClient: (0, typeorm_1.Equal)(Number(idClient)) }, relations: ['idClient'] });
};
exports.InvoiceGetByClient = InvoiceGetByClient;
const InvoiceGetByClientPaged = async (idClient, page) => {
    const perPage = 20;
    const invoiceRepository = appDataSource_1.AppDataSource.getRepository(Invoice_1.Invoice);
    const offset = (page - 1) * perPage;
    const [invoices, totalCount] = await invoiceRepository.findAndCount({
        where: { idClient: (0, typeorm_1.Equal)(idClient) },
        relations: ['idClient'],
        take: perPage,
        skip: offset
    });
    const totalPages = Math.ceil(totalCount / perPage);
    return { invoices, totalPages };
};
exports.InvoiceGetByClientPaged = InvoiceGetByClientPaged;
//# sourceMappingURL=InvoiceDAL.js.map