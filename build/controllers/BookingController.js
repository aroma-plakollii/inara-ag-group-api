"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBooking = exports.getBookingByClientPaged = exports.getBookingByClient = exports.getUpdateModel = exports.getCreateModel = exports.deleteBooking = exports.updateBooking = exports.createBookings = exports.getAllBookingsPaged = exports.getAllBookings = exports.getSingleBooking = void 0;
const class_validator_1 = require("class-validator");
const ActionType_1 = __importDefault(require("../data/helpers/ActionType"));
const BookingDAL_1 = require("../data/DataAccessLayer/BookingDAL");
const ClientDAL_1 = require("../data/DataAccessLayer/ClientDAL");
const getSingleBooking = async (req, res) => {
    const { idBooking } = req.params;
    const booking = await (0, BookingDAL_1.BookingGetByPrimaryKey)(idBooking);
    return res.status(200).send(booking);
};
exports.getSingleBooking = getSingleBooking;
const getAllBookings = async (req, res) => {
    const bookings = await (0, BookingDAL_1.BookingGetAll)();
    return res.status(200).send({
        bookings
    });
};
exports.getAllBookings = getAllBookings;
const getAllBookingsPaged = async (req, res) => {
    const { page } = req.params;
    const { bookings, totalPages } = await (0, BookingDAL_1.BookingGetAllPaged)(page);
    return res.status(200).send({
        bookings,
        totalPages
    });
};
exports.getAllBookingsPaged = getAllBookingsPaged;
const createBookings = async (req, res) => {
    const { carrier, bookingDate, flightNumber, flightClass, weight, price, isRoundTrip, hasStop, numberOfStops, idClient } = req.body;
    let existingBooking;
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
        existingBooking = await (0, BookingDAL_1.BookingGetByBookingNumber)(randomNumber.toString());
    } while (existingBooking);
    const bookingData = {
        carrier,
        bookingNumber: randomNumber.toString(),
        bookingDate,
        flightNumber,
        flightClass,
        weight,
        price,
        isRoundTrip,
        hasStop,
        numberOfStops,
        idClient
    };
    try {
        const booking = await (0, BookingDAL_1.BookingCreate)(bookingData);
        const validationErrors = await (0, class_validator_1.validate)(booking);
        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        return res.status(200).send({
            status: 200,
            message: 'Booking create successful',
            booking
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during booking create'
        });
    }
};
exports.createBookings = createBookings;
const updateBooking = async (req, res) => {
    const { carrier, bookingDate, flightNumber, flightClass, weight, price, isRoundTrip, hasStop, numberOfStops, idClient } = req.body;
    const { idBooking } = req.params;
    const bookingData = {
        carrier,
        bookingDate,
        flightNumber,
        flightClass,
        weight,
        price,
        isRoundTrip,
        hasStop,
        numberOfStops,
        idClient
    };
    try {
        const booking = await (0, BookingDAL_1.BookingUpdate)(idBooking, bookingData);
        return res.status(200).send({
            status: 200,
            message: 'Booking update successful',
            booking
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during booking update'
        });
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (req, res) => {
    const { idBooking } = req.params;
    try {
        const booking = await (0, BookingDAL_1.BookingDelete)(idBooking);
        return res.status(200).send({
            status: 200,
            message: 'Passenger remove successful',
            booking: booking
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during passenger removal'
        });
    }
};
exports.deleteBooking = deleteBooking;
const getCreateModel = async (req, res) => {
    const clients = await (0, ClientDAL_1.ClientGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.CREATE,
        clients
    });
};
exports.getCreateModel = getCreateModel;
const getUpdateModel = async (req, res) => {
    const clients = await (0, ClientDAL_1.ClientGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.UPDATE,
        clients
    });
};
exports.getUpdateModel = getUpdateModel;
const getBookingByClient = async (req, res) => {
    const { idClient } = req.params;
    const bookings = await (0, BookingDAL_1.BookingGetByClient)(idClient);
    return res.status(200).send(bookings);
};
exports.getBookingByClient = getBookingByClient;
const getBookingByClientPaged = async (req, res) => {
    const { idClient } = req.params;
    const { page } = req.body;
    const { bookings, totalPages } = await (0, BookingDAL_1.BookingGetByClientPaged)(idClient, page);
    return res.status(200).send({
        bookings,
        totalPages
    });
};
exports.getBookingByClientPaged = getBookingByClientPaged;
const searchBooking = async (req, res) => {
    const { term } = req.params;
    const bookings = await (0, BookingDAL_1.BookingGetBySearchTerm)(term);
    return res.status(200).send(bookings);
};
exports.searchBooking = searchBooking;
//# sourceMappingURL=BookingController.js.map