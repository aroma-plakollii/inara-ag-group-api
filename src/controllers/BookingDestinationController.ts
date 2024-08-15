import { Request, Response } from "express";
import { validate } from 'class-validator';
import ActionType from "../data/helpers/ActionType";
import { BookingGetAll } from "../data/DataAccessLayer/BookingDAL";
import { BookingDestinationCreate, BookingDestinationCreateAll, BookingDestinationDelete, BookingDestinationGetAll, BookingDestinationGetAllPaged, BookingDestinationGetByBooking, BookingDestinationGetByBookingPaged, BookingDestinationGetByPrimaryKey, BookingDestinationUpdate } from "../data/DataAccessLayer/BookingDestinationDAL";
import { BookingDestination } from "../data/Entity/BookingDestination";

export const getSingleBookingDestination = async (req: any, res: any) => {
    const { idBookingDestination } = req.params;
    const bookingDestination = await BookingDestinationGetByPrimaryKey(idBookingDestination);

    return res.status(200).send(bookingDestination);
};

export const getAllBookingDestinations = async (req: any, res: any) => {
    const bookingDestinations = await BookingDestinationGetAll();

    return res.status(200).send({
        bookingDestinations
    });
};

export const getAllBookingDestinationsPaged = async (req: any, res: any) => {
    const { page } = req.params;
    const { bookingDestinations, totalPages } = await BookingDestinationGetAllPaged(page);

    return res.status(200).send({
        bookingDestinations,
        totalPages
    });
};

export const createBookingDestinations = async (req: Request, res: Response) => {
    const {
        startDestination,
        endDestination, 
        startDateTime,
        endDateTime,
        duration,
        waitingTime,
        idBooking } = req.body;

    const bookingDestinationData = {
        startDestination,
        endDestination, 
        startDateTime,
        endDateTime,
        duration,
        waitingTime,
        idBooking 
    } as BookingDestination;

    try {

        const bookingDestination = await BookingDestinationCreate(bookingDestinationData);
        const validationErrors = await validate(bookingDestination);

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
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during Booking Destination create'
        });
    }
};

export const createAllBookingDestinations = async (req: Request, res: Response) => {
    const bookingDestinationDataArray = req.body;

    try {
        const bookingDestinations = await BookingDestinationCreateAll(bookingDestinationDataArray);

        return res.status(200).send({
            status: 200,
            message: 'Booking destinations created successfully',
            bookingDestinations
        });
    } catch (error) {
        console.error('Error creating client invoices:', error);
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during booking destinations creation',
            error
        });
    }
};

export const updateBookingDestination = async (req: any, res: any) => {
    const {
        startDestination,
        endDestination, 
        startDateTime,
        endDateTime,
        duration,
        waitingTime,
        idBooking } = req.body;
    const { idBookingDestination } = req.params;

    const bookingDestinationData = {
        startDestination,
        endDestination, 
        startDateTime,
        endDateTime,
        duration,
        waitingTime,
        idBooking
    } as BookingDestination;

    try {
        const bookingDestination = await BookingDestinationUpdate(idBookingDestination, bookingDestinationData);
        
        return res.status(200).send({
            status: 200,
            message: 'Booking update successful',
            bookingDestination
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'An error occurred during booking update'
        });
    }
}

export const deleteBookingDestination = async (req: any, res: any) => {
    const { idBookingDestination } = req.params;

    try{
        const bookingDestination = await BookingDestinationDelete(idBookingDestination);

        return res.status(200).send({
            status: 200,
            message: 'Booking Destination remove successful',
            booking: bookingDestination
        });
    }catch (error) {
        return res.status(500).send({
            status: 500,
            error,
            message: 'An error occurred during Booking Destination removal'
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


export const getBookingDestinationByBooking = async (req: Request, res: Response) => {
    const { idBooking } = req.params;
    const bookingDestinations = await BookingDestinationGetByBooking(idBooking);

    return res.status(200).send(bookingDestinations);
}

export const getBookingDestinationByBookingPaged = async (req: any, res: any) => {
    const { idBooking } = req.params;
    const { page } = req.body;
    const { bookingDestinations, totalPages } = await BookingDestinationGetByBookingPaged(idBooking, page);

    return res.status(200).send({
        bookingDestinations,
        totalPages
    });
};