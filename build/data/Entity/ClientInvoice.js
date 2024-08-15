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
exports.ClientInvoice = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
const Invoice_1 = require("./Invoice");
let ClientInvoice = class ClientInvoice extends typeorm_1.BaseEntity {
    constructor(idClientInvoice, description, quantity, price, totalPrice, idClient, idInvoice, createdAt, updatedAt) {
        super();
        this.idClientInvoice = idClientInvoice;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;
        this.idClient = idClient;
        this.idInvoice = idInvoice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
};
exports.ClientInvoice = ClientInvoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClientInvoice.prototype, "idClientInvoice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientInvoice.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClientInvoice.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ClientInvoice.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ClientInvoice.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_1.Client, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'idClient' }),
    __metadata("design:type", Client_1.Client)
], ClientInvoice.prototype, "idClient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Invoice_1.Invoice, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'idInvoice' }),
    __metadata("design:type", Invoice_1.Invoice)
], ClientInvoice.prototype, "idInvoice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], ClientInvoice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], ClientInvoice.prototype, "updatedAt", void 0);
exports.ClientInvoice = ClientInvoice = __decorate([
    (0, typeorm_1.Entity)({ name: 'client_invoices' }),
    __metadata("design:paramtypes", [Number, String, Number, Number, Number, Client_1.Client,
        Invoice_1.Invoice,
        Date,
        Date])
], ClientInvoice);
//# sourceMappingURL=ClientInvoice.js.map