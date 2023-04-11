import { UserEntity } from '../entities/user.entity';
import { BuyCourseSaga } from './buy-course.saga';

export abstract class BuyCourseSagaState {
  public saga: BuyCourseSaga;

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga;
  }

  public abstract pay(): Promise<{ PaymentLink: string; user: UserEntity }>;
  public abstract checkPayment(): Promise<{ user: UserEntity }>;
  public abstract canceled(): Promise<{ user: UserEntity }>;
}
