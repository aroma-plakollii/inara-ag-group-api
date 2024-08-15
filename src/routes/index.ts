import express from 'express';
import * as UserController from '../controllers/UserController';
import * as AuthController from '../controllers/AuthController';
import * as ClientController from '../controllers/ClientController';
import * as BookingController from '../controllers/BookingController';
import * as PassengerController from '../controllers/PassengerController';
import * as InvoiceController from '../controllers/InvoiceController';
import * as ClientInvoiceController from '../controllers/ClientInvoiceController';
import * as BookingDestinationController from '../controllers/BookingDestinationController';
import * as AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

//user routes
router.get('/users', AuthMiddleware.isLoggedIn, UserController.getAllUsers);
router.get('/users/create', AuthMiddleware.isLoggedIn, UserController.getCreateModel);
router.get('/users/update', AuthMiddleware.isLoggedIn, UserController.getUpdateModel);
router.post('/users/register', UserController.registerUser);
router.post('/users/verify', UserController.verifyEmail);
router.post('/users/reset-password', UserController.resetPassword);
router.get('/users/paged/:page', AuthMiddleware.isLoggedIn, UserController.getAllUsersPaged);
router.put('/users/:idUser', AuthMiddleware.isLoggedIn, UserController.updateUser);
router.get('/users/:idUser', AuthMiddleware.isLoggedIn, UserController.getSingleUser);
router.delete('/users/:idUser', AuthMiddleware.isLoggedIn, UserController.deleteUser);

//authentications routes
router.post('/login', AuthController.Login);
router.get('/logout', AuthController.Logout);
// router.get('/abc', AuthMiddleware.isLoggedIn, )

//client routes
router.get('/clients', AuthMiddleware.isLoggedIn, ClientController.getAllClients);
router.post('/clients/create', AuthMiddleware.isLoggedIn, ClientController.createClient);
router.get('/clients/create', AuthMiddleware.isLoggedIn, ClientController.getCreateModel);
router.get('/clients/update', AuthMiddleware.isLoggedIn, ClientController.getUpdateModel);
router.get('/clients/paged/:page', AuthMiddleware.isLoggedIn, ClientController.getAllClientsPaged);
router.get('/clients/:idClient', AuthMiddleware.isLoggedIn, ClientController.getSingleClient);
router.put('/clients/:idClient', AuthMiddleware.isLoggedIn, ClientController.updateClient);
router.delete('/clients/:idClient', AuthMiddleware.isLoggedIn, ClientController.deleteClient);
router.get('/clients/search/:term', AuthMiddleware.isLoggedIn, ClientController.searchClient);

//booking routes 
router.get('/bookings', AuthMiddleware.isLoggedIn, BookingController.getAllBookings);
router.post('/bookings/create', AuthMiddleware.isLoggedIn, BookingController.createBookings);
router.get('/bookings/create', AuthMiddleware.isLoggedIn, BookingController.getCreateModel);
router.get('/bookings/update', AuthMiddleware.isLoggedIn, BookingController.getUpdateModel);
router.get('/bookings/paged/:page', AuthMiddleware.isLoggedIn, BookingController.getAllBookingsPaged);
router.get('/bookings/:idBooking', AuthMiddleware.isLoggedIn, BookingController.getSingleBooking);
router.get('/bookings/client/:idClient', AuthMiddleware.isLoggedIn, BookingController.getBookingByClient);
router.post('/bookings/client/paged/:idClient', AuthMiddleware.isLoggedIn, BookingController.getBookingByClientPaged);
router.put('/bookings/:idBooking', AuthMiddleware.isLoggedIn, BookingController.updateBooking);
router.delete('/bookings/:idBooking', AuthMiddleware.isLoggedIn, BookingController.deleteBooking);
router.get('/bookings/search/:term', AuthMiddleware.isLoggedIn, BookingController.searchBooking);

