import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    EncryptionModule.forRoot({
      round: 10,
    }),
    UserModule,
  ],
})
export class AppModule {}
