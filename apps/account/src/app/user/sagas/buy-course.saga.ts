import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { PurchaseStateEnum } from '@microservices/interfaces';
import { BuyCourseSagaState } from './buy-course.state';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;
  constructor(
    private user: UserEntity,
    private courseId: string,
    private rmqService: RMQService
  ) {}

  setState(state: PurchaseStateEnum, courseId: string) {
    switch (state) {
      case PurchaseStateEnum.Started:
        break;
      case PurchaseStateEnum.Cancelled:
        break;
      case PurchaseStateEnum.Purchased:
        break;
      case PurchaseStateEnum.WaitingForPayment:
        break;
    }
    // set context
    this.user.updateCourseStatus(courseId, state);
  }

  getState() {
    return this.state;
  }
}