//booking Destination routes 
// router.get('/bookingDestinations', AuthMiddleware.isLoggedIn, BookingDestinationController.getAllBookingDestinations);
router.get('/bookingDestinations', BookingDestinationController.getAllBookingDestinations);
router.post('/bookingDestinations/create', AuthMiddleware.isLoggedIn, BookingDestinationController.createBookingDestinations);
router.post('/bookingDestinations/create/all', AuthMiddleware.isLoggedIn, BookingDestinationController.createAllBookingDestinations);
router.get('/bookingDestinations/create', AuthMiddleware.isLoggedIn, BookingDestinationController.getCreateModel);
router.get('/bookingDestinations/update', AuthMiddleware.isLoggedIn, BookingDestinationController.getUpdateModel);
router.get('/bookingDestinations/paged/:page', AuthMiddleware.isLoggedIn, BookingDestinationController.getAllBookingDestinationsPaged);
router.get('/bookingDestinations/:idBookingDestination', AuthMiddleware.isLoggedIn, BookingDestinationController.getSingleBookingDestination);
router.get('/bookingDestinations/booking/:idBooking', AuthMiddleware.isLoggedIn, BookingDestinationController.getBookingDestinationByBooking);
router.post('/bookingDestinations/booking/paged/:idBooking', AuthMiddleware.isLoggedIn, BookingDestinationController.getBookingDestinationByBookingPaged);
router.put('/bookingDestinations/:idBookingDestination', AuthMiddleware.isLoggedIn, BookingDestinationController.updateBookingDestination);
router.delete('/bookingDestinations/:idBookingDestination', AuthMiddleware.isLoggedIn, BookingDestinationController.deleteBookingDestination);

//passenger routes
router.get('/passengers', AuthMiddleware.isLoggedIn, PassengerController.getAllPassengers);
router.post('/passengers/create', AuthMiddleware.isLoggedIn, PassengerController.createPassenger);
router.get('/passengers/create', AuthMiddleware.isLoggedIn, PassengerController.getCreateModel);
router.get('/passengers/update', AuthMiddleware.isLoggedIn, PassengerController.getUpdateModel);
router.get('/passengers/paged/:page', AuthMiddleware.isLoggedIn, PassengerController.getAllPassengersPaged);
router.get('/passengers/:idPassenger', AuthMiddleware.isLoggedIn, PassengerController.getSinglePassenger);
router.get('/passengers/booking/:idBooking', AuthMiddleware.isLoggedIn, PassengerController.getPassengerByBooking);
router.post('/passengers/booking/paged/:idBooking', AuthMiddleware.isLoggedIn, PassengerController.getPassengerByBookingPaged);
router.put('/passengers/:idPassenger', AuthMiddleware.isLoggedIn, PassengerController.updatePassenger);
router.delete('/passengers/:idPassenger', AuthMiddleware.isLoggedIn, PassengerController.deletePassenger);
router.get('/passengers/search/:term', AuthMiddleware.isLoggedIn, PassengerController.searchPassenger);

//invoice routes
router.get('/invoices', AuthMiddleware.isLoggedIn, InvoiceController.getAllInvoices);
router.post('/invoices/create', AuthMiddleware.isLoggedIn, InvoiceController.createInvoice);
router.get('/invoices/create', AuthMiddleware.isLoggedIn, InvoiceController.getCreateModel);
router.get('/invoices/update', AuthMiddleware.isLoggedIn, InvoiceController.getUpdateModel);
router.get('/invoices/paged/:page', AuthMiddleware.isLoggedIn, InvoiceController.getAllInvoicesPaged);
router.get('/invoices/:idInvoice', AuthMiddleware.isLoggedIn, InvoiceController.getSingleInvoice);
router.put('/invoices/:idInvoice', AuthMiddleware.isLoggedIn, InvoiceController.updateInvoice);
router.get('/invoices/client/:idClient', AuthMiddleware.isLoggedIn, InvoiceController.getInvoiceByClient);
router.post('/invoices/client/paged/:idClient', AuthMiddleware.isLoggedIn, InvoiceController.getInvoiceByClientPaged);
router.delete('/invoices/:idInvoice', AuthMiddleware.isLoggedIn, InvoiceController.deleteInvoice);

//clientInvoice routes
router.get('/clientInvoices', AuthMiddleware.isLoggedIn, ClientInvoiceController.getAllClientInvoices);
router.post('/clientInvoices/create', AuthMiddleware.isLoggedIn, ClientInvoiceController.createClientInvoice);
router.post('/clientInvoices/create/all', AuthMiddleware.isLoggedIn, ClientInvoiceController.createAllClientInvoices);
router.get('/clientInvoices/create', AuthMiddleware.isLoggedIn, ClientInvoiceController.getCreateModel);
router.get('/clientInvoices/update', AuthMiddleware.isLoggedIn, ClientInvoiceController.getUpdateModel);
router.get('/clientInvoices/:idClientInvoices', AuthMiddleware.isLoggedIn, ClientInvoiceController.getSingleClientInvoice);
router.get('/clientInvoices/client/:idClient', AuthMiddleware.isLoggedIn, ClientInvoiceController.getClientInvoiceByClient);
router.put('/clientInvoices/:idClientInvoices', AuthMiddleware.isLoggedIn, ClientInvoiceController.updateClientInvoice);
router.delete('/clientInvoices/:idClientInvoices', AuthMiddleware.isLoggedIn, ClientInvoiceController.deleteClientInvoice);

export default router;