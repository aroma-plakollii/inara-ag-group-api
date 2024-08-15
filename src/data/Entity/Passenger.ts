import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne } from 'typeorm';
import { Booking } from './Booking';

@Entity({name: 'passengers'})
export class Passenger extends BaseEntity {
    @PrimaryGeneratedColumn()
    idPassenger: number;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    email: string;
  
    @Column()
    phone: string;
  
    @Column()
    dateOfBirth: Date;

    @Column({
      unique: true
    })
    nationalId: string;

    @Column()
    country: string;

    @ManyToOne(() => Booking, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({ name: 'idBooking' })
    idBooking: Booking;

    @CreateDateColumn({nullable: true})
    createdAt: Date;
  
    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    constructor(
        idPassenger: number, 
        firstName: string, 
        lastName: string, 
        email: string, 
        phone: string,
        dateOfBirth: Date,
        nationalId: string,
        country: string,
        idBooking: Booking,
        createdAt: Date,
        updatedAt: Date
        ) {
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
}