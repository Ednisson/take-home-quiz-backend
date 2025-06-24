import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsArray, IsEnum } from 'class-validator';

export enum ServiceType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
  PAYMENT = 'payment'
}

registerEnumType(ServiceType, {
  name: 'ServiceType',
  description: 'Available service types for Brighte Eats'
});

@Entity()
@ObjectType()
export class Lead {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @IsNotEmpty()
  name!: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Field()
  @Column()
  @IsNotEmpty()
  mobile!: string;

  @Field()
  @Column()
  @IsNotEmpty()
  postcode!: string;

  @Field(() => [ServiceType])
  @Column('text', { array: true })
  @IsArray()
  @IsEnum(ServiceType, { each: true })
  services!: ServiceType[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}