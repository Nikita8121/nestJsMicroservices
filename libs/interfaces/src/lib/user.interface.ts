export enum UserRoleEnum {
  Teacher = 'Teacher',
  Student = 'Student',
}

export enum PurchaseStateEnum {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Cancelled = 'Cancelled',
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRoleEnum;
  courses?: IUserCourses[];
}

export interface IUserCourses {
  courseId: string;
  purchaseState: PurchaseStateEnum;
}
