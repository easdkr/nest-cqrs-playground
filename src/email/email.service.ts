import { Injectable, Logger } from '@nestjs/common';

interface SendResult {
  success: boolean;
  message: string;
}

@Injectable()
export class EmailService {
  public constructor(private readonly logger: Logger) {}

  public async send(email: string, content: string): Promise<SendResult> {
    // 이메일 전송 (fake)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.logger.verbose(`Email sent to ${email}`, EmailService.name);

    return {
      success: true,
      message: `Sent an email to ${email} successfully : ${content}`,
    };
  }
}
