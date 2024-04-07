import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../command';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class UserHandler implements ICommandHandler<CreateUserCommand, User> {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: CreateUserCommand): Promise<User> {
    const { email, password } = command;

    if (await this.userRepository.findOne(email))
      throw new ConflictException('User already exists');

    // 새로운 유저 생성 후 새 유저에 이벤트 발행 활성화
    const createdUser = this.publisher.mergeObjectContext(
      await this.userRepository.create(User.new({ email, password })),
    );

    createdUser.created(createdUser.id);

    return createdUser;
  }
}
