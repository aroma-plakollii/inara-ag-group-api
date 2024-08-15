import { Like, Equal } from "typeorm";
import { AppDataSource } from "../../db/appDataSource";
import { Passenger } from "../Entity/Passenger";

export const PassengerGetByPrimaryKey = async (idPassenger: number) => {
    const passengerRepository = AppDataSource.getRepository(Passenger);

    return await passengerRepository.findOne({ where: { idPassenger }, relations: ['idBooking'] });
} 

export const PassengerGetAll = async () => {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    return await passengerRepository.find({ relations: ['idBooking'] });
}

export const PassengerGetAllPaged = async (page: number) => {
    const perPage = 20;
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const offset = (page - 1) * perPage;

    const passengers = await passengerRepository.find({
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });

    const totalCount = await passengerRepository.count();
    const totalPages = Math.ceil(totalCount / perPage);

    return { passengers, totalPages };
}

export const PassengerCreate = async (passengerData: any) => {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    passengerData.createdAt = new Date();
    passengerData.updatedAt = null;
    const passenger = passengerRepository.create(passengerData);
    return await passengerRepository.save(passenger)
}

export const PassengerUpdate = async (idPassenger: number, passengerData: any) => {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    passengerData.updatedAt = new Date();

    const passenger = await passengerRepository.findOneBy({ idPassenger });

    if(passenger){
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

export const PassengerDelete = async (idPassenger: number) => {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const passenger = await passengerRepository.findOneBy({ idPassenger });
    
    if(passenger){
        return await passengerRepository.remove(passenger);
    }
}

export const PassengerGetBySearchTerm = async (searchTerm: string) => {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    return await passengerRepository.find({
        where: [
            {firstName: Like(`%${searchTerm}%`)},
            {lastName: Like(`%${searchTerm}%`)},
            {nationalId: Like(`%${searchTerm}%`)},
        ]
    });
}

export const PassengerGetByBooking = async (idBooking: string) => {
    const passengerRepository = AppDataSource.getRepository(Passenger);

    return await passengerRepository.find({ where: { idBooking: Equal(Number(idBooking)) }, relations: ['idBooking'] });
} 

export const PassengerGetByBookingPaged = async (idBooking: string, page: number) => {
    const perPage = 20;
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const offset = (page - 1) * perPage;

    const [passengers, totalCount] = await passengerRepository.findAndCount({
        where:  { idBooking: Equal(Number(idBooking)) },
        relations: ['idBooking'],
        take: perPage,
        skip: offset
    });

    const totalPages = Math.ceil(totalCount / perPage);

    return { passengers, totalPages };
}