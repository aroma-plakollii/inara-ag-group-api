"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceByClientPaged = exports.getInvoiceByClient = exports.getUpdateModel = exports.getCreateModel = exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.getAllInvoicesPaged = exports.getAllInvoices = exports.getSingleInvoice = void 0;
const class_validator_1 = require("class-validator");
const InvoiceDAL_1 = require("../data/DataAccessLayer/InvoiceDAL");
const ActionType_1 = __importDefault(require("../data/helpers/ActionType"));
const ClientDAL_1 = require("../data/DataAccessLayer/ClientDAL");
const getSingleInvoice = async (req, res) => {
    const { idInvoice } = req.params;
    const invoice = await (0, InvoiceDAL_1.InvoiceGetByPrimaryKey)(idInvoice);
    return res.status(200).send(invoice);
};
exports.getSingleInvoice = getSingleInvoice;
const getAllInvoices = async (req, res) => {
    const invoices = await (0, InvoiceDAL_1.InvoiceGetAll)();
    return res.status(200).send({
        invoices
    });
};
exports.getAllInvoices = getAllInvoices;
const getAllInvoicesPaged = async (req, res) => {
    const { page } = req.params;
    const { invoices, totalPages } = await (0, InvoiceDAL_1.InvoiceGetAllPaged)(page);
    return res.status(200).send({
        invoices,
        totalPages
    });
};
exports.getAllInvoicesPaged = getAllInvoicesPaged;
const createInvoice = async (req, res) => {
    const { date, description, quantity, price, totalPrice, idClient } = req.body;
    try {
        const lastInvoice = await (0, InvoiceDAL_1.InvoiceGetLast)();
        let invoiceNumber = 'IN001';
        if (lastInvoice) {
            const lastNumber = parseInt(lastInvoice.invoiceNumber.slice(2)); // Assuming invoice number format is 'INXXX'
            const nextNumber = lastNumber + 1;
            invoiceNumber = `IN${nextNumber.toString().padStart(3, '0')}`;
        }
        const invoiceData = {
            invoiceNumber,
            date,
            description,
            quantity,
            price,
            totalPrice,
            idClient,
        };
        const invoice = await (0, InvoiceDAL_1.InvoiceCreate)(invoiceData);
        const validationErrors = await (0, class_validator_1.validate)(invoice);
        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        return res.status(200).send({
            status: 200,
            message: 'Invoice create successful',
            invoice
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during invoice create'
        });
    }
};
exports.createInvoice = createInvoice;
const updateInvoice = async (req, res) => {
    const { date, description, quantity, price, totalPrice, idClient } = req.body;
    const { idInvoice } = req.params;
    const invoiceData = {
        date,
        description,
        quantity,
        price,
        totalPrice,
        idClient,
    };
    try {
        const invoice = await (0, InvoiceDAL_1.InvoiceUpdate)(idInvoice, invoiceData);
        return res.status(200).send({
            status: 200,
            message: 'Invoice update successful',
            invoice
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during invoice update'
        });
    }
};
exports.updateInvoice = updateInvoice;
const deleteInvoice = async (req, res) => {
    const { idInvoice } = req.params;
    try {
        const invoice = await (0, InvoiceDAL_1.InvoiceDelete)(idInvoice);
        return res.status(200).send({
            status: 200,
            message: 'Invoice remove successful',
            user: invoice
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during invoice removal'
        });
    }
};
exports.deleteInvoice = deleteInvoice;
const getCreateModel = async (req, res) => {
    const clients = await (0, ClientDAL_1.ClientGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.CREATE,
        clients,
    });
};
exports.getCreateModel = getCreateModel;
const getUpdateModel = async (req, res) => {
    const clients = await (0, ClientDAL_1.ClientGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.UPDATE,
        clients,
    });
};
exports.getUpdateModel = getUpdateModel;
const getInvoiceByClient = async (req, res) => {
    const { idClient } = req.params;
    const invoices = await (0, InvoiceDAL_1.InvoiceGetByClient)(idClient);
    return res.status(200).send(invoices);
};
exports.getInvoiceByClient = getInvoiceByClient;
const getInvoiceByClientPaged = async (req, res) => {
    const { idClient } = req.params;
    const { page } = req.body;
    const { invoices, totalPages } = await (0, InvoiceDAL_1.InvoiceGetByClientPaged)(idClient, page);
    return res.status(200).send({
        invoices,
        totalPages
    });
};
exports.getInvoiceByClientPaged = getInvoiceByClientPaged;
//# sourceMappingURL=InvoiceController.js.map