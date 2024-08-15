"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassengerByBookingPaged = exports.getPassengerByBooking = exports.searchPassenger = exports.getUpdateModel = exports.getCreateModel = exports.deletePassenger = exports.updatePassenger = exports.createPassenger = exports.getAllPassengersPaged = exports.getAllPassengers = exports.getSinglePassenger = void 0;
const class_validator_1 = require("class-validator");
const ActionType_1 = __importDefault(require("../data/helpers/ActionType"));
const PassengerDAL_1 = require("../data/DataAccessLayer/PassengerDAL");
const BookingDAL_1 = require("../data/DataAccessLayer/BookingDAL");
const getSinglePassenger = async (req, res) => {
    const { idPassenger } = req.params;
    const passenger = await (0, PassengerDAL_1.PassengerGetByPrimaryKey)(idPassenger);
    return res.status(200).send(passenger);
};
exports.getSinglePassenger = getSinglePassenger;
const getAllPassengers = async (req, res) => {
    const passengers = await (0, PassengerDAL_1.PassengerGetAll)();
    return res.status(200).send({
        passengers
    });
};
exports.getAllPassengers = getAllPassengers;
const getAllPassengersPaged = async (req, res) => {
    const { page } = req.params;
    const { passengers, totalPages } = await (0, PassengerDAL_1.PassengerGetAllPaged)(page);
    return res.status(200).send({
        passengers,
        totalPages
    });
};
exports.getAllPassengersPaged = getAllPassengersPaged;
const createPassenger = async (req, res) => {
    const { firstName, lastName, email, phone, dateOfBirth, nationalId, country, idBooking } = req.body;
    const passengerData = {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        nationalId,
        country,
        idBooking
    };
    try {
        const passenger = await (0, PassengerDAL_1.PassengerCreate)(passengerData);
        const validationErrors = await (0, class_validator_1.validate)(passenger);
        if (validationErrors.length > 0) {
            return res.status(400).send({
                status: 400,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        return res.status(200).send({
            status: 200,
            message: 'Passenger create successful',
            passenger
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during passenger create'
        });
    }
};
exports.createPassenger = createPassenger;
const updatePassenger = async (req, res) => {
    const { firstName, lastName, email, phone, dateOfBirth, nationalId, country, idBooking } = req.body;
    const { idPassenger } = req.params;
    const passengerData = {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        nationalId,
        country,
        idBooking
    };
    try {
        const passenger = await (0, PassengerDAL_1.PassengerUpdate)(idPassenger, passengerData);
        return res.status(200).send({
            status: 200,
            message: 'Passenger update successful',
            passenger
        });
    }
    catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during passenger update'
        });
    }
};
exports.updatePassenger = updatePassenger;
const deletePassenger = async (req, res) => {
    const { idPassenger } = req.params;
    try {
        const passenger = await (0, PassengerDAL_1.PassengerDelete)(idPassenger);
        return res.status(200).send({
            status: 200,
            message: 'Passenger remove successful',
            passenger: passenger
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
exports.deletePassenger = deletePassenger;
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
const searchPassenger = async (req, res) => {
    const { term } = req.params;
    const passengers = await (0, PassengerDAL_1.PassengerGetBySearchTerm)(term);
    return res.status(200).send(passengers);
};
exports.searchPassenger = searchPassenger;
const getPassengerByBooking = async (req, res) => {
    const { idBooking } = req.params;
    const passenger = await (0, PassengerDAL_1.PassengerGetByBooking)(idBooking);
    return res.status(200).send(passenger);
};
exports.getPassengerByBooking = getPassengerByBooking;
const getPassengerByBookingPaged = async (req, res) => {
    const { idBooking } = req.params;
    const { page } = req.body;
    const { passengers, totalPages } = await (0, PassengerDAL_1.PassengerGetByBookingPaged)(idBooking, page);
    return res.status(200).send({
        passengers,
        totalPages
    });
};
exports.getPassengerByBookingPaged = getPassengerByBookingPaged;
//# sourceMappingURL=PassengerController.js.map