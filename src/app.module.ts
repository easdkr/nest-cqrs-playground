import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { EncryptionModule } from './encryption/encryption.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EncryptionModule.forRoot({
      round: 10,
    }),
    EmailModule,
    UserModule,
  ],
})
export class AppModule {}
