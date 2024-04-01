import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command/create-user.command';
import { User } from '../entity/user.entity';
import { EncryptionService } from '../../encryption/encryption.service';

@Injectable()
export class UserService {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly encryption: EncryptionService,
  ) {}

  public async create(email: string, password: string): Promise<User> {
    return this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand(email, this.encryption.hash(password)),
    );
  }
}
