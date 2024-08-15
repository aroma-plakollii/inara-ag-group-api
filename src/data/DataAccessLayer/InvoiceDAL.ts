import { AppDataSource } from "../../db/appDataSource";
import { Invoice } from "../Entity/Invoice";
import { Equal} from "typeorm";

export const InvoiceGetByPrimaryKey = async (idInvoice: number) => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);

    return await invoiceRepository.findOne({ where: { idInvoice }, relations: ['idClient'] });
} 

export const InvoiceGetAll = async () => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    return await invoiceRepository.find({relations: ['idClient']});
}

export const InvoiceGetAllPaged = async (page: number) => {
    const perPage = 20;
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const offset = (page - 1) * perPage;

    const invoices = await invoiceRepository.find({
        relations: ['idClient'],
        take: perPage,
        skip: offset
    });

    const totalCount = await invoiceRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return { invoices, totalPages };
}

export const InvoiceCreate = async (invoiceData: any) => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    invoiceData.createdAt = new Date();
    invoiceData.updatedAt = null;
    const invoice = invoiceRepository.create(invoiceData);
    return await invoiceRepository.save(invoice)
}

export const InvoiceUpdate = async (idInvoice: number, invoiceData: any) => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    invoiceData.updatedAt = new Date();

    const invoice = await invoiceRepository.findOneBy({ idInvoice });

    if(invoice){
        invoice.date = invoiceData.date;
        invoice.description = invoiceData.description;
        invoice.quantity = invoiceData.quantity;
        invoice.price = invoiceData.price;
        invoice.totalPrice = invoiceData.totalPrice;
        invoice.idClient = invoiceData.idClient;

        return await invoiceRepository.save(invoice);
    }
};

export const InvoiceDelete = async (idInvoice: number) => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const invoice = await invoiceRepository.findOneBy({ idInvoice });
    
    if(invoice){
        return await invoiceRepository.remove(invoice);
    }
}

export const InvoiceGetLast = async () => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);

    // Using find with options to ensure we get only one result, ordered correctly
    const invoices = await invoiceRepository.find({
        order: { createdAt: 'DESC' },
        take: 1
    });

    return invoices[0]; // Return the first and only invoice from the sorted list
};

export const InvoiceGetByClient = async (idClient: string) => {
    const invoiceRepository = AppDataSource.getRepository(Invoice);

    return await invoiceRepository.find({ where: { idClient: Equal(Number(idClient)) }, relations: ['idClient'] });
}

export const InvoiceGetByClientPaged = async (idClient: string, page: number) => {
    const perPage = 20;
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const offset = (page - 1) * perPage;

    const [invoices, totalCount] = await invoiceRepository.findAndCount({
        where: { idClient: Equal(idClient) },
        relations: ['idClient'],
        take: perPage,
        skip: offset
    });

    const totalPages = Math.ceil(totalCount / perPage);

    return { invoices, totalPages };
}