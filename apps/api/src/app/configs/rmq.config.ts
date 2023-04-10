import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? 'microservices',
    connections: [
      {
        login: configService.get('AMQP_USER') ?? 'guest',
        password: configService.get('AMQP_PASSWORD') ?? 'guest',
        host: configService.get('AMQP_HOSTNAME') ?? 'localhost',
      },
    ],
    prefetchCount: 32,
    serviceName: 'account',
  }),
});
