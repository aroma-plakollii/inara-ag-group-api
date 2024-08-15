"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("../controllers/UserController"));
const AuthController = __importStar(require("../controllers/AuthController"));
const ClientController = __importStar(require("../controllers/ClientController"));
const BookingController = __importStar(require("../controllers/BookingController"));
const PassengerController = __importStar(require("../controllers/PassengerController"));
const InvoiceController = __importStar(require("../controllers/InvoiceController"));
const ClientInvoiceController = __importStar(require("../controllers/ClientInvoiceController"));
const BookingDestinationController = __importStar(require("../controllers/BookingDestinationController"));
const AuthMiddleware = __importStar(require("../middlewares/AuthMiddleware"));
const router = express_1.default.Router();
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
exports.default = router;
//# sourceMappingURL=index.js.map