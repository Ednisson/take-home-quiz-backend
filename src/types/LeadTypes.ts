import { InputType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
import { ServiceType } from '../entities/Lead';

@InputType()
export class RegisterLeadInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  mobile!: string;

  @Field()
  @IsNotEmpty()
  postcode!: string;

  @Field(() => [ServiceType])
  @IsArray()
  @IsEnum(ServiceType, { each: true })
  services!: ServiceType[];
}