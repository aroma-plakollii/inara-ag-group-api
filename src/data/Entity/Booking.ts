import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne } from 'typeorm';
import { Client } from './Client';

@Entity({name: 'bookings'})
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    idBooking: number;

    @Column()
    carrier: string;

    @Column()
    bookingNumber: string;

    @Column()
    bookingDate: Date;

    @Column()
    flightNumber: string;

    @Column()
    flightClass: string;

    @Column()
    weight: number;

    @Column( { default: false } )
    isRoundTrip: boolean;

    @Column( { default: false } )
    hasStop: boolean;

    @Column( {nullable: true} )
    numberOfStops: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Client, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({ name: 'idClient' })
    idClient: Client;

    @CreateDateColumn({nullable: true})
    createdAt: Date;
  
    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    constructor(
        idBooking: number, 
        carrier: string,
        bookingNumber: string, 
        bookingDate: Date,
        flightNumber: string,
        flightClass: string,
        weight: number,
        price: number,
        isRoundTrip: boolean,
        hasStop: boolean,
        numberOfStops: number,
        idClient: Client, 
        createdAt: Date,
        updatedAt: Date
        ) {
        super();
        
        this.idBooking = idBooking;
        this.carrier = carrier;
        this.bookingNumber = bookingNumber;
        this.bookingDate = bookingDate;
        this.flightNumber = flightNumber;
        this.flightClass = flightClass;
        this.weight = weight;
        this.price = price;
        this.isRoundTrip = isRoundTrip;
        this.hasStop = hasStop;
        this.numberOfStops = numberOfStops;
        this.idClient = idClient,
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
}