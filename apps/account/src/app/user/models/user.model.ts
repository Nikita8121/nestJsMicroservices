import { Document, Types } from 'mongoose';
import {
  IUser,
  IUserCourses,
  PurchaseStateEnum,
  UserRoleEnum,
} from '@microservices/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserCourses extends Document implements IUserCourses {
  @Prop({ required: true })
  courseId: string;
  @Prop({ required: true, enum: PurchaseStateEnum, type: String })
  purchaseState: PurchaseStateEnum;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);

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
  @Prop({ type: [UserCoursesSchema], _id: false })
  courses: Types.Array<UserCourses>;
}

export const UserSchema = SchemaFactory.createForClass(User);
