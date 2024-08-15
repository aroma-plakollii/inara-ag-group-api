import { Request, Response } from "express";
import { validate } from 'class-validator';
import { InvoiceCreate, InvoiceDelete, InvoiceGetAll, InvoiceGetAllPaged, InvoiceGetByClient, InvoiceGetByClientPaged, InvoiceGetByPrimaryKey, InvoiceGetLast, InvoiceUpdate } from "../data/DataAccessLayer/InvoiceDAL";
import { Invoice } from "../data/Entity/Invoice";
import ActionType from "../data/helpers/ActionType";
import { ClientGetAll } from "../data/DataAccessLayer/ClientDAL";

export const getSingleInvoice = async (req: any, res: any) => {
    const { idInvoice } = req.params;
    const invoice = await InvoiceGetByPrimaryKey(idInvoice);

    return res.status(200).send(invoice);
};

export const getAllInvoices = async (req: any, res: any) => {
    const invoices = await InvoiceGetAll();

    return res.status(200).send({
        invoices
    });
};

export const getAllInvoicesPaged = async (req: any, res: any) => {
    const { page } = req.params;
    const { invoices, totalPages } = await InvoiceGetAllPaged(page);

    return res.status(200).send({
        invoices,
        totalPages
    });
};

export const createInvoice = async (req: Request, res: Response) => {
    const { date, description, quantity, price, totalPrice, idClient} = req.body;

    try {

        const lastInvoice = await InvoiceGetLast();
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
        } as Invoice;

        const invoice = await InvoiceCreate(invoiceData);
        const validationErrors = await validate(invoice);

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
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during invoice create'
        });
    }
};

export const updateInvoice = async (req: any, res: any) => {
    const { date, description, quantity, price, totalPrice, idClient } = req.body;
    const { idInvoice } = req.params;

    const invoiceData = {
        date,
        description, 
        quantity,
        price,
        totalPrice,
        idClient,
    } as Invoice;

    try {
        const invoice = await InvoiceUpdate(idInvoice, invoiceData);
        
        return res.status(200).send({
            status: 200,
            message: 'Invoice update successful',
            invoice
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during invoice update'
        });
    }
}

export const deleteInvoice = async (req: any, res: any) => {
    const { idInvoice } = req.params;

    try{
        const invoice = await InvoiceDelete(idInvoice);

        return res.status(200).send({
            status: 200,
            message: 'Invoice remove successful',
            user: invoice
        });
    }catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during invoice removal'
        });
    }
};

export const getCreateModel = async (req: Request, res: Response) => {
    const clients = await ClientGetAll();

    return res.status(200).send({
        operation: ActionType.CREATE,
        clients,
      });
}

export const getUpdateModel = async (req: Request, res: Response) => {
    const clients = await ClientGetAll();

    return res.status(200).send({
        operation: ActionType.UPDATE,
        clients,
    });
}

export const getInvoiceByClient = async (req: Request, res: Response) => {
    const { idClient } = req.params;
    const invoices = await InvoiceGetByClient(idClient);

    return res.status(200).send(invoices);
}

export const getInvoiceByClientPaged = async (req: Request, res: Response) => {
    const { idClient } = req.params;
    const { page } = req.body;
    const { invoices, totalPages } = await InvoiceGetByClientPaged(idClient, page);

    return res.status(200).send({
        invoices,
        totalPages
    });
}