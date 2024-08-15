import { Request, Response } from "express";
import { validate } from 'class-validator';
import ActionType from "../data/helpers/ActionType";
import { ClientCreate, ClientDelete, ClientGetAll, ClientGetAllPaged, ClientGetByNationalId, ClientGetByPassportId, ClientGetByPrimaryKey, ClientGetBySearchTerm, ClientUpdate } from "../data/DataAccessLayer/ClientDAL";
import { Client } from "../data/Entity/Client";
import { UserGetAll } from "../data/DataAccessLayer/UserDAL";

export const getSingleClient = async (req: any, res: any) => {
    const { idClient } = req.params;
    const client = await ClientGetByPrimaryKey(idClient);

    return res.status(200).send(client);
};

export const getAllClients = async (req: any, res: any) => {
    const clients = await ClientGetAll();

    return res.status(200).send({
        clients
    });
};

export const getAllClientsPaged = async (req: any, res: any) => {
    const { page } = req.params;
    
    const { clients, totalPages } = await ClientGetAllPaged(page);

    return res.status(200).send({
        clients,
        totalPages
    });
};


export const createClient = async (req: Request, res: Response) => {
    const {
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        passportId,
        country,
        idUser} = req.body;

    const clientData = {
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        passportId,
        country,
        idUser
    } as Client;

    try {

        const existingClientNationalId = await ClientGetByNationalId(nationalId);
        if (existingClientNationalId) {
            return res.status(409).send({
                status: 409,
                subject: 'nationalId',
                message: 'A client with this national ID already exists.'
            });
        }

        const existingClientPassportId = await ClientGetByPassportId(passportId);
        if (existingClientPassportId) {
            return res.status(409).send({
                status: 409,
                subject: 'passportId',
                message: 'A client with this Passport ID already exists.'
            });
        }

        const client = await ClientCreate(clientData);
        const validationErrors = await validate(client);

        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        
        return res.status(200).send({
            status: 200,
            message: 'Client create successful',
            client
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during client create'
        });
    }
};

export const updateClient = async (req: any, res: any) => {
    const { 
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        passportId,
        country,
        idUser} = req.body;
    const { idClient } = req.params;

    const clientData = {
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        passportId,
        country,
        idUser
    } as Client;

    try {
        const client = await ClientUpdate(idClient, clientData);
        
        return res.status(200).send({
            status: 200,
            message: 'Client update successful',
            client
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during client update'
        });
    }
}

export const deleteClient = async (req: any, res: any) => {
    const { idClient } = req.params;

    try{
        const client = await ClientDelete(idClient);

        return res.status(200).send({
            status: 200,
            message: 'Client remove successful',
            user: client
        });
    }catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during client removal'
        });
    }
};

export const getCreateModel = async (req: Request, res: Response) => {
    const users = await UserGetAll();

    return res.status(200).send({
        operation: ActionType.CREATE,
        users
      });
}

export const getUpdateModel = async (req: Request, res: Response) => {
    const users = await UserGetAll();

    return res.status(200).send({
        operation: ActionType.UPDATE,
        users
    });
}

export const searchClient = async (req: Request, res: Response) => {
    const { term } = req.params;
    const clients = await ClientGetBySearchTerm(term);

    return res.status(200).send(clients);
};
