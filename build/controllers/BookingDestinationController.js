"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingDestinationByBookingPaged = exports.getBookingDestinationByBooking = exports.getUpdateModel = exports.getCreateModel = exports.deleteBookingDestination = exports.updateBookingDestination = exports.createAllBookingDestinations = exports.createBookingDestinations = exports.getAllBookingDestinationsPaged = exports.getAllBookingDestinations = exports.getSingleBookingDestination = void 0;
const class_validator_1 = require("class-validator");
const ActionType_1 = __importDefault(require("../data/helpers/ActionType"));
const BookingDAL_1 = require("../data/DataAccessLayer/BookingDAL");
const BookingDestinationDAL_1 = require("../data/DataAccessLayer/BookingDestinationDAL");
const getSingleBookingDestination = async (req, res) => {
    const { idBookingDestination } = req.params;
    const bookingDestination = await (0, BookingDestinationDAL_1.BookingDestinationGetByPrimaryKey)(idBookingDestination);
    return res.status(200).send(bookingDestination);
};
exports.getSingleBookingDestination = getSingleBookingDestination;
const getAllBookingDestinations = async (req, res) => {
    const bookingDestinations = await (0, BookingDestinationDAL_1.BookingDestinationGetAll)();
    return res.status(200).send({
        bookingDestinations
    });
};
exports.getAllBookingDestinations = getAllBookingDestinations;
const getAllBookingDestinationsPaged = async (req, res) => {
    const { page } = req.params;
    const { bookingDestinations, totalPages } = await (0, BookingDestinationDAL_1.BookingDestinationGetAllPaged)(page);
    return res.status(200).send({
        bookingDestinations,
        totalPages
    });
};
exports.getAllBookingDestinationsPaged = getAllBookingDestinationsPaged;
const createBookingDestinations = async (req, res) => {
    const { startDestination, endDestination, startDateTime, endDateTime, duration, waitingTime, idBooking } = req.body;
    const bookingDestinationData = {
        startDestination,
        endDestination,
        startDateTime,
        endDateTime,
        duration,
        waitingTime,
        idBooking
    };
    try {
        const bookingDestination = await (0, BookingDestinationDAL_1.BookingDestinationCreate)(bookingDestinationData);
        const validationErrors = await (0, class_validator_1.validate)(bookingDestination);
        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        return res.status(200).send({
            status: 200,
            message: 'Booking Destination create successful',
            bookingDestination
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during Booking Destination create'
        });
    }
};
exports.createBookingDestinations = createBookingDestinations;
const createAllBookingDestinations = async (req, res) => {
    const bookingDestinationDataArray = req.body;
    try {
        const bookingDestinations = await (0, BookingDestinationDAL_1.BookingDestinationCreateAll)(bookingDestinationDataArray);
        return res.status(200).send({
            status: 200,
            message: 'Booking destinations created successfully',
            bookingDestinations
        });
    }
    catch (error) {
        console.error('Error creating client invoices:', error);
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during booking destinations creation',
            error
        });
    }
};
exports.createAllBookingDestinations = createAllBookingDestinations;
const updateBookingDestination = async (req, res) => {
    const { startDestination, endDestination, startDateTime, endDateTime, duration, waitingTime, idBooking } = req.body;
    const { idBookingDestination } = req.params;
    const bookingDestinationData = {
        startDestination,
        endDestination,
        startDateTime,
        endDateTime,
        duration,
        waitingTime,
        idBooking
    };
    try {
        const bookingDestination = await (0, BookingDestinationDAL_1.BookingDestinationUpdate)(idBookingDestination, bookingDestinationData);
        return res.status(200).send({
            status: 200,
            message: 'Booking update successful',
            bookingDestination
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during booking update'
        });
    }
};
exports.updateBookingDestination = updateBookingDestination;
const deleteBookingDestination = async (req, res) => {
    const { idBookingDestination } = req.params;
    try {
        const bookingDestination = await (0, BookingDestinationDAL_1.BookingDestinationDelete)(idBookingDestination);
        return res.status(200).send({
            status: 200,
            message: 'Booking Destination remove successful',
            booking: bookingDestination
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during Booking Destination removal'
        });
    }
};
exports.deleteBookingDestination = deleteBookingDestination;
const getCreateModel = async (req, res) => {
    const bookings = await (0, BookingDAL_1.BookingGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.CREATE,
        bookings
    });
};
exports.getCreateModel = getCreateModel;
const getUpdateModel = async (req, res) => {
    const bookings = await (0, BookingDAL_1.BookingGetAll)();
    return res.status(200).send({
        operation: ActionType_1.default.UPDATE,
        bookings
    });
};
exports.getUpdateModel = getUpdateModel;
const getBookingDestinationByBooking = async (req, res) => {
    const { idBooking } = req.params;
    const bookingDestinations = await (0, BookingDestinationDAL_1.BookingDestinationGetByBooking)(idBooking);
    return res.status(200).send(bookingDestinations);
};
exports.getBookingDestinationByBooking = getBookingDestinationByBooking;
const getBookingDestinationByBookingPaged = async (req, res) => {
    const { idBooking } = req.params;
    const { page } = req.body;
    const { bookingDestinations, totalPages } = await (0, BookingDestinationDAL_1.BookingDestinationGetByBookingPaged)(idBooking, page);
    return res.status(200).send({
        bookingDestinations,
        totalPages
    });
};
exports.getBookingDestinationByBookingPaged = getBookingDestinationByBookingPaged;
//# sourceMappingURL=BookingDestinationController.js.map