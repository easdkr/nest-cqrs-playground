import { Logger, Module } from '@nestjs/common';
import { UserService } from './service';
import { UserRepository } from './repository';
import { UserHandler } from './handler/user.handler';
import { UserController } from './controller/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CouponRegisterEventHandler, UserCreatedEventHandler } from './handler';
import { UserSaga } from './saga';

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    UserRepository,
    UserHandler,
    UserCreatedEventHandler,
    CouponRegisterEventHandler,
    UserService,
    UserSaga,
  ],
  controllers: [UserController],
})
export class UserModule {}
