import { Request, Response } from "express";
import { validate } from 'class-validator';
import { InvoiceCreate, InvoiceDelete, InvoiceGetAll, InvoiceGetByPrimaryKey, InvoiceGetLast, InvoiceUpdate } from "../data/DataAccessLayer/InvoiceDAL";
import { Invoice } from "../data/Entity/Invoice";
import { ClientGetAll, ClientGetByPrimaryKey } from "../data/DataAccessLayer/ClientDAL";
import { ClientInvoiceCreate, ClientInvoiceCreateAll, ClientInvoiceDelete, ClientInvoiceGetAll, ClientInvoiceGetByClient, ClientInvoiceGetByPrimaryKey, ClientInvoiceUpdate } from "../data/DataAccessLayer/ClientInvoiceDAL";
import { ClientInvoice } from "../data/Entity/ClientInvoice";
import ActionType from "../data/helpers/ActionType";

export const getSingleClientInvoice = async (req: any, res: any) => {
    const { idClientInvoice } = req.params;
    const clientInvoice = await ClientInvoiceGetByPrimaryKey(idClientInvoice);

    return res.status(200).send(clientInvoice);
};

export const getAllClientInvoices = async (req: any, res: any) => {
    const clientInvoices = await ClientInvoiceGetAll();

    return res.status(200).send({
        clientInvoices
    });
};

export const createClientInvoice = async (req: Request, res: Response) => {
    const { 
        description, 
        quantity,
        price,
        totalPrice,
        idClient,
        idInvoice } = req.body;

    const clientInvoiceData = {
        description, 
        quantity,
        price,
        totalPrice,
        idClient,
        idInvoice 
    } as ClientInvoice;

    try {

        const clientInvoice = await ClientInvoiceCreate(clientInvoiceData);
        const validationErrors = await validate(clientInvoice);

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
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during ClientInvoice create'
        });
    }
};

export const createAllClientInvoices = async (req: Request, res: Response) => {
    const clientInvoiceDataArray = req.body;

    try {
        const clientInvoices = await ClientInvoiceCreateAll(clientInvoiceDataArray);

        return res.status(200).send({
            status: 200,
            message: 'Client invoices created successfully',
            clientInvoices
        });
    } catch (error) {
        console.error('Error creating client invoices:', error);
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during client invoice creation',
            error
        });
    }
};

export const updateClientInvoice = async (req: any, res: any) => {
    const { 
        description, 
        quantity,
        price,
        totalPrice,
        idClient,
        idInvoice } = req.body;
    const { idClientInvoice } = req.params;

    const clientInvoiceData = {
        description, 
        quantity,
        price,
        totalPrice,
        idClient,
        idInvoice 
    } as ClientInvoice;
    try {
        const clientInvoice = await ClientInvoiceUpdate(idClientInvoice, clientInvoiceData);
        
        return res.status(200).send({
            status: 200,
            message: 'Invoice update successful',
            clientInvoice
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during invoice update'
        });
    }
}

export const deleteClientInvoice = async (req: any, res: any) => {
    const { idClientInvoice } = req.params;

    try{
        const clientInvoice = await ClientInvoiceDelete(idClientInvoice);

        return res.status(200).send({
            status: 200,
            message: 'ClientInvoice remove successful',
            user: clientInvoice
        });
    }catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during clientInvoice removal'
        });
    }
};

export const getCreateModel = async (req: Request, res: Response) => {
    const clients = await ClientGetAll();
    const invoices = await InvoiceGetAll();

    return res.status(200).send({
        operation: ActionType.CREATE,
        clients,
        invoices
      });
}

export const getUpdateModel = async (req: Request, res: Response) => {
    const clients = await ClientGetAll();
    const invoices = await InvoiceGetAll();

    return res.status(200).send({
        operation: ActionType.UPDATE,
        clients,
        invoices
    });
}

export const getClientInvoiceByClient = async (req: Request, res: Response) => {
    const { idClient } = req.params;
    const clientInvoice = await ClientInvoiceGetByClient(idClient);

    return res.status(200).send(clientInvoice);
}

export const getClientInvoiceByInvoice = async (req: Request, res: Response) => {
    const { idClient } = req.params;
    const clientInvoice = await ClientInvoiceGetByClient(idClient);

    return res.status(200).send(clientInvoice);
}