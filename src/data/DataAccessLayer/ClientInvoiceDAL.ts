import { AppDataSource } from "../../db/appDataSource";
import { ClientInvoice } from "../Entity/ClientInvoice";
import { Equal} from "typeorm";

export const ClientInvoiceGetByPrimaryKey = async (idClientInvoice: number) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);

    return await clientInvoiceRepository.findOne({ where: { idClientInvoice }, relations: ['idClient', 'idInvoice'] });
} 

export const ClientInvoiceGetAll = async () => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);
    return await clientInvoiceRepository.find({relations: ['idClient', 'idInvoice']});
}

export const ClientInvoiceCreate = async (clientInvoiceData: any) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);
    clientInvoiceData.createdAt = new Date();
    clientInvoiceData.updatedAt = null;
    const clientInvoice = clientInvoiceRepository.create(clientInvoiceData);
    return await clientInvoiceRepository.save(clientInvoice)
}

export const ClientInvoiceUpdate = async (idClientInvoice: number, clientInvoiceData: any) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);
    clientInvoiceData.updatedAt = new Date();

    const clientInvoice = await clientInvoiceRepository.findOneBy({ idClientInvoice });

    if(clientInvoice){
        clientInvoice.description = clientInvoiceData.description;
        clientInvoice.quantity = clientInvoiceData.quantity;
        clientInvoice.price = clientInvoiceData.price;
        clientInvoice.totalPrice = clientInvoiceData.totalPrice;
        clientInvoice.idClient = clientInvoiceData.idClient;
        clientInvoice.idInvoice = clientInvoiceData.idInvoice;

        return await clientInvoiceRepository.save(clientInvoice);
    }
};

export const ClientInvoiceDelete = async (idClientInvoice: number) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);
    const clientInvoice = await clientInvoiceRepository.findOneBy({ idClientInvoice });
    
    if(clientInvoice){
        return await clientInvoiceRepository.remove(clientInvoice);
    }
}

export const ClientInvoiceCreateAll = async (clientInvoiceDataArray: any) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);
    
    const clientInvoices = clientInvoiceDataArray.map((data : any) => {
        const invoice = clientInvoiceRepository.create({
            ...data,
            createdAt: new Date(),
            updatedAt: null
        });
        return invoice;
    });

    return await clientInvoiceRepository.save(clientInvoices);
}

export const ClientInvoiceGetByClient = async (idClient: string) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);

    return await clientInvoiceRepository.find({ where: { idClient: Equal(Number(idClient)) }, relations: ['idClient', 'idInvoice'] });
}

export const ClientInvoiceGetByInvoice = async (idInvoice: string) => {
    const clientInvoiceRepository = AppDataSource.getRepository(ClientInvoice);

    return await clientInvoiceRepository.find({ where: { idInvoice: Equal(Number(idInvoice)) }, relations: ['idClient', 'idInvoice'] });
}