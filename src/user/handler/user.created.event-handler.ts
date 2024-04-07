import { EventsHandler } from '@nestjs/cqrs';
import { CreateUserEvent } from '../event';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRepository } from '../repository';
import { EmailService } from '../../email/email.service';

@EventsHandler(CreateUserEvent)
export class UserCreatedEventHandler {
  public constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  public async handle(event: CreateUserEvent): Promise<void> {
    const user = await this.userRepository.findOneById(event.id);
    if (!user) throw new InternalServerErrorException('User not found');

    await this.emailService
      .send(user.email, 'Welcome to our platform!')
      .then(({ success, message }) => {
        this.logger[success ? 'debug' : 'error'](
          success ? message : 'Failed to send email',
          UserCreatedEventHandler.name,
        );
      });
  }
}
