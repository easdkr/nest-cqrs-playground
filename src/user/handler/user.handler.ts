import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class UserHandler implements ICommandHandler<CreateUserCommand, User> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: CreateUserCommand): Promise<User> {
    const { email, password } = command;

    if (await this.userRepository.findOne(email))
      throw new ConflictException('User already exists');

    const user = User.new({ email, password });

    await this.userRepository.create(User.new({ email, password }));

    return user;
  }
}
