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
exports.Passenger = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
let Passenger = class Passenger extends typeorm_1.BaseEntity {
    constructor(idPassenger, firstName, lastName, email, phone, dateOfBirth, nationalId, country, idBooking, createdAt, updatedAt) {
        super();
        this.idPassenger = idPassenger;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.nationalId = nationalId;
        this.country = country;
        this.idBooking = idBooking,
            this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
};
exports.Passenger = Passenger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Passenger.prototype, "idPassenger", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Passenger.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Passenger.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Passenger.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Passenger.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Passenger.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], Passenger.prototype, "nationalId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Passenger.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Booking_1.Booking, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'idBooking' }),
    __metadata("design:type", Booking_1.Booking)
], Passenger.prototype, "idBooking", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Passenger.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Passenger.prototype, "updatedAt", void 0);
exports.Passenger = Passenger = __decorate([
    (0, typeorm_1.Entity)({ name: 'passengers' }),
    __metadata("design:paramtypes", [Number, String, String, String, String, Date, String, String, Booking_1.Booking,
        Date,
        Date])
], Passenger);
//# sourceMappingURL=Passenger.js.map