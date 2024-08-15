"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDestinationGetByBookingPaged = exports.BookingDestinationGetByBooking = exports.BookingDestinationDelete = exports.BookingDestinationUpdate = exports.BookingDestinationCreateAll = exports.BookingDestinationCreate = exports.BookingDestinationGetAllPaged = exports.BookingDestinationGetAll = exports.BookingDestinationGetByPrimaryKey = void 0;
const appDataSource_1 = require("../../db/appDataSource");
const typeorm_1 = require("typeorm");
const BookingDestination_1 = require("../Entity/BookingDestination");
const BookingDestinationGetByPrimaryKey = async (idBookingDestination) => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    return await bookingDestinationRepository.findOne({ where: { idBookingDestination }, relations: ['idBooking'] });
};
exports.BookingDestinationGetByPrimaryKey = BookingDestinationGetByPrimaryKey;
const BookingDestinationGetAll = async () => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    return await bookingDestinationRepository.find({ relations: ['idBooking'] });
};
exports.BookingDestinationGetAll = BookingDestinationGetAll;
const BookingDestinationGetAllPaged = async (page) => {
    const perPage = 20;
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    const offset = (page - 1) * perPage;
    const bookingDestinations = await bookingDestinationRepository.find({
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });
    const totalCount = await bookingDestinationRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);
    return { bookingDestinations, totalPages };
};
exports.BookingDestinationGetAllPaged = BookingDestinationGetAllPaged;
const BookingDestinationCreate = async (bookingDestinationData) => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    bookingDestinationData.createdAt = new Date();
    bookingDestinationData.updatedAt = null;
    const bookingDestination = bookingDestinationRepository.create(bookingDestinationData);
    return await bookingDestinationRepository.save(bookingDestination);
};
exports.BookingDestinationCreate = BookingDestinationCreate;
const BookingDestinationCreateAll = async (bookingDestinationDataArray) => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    const bookingDestinations = bookingDestinationDataArray.map((data) => {
        const booking = bookingDestinationRepository.create({
            ...data,
            createdAt: new Date(),
            updatedAt: null
        });
        return booking;
    });
    return await bookingDestinationRepository.save(bookingDestinations);
};
exports.BookingDestinationCreateAll = BookingDestinationCreateAll;
const BookingDestinationUpdate = async (idBookingDestination, bookingDestinationData) => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    bookingDestinationData.updatedAt = new Date();
    const bookingDestination = await bookingDestinationRepository.findOneBy({ idBookingDestination });
    if (bookingDestination) {
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
exports.BookingDestinationUpdate = BookingDestinationUpdate;
const BookingDestinationDelete = async (idBookingDestination) => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    const bookingDestination = await bookingDestinationRepository.findOneBy({ idBookingDestination });
    if (bookingDestination) {
        return await bookingDestinationRepository.remove(bookingDestination);
    }
};
exports.BookingDestinationDelete = BookingDestinationDelete;
const BookingDestinationGetByBooking = async (idBooking) => {
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    return await bookingDestinationRepository.find({ where: { idBooking: (0, typeorm_1.Equal)(Number(idBooking)) }, relations: ['idBooking'] });
};
exports.BookingDestinationGetByBooking = BookingDestinationGetByBooking;
const BookingDestinationGetByBookingPaged = async (idBooking, page) => {
    const perPage = 20;
    const bookingDestinationRepository = appDataSource_1.AppDataSource.getRepository(BookingDestination_1.BookingDestination);
    const offset = (page - 1) * perPage;
    const [bookingDestinations, totalCount] = await bookingDestinationRepository.findAndCount({
        where: { idBooking: (0, typeorm_1.Equal)(idBooking) },
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });
    const totalPages = Math.ceil(totalCount / perPage);
    return { bookingDestinations, totalPages };
};
exports.BookingDestinationGetByBookingPaged = BookingDestinationGetByBookingPaged;
//# sourceMappingURL=BookingDestinationDAL.js.map