import { Request, Response } from "express";
import { validate } from 'class-validator';
import ActionType from "../data/helpers/ActionType";
import { BookingCreate, BookingDelete, BookingGetAll, BookingGetAllPaged, BookingGetByBookingNumber, BookingGetByClient, BookingGetByClientPaged, BookingGetByPrimaryKey, BookingGetBySearchTerm, BookingUpdate } from "../data/DataAccessLayer/BookingDAL";
import { Booking } from "../data/Entity/Booking";
import { ClientGetAll } from "../data/DataAccessLayer/ClientDAL";

export const getSingleBooking = async (req: any, res: any) => {
    const { idBooking } = req.params;
    const booking = await BookingGetByPrimaryKey(idBooking);

    return res.status(200).send(booking);
};

export const getAllBookings = async (req: any, res: any) => {
    const bookings = await BookingGetAll();

    return res.status(200).send({
        bookings
    });
};

export const getAllBookingsPaged = async (req: any, res: any) => {
    const { page } = req.params;
    const { bookings, totalPages } = await BookingGetAllPaged(page);

    return res.status(200).send({
        bookings,
        totalPages
    });
};

export const createBookings = async (req: Request, res: Response) => {
    const {
        carrier,
        bookingDate,
        flightNumber,
        flightClass,
        weight,
        price,
        isRoundTrip,
        hasStop,
        numberOfStops,
        idClient } = req.body;

    let existingBooking: Booking | null;
    let randomNumber: string | number;

    do {
        randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
        existingBooking = await BookingGetByBookingNumber(randomNumber.toString());
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
    } as Booking;

    try {

        const booking = await BookingCreate(bookingData);
        const validationErrors = await validate(booking);

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
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during booking create'
        });
    }
};

export const updateBooking = async (req: any, res: any) => {
    const {
        carrier,
        bookingDate,
        flightNumber,
        flightClass,
        weight,
        price,
        isRoundTrip,
        hasStop,
        numberOfStops,
        idClient } = req.body;
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
    } as Booking;

    try {
        const booking = await BookingUpdate(idBooking, bookingData);
        
        return res.status(200).send({
            status: 200,
            message: 'Booking update successful',
            booking
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during booking update'
        });
    }
}

export const deleteBooking = async (req: any, res: any) => {
    const { idBooking } = req.params;

    try{
        const booking = await BookingDelete(idBooking);

        return res.status(200).send({
            status: 200,
            message: 'Passenger remove successful',
            booking: booking
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
    const clients = await ClientGetAll();

    return res.status(200).send({
        operation: ActionType.CREATE,
        clients
      });
}

export const getUpdateModel = async (req: Request, res: Response) => {
    const clients = await ClientGetAll();

    return res.status(200).send({
        operation: ActionType.UPDATE,
        clients
    });
}


export const getBookingByClient = async (req: Request, res: Response) => {
    const { idClient } = req.params;
    const bookings = await BookingGetByClient(idClient);

    return res.status(200).send(bookings);
}

export const getBookingByClientPaged = async (req: any, res: any) => {
    const { idClient } = req.params;
    const { page } = req.body;
    const { bookings, totalPages } = await BookingGetByClientPaged(idClient, page);

    return res.status(200).send({
        bookings,
        totalPages
    });
};

export const searchBooking = async (req: Request, res: Response) => {
    const { term } = req.params;
    const bookings = await BookingGetBySearchTerm(term);

    return res.status(200).send(bookings);
};