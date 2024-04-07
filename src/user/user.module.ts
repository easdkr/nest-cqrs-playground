import { Logger, Module } from '@nestjs/common';
import { UserService } from './service';
import { UserRepository } from './repository';
import { UserHandler } from './handler/user.handler';
import { UserController } from './controller/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCreatedEventHandler } from './handler';

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    UserRepository,
    UserHandler,
    UserCreatedEventHandler,
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
