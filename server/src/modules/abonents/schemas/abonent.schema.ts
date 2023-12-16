import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Abonent {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  surname: string;

  @Prop()
  patronymic: string;

  @Prop({
    required: true,
    unique: true,
  })
  phone: number;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  house: number;

  @Prop()
  flat: number;
}

export type AbonentDocument = Abonent & Document;

export const AbonentSchema = SchemaFactory.createForClass(Abonent);
