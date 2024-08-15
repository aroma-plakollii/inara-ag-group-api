import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import { User } from './Users';

@Entity({name: 'clients'})
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  idClient: number;

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
  passportId: string;

  @Column()
  country: string;

  @ManyToOne(() => User, {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'idUser' })
  idUser: User;

  @CreateDateColumn({nullable: true})
  createdAt: Date;

  @UpdateDateColumn({nullable: true})
  updatedAt: Date;

  constructor(
    idClient: number, 
    firstName: string, 
    lastName: string, 
    email: string, 
    phone: string,
    dateOfBirth: Date,
    nationalId: string,
    passportId: string,
    country: string,
    idUser: User,
    createdAt: Date,
    updatedAt: Date
    ) {
    super();
    
    this.idClient = idClient;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth;
    this.nationalId = nationalId;
    this.passportId = passportId;
    this.country = country;
    this.idUser = idUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}