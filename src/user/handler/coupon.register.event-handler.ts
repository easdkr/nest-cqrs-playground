import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRegisterCouponCommand } from '../command';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateRegisterCouponCommand)
export class CouponRegisterEventHandler
  implements ICommandHandler<CreateRegisterCouponCommand>
{
  public constructor(private readonly logger: Logger) {}

  public async execute(command: CreateRegisterCouponCommand): Promise<void> {
    this.logger.verbose(
      `Register coupon ${command.id} for user ${command.userId}`,
    );
  }
}
