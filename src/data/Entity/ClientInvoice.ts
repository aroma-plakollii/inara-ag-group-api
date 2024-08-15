import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import { User } from './Users';
import { Client } from './Client';
import { Invoice } from './Invoice';

@Entity({name: 'client_invoices'})
export class ClientInvoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  idClientInvoice: number;

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
  
  @ManyToOne(() => Invoice, {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'idInvoice' })
  idInvoice: Invoice;

  @CreateDateColumn({nullable: true})
  createdAt: Date;

  @UpdateDateColumn({nullable: true})
  updatedAt: Date;

  constructor(
    idClientInvoice: number, 
    description: string, 
    quantity: number, 
    price: number, 
    totalPrice: number,
    idClient: Client,
    idInvoice: Invoice,
    createdAt: Date,
    updatedAt: Date
    ) {
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
}