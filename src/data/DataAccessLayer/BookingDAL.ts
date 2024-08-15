import { AppDataSource } from "../../db/appDataSource";
import { Booking } from "../Entity/Booking";
import { Equal, Like} from "typeorm";

export const BookingGetByPrimaryKey = async (idBooking: number) => {
    const bookingRepository = AppDataSource.getRepository(Booking);

    return await bookingRepository.findOne({ where: { idBooking }, relations: ['idClient'] });
} 

export const BookingGetAll = async () => {
    const bookingRepository = AppDataSource.getRepository(Booking);
    return await bookingRepository.find({ relations: ['idClient'], order: {bookingDate: 'DESC'}});
}

export const BookingGetAllPaged = async (page: number) => {
    const perPage = 20;
    const bookingRepository = AppDataSource.getRepository(Booking);
    const offset = (page - 1) * perPage;

    const bookings = await bookingRepository.find({
        relations: ['idClient'],
        order: {bookingDate: 'DESC'},
        take: perPage,
        skip: offset
    });

    const totalCount = await bookingRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return { bookings, totalPages };
}

export const BookingCreate = async (bookingData: any) => {
    const bookingRepository = AppDataSource.getRepository(Booking);
    bookingData.createdAt = new Date();
    bookingData.updatedAt = null;
    const booking = bookingRepository.create(bookingData);
    return await bookingRepository.save(booking)
}

export const BookingUpdate = async (idBooking: number, bookingData: any) => {
    const bookingRepository = AppDataSource.getRepository(Booking);
    bookingData.updatedAt = new Date();

    const booking = await bookingRepository.findOneBy({ idBooking });

    if(booking){
        booking.carrier = bookingData.carrier;
        booking.bookingNumber = bookingData.bookingNumber;
        booking.bookingDate = bookingData.bookingDate;
        booking.flightNumber = bookingData.flightNumber;
        booking.flightClass = bookingData.flightClass;
        booking.weight = bookingData.weight;
        booking.price = bookingData.price;
        booking.isRoundTrip = bookingData.isRoundTrip;
        booking.hasStop = bookingData.hasStop;
        booking.numberOfStops = bookingData.numberOfStops;
        booking.idClient = bookingData.idClient;

        return await bookingRepository.save(booking);
    }
};

export const BookingDelete = async (idBooking: number) => {
    const bookingRepository = AppDataSource.getRepository(Booking);
    const booking = await bookingRepository.findOneBy({ idBooking });
    
    if(booking){
        return await bookingRepository.remove(booking);
    }
}

export const BookingGetByBookingNumber = async (bookingNumber: string) => {
    const bookingRepository = AppDataSource.getRepository(Booking);

    return await bookingRepository.findOne({ where: { bookingNumber }, relations: ['idClient'] });
} 

export const BookingGetByClient = async (idClient: string) => {
    const bookingRepository = AppDataSource.getRepository(Booking);

    return await bookingRepository.find({ where: { idClient: Equal(Number(idClient)) }, relations: ['idClient'] });
} 

export const BookingGetByClientPaged = async (idClient: string, page: number) => {
    const perPage = 20;
    const bookingRepository = AppDataSource.getRepository(Booking);
    const offset = (page - 1) * perPage;

    const [bookings, totalCount] = await bookingRepository.findAndCount({
        where: { idClient: Equal(idClient) },
        relations: ['idClient'],
        order: { bookingDate: 'DESC'},
        take: perPage,
        skip: offset
    });

    const totalPages = Math.ceil(totalCount / perPage);

    return { bookings, totalPages };
} 

export const BookingGetBySearchTerm = async (searchTerm: string) => {
    const bookingRepository = AppDataSource.getRepository(Booking);
    return await bookingRepository.find({
        where: [
            {bookingNumber: Like(`%${searchTerm}%`)},
        ]
    });
}
