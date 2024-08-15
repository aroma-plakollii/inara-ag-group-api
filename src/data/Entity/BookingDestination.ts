import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne } from 'typeorm';
import { Client } from './Client';
import { Booking } from './Booking';

@Entity({name: 'booking_destinations'})
export class BookingDestination extends BaseEntity {
    @PrimaryGeneratedColumn()
    idBookingDestination: number;

    @Column()
    startDestination: string;

    @Column()
    endDestination: string;

    @Column()
    startDateTime: Date;

    @Column()
    endDateTime: Date;

    @Column()
    duration: string;

    @Column()
    waitingTime: string;

    @ManyToOne(() => Booking, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({ name: 'idBooking' })
    idBooking: Booking;

    @CreateDateColumn({nullable: true})
    createdAt: Date;
  
    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    constructor(
        idBookingDestination: number, 
        startDestination: string,
        endDestination: string, 
        startDateTime: Date,
        endDateTime: Date,
        duration: string,
        waitingTime: string,
        idBooking: Booking, 
        createdAt: Date,
        updatedAt: Date
        ) {
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
}