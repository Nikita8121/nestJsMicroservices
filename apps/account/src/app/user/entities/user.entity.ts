import {
  IUser,
  IUserCourses,
  PurchaseStateEnum,
  UserRoleEnum,
} from '@microservices/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRoleEnum;
  courses?: IUserCourses[];

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.passwordHash = user.passwordHash;
    this.courses = user.courses;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public addCourse(courseId: string) {
    const exist = this.courses.find((c) => c.courseId === courseId);
    if (exist) {
      throw new Error('Course already exists');
    }

    this.courses.push({ courseId, purchaseState: PurchaseStateEnum.Started });
  }

  public deleteCourse(courseId: string) {
    this.courses = this.courses.filter((c) => c.courseId !== courseId);
  }

  public updateCourseStatus(courseId: string, state: PurchaseStateEnum) {
    this.courses = this.courses.map((c) => {
      if (c.courseId === courseId) {
        c.purchaseState = state;
      }
      return c;
    });
    return this
  }

  public getPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName,
    };
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
