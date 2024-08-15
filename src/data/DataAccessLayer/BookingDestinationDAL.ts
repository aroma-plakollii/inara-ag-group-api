import { AppDataSource } from "../../db/appDataSource";
import { Equal} from "typeorm";
import { BookingDestination } from "../Entity/BookingDestination";

export const BookingDestinationGetByPrimaryKey = async (idBookingDestination: number) => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);

    return await bookingDestinationRepository.findOne({ where: { idBookingDestination }, relations: ['idBooking'] });
} 

export const BookingDestinationGetAll = async () => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    return await bookingDestinationRepository.find({ relations: ['idBooking'] });
}

export const BookingDestinationGetAllPaged = async (page: number) => {
    const perPage = 20;
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    const offset = (page - 1) * perPage;

    const bookingDestinations = await bookingDestinationRepository.find({
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });

    const totalCount = await bookingDestinationRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return { bookingDestinations, totalPages };
}

export const BookingDestinationCreate = async (bookingDestinationData: any) => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    bookingDestinationData.createdAt = new Date();
    bookingDestinationData.updatedAt = null;
    const bookingDestination = bookingDestinationRepository.create(bookingDestinationData);
    return await bookingDestinationRepository.save(bookingDestination)
}

export const BookingDestinationCreateAll = async (bookingDestinationDataArray: any) => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    
    const bookingDestinations = bookingDestinationDataArray.map((data : any) => {
        const booking = bookingDestinationRepository.create({
            ...data,
            createdAt: new Date(),
            updatedAt: null
        });
        return booking;
    });

    return await bookingDestinationRepository.save(bookingDestinations);
}

export const BookingDestinationUpdate = async (idBookingDestination: number, bookingDestinationData: any) => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    bookingDestinationData.updatedAt = new Date();

    const bookingDestination = await bookingDestinationRepository.findOneBy({ idBookingDestination });

    if(bookingDestination){
        bookingDestination.startDestination = bookingDestinationData.startDestination;
        bookingDestination.endDestination = bookingDestinationData.endDestination;
        bookingDestination.startDateTime = bookingDestinationData.startDateTime;
        bookingDestination.endDateTime = bookingDestinationData.endDateTime;
        bookingDestination.duration = bookingDestinationData.duration;
        bookingDestination.waitingTime = bookingDestinationData.waitingTime;
        bookingDestination.idBooking = bookingDestinationData.idBooking;

        return await bookingDestinationRepository.save(bookingDestination);
    }
};

export const BookingDestinationDelete = async (idBookingDestination: number) => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    const bookingDestination = await bookingDestinationRepository.findOneBy({ idBookingDestination });
    
    if(bookingDestination){
        return await bookingDestinationRepository.remove(bookingDestination);
    }
}

export const BookingDestinationGetByBooking = async (idBooking: string) => {
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);

    return await bookingDestinationRepository.find({ where: { idBooking: Equal(Number(idBooking)) }, relations: ['idBooking'] });
} 

export const BookingDestinationGetByBookingPaged = async (idBooking: string, page: number) => {
    const perPage = 20;
    const bookingDestinationRepository = AppDataSource.getRepository(BookingDestination);
    const offset = (page - 1) * perPage;

    const [bookingDestinations, totalCount] = await bookingDestinationRepository.findAndCount({
        where: { idBooking: Equal(idBooking) },
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });

    const totalPages = Math.ceil(totalCount / perPage);

    return { bookingDestinations, totalPages };
} 