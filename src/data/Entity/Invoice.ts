import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import { Client } from './Client';

@Entity({name: 'invoices'})
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  idInvoice: number;

  @Column()
  invoiceNumber: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Client, {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'idClient' })
  idClient: Client;

  @CreateDateColumn({nullable: true})
  createdAt: Date;

  @UpdateDateColumn({nullable: true})
  updatedAt: Date;

  constructor(
    idInvoice: number, 
    invoiceNumber: string, 
    date: Date,
    description: string, 
    quantity: number, 
    price: number, 
    totalPrice: number,
    idClient: Client,
    createdAt: Date,
    updatedAt: Date
    ) {
    super();
    
    this.idInvoice = idInvoice;
    this.invoiceNumber = invoiceNumber;
    this.date = date;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
    this.idClient = idClient;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}