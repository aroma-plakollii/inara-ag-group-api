"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientInvoiceByInvoice = exports.getClientInvoiceByClient = exports.getUpdateModel = exports.getCreateModel = exports.deleteClientInvoice = exports.updateClientInvoice = exports.createAllClientInvoices = exports.createClientInvoice = exports.getAllClientInvoices = exports.getSingleClientInvoice = void 0;
const class_validator_1 = require("class-validator");
const InvoiceDAL_1 = require("../data/DataAccessLayer/InvoiceDAL");
const ClientDAL_1 = require("../data/DataAccessLayer/ClientDAL");
const ClientInvoiceDAL_1 = require("../data/DataAccessLayer/ClientInvoiceDAL");
const ActionType_1 = __importDefault(require("../data/helpers/ActionType"));
const getSingleClientInvoice = async (req, res) => {
    const { idClientInvoice } = req.params;
    const clientInvoice = await (0, ClientInvoiceDAL_1.ClientInvoiceGetByPrimaryKey)(idClientInvoice);
    return res.status(200).send(clientInvoice);
};
exports.getSingleClientInvoice = getSingleClientInvoice;
const getAllClientInvoices = async (req, res) => {
    const clientInvoices = await (0, ClientInvoiceDAL_1.ClientInvoiceGetAll)();
    return res.status(200).send({
        clientInvoices
    });
};
exports.getAllClientInvoices = getAllClientInvoices;
const createClientInvoice = async (req, res) => {
    const { description, quantity, price, totalPrice, idClient, idInvoice } = req.body;
    const clientInvoiceData = {
        description,
        quantity,
        price,
        totalPrice,
        idClient,
        idInvoice
    };
    try {
        const clientInvoice = await (0, ClientInvoiceDAL_1.ClientInvoiceCreate)(clientInvoiceData);
        const validationErrors = await (0, class_validator_1.validate)(clientInvoice);
        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        return res.status(200).send({
            status: 200,
            message: 'ClientInvoice create successful',
            clientInvoice
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during ClientInvoice create'
        });
    }
};
exports.createClientInvoice = createClientInvoice;
const createAllClientInvoices = async (req, res) => {
    const clientInvoiceDataArray = req.body;
    try {
        const clientInvoices = await (0, ClientInvoiceDAL_1.ClientInvoiceCreateAll)(clientInvoiceDataArray);
        return res.status(200).send({
            status: 200,
            message: 'Client invoices created successfully',
            clientInvoices
        });
    }
    catch (error) {
        console.error('Error creating client invoices:', error);
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during client invoice creation',
            error
        });
    }
};
exports.createAllClientInvoices = createAllClientInvoices;
const updateClientInvoice = async (req, res) => {
    const { description, quantity, price, totalPrice, idClient, idInvoice } = req.body;
    const { idClientInvoice } = req.params;
    const clientInvoiceData = {
        description,
        quantity,
        price,
        totalPrice,
        idClient,
        idInvoice
    };
    try {
        const clientInvoice = await (0, ClientInvoiceDAL_1.ClientInvoiceUpdate)(idClientInvoice, clientInvoiceData);
        return res.status(200).send({
            status: 200,
            message: 'Invoice update successful',
            clientInvoice
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during invoice update'
        });
    }
};
exports.updateClientInvoice = updateClientInvoice;
const deleteClientInvoice = async (req, res) => {
    const { idClientInvoice } = req.params;
    try {
        const clientInvoice = await (0, ClientInvoiceDAL_1.ClientInvoiceDelete)(idClientInvoice);
        return res.status(200).send({
            status: 200,
            message: 'ClientInvoice remove successful',
            user: clientInvoice
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during clientInvoice removal'
        });
    }
};
exports.deleteClientInvoice = deleteClientInvoice;
const getCreateModel = async (req, res) => {
    const clients = await (0, ClientDAL_1.ClientGetAll)();
    const invoices = await (0, InvoiceDAL_1.InvoiceGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.CREATE,
        clients,
        invoices
    });
};
exports.getCreateModel = getCreateModel;
const getUpdateModel = async (req, res) => {
    const clients = await (0, ClientDAL_1.ClientGetAll)();
    const invoices = await (0, InvoiceDAL_1.InvoiceGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.UPDATE,
        clients,
        invoices
    });
};
exports.getUpdateModel = getUpdateModel;
const getClientInvoiceByClient = async (req, res) => {
    const { idClient } = req.params;
    const clientInvoice = await (0, ClientInvoiceDAL_1.ClientInvoiceGetByClient)(idClient);
    return res.status(200).send(clientInvoice);
};
exports.getClientInvoiceByClient = getClientInvoiceByClient;
const getClientInvoiceByInvoice = async (req, res) => {
    const { idClient } = req.params;
    const clientInvoice = await (0, ClientInvoiceDAL_1.ClientInvoiceGetByClient)(idClient);
    return res.status(200).send(clientInvoice);
};
exports.getClientInvoiceByInvoice = getClientInvoiceByInvoice;
//# sourceMappingURL=ClientInvoiceController.js.map