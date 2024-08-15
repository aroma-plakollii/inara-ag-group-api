import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Index } from 'typeorm';
import {IsEmail, IsNotEmpty, Min, Max } from 'class-validator';
import CrudOperationsEnum from '../helpers/ActionType';


@Entity({ name: 'users' })
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  idUser: number;

  @Index()
  @Column({
    default: ""
  })
  @IsNotEmpty()
  // @Max(6)
  firstName: string;

  @Column({ default: "" })
  @IsNotEmpty()
  lastName: string;

  @Column({ default: "" })
  @IsEmail({}, { 
    message: "Invalid email",
    // groups: [CrudOperationsEnum.CREATE] 
  })
  @IsNotEmpty()
  email: string;

  @Column({ default: "" })
  @IsNotEmpty()
  password: string;

  // @ManyToOne(() => UserType, {nullable: false} )
  // @JoinColumn({name: 'idUserType'})
  // idUserType: UserType

  @Column()
  @IsNotEmpty()
  userRole: string;

  constructor(
    crudOperation: CrudOperationsEnum,
    idUser: number, 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    userRole: string,
    ) {
    super();
    this.crudOperation = crudOperation;
    this.idUser = idUser;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userRole = userRole;
  }

  crudOperation?: CrudOperationsEnum

}
