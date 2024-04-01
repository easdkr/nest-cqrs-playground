import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserRepository } from './repository';
import { UserHandler } from './handler/user.handler';
import { UserController } from './controller/user.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [UserRepository, UserHandler, UserService],
  controllers: [UserController],
})
export class UserModule {}
