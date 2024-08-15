"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDestination = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
let BookingDestination = class BookingDestination extends typeorm_1.BaseEntity {
    constructor(idBookingDestination, startDestination, endDestination, startDateTime, endDateTime, duration, waitingTime, idBooking, createdAt, updatedAt) {
        super();
        this.idBookingDestination = idBookingDestination;
        this.startDestination = startDestination;
        this.endDestination = endDestination;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.duration = duration;
        this.waitingTime = waitingTime;
        this.idBooking = idBooking;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
};
exports.BookingDestination = BookingDestination;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookingDestination.prototype, "idBookingDestination", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingDestination.prototype, "startDestination", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingDestination.prototype, "endDestination", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], BookingDestination.prototype, "startDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], BookingDestination.prototype, "endDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingDestination.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookingDestination.prototype, "waitingTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking_1.Booking, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'idBooking' }),
    __metadata("design:type", Booking_1.Booking)
], BookingDestination.prototype, "idBooking", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], BookingDestination.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], BookingDestination.prototype, "updatedAt", void 0);
exports.BookingDestination = BookingDestination = __decorate([
    (0, typeorm_1.Entity)({ name: 'booking_destinations' }),
    __metadata("design:paramtypes", [Number, String, String, Date,
        Date, String, String, Booking_1.Booking,
        Date,
        Date])
], BookingDestination);
//# sourceMappingURL=BookingDestination.js.map