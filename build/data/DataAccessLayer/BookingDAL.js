"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingGetBySearchTerm = exports.BookingGetByClientPaged = exports.BookingGetByClient = exports.BookingGetByBookingNumber = exports.BookingDelete = exports.BookingUpdate = exports.BookingCreate = exports.BookingGetAllPaged = exports.BookingGetAll = exports.BookingGetByPrimaryKey = void 0;
const appDataSource_1 = require("../../db/appDataSource");
const Booking_1 = require("../Entity/Booking");
const typeorm_1 = require("typeorm");
const BookingGetByPrimaryKey = async (idBooking) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    return await bookingRepository.findOne({ where: { idBooking }, relations: ['idClient'] });
};
exports.BookingGetByPrimaryKey = BookingGetByPrimaryKey;
const BookingGetAll = async () => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    return await bookingRepository.find({ relations: ['idClient'], order: { bookingDate: 'DESC' } });
};
exports.BookingGetAll = BookingGetAll;
const BookingGetAllPaged = async (page) => {
    const perPage = 20;
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    const offset = (page - 1) * perPage;
    const bookings = await bookingRepository.find({
        relations: ['idClient'],
        order: { bookingDate: 'DESC' },
        take: perPage,
        skip: offset
    });
    const totalCount = await bookingRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);
    return { bookings, totalPages };
};
exports.BookingGetAllPaged = BookingGetAllPaged;
const BookingCreate = async (bookingData) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    bookingData.createdAt = new Date();
    bookingData.updatedAt = null;
    const booking = bookingRepository.create(bookingData);
    return await bookingRepository.save(booking);
};
exports.BookingCreate = BookingCreate;
const BookingUpdate = async (idBooking, bookingData) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    bookingData.updatedAt = new Date();
    const booking = await bookingRepository.findOneBy({ idBooking });
    if (booking) {
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
exports.BookingUpdate = BookingUpdate;
const BookingDelete = async (idBooking) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    const booking = await bookingRepository.findOneBy({ idBooking });
    if (booking) {
        return await bookingRepository.remove(booking);
    }
};
exports.BookingDelete = BookingDelete;
const BookingGetByBookingNumber = async (bookingNumber) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    return await bookingRepository.findOne({ where: { bookingNumber }, relations: ['idClient'] });
};
exports.BookingGetByBookingNumber = BookingGetByBookingNumber;
const BookingGetByClient = async (idClient) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    return await bookingRepository.find({ where: { idClient: (0, typeorm_1.Equal)(Number(idClient)) }, relations: ['idClient'] });
};
exports.BookingGetByClient = BookingGetByClient;
const BookingGetByClientPaged = async (idClient, page) => {
    const perPage = 20;
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    const offset = (page - 1) * perPage;
    const [bookings, totalCount] = await bookingRepository.findAndCount({
        where: { idClient: (0, typeorm_1.Equal)(idClient) },
        relations: ['idClient'],
        order: { bookingDate: 'DESC' },
        take: perPage,
        skip: offset
    });
    const totalPages = Math.ceil(totalCount / perPage);
    return { bookings, totalPages };
};
exports.BookingGetByClientPaged = BookingGetByClientPaged;
const BookingGetBySearchTerm = async (searchTerm) => {
    const bookingRepository = appDataSource_1.AppDataSource.getRepository(Booking_1.Booking);
    return await bookingRepository.find({
        where: [
            { bookingNumber: (0, typeorm_1.Like)(`%${searchTerm}%`) },
        ]
    });
};
exports.BookingGetBySearchTerm = BookingGetBySearchTerm;
//# sourceMappingURL=BookingDAL.js.map