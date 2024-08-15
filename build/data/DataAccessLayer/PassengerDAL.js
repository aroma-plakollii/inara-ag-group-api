"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerGetByBookingPaged = exports.PassengerGetByBooking = exports.PassengerGetBySearchTerm = exports.PassengerDelete = exports.PassengerUpdate = exports.PassengerCreate = exports.PassengerGetAllPaged = exports.PassengerGetAll = exports.PassengerGetByPrimaryKey = void 0;
const typeorm_1 = require("typeorm");
const appDataSource_1 = require("../../db/appDataSource");
const Passenger_1 = require("../Entity/Passenger");
const PassengerGetByPrimaryKey = async (idPassenger) => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    return await passengerRepository.findOne({ where: { idPassenger }, relations: ['idBooking'] });
};
exports.PassengerGetByPrimaryKey = PassengerGetByPrimaryKey;
const PassengerGetAll = async () => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    return await passengerRepository.find({ relations: ['idBooking'] });
};
exports.PassengerGetAll = PassengerGetAll;
const PassengerGetAllPaged = async (page) => {
    const perPage = 20;
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    const offset = (page - 1) * perPage;
    const passengers = await passengerRepository.find({
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });
    const totalCount = await passengerRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);
    return { passengers, totalPages };
};
exports.PassengerGetAllPaged = PassengerGetAllPaged;
const PassengerCreate = async (passengerData) => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    passengerData.createdAt = new Date();
    passengerData.updatedAt = null;
    const passenger = passengerRepository.create(passengerData);
    return await passengerRepository.save(passenger);
};
exports.PassengerCreate = PassengerCreate;
const PassengerUpdate = async (idPassenger, passengerData) => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    passengerData.updatedAt = new Date();
    const passenger = await passengerRepository.findOneBy({ idPassenger });
    if (passenger) {
        passenger.firstName = passengerData.firstName;
        passenger.lastName = passengerData.lastName;
        passenger.email = passengerData.email;
        passenger.phone = passengerData.phone;
        passenger.dateOfBirth = passengerData.dateOfBirth;
        passenger.nationalId = passengerData.nationalId;
        passenger.country = passengerData.country;
        passenger.idBooking = passengerData.idBooking;
        return await passengerRepository.save(passenger);
    }
};
exports.PassengerUpdate = PassengerUpdate;
const PassengerDelete = async (idPassenger) => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    const passenger = await passengerRepository.findOneBy({ idPassenger });
    if (passenger) {
        return await passengerRepository.remove(passenger);
    }
};
exports.PassengerDelete = PassengerDelete;
const PassengerGetBySearchTerm = async (searchTerm) => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    return await passengerRepository.find({
        where: [
            { firstName: (0, typeorm_1.Like)(`%${searchTerm}%`) },
            { lastName: (0, typeorm_1.Like)(`%${searchTerm}%`) },
            { nationalId: (0, typeorm_1.Like)(`%${searchTerm}%`) },
        ]
    });
};
exports.PassengerGetBySearchTerm = PassengerGetBySearchTerm;
const PassengerGetByBooking = async (idBooking) => {
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    return await passengerRepository.find({ where: { idBooking: (0, typeorm_1.Equal)(Number(idBooking)) }, relations: ['idBooking'] });
};
exports.PassengerGetByBooking = PassengerGetByBooking;
const PassengerGetByBookingPaged = async (idBooking, page) => {
    const perPage = 20;
    const passengerRepository = appDataSource_1.AppDataSource.getRepository(Passenger_1.Passenger);
    const offset = (page - 1) * perPage;
    const [passengers, totalCount] = await passengerRepository.findAndCount({
        where: { idBooking: (0, typeorm_1.Equal)(Number(idBooking)) },
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });
    const totalPages = Math.ceil(totalCount / perPage);
    return { passengers, totalPages };
};
exports.PassengerGetByBookingPaged = PassengerGetByBookingPaged;
//# sourceMappingURL=PassengerDAL.js.map