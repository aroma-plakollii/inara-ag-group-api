import { Request, Response } from "express";
import { validate } from 'class-validator';
import ActionType from "../data/helpers/ActionType";
import { PassengerCreate, PassengerDelete, PassengerGetAll, PassengerGetAllPaged, PassengerGetByBooking, PassengerGetByBookingPaged, PassengerGetByPrimaryKey, PassengerGetBySearchTerm, PassengerUpdate } from "../data/DataAccessLayer/PassengerDAL";
import { Passenger } from "../data/Entity/Passenger";
import { BookingGetAll } from "../data/DataAccessLayer/BookingDAL";

export const getSinglePassenger = async (req: any, res: any) => {
    const { idPassenger } = req.params;
    const passenger = await PassengerGetByPrimaryKey(idPassenger);

    return res.status(200).send(passenger);
};

export const getAllPassengers = async (req: any, res: any) => {
    const passengers = await PassengerGetAll();

    return res.status(200).send({
        passengers
    });
};

export const getAllPassengersPaged = async (req: any, res: any) => {
    const { page } = req.params;
    const { passengers, totalPages } = await PassengerGetAllPaged(page);

    return res.status(200).send({
        passengers,
        totalPages
    });
};

export const createPassenger = async (req: Request, res: Response) => {
    const {
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        country,
        idBooking} = req.body;

    const passengerData = {
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        country,
        idBooking
    } as Passenger;

    try {

        const passenger = await PassengerCreate(passengerData);
        const validationErrors = await validate(passenger);

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
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during passenger create'
        });
    }
};

export const updatePassenger = async (req: any, res: any) => {
    const {
        firstName, 
        lastName, 
        email, 
        phone,
        dateOfBirth,
        nationalId,
        country,
        idBooking} = req.body;
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
    } as Passenger;

    try {
        const passenger = await PassengerUpdate(idPassenger, passengerData);
        
        return res.status(200).send({
            status: 200,
            message: 'Passenger update successful',
            passenger
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during passenger update'
        });
    }
}

export const deletePassenger = async (req: any, res: any) => {
    const { idPassenger } = req.params;

    try{
        const passenger = await PassengerDelete(idPassenger);

        return res.status(200).send({
            status: 200,
            message: 'Passenger remove successful',
            passenger: passenger
        });
    }catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during passenger removal'
        });
    }
};

export const getCreateModel = async (req: Request, res: Response) => {
    const bookings = await BookingGetAll();

    return res.status(200).send({
        operation: ActionType.CREATE,
        bookings
      });
}

export const getUpdateModel = async (req: Request, res: Response) => {
    const bookings = await BookingGetAll();

    return res.status(200).send({
        operation: ActionType.UPDATE,
        bookings
    });
}

export const searchPassenger = async (req: Request, res: Response) => {
    const { term } = req.params;
    const passengers = await PassengerGetBySearchTerm(term);

    return res.status(200).send(passengers);
};

export const getPassengerByBooking = async (req: Request, res: Response) => {
    const { idBooking } = req.params;
    const passenger = await PassengerGetByBooking(idBooking);

    return res.status(200).send(passenger);
}

export const getPassengerByBookingPaged = async (req: Request, res: Response) => {
    const { idBooking } = req.params;
    const { page } = req.body;
    const { passengers, totalPages } = await PassengerGetByBookingPaged(idBooking, page);

    return res.status(200).send({
        passengers,
        totalPages
    });
}