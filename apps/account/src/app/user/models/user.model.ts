import { Document } from 'mongoose';
import { IUser, UserRoleEnum } from '@microservices/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document implements IUser {
  @Prop()
  displayname?: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  passwordHash: string;
  @Prop({
    required: true,
    enum: UserRoleEnum,
    type: String,
    default: UserRoleEnum.Student,
  })
  role: UserRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
