import { Like } from "typeorm";
import { AppDataSource } from "../../db/appDataSource";
import { Client } from "../Entity/Client";

export const ClientGetByPrimaryKey = async (idClient: number) => {
    const clientRepository = AppDataSource.getRepository(Client);

    return await clientRepository.findOne({ where: { idClient }, relations: ['idUser'] });
} 

export const ClientGetAll = async () => {
    const clientRepository = AppDataSource.getRepository(Client);
    return await clientRepository.find({ order: { idClient: 'DESC'}});
}

export const ClientGetAllPaged = async (page: number) => {
    const perPage = 20;
    const clientRepository = AppDataSource.getRepository(Client);
    const offset = (page - 1) * perPage;
    
    const clients = await clientRepository.find({
        relations: ['idUser'],
        order: { idClient: 'DESC'},
        take: perPage,
        skip: offset
    });

    const totalCount = await clientRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return { clients, totalPages };
}

export const ClientGetByNationalId = async (nationalId: string) => {
    const orderRepository = AppDataSource.getRepository(Client);

    return await orderRepository.findOne({
        where: { nationalId}  
    });
}

export const ClientGetByPassportId = async (passportId: string) => {
    const orderRepository = AppDataSource.getRepository(Client);

    return await orderRepository.findOne({
        where: { passportId}  
    });
}

export const ClientCreate = async (clientData: any) => {
    const clientRepository = AppDataSource.getRepository(Client);
    clientData.createdAt = new Date();
    clientData.updatedAt = null;
    const client = clientRepository.create(clientData);
    return await clientRepository.save(client)
}

export const ClientUpdate = async (idClient: number, clientData: any) => {
    const clientRepository = AppDataSource.getRepository(Client);
    clientData.updatedAt = new Date();

    const client = await clientRepository.findOneBy({ idClient });

    if(client){
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

export const ClientDelete = async (idClient: number) => {
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({ idClient });
    
    if(client){
        return await clientRepository.remove(client);
    }
}

export const ClientGetByEmail = (email: string) => {
    return ['get client by email'];
}

export const ClientGetBySearchTerm = async (searchTerm: string) => {
    const clientRepository = AppDataSource.getRepository(Client);
    return await clientRepository.find({
        where: [
            {firstName: Like(`%${searchTerm}%`)},
            {lastName: Like(`%${searchTerm}%`)},
            {nationalId: Like(`%${searchTerm}%`)},
        ]
    });
}