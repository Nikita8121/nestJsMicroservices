import { IUser } from '@microservices/interfaces';
import { IsString } from 'class-validator';

export namespace AccountUpdateProfile {
  export const topic = 'account.update-profile.command';

  export class Request {
    @IsString()
    user: Pick<IUser, 'displayName'>;
    @IsString()
    id: string;
  }

  export class Response {}
}
